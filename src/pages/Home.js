import React from 'react';
import HeaderSection from '../components/Headersection';
import StatsSection from '../components/StatsSection';
import GoalsSection from '../components/GoalsSection';
import ProjectSection from '../components/ProjectSection';



function Home() {
    console.log("home");
  return (
    <div>
      <HeaderSection />
      <StatsSection />
      <GoalsSection />
      <ProjectSection />
    </div>
  );
}

export default Home;