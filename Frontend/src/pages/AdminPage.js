import React, { useState, useEffect } from 'react';
import ProjectForm from '../components/Projecten/ProjectForm';
import { supabase } from '../lib/supabaseClient';
import { Trash2, Edit, Languages, RefreshCw } from 'lucide-react';
import { translateProject } from '../services/TranslationService';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [translating, setTranslating] = useState(null); // Track which project is being translated

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create/update translations for a project
  const createTranslations = async (project) => {
    try {
      // Save Dutch version first
      await supabase
        .from('project_translations')
        .upsert({
          project_id: project.id,
          language_code: 'nl',
          title: project.title,
          description: project.description
        }, { onConflict: 'project_id,language_code' });

      // Auto-translate to other languages
      const translations = await translateProject(project);
      
      if (translations.length > 0) {
        await supabase
          .from('project_translations')
          .upsert(translations, { onConflict: 'project_id,language_code' });
        
        console.log(`Created ${translations.length} translations for "${project.title}"`);
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  // Manually retranslate a project
  const handleRetranslate = async (project) => {
    setTranslating(project.id);
    try {
      await createTranslations(project);
      setSuccess(`Vertalingen voor "${project.title}" zijn bijgewerkt!`);
    } catch (error) {
      setError('Vertaling mislukt: ' + error.message);
    } finally {
      setTranslating(null);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      let mainImagePath = editingProject?.image_url || null;

      // Upload main image if a new one is provided
      if (formData.image_file) {
        const mainImageFile = formData.image_file;
        const uploadPath = `Projecten/${Date.now()}-${mainImageFile.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('Project-images')
          .upload(uploadPath, mainImageFile);

        if (uploadError) throw uploadError;
        mainImagePath = uploadPath.split('Projecten/')[1];
      } else if (!editingProject) {
        // If creating a new project and no image is provided, show error
        throw new Error('Hoofdafbeelding is vereist voor een nieuw project');
      }

      // Upload additional images
      const additionalImagePaths = await Promise.all(
        (formData.additional_images || []).map(async (file) => {
          const path = `Projecten/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage
            .from('Project-images')
            .upload(path, file);
          
          if (error) throw error;
          return path.split('Projecten/')[1];
        })
      );

      // Upload videos
      const videoPaths = await Promise.all(
        (formData.videos || []).map(async (file) => {
          const path = `Projecten/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage
            .from('Project-images')
            .upload(path, file);
          
          if (error) throw error;
          return path.split('Projecten/')[1];
        })
      );

      // Prepare project data
      const projectData = {
        title: formData.title,
        description: formData.description,
        full_description: formData.full_description,
        details: formData.details,
        impact: formData.impact,
        image_url: mainImagePath,
        additional_images: editingProject 
          ? [...(editingProject.additional_images || []), ...additionalImagePaths]
          : additionalImagePaths,
        videos: editingProject 
          ? [...(editingProject.videos || []), ...videoPaths]
          : videoPaths,
      };

      if (editingProject) {
        // Update existing project
        const { error: dbError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (dbError) throw dbError;
        
        // Update translations in background
        createTranslations({ id: editingProject.id, ...projectData });
        
        setSuccess('Project succesvol bijgewerkt!');
        setEditingProject(null);
      } else {
        // Create new project
        projectData.created_at = new Date().toISOString();
        const { data: newProject, error: dbError } = await supabase
          .from('projects')
          .insert([projectData])
          .select()
          .single();

        if (dbError) throw dbError;
        
        // Auto-translate in background
        createTranslations(newProject);
        
        setSuccess('Project succesvol toegevoegd! Vertalingen worden aangemaakt...');
      }

      await fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      setError(error.message || 'Er is een fout opgetreden bij het opslaan van het project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Weet je zeker dat je dit project wilt verwijderen?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Get project data first
      const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (project) {
        // Delete main image
        if (project.image_url) {
          await supabase.storage
            .from('Project-images')
            .remove([`Projecten/${project.image_url}`]);
        }

        // Delete additional images
        if (project.additional_images?.length) {
          await supabase.storage
            .from('Project-images')
            .remove(project.additional_images.map(img => `Projecten/${img}`));
        }

        // Delete videos
        if (project.videos?.length) {
          await supabase.storage
            .from('Project-images')
            .remove(project.videos.map(video => `Projecten/${video}`));
        }

        // Delete project from database (translations are deleted via CASCADE)
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);

        if (error) throw error;

        setSuccess('Project succesvol verwijderd!');
        await fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError(error.message || 'Er is een fout opgetreden bij het verwijderen van het project');
    } finally {
      setLoading(false);
    }
  };

  // Translate all existing projects without translations
  const handleTranslateAll = async () => {
    setLoading(true);
    setError(null);
    let translated = 0;
    
    try {
      for (const project of projects) {
        setTranslating(project.id);
        await createTranslations(project);
        translated++;
      }
      setSuccess(`${translated} projecten zijn vertaald!`);
    } catch (error) {
      setError('Bulk vertaling mislukt: ' + error.message);
    } finally {
      setTranslating(null);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Projecten Beheer
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingProject ? 'Project Bewerken' : 'Nieuw Project'}
          </h2>
          <ProjectForm 
            onSubmit={handleSubmit}
            initialData={editingProject}
            onCancel={() => setEditingProject(null)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Huidige Projecten</h2>
            <button
              onClick={handleTranslateAll}
              disabled={loading || translating}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              <Languages size={18} />
              Alle projecten vertalen
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={`https://ktbgigqkcxxtsfbkqfvi.supabase.co/storage/v1/object/public/Project-images/Projecten/${project.image_url}`}
                      alt={project.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRetranslate(project)}
                      disabled={translating === project.id}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded disabled:opacity-50"
                      title="Vertalingen opnieuw genereren"
                    >
                      {translating === project.id ? (
                        <RefreshCw size={20} className="animate-spin" />
                      ) : (
                        <Languages size={20} />
                      )}
                    </button>
                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;