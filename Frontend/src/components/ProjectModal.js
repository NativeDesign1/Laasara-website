import React, { useRef, useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Heart, Calendar } from 'lucide-react';

function ProjectModal({ project, onClose }) {
  const videoRefs = useRef([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // All images combined for gallery navigation
  const allImages = project ? [project.image_url, ...(project.additional_images || [])] : [];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (expandedImage) {
          setExpandedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [expandedImage, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  // Pause all other videos when one starts playing
  const handleVideoPlay = (playingIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== playingIndex && !video.paused) {
        video.pause();
      }
    });
  };

  const openImageGallery = (index) => {
    setCurrentImageIndex(index);
    setExpandedImage(allImages[index]);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % allImages.length
      : (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
    setExpandedImage(allImages[newIndex]);
  };

  return (
    <>
      {/* Main Modal */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-5 flex justify-between items-center z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>
              {project.created_at && (
                <p className="text-emerald-100 text-sm mt-1 flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(project.created_at).toLocaleDateString('nl-NL', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition"
              aria-label="Sluiten"
            >
              <X size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
            {/* Image Gallery */}
            <div className="p-6 pb-0">
              {/* Main featured image */}
              <div 
                className="relative rounded-2xl overflow-hidden cursor-pointer group mb-4 bg-gray-100"
                onClick={() => openImageGallery(0)}
              >
                <img
                  src={project.image_url}
                  loading="lazy"
                  alt={project.title}
                  className="w-full h-[300px] sm:h-[400px] object-contain bg-gray-50"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <ZoomIn className="text-gray-800" size={24} />
                  </div>
                </div>
              </div>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-4">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                        index === 0 ? 'ring-2 ring-emerald-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
                      }`}
                      onClick={() => openImageGallery(index)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-6 pt-2">
              {/* Description Card */}
              <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                  Over dit project
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.full_description || project.description}
                </p>
              </div>

              {/* Details & Impact Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {project.details && project.details.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-600 text-sm">✓</span>
                      </span>
                      Details
                    </h4>
                    <ul className="space-y-3">
                      {project.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.impact && (
                  <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl p-6 text-white">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Heart size={20} />
                      Impact
                    </h4>
                    <p className="leading-relaxed opacity-95">{project.impact}</p>
                  </div>
                )}
              </div>

              {/* Videos Section */}
              {project.videos && project.videos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Play className="text-red-500" size={16} />
                    </span>
                    Video's ({project.videos.length})
                  </h4>
                  <div className="grid gap-4">
                    {project.videos.map((video, index) => (
                      <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                        <video 
                          ref={el => videoRefs.current[index] = el}
                          controls 
                          className="w-full max-h-[450px] object-contain"
                          onPlay={() => handleVideoPlay(index)}
                          playsInline
                          preload="metadata"
                        >
                          <source src={video} type="video/mp4" />
                          Je browser ondersteunt geen video.
                        </video>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Wil je dit project steunen?</h4>
                  <p className="text-gray-600 text-sm">Jouw bijdrage maakt het verschil!</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <a 
                    href="/doneer" 
                    className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 text-center"
                  >
                    Doneer nu
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition text-gray-600"
                  >
                    Sluiten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Image Lightbox */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
          onClick={() => setExpandedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition z-10"
            aria-label="Sluiten"
          >
            <X size={28} />
          </button>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
                aria-label="Vorige afbeelding"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
                aria-label="Volgende afbeelding"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Main image */}
          <img
            src={expandedImage}
            alt="Uitvergrote afbeelding"
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ProjectModal;