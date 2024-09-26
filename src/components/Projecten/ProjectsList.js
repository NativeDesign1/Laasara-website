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
import Waterput from '../../assets/Projecten/waterputmaroc.jpeg'
import '../../styles/projects.css';

const ProjectsList = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const projects = [
    {
      title: "Project Offerfeest 2024",
      description: "Tijdens het Offerfeest zetten we ons in om offerfeestpakketten te verstrekken aan mensen die dit het hardst nodig hebben.",
      fullDescription: "ggggggggggggggggggggggggggggggggdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggMeer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
      image: schaap, // Replace with the actual path
      modalImage1: "", 
    },
    {
        title: "Project Ramadan 2024 Dar Al Quraan",
        description: "Dar AL Quraan waar onze kinderen op jonge leeftijd quraan leren en tevens leren lezen en schrijven als voorbereiding voor de basisschool.",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: Ramadan, // Replace with the actual path
        modalImage1: "", 
      },
      {
        title: "Project onderhoud school",
        description: "Een basisschool in verwaarloosde staat en had dringend behoefte aan onderhoud, vernieuwing en steun. Laassara Foundation heeft, in samenwerking met onze lokale partner, Stichting Douar Laassara.",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: School, // Replace with the actual path
        modalImage1: "", 
      },
      {
        title: "Project schoolvervoer",
        description: "Onze partner, stichting Douar-Laassara, is sinds 2016 actief in het vervoeren van kinderen van verschillende leeftijden van hun woonplaats (dorp) naar de basisschool en middelbare school. Met trots sponsoren wij deze stichting in hun waardevolle werk. De stichting Douar-Laassara beschikt over twee schoolbussen die eigendom zijn van de overheid. Echter,",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: Vervoer, // Replace with the actual path
        modalImage1: "", 
      },
      {
        title: "Project Onderhoud begraafplaats",
        description: "Laassara Foundation zet zich ook in voor het onderhoud van deze begraafplaats. Dit vergt alhamdoulilah geen erg groot bedrag. We zorgen ervoor dat er twee keer per jaar grondig onderhoud wordt uitgevoerd. Denk hierbij aan het verwijderen van onkruid etc en het toegangkelijk houden van het bezoeken van de graven.",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: Begraafplaats, // Replace with the actual path
        modalImage1: "", 
      },{
        title: "Project Zakaat Al Maal",
        description: "Allah zegt:“Voorwaar, de zakaat is slechts voor de armen (1) en de behoeftigen (2) en de werkenden (aan de inzameling ervan) (3) en de Moe’allaf (4) en voor het vrijkopen van de slaven (5) en de schuldenaren (6) en om (uit te geven) op de weg van Allah (Djihaad) (7)",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: zakaat, // Replace with the actual path
        modalImage1: "", 
      },{
      title: "Voedselpakket",
      description: "In tijden van de Corona-pandemie in zowel 2020 als 2021, hebben jullie ons met jullie waardevolle steun in staat gesteld om talrijke gezinnen in Douar Laassara en de omringende gebieden te voorzien van essentiële voedselpakketten. Met dank aan jullie vrijgevigheid konden we deze kwetsbare gemeenschappen ondersteunen en hen voorzien van",
      fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
      image: voedselpakket, // Replace with the actual path
      modalImage1: "", 
    },
    {
        title: "Project Hajar",
        description: "Herstel en Hoop: De Kracht van Donaties voor Hajar’s Nieuw Levenspad” Hajar is een jongedame die in 2021 is aangereden door een auto. Deze bestuurder is daarna nog doorgereden en heeft haar aan haar lot overgelaten. Alhamdoulilah heeft zij dit overleefd. Helaas had zij hierdoor ernstig letsel opgelopen aan haar",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: hajar, // Replace with the actual path
        modalImage1: "", 
      },
      {
        title: "Project Ibrahim",
        description: " De Laassara Foundation heeft begin 2023 met succes dit project afgerond. Het betrof een kleinschalige inzamelingsactie. Dankzij de hulp van alle betrokkenen en het vertrouwen in Allah SWT, hebben wij dit in een zeer kort tijdsbestek kunnen verwezenlijken. Ibrahim is een jonge man uit een dorpje in Marokko, in",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: Ibrahim, // Replace with the actual path
        modalImage1: "", 

      },
      {
        title: "Project Waterput",
        description: "Waterput Dit is het resultaat van onze waterput project die begin 2021 afgerond is. Met behulp van onze ummah hebben we 3km aan leidingen kunnen realiseren, hierdoor kunnen er in totaal 5 dorpen gebruik maken van de waterposten",
        fullDescription: "Meer informatie over dit project: Tijdens het Offerfeest 2024 willen we minstens 500 pakketten verdelen aan de meest behoeftige families. Doe mee en help ons een verschil te maken!",
        image: Waterput, // Replace with the actual path
        modalImage1: "", 
      },
    // You can add more projects here
  ];

  const openModal = (index) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  return (
    <div className="p-8 container mx-auto">
      

      {/* Project Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg flex flex-col  bg-white relative">
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
            <div className="p-4 pb-16">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-500 mb-4">{project.description}</p>
              <button
                onClick={() => openModal(index)}
                className="absolute bottom-4 px-4 py-2 bg-lightGreen text-white rounded-md shadow hover:bg-green-700  transition duration-300"
              >
                Lees meer
              </button>
            </div>

      
            {openModalIndex === index && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-4xl w-[100%] max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-lg custom-scrollbar">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">{project.title}</h3>
                <button
          onClick={closeModal}
          className="p-2 bg-none text-gray-700 rounded-full hover:bg-gray-400 transition duration-300"
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
        className="w-full h-40 object-cover mb-4" 
        style={{ maxWidth: '100%' }} // Ensure the image stays within the container width
      />

      {/* Modal Content */}
      <p className="text-gray-700 break-words">
        {project.fullDescription}
      </p>
    </div>
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;