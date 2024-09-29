import React, { useState } from 'react';
import schaap from '../../assets/Projecten/schaap-1-rode-muur (1).jpeg';
import Ramadan from '../../assets/Projecten/Projectramadaan.jpeg';
import School from '../../assets/Projecten/ProjectSchool.jpg';
import Vervoer from '../../assets/Projecten/projectVervoer.jpg';
import Begraafplaats from '../../assets/Projecten/projectbegraafplaats.jpg';
import zakaat from '../../assets/Projecten/zakaat.jpg';
import voedselpakket from '../../assets/Projecten/Voedselpakket.jpg';
import hajar from '../../assets/Projecten/Hajar-300x244.jpg';
import Ibrahim from '../../assets/Projecten/Projedct-Ibrahim-300x158.jpg';
import Waterput from '../../assets/Projecten/waterputmaroc.jpeg';
import RamadanCard from '../../assets/Projecten/Projectramadaancard.png';
import '../../styles/projects.css';

const ProjectsList = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [showMore, setShowMore] = useState(false); // Manage show more state

  const projects = [
    {
      title: "Project Offerfeest 2024",
      description: "Tijdens het Offerfeest zetten we ons in om offerfeestpakketten te verstrekken aan mensen die dit het hardst nodig hebben.",
      fullDescription: "Meer informatie over dit project...",
      image: schaap,
    },
    {
      title: "Project Ramadan 2024 Dar Al Quraan",
      description: "Dar AL Quraan waar onze kinderen op jonge leeftijd quraan leren.",
      fullDescription: "Meer informatie over dit project...",
      image: Ramadan,
    },
    {
      title: "Project onderhoud school",
      description: "Een basisschool in verwaarloosde staat en had dringend behoefte aan onderhoud.",
      fullDescription: "Meer informatie over dit project...",
      image: School,
    },
    {
      title: "Project schoolvervoer",
      description: "Onze partner, stichting Douar-Laassara, is sinds 2016 actief in het vervoeren van kinderen.",
      fullDescription: "Meer informatie over dit project...",
      image: Vervoer,
    },
    {
      title: "Project Onderhoud begraafplaats",
      description: "Laassara Foundation zet zich ook in voor het onderhoud van deze begraafplaats.",
      fullDescription: "Meer informatie over dit project...",
      image: Begraafplaats,
    },
    {
      title: "Project Zakaat Al Maal",
      description: "Allah zegt: “Voorwaar, de zakaat is slechts voor de armen.",
      fullDescription: "Meer informatie over dit project...",
      image: zakaat,
    },
    {
      title: "Voedselpakket",
      description: "In tijden van de Corona-pandemie hebben jullie ons met jullie steun geholpen.",
      fullDescription: "Meer informatie over dit project...",
      image: voedselpakket,
    },
    {
      title: "Project Hajar",
      description: "Herstel en Hoop: De Kracht van Donaties voor Hajar’s Nieuw Levenspad.",
      fullDescription: "Meer informatie over dit project...",
      image: hajar,
    },
    {
      title: "Project Ibrahim",
      description: "De Laassara Foundation heeft begin 2023 met succes dit project afgerond.",
      fullDescription: "Meer informatie over dit project...",
      image: Ibrahim,
    },
    {
      title: "Project Waterput",
      description: "Waterput Dit is het resultaat van onze waterput project die begin 2021 afgerond is.",
      fullDescription: "Meer informatie over dit project...",
      image: Waterput,
    },
  ];

  const openModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Determine how many projects to show initially or after "Show More"
  const displayedProjects = showMore ? projects : projects.slice(0, 4);

  return (
    <div className="p-8 container mx-auto">
      {/* Project Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {displayedProjects.map((project, index) => (
          <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg flex flex-col bg-white relative">
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
            <div className="p-4 pb-16">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-500 mb-4">{project.description}</p>
              <button
                onClick={() => openModal(index)}
                className="absolute bottom-4 px-4 py-2 bg-lightGreen text-white rounded-md shadow hover:bg-green-700 transition duration-300"
              >
                Lees meer
              </button>
            </div>

            {/* Modal */}
            {openModalIndex === index && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white relative p-6 rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-lg flex flex-col items-center justify-center space-y-5 custom-scrollbar">
                  {/* Modal Header */}
                  <div className="flex justify-between  items-center mb-4">
                    <h3 className="text-2xl justify-center font-bold">{project.title}</h3>
                    <button
                      onClick={closeModal}
                      className="p-2 bg-none absolute right-5 text-gray-700 rounded-full hover:bg-gray-400 transition duration-300"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-[50%] rounded-md h-40 object-cover mb-4"
                    style={{ maxWidth: '100%' }}
                  />

                  {/* Modal Content */}
                  <p className="text-gray-700 break-words">{project.fullDescription}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={toggleShowMore}
          className="px-6 py-2 bg-white text-black rounded-md shadow hover:bg-gray-300 transition duration-300"
        >
          {showMore ? 'Toon minder' : 'Toon meer'}
        </button>
      </div>
    </div>
  );
};

export default ProjectsList;