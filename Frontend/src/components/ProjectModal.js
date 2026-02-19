import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Calendar } from 'lucide-react';

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex justify-between items-start z-10">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{project.title}</h2>
              {project.created_at && (
                <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
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
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition -mr-2 -mt-1"
              aria-label="Sluiten"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-88px)]">
            {/* Image Gallery */}
            <div className="p-6 pb-0">
              {/* Main featured image */}
              <div 
                className="relative rounded-lg overflow-hidden cursor-pointer group mb-4 bg-gray-100"
                onClick={() => openImageGallery(0)}
              >
                <img
                  src={project.image_url}
                  loading="lazy"
                  alt={project.title}
                  className="w-full h-[300px] sm:h-[380px] object-contain bg-gray-50"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ZoomIn className="text-gray-700" size={20} />
                  </div>
                </div>
              </div>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-4">
                  {allImages.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
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
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                  {t('projects.modal.about')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.full_description || project.description}
                </p>
              </div>

              {/* Details & Impact Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {project.details && project.details.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                      {t('projects.modal.details')}
                    </h4>
                    <ul className="space-y-2">
                      {project.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.impact && (
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                      {t('projects.modal.impact')}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">{project.impact}</p>
                  </div>
                )}
              </div>

              {/* Videos Section */}
              {project.videos && project.videos.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Play size={14} />
                    {t('projects.modal.videos')} ({project.videos.length})
                  </h4>
                  <div className="grid gap-4">
                    {project.videos.map((video, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                        <video 
                          ref={el => videoRefs.current[index] = el}
                          controls 
                          className="w-full max-h-[400px] object-contain"
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
              <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{t('projects.modal.support')}</h4>
                  <p className="text-gray-500 text-sm">{t('projects.modal.supportDescription')}</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <a 
                    href="/doneer" 
                    className="flex-1 sm:flex-none bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-center text-sm"
                  >
                    {t('projects.cta.donateNow')}
                  </a>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 border border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition text-gray-600 text-sm"
                  >
                    {t('projects.modal.close')}
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
            className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition z-10"
            aria-label="Sluiten"
          >
            <X size={24} />
          </button>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition"
                aria-label="Vorige afbeelding"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg p-2.5 transition"
                aria-label="Volgende afbeelding"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Image counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white/80 px-4 py-2 rounded-lg text-sm font-medium">
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