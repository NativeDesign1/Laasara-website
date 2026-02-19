import { supabase } from '../lib/supabaseClient';
import { translateProject } from './TranslationService';

export const projectService = {
  async getAllProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createProject(project) {
    // First upload the main image
    const mainImageUrl = await this.uploadImage(project.image);
    
    // Upload additional images if any
    const additionalImageUrls = await Promise.all(
      project.images.map(img => this.uploadImage(img))
    );

    // Upload videos if any
    const videoUrls = project.videos 
      ? await Promise.all(project.videos.map(video => this.uploadVideo(video)))
      : [];

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        description: project.description,
        image_url: mainImageUrl,
        additional_images: additionalImageUrls,
        video_urls: videoUrls,
        full_description: project.fullDescription,
        details: project.details,
        impact: project.impact
      }])
      .select();

    if (error) throw error;
    
    const createdProject = data[0];

    // Auto-translate project content in background
    this.createTranslations(createdProject).catch(err => {
      console.error('Auto-translation failed:', err);
    });

    return createdProject;
  },

  /**
   * Create translations for a project
   * @param {Object} project - The project to translate
   */
  async createTranslations(project) {
    try {
      // First, save the Dutch version
      await supabase
        .from('project_translations')
        .upsert({
          project_id: project.id,
          language_code: 'nl',
          title: project.title,
          description: project.description
        }, { onConflict: 'project_id,language_code' });

      // Then auto-translate to other languages
      const translations = await translateProject(project);
      
      if (translations.length > 0) {
        const { error } = await supabase
          .from('project_translations')
          .upsert(translations, { onConflict: 'project_id,language_code' });
        
        if (error) {
          console.error('Error saving translations:', error);
        } else {
          console.log(`Created ${translations.length} translations for project "${project.title}"`);
        }
      }
    } catch (error) {
      console.error('Translation process failed:', error);
    }
  },

  /**
   * Update translations when project is edited
   * @param {string} projectId - Project ID
   * @param {Object} updates - Updated title and/or description
   */
  async updateTranslations(projectId, updates) {
    // Update Dutch version
    if (updates.title || updates.description) {
      await supabase
        .from('project_translations')
        .upsert({
          project_id: projectId,
          language_code: 'nl',
          title: updates.title,
          description: updates.description
        }, { onConflict: 'project_id,language_code' });

      // Re-translate to other languages
      const translations = await translateProject({
        id: projectId,
        title: updates.title,
        description: updates.description
      });
      
      if (translations.length > 0) {
        await supabase
          .from('project_translations')
          .upsert(translations, { onConflict: 'project_id,language_code' });
      }
    }
  },

  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .match({ id });

    if (error) throw error;
  },

  async uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('project-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async uploadVideo(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-videos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('project-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};