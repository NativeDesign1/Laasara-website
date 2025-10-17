import React from 'react';
import { X } from 'lucide-react';

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>
            {/* Additional images */}
            {project.additional_images && project.additional_images.map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
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
              <div className="grid gap-4">
                {project.videos.map((video, index) => (
                  <video key={index} controls className="w-full rounded-lg">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              Doneer voor dit project
            </button>
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