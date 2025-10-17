import React, { useState, useEffect } from 'react';
import ProjectForm from '../components/Projecten/ProjectForm';
import { supabase } from '../lib/supabaseClient';
import { Trash2, Edit } from 'lucide-react';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

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

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      
      // Upload main image
      const mainImageFile = formData.image_file;
      const mainImagePath = `Projecten/${Date.now()}-${mainImageFile.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('Project-images')
        .upload(mainImagePath, mainImageFile);

      if (uploadError) throw uploadError;

      // Upload additional images
      const additionalImagePaths = await Promise.all(
        formData.additional_images.map(async (file) => {
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
        formData.videos.map(async (file) => {
          const path = `Projecten/${Date.now()}-${file.name}`;
          const { error } = await supabase.storage
            .from('Project-images')
            .upload(path, file);
          
          if (error) throw error;
          return path.split('Projecten/')[1];
        })
      );

      // Save project data to database
      const projectData = {
        title: formData.title,
        description: formData.description,
        full_description: formData.full_description,
        image_url: mainImagePath.split('Projecten/')[1],
        additional_images: additionalImagePaths,
        videos: videoPaths,
        created_at: new Date().toISOString()
      };

      const { error: dbError } = await supabase
        .from('projects')
        .insert([projectData]);

      if (dbError) throw dbError;

      await fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
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
      
      // Get project data first
      const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (project) {
        // Delete main image
        await supabase.storage
          .from('Project-images')
          .remove([`Projecten/${project.image_url}`]);

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

        // Delete project from database
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);

        if (error) throw error;

        await fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Projecten Beheer
        </h1>

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
          <h2 className="text-2xl font-bold mb-6">Huidige Projecten</h2>
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