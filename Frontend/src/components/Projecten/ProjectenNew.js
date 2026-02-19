import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectModal from '../ProjectModal';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, Image, Film } from 'lucide-react';

const ProjectenNew = () => {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [projects, setProjects] = useState([]);
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch translations when language changes
  useEffect(() => {
    if (projects.length > 0) {
      fetchTranslations();
    }
  }, [i18n.language, projects.length]);

  // Fetch translations for current language
  const fetchTranslations = async () => {
    try {
      const currentLang = i18n.language;
      const projectIds = projects.map(p => p.id);
      
      const { data, error } = await supabase
        .from('project_translations')
        .select('project_id, title, description')
        .eq('language_code', currentLang)
        .in('project_id', projectIds);

      if (error) {
        console.warn('Translations table may not exist yet:', error.message);
        return;
      }

      // Create a map of project_id -> translation
      const translationsMap = {};
      data?.forEach(t => {
        translationsMap[t.project_id] = {
          title: t.title,
          description: t.description
        };
      });
      setTranslations(translationsMap);
    } catch (err) {
      console.warn('Could not fetch translations:', err);
    }
  };

  // Helper function to get translated content with fallback
  const getTranslated = (project, field) => {
    const translation = translations[project.id];
    if (translation && translation[field]) {
      return translation[field];
    }
    return project[field]; // Fallback to original (Dutch)
  };

const fetchProjects = async () => {
  try {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Cache file list to avoid multiple requests
    let fileList = null;
    const getFileList = async () => {
      if (!fileList) {
        try {
          const { data } = await supabase
            .storage
            .from('Project-images')
            .list('Projecten');
          fileList = new Set(data.map(file => file.name));
        } catch (err) {
          console.error('Error fetching file list:', err);
          fileList = new Set();
        }
      }
      return fileList;
    };

    // Deduplicate projects based on title
    const uniqueProjects = Array.from(
      new Map(data.map(item => [item.title, item])).values()
    );

    // Get file list once
    const files = await getFileList();

    const projectsWithSignedUrls = await Promise.all(
      uniqueProjects.map(async project => {
        try {
          // Check if main image exists in cache
          if (!files.has(project.image_url)) {
            console.warn(`Image not found for ${project.title}: ${project.image_url}`);
            return null;
          }

          // Get signed URL for main image
          const { data: mainImageData, error: mainImageError } = await supabase
            .storage
            .from('Project-images')
            .createSignedUrl(`Projecten/${project.image_url}`, 31536000);

          if (mainImageError) {
            console.error(`Error getting signed URL for ${project.title}:`, mainImageError);
            return null;
          }

          // Process additional images in parallel (only existing ones)
          const additionalImages = await Promise.all(
            (project.additional_images || [])
              .filter(Boolean)
              .filter(img => files.has(img))
              .map(async img => {
                const { data } = await supabase
                  .storage
                  .from('Project-images')
                  .createSignedUrl(`Projecten/${img}`, 31536000);
                return data?.signedUrl;
              })
          );

          // Process videos in parallel
          const videos = await Promise.all(
            (project.videos || [])
              .filter(Boolean)
              .filter(video => files.has(video))
              .map(async video => {
                const { data } = await supabase
                  .storage
                  .from('Project-images')
                  .createSignedUrl(`Projecten/${video}`, 31536000);
                return data?.signedUrl;
              })
          );

          return {
            ...project,
            image_url: mainImageData.signedUrl,
            additional_images: additionalImages.filter(Boolean),
            videos: videos.filter(Boolean)
          };
        } catch (err) {
          console.error(`Error processing project ${project.title}:`, err);
          return null;
        }
      })
    );

    // Filter out null projects
    const validProjects = projectsWithSignedUrls.filter(Boolean);

    if (validProjects.length === 0) {
      setError('No valid projects found');
      return;
    }

    setProjects(validProjects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    setError('Failed to load projects');
  } finally {
    setLoading(false);
  }
};
  const displayedProjects = showMore ? projects : projects.slice(0, 6);

  if (loading) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen bg-white">
        {/* Header Skeleton */}
        <section className="bg-gradient-to-br from-emerald-50 to-white py-12 md:py-20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="h-10 md:h-12 bg-gray-200 rounded w-64 md:w-80"></div>
              <div className="h-5 bg-gray-200 rounded w-96 max-w-full"></div>
            </div>
          </div>
        </section>
        
        {/* Projects Grid Skeleton */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse flex flex-col">
                  <div className="bg-gray-200 rounded-lg aspect-[4/3] mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-12 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs md:text-sm font-medium tracking-wider text-emerald-600 uppercase mb-3 md:mb-4">
            {t('projects.subtitle')}
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4 md:mb-6 tracking-tight">
            {t('projects.title')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            {t('projects.description')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {displayedProjects.map((project) => (
              <article
                key={project.id}
                className="group cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] mb-4 md:mb-5">
                  <img
                    src={project.image_url}
                    alt={getTranslated(project, 'title')}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/fallback-image.jpg';
                    }}
                    loading="lazy"
                  />
                  {/* Media indicators */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
                    {project.additional_images && project.additional_images.length > 0 && (
                      <span className="flex items-center gap-1.5 bg-white/95 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">
                        <Image size={12} />
                        {project.additional_images.length + 1}
                      </span>
                    )}
                    {project.videos && project.videos.length > 0 && (
                      <span className="flex items-center gap-1.5 bg-white/95 text-gray-700 text-xs font-medium px-2 py-1 rounded-md">
                        <Film size={12} />
                        {project.videos.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content - flex-grow pushes button to bottom */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {getTranslated(project, 'title')}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {getTranslated(project, 'description')}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all mt-auto">
                    {t('projects.viewProject')}
                    <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Show More Button */}
          {projects.length > 6 && (
            <div className="flex justify-center mt-10 md:mt-16">
              <button
                onClick={() => setShowMore(!showMore)}
                className="px-6 md:px-8 py-3 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {showMore ? t('projects.showLess') : t('projects.showMore')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject ? {
          ...selectedProject,
          title: getTranslated(selectedProject, 'title'),
          description: getTranslated(selectedProject, 'description')
        } : null} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl md:rounded-2xl p-8 md:p-14 text-center">
            <span className="inline-block px-3 md:px-4 py-1.5 bg-white/20 text-white text-xs md:text-sm font-medium rounded-full mb-4 md:mb-6">
              {t('projects.cta.badge')}
            </span>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-3 md:mb-4">
              {t('projects.cta.title')}
            </h2>
            <p className="text-white/80 mb-8 md:mb-10 max-w-xl mx-auto text-base md:text-lg">
              {t('projects.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="/doneer"
                className="inline-flex items-center justify-center bg-white text-emerald-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-base md:text-lg shadow-lg"
              >
                {t('projects.cta.donateNow')}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-white/40 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium hover:bg-white/10 transition-colors text-sm md:text-base"
              >
                {t('projects.cta.contact')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectenNew;