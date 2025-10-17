import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const ProjectForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    details: '',
    impact: '',
    image_file: null,
    additional_images: [],
    videos: []
  });
  const [preview, setPreview] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        details: Array.isArray(initialData.details) 
          ? initialData.details.join('\n') 
          : initialData.details || '',
        image_file: null,
        additional_images: [],
        videos: []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image_file: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      additional_images: [...prev.additional_images, ...files]
    }));
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setAdditionalPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...files]
    }));
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index)
    }));
    setAdditionalPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process details into array before submitting
    const processedFormData = {
      ...formData,
      details: formData.details.split('\n').filter(detail => detail.trim() !== '')
    };
    
    onSubmit(processedFormData);
    
    setFormData({
      title: '',
      description: '',
      full_description: '',
      details: '',
      impact: '',
      image_file: null,
      additional_images: [],
      videos: []
    });
    setPreview(null);
    setAdditionalPreviews([]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Titel
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Korte Beschrijving
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Volledige Beschrijving
          </label>
          <textarea
            name="full_description"
            value={formData.full_description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details (één punt per regel)
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Bijvoorbeeld:&#10;Verstrekking van pakketten&#10;Ondersteuning van families&#10;Impact op de gemeenschap"
          />
          <div className="mt-3 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-2">Voorvertoning:</p>
            <ul className="list-disc pl-5 space-y-1">
              {formData.details.split('\n')
                .filter(detail => detail.trim() !== '')
                .map((detail, index) => (
                  <li key={index} className="text-sm text-gray-600">{detail}</li>
                ))
              }
            </ul>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Impact
          </label>
          <textarea
            name="impact"
            value={formData.impact}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Beschrijf de impact van dit project..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hoofdafbeelding
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="main-image"
              required={!initialData}
            />
            <label
              htmlFor="main-image"
              className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </label>
            {preview && (
              <p className="text-sm text-gray-500">
                Klik op de afbeelding om een andere te kiezen
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extra Afbeeldingen
          </label>
          <div className="flex flex-wrap gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleAdditionalImagesChange}
              className="hidden"
              id="additional-images"
              multiple
            />
            <label
              htmlFor="additional-images"
              className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500"
            >
              <Upload className="w-8 h-8 text-gray-400" />
            </label>
            {additionalPreviews.map((preview, index) => (
              <div key={index} className="relative w-32 h-32">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video's
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            multiple
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuleren
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Project Bijwerken' : 'Project Toevoegen'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;