import React from 'react';

const ProjectenHeader = () => {
  return (
    <div className="flex flex-col items-center py-16 bg-white">
      {/* Header Title */}
      <p className="text-sm font-medium tracking-wider text-gray-400 uppercase mb-3">
        Wat we doen
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 mb-4">
        Onze projecten
      </h2>
      
      {/* Header Subtitle/Description */}
      <p className="text-center text-gray-500 max-w-xl mb-10 leading-relaxed">
        We werken aan innovatieve en duurzame projecten die een positieve impact hebben op de maatschappij.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <a 
          href="/doneer"
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Doneer
        </a>
        <a 
          href="/contact"
          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Neem contact op
        </a>
      </div>
    </div>
  );
};

export default ProjectenHeader;