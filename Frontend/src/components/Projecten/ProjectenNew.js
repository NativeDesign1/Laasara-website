import React, { useState, useEffect } from 'react';
import ProjectModal from '../ProjectModal';
import { supabase } from '../../lib/supabaseClient';

const ProjectenNew = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

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
      <div className="pt-32">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded max-w-2xl mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32">
        <div className="container mx-auto px-4 text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32">
      <section className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">Onze Projecten</h1>
          <p className="text-xl max-w-3xl mx-auto text-cyan-50">
            Ontdek hoe we samen werken aan een betere toekomst voor gemeenschappen in nood.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      console.warn(`Failed to load image for project: ${project.title}`);
                      e.target.src = '/fallback-image.jpg';
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                  </div>
                  {/* Badge for images/videos count */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {project.additional_images && project.additional_images.length > 0 && (
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        📷 {project.additional_images.length + 1}
                      </span>
                    )}
                    {project.videos && project.videos.length > 0 && (
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        🎬 {project.videos.length}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-5 leading-relaxed line-clamp-3">{project.description}</p>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    Bekijk project
                  </button>
                </div>
              </div>
            ))}
          </div>

          {projects.length > 6 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowMore(!showMore)}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-md hover:shadow-lg transition duration-300"
              >
                {showMore ? "Toon minder" : "Toon meer"}
              </button>
            </div>
          )}
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <section className="bg-gradient-to-br from-emerald-600 to-cyan-600 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Wil je een project steunen?</h2>
          <p className="text-xl mb-10 text-emerald-50 max-w-2xl mx-auto">
            Elke donatie maakt een verschil. Help ons om deze belangrijke projecten te realiseren en levens te veranderen.
          </p>
          <a
            href="/doneer"
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition text-lg"
          >
            Doneer nu
          </a>
        </div>
      </section>
    </div>
  );
}

export default ProjectenNew;