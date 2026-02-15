import React, { useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

function ProjectModal({ project, onClose }) {
  const videoRefs = useRef([]);
  const [expandedImage, setExpandedImage] = useState(null);

  if (!project) return null;

  // Pause all other videos when one starts playing
  const handleVideoPlay = (playingIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== playingIndex && !video.paused) {
        video.pause();
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Expanded image overlay */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpandedImage(null)}
        >
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <X size={32} />
          </button>
          <img
            src={expandedImage}
            alt="Uitvergrote afbeelding"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Main image */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative"
              onClick={() => setExpandedImage(project.image_url)}
            >
              <img
                src={project.image_url}
                loading="lazy"
                alt={project.title}
                className="w-full h-64 object-contain bg-gray-100"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition" size={32} />
              </div>
            </div>
            {/* Additional images */}
            {project.additional_images && project.additional_images.map((image, index) => (
              <div 
                key={index} 
                className="rounded-xl overflow-hidden shadow-lg cursor-pointer group relative"
                onClick={() => setExpandedImage(image)}
              >
                <img
                  src={image}
                  loading="lazy"
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-64 object-contain bg-gray-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition" size={32} />
                </div>
              </div>
            ))}
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Over dit project</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{project.full_description}</p>

            {project.details && (
              <>
                <h4 className="text-lg font-bold text-gray-800 mb-3 mt-6">Details</h4>
                <ul className="space-y-2 text-gray-600">
                  {project.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.impact && (
              <>
                <h4 className="text-lg font-bold text-gray-800 mb-3 mt-6">Impact</h4>
                <p className="text-gray-600">{project.impact}</p>
              </>
            )}
          </div>

          {/* Videos section */}
          {project.videos && project.videos.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3">Video's</h4>
              <div className="grid gap-6">
                {project.videos.map((video, index) => (
                  <div key={index} className="bg-black rounded-xl overflow-hidden shadow-lg">
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      controls 
                      className="w-full max-h-[500px] object-contain"
                      onPlay={() => handleVideoPlay(index)}
                      playsInline
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <a href="/doneer" className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition text-center">
              Doneer voor dit project
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-emerald-500 hover:text-emerald-600 transition"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;