import React, { useState } from "react";
import schaap from "../../assets/Projecten/schaap-1-rode-muur (1).jpeg";
import Ramadan from "../../assets/Projecten/Projectramadaan.jpeg";
import School from "../../assets/Projecten/ProjectSchool.jpg";
import Vervoer from "../../assets/Projecten/projectVervoer.jpg";
import Begraafplaats from "../../assets/Projecten/projectbegraafplaats.jpg";
import zakaat from "../../assets/Projecten/zakaat.jpg";
import voedselpakket from "../../assets/Projecten/Voedselpakket.jpg";
import hajar from "../../assets/Projecten/Hajar-300x244.jpg";
import Ibrahim from "../../assets/Projecten/Projedct-Ibrahim-300x158.jpg";
import Waterput from "../../assets/Projecten/waterputmaroc.jpeg";
import plattegrond from "../../assets/Projecten/plattegrondMasjied.png";
import "../../styles/projects.css";
import videoOnderhoud1 from "../../assets/Projecten/projectOnderhoud1.mp4";
import videoOnderhoud2 from "../../assets/Projecten/projectOnderhoud1.mp4";

const ProjectsList = () => {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [showMore, setShowMore] = useState(false); // Manage show more state

  const projects = [
    {
      title: "Project Offerfeest 2024",
      title2: "Offerfeest Hulp",
      description:
        "Tijdens het Offerfeest verstrekken we pakketten aan mensen in nood.",
      fullDescription:
        "Dit project helpt mensen in nood tijdens het Offerfeest door pakketten te verstrekken. Uw donatie maakt het verschil!",
      images: [schaap, Ramadan],
    },
    {
      title: "Project Ramadan 2024 Dar Al Quraan",
      title2: "Steun de Bouw",
      description: "Dar AL Quraan waar kinderen de Koran leren.",
      fullDescription: `
        Moge Allah ons vasten en nachtelijk gebed accepteren.<br />
        Ons project is het bouwen van Dar AL Quraan. Hier leren kinderen de Koran lezen en schrijven als voorbereiding voor school.<br />
        Ook analfabete ouders krijgen les.<br /><br />

        Doneer direct via de knop of onze bankrekening:<br />
        Stichting Laassara Foundation IBAN: NL67TRIO0320591689<br /><br />

        Moge Allah jouw sadaqa accepteren.<br /><br />
      `,
      images: [Ramadan, plattegrond],
    },
    {
      title: "Project onderhoud school",
      title2: "School Onderhoud",
      description:
        "Een basisschool in verwaarloosde staat had dringend onderhoud nodig.",
      fullDescription: `
        Een basisschool in Laassara verkeerde in slechte staat en had dringend onderhoud nodig. In samenwerking met Stichting Douar-Laassara heeft Laassara Foundation de school vernieuwd. We hebben gezorgd voor een frisse uitstraling en essentiële voorzieningen om de leeromgeving te verbeteren. <br><br/> 
        Met uw steun bouwen we samen aan een betere toekomst voor de school en haar leerlingen.
      `,
      images: [School],
      videos: [
        { src: videoOnderhoud1, type: "video/mp4" },
        { src: videoOnderhoud1, type: "video/mp4" },
      ],
    },
    {
      title: "Project schoolvervoer",
      title2: "Schoolvervoer Ondersteuning",
      description:
        "Onze partner, stichting Douar-Laassara, vervoert kinderen sinds 2016.",
      fullDescription: "Meer informatie over dit project...",
      images: [Vervoer],
    },
    {
      title: "Project Onderhoud begraafplaats",
      title2: "Begraafplaats Onderhoud",
      description: "Laassara Foundation zet zich in voor het begraafplaatsonderhoud.",
      fullDescription: "Meer informatie over dit project...",
      images: [Begraafplaats],
    },
    {
      title: "Project Zakaat Al Maal",
      title2: "Zakaat Ondersteuning",
      description: "Voorwaar, de zakaat is slechts voor de armen.",
      fullDescription: "Meer informatie over dit project...",
      images: [zakaat],
    },
    {
      title: "Voedselpakket",
      title2: "Voedselpakketten",
      description: "Tijdens de Corona-pandemie hebben jullie ons geholpen.",
      fullDescription: "Meer informatie over dit project...",
      images: [voedselpakket],
    },
    {
      title: "Project Hajar",
      title2: "Steun voor Hajar",
      description: "Donaties voor Hajar’s nieuwe levenspad.",
      fullDescription: "Meer informatie over dit project...",
      images: [hajar],
    },
    {
      title: "Project Ibrahim",
      title2: "Steun voor Ibrahim",
      description: "Het Ibrahim project werd begin 2023 succesvol afgerond.",
      fullDescription: "Meer informatie over dit project...",
      images: [Ibrahim],
    },
    {
      title: "Project Waterput",
      title2: "Waterput Project",
      description: "Het resultaat van ons waterput project, voltooid in 2021.",
      fullDescription: "Meer informatie over dit project...",
      images: [Waterput],
    },
  ];

  const openModal = (index) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);
  const toggleShowMore = () => setShowMore(!showMore);
  const displayedProjects = showMore ? projects : projects.slice(0, 4);

  return (
    <div className="p-8 container mx-auto">
      {/* Project Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {displayedProjects.map((project, index) => (
          <div
            key={index}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg flex flex-col bg-white relative"
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
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
                <div className="bg-white relative p-6 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-lg flex flex-col space-y-5">
                  {/* Modal Header */}
                  <div className="w-full text-center mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-gray-600 mt-2">{project.description}</p>
                  </div>

                  {/* First Image on Top */}
                  <div className="w-[70%] mx-auto">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-auto rounded-lg mb-8"
                    />
                  </div>

                  {/* Text on Left, Second Image on Right */}
                  <div className="flex flex-col md:flex-row justify-between items-start w-[80%] mx-auto space-x-0 md:space-x-8">
                    {/* Text on the Left */}
                    <div className="w-full md:w-1/2">
                      <h2 className="text-xl font-semibold mb-4">
                        {project.title2}
                      </h2>
                      <p
                        className="text-lg text-gray-700 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: project.fullDescription,
                        }}
                      />
                    </div>

                    {/* Second Image on the Right */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0">
                      {project.images[1] && (
                        <img
                          src={project.images[1]}
                          alt={project.title}
                          className="w-full h-auto rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  {/* Video Section (only for the school project) */}
                  {project.videos && (
                    <div className="w-full mt-8">
                      <h2 className="text-xl font-semibold text-center mb-4">
                        Bekijk onze video's:
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {project.videos.map((video, videoIndex) => (
                          <video
                            key={videoIndex}
                            controls
                            className="w-full h-96 rounded-lg"
                          >
                            <source src={video.src} type={video.type} />
                            Your browser does not support the video tag.
                          </video>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA (Call to Action) at the Center Bottom */}
                  <div className="flex flex-col justify-center items-center mt-8">
                    {/* Message */}
                    <p className="text-sm text-center text-gray-600 mb-4">
                      Uw donaties helpen ons om deze projecten te voltooien.
                    </p>
                    {/* Doneren Button */}
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">
                      Doneren
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-700 hover:bg-gray-300 p-2 rounded-full"
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
          {showMore ? "Toon minder" : "Toon meer"}
        </button>
      </div>
    </div>
  );
};

export default ProjectsList;
