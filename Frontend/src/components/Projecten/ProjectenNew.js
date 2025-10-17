import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProjectForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    additional_images: [],
    videos: [],
    full_description: '',
    details: [],
    impact: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailsChange = (e, index) => {
    const newDetails = [...formData.details];
    newDetails[index] = e.target.value;
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

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `Projecten/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('Project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('Project-images')
        .getPublicUrl(`Projecten/${fileName}`);

      setFormData(prev => ({
        ...prev,
        image_url: data.publicUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? 'Project Bewerken' : 'Nieuw Project'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Titel
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
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
          required
          rows="2"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hoofdafbeelding
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        {formData.image_url && (
          <img
            src={formData.image_url}
            alt="Preview"
            className="mt-2 h-32 object-cover rounded"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volledige Beschrijving
        </label>
        <textarea
          name="full_description"
          value={formData.full_description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Details
        </label>
        {formData.details.map((detail, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value