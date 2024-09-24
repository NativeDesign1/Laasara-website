import React from "react";
import projectenImage from "../assets/projectenImage.png";
import sectionbg from "../assets/goalSectionbg.png";

const ProjectSection = () => {
  return (
    <section className="bg-white sm:py-[65px] pt-0 pb-12 headerSection">
      <div className="container mx-auto flex flex-col-reverse sm:flex-row-reverse md:mt-7 gap-6 sm:gap-0 ">
        {/* Left Text Section */}
        <div className=" justify-center space-y-8 text-center md:text-left px-15 w-full sm:w-1/2 pt-9">
          <h1 className="text-3xl md:text-4xl text-center sm:text-left font-bold text-gray-800">
            Onze Projecten
          </h1>
          <p className="text-gray-600 text-md text-wrap pr-0 sm:pr-20 mx-2 sm:mx-0">
            Wij organiseren verschillende activiteiten en projecten om te zorgen
            voor betere gezondheidszorg, onderwijs en andere essentiële
            basisbehoeften.
          </p>

          <a
            href="#leesmeer"
            className="bg-softBlue text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-500 hover:shadow-lg transition duration-300 inline-block mt-3"
          >
            Lees meer
          </a>
        </div>

        {/* Right Image Section */}
        <div className="flex bg-transparent md:pr-24">
          <img
            src={projectenImage} // Replace with your image URL
            alt="Laassara Foundation"
            className="w-full max-w-lg sm:rounded-2xl rounded-none"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
