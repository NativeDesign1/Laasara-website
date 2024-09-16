
import './App.css';
import Navbar from './components/Navbar';
import HeaderSection from './components/Headersection';
import StatsSection from './components/StatsSection';
import GoalsSection from './components/GoalsSection';
import ProjectSection from './components/ProjectSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeaderSection />
      <StatsSection />
      <GoalsSection />
      <ProjectSection />
      <Footer />
    </div>
  );
}

export default App;
