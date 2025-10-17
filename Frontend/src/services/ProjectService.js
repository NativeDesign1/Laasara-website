import { supabase } from '../lib/supabaseClient';

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
    return data[0];
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