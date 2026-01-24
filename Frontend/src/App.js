import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OverOns from './pages/OverOns';
import Projecten from './pages/Projecten';
import Doneer from './pages/Doneer';
import Contact from './pages/Contact';
import AdminProjects from './pages/AdminPage';
import DataMigration from './components/Admin/DataMigration';
import { preloadAllImages } from './utils/imagePreloader';


function App() {
  useEffect(() => {
    preloadAllImages();
  }, []);

  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/projecten" element={<Projecten />} />
            <Route path="/doneer" element={<Doneer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/migrate" element={<DataMigration />} />
            <Route path="/admin/projects" element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
