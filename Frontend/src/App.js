import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Over from './pages/Over';
import Projecten from './pages/Projecten';
import Contact from './pages/Contact';
import Doneer from './pages/Doneer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            {/* Define routes for different pages */}
            <Route exact path="/" element={<Home />} />
            <Route path="/over" element={<Over />} />
            <Route path="/projecten" element={<Projecten />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doneer" element={<Doneer />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
