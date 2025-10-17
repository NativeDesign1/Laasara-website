import React, { useState } from 'react';

const ProjectForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    details: [''],
    image: null,
    images: [],
    videos: [],
    impact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailChange = (index, value) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData(prev => ({
      ...prev,
      details: newDetails
    }));
  };

  const addDetail = () => {
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, '']
    }));
  };

  const removeDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleMultipleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const videoFiles = files.map(file => ({
      src: URL.createObjectURL(file),
      type: file.type
    }));
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...videoFiles]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Nieuw Project Toevoegen</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Titel
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Korte Beschrijving
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Volledige Beschrijving
          </label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Details
          </label>
          {formData.details.map((detail, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={detail}
                onChange={(e) => handleDetailChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder="Voeg detail toe"
              />
              <button
                type="button"
                onClick={() => removeDetail(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Verwijder
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDetail}
            className="mt-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          >
            Detail Toevoegen
          </button>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Hoofdafbeelding
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Extra Afbeeldingen
          </label>
          <input
            type="file"
            multiple
            onChange={handleMultipleImageUpload}
            accept="image/*"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Video's
          </label>
          <input
            type="file"
            multiple
            onChange={handleVideoUpload}
            accept="video/*"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Impact
          </label>
          <textarea
            name="impact"
            value={formData.impact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
        >
          Project Toevoegen
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;