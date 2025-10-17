import React from 'react';
import ProjectForm from '../components/Projecten/ProjectForm';

const AdminProjects = () => {
  const handleSubmit = async (formData) => {
    // Here you would typically:
    // 1. Upload images/videos to storage
    // 2. Save project data to database
    // 3. Update UI
    console.log('New project data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Projecten Beheer
        </h1>
        <ProjectForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AdminProjects;