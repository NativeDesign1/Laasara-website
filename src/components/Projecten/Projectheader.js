import React from 'react';

const ProjectenHeader = () => {
  return (
    <div className="flex flex-col items-center py-12 bg-white">
      {/* Header Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Onze <span className="text-softBlue">projecten</span>
      </h2>
      
      {/* Header Subtitle/Description */}
      <p className="text-center text-gray-500 max-w-2xl mb-8">
        We werken aan innovatieve en duurzame projecten die een positieve impact hebben op de maatschappij. Bekijk hieronder enkele van onze lopende projecten.
      </p>

      {/* Optional Buttons for Navigation */}
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-softBlue text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
          Doneer
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300">
          Neem Contact Op
        </button>
      </div>
    </div>
  );
};

export default ProjectenHeader;