import React from "react";
import { FiEye, FiTarget } from "react-icons/fi"; // Using the vision icon from react-icons
import visionImage from "../../assets/Voedselpakketl.png"; // Update the path to your image

const VisionSection = () => {
  return (
    <section className="bg-white mx-auto  flex flex-col items-center vision  ">
      {/* Vision Icon and Title */}

      {/* Content Section */}
      <div className="flex flex-col-reverse sm:flex-row gap-8  items-center justify-center max-w-6xl my-20">
        <div className="text-center space-y-8 mb-12 sm:text-left sm:w-1/2 p-4 sm:pr-8">
          <h2 className="text-3xl sm:text-4xl font-semibold justify-center sm:justify-start flex items-center">
            Onze visie
            <span className="ml-4">
              <FiTarget className="text-gray-500 text-4xl" />
            </span>
          </h2>

          <p className="text-xl  text-gray-700 mb-4">
            Onze missie is om mensen te helpen en hen te leren zelfredzaam te
            zijn. Door middel van onze hulp willen we een duurzame verandering
            bewerkstelligen, zodat mensen niet alleen geholpen worden op korte
            termijn, maar ook op lange termijn kunnen profiteren van de
            vaardigheden die ze hebben geleerd.
          </p>
          <button className="bg-gradient-to-r from-[#38B6FF] to-[#5EB23F] shadow-lg justify-center text-white font-semibold py-2 px-8 sm:px-12 rounded-xl  hover:scale-110 transition duration-300">
            <a href="/doneer">Steun Ons</a>
          </button>
        </div>

        {/* Image Section */}
        <div className="sm:w-1/2 relative">
          <div className="sm:hidden absolute bottom-[-80px] left-[-60px] w-[190px] opacity-60">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#5EB23F"
                d="M33.1,-53.4C45.4,-50.2,59.6,-46.4,68.7,-37.4C77.9,-28.4,81.9,-14.2,78.6,-1.9C75.3,10.4,64.7,20.8,55.7,30.1C46.7,39.3,39.4,47.5,30.4,50.1C21.4,52.7,10.7,49.7,0.8,48.2C-9,46.7,-18,46.8,-28.8,45.2C-39.5,43.6,-51.9,40.4,-56.5,32.6C-61,24.8,-57.7,12.4,-59.6,-1.1C-61.6,-14.7,-68.9,-29.3,-65.1,-38.4C-61.3,-47.5,-46.3,-50.9,-33.6,-54C-20.9,-57,-10.5,-59.6,0,-59.5C10.4,-59.4,20.8,-56.7,33.1,-53.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          <img
            src={visionImage}
            alt="Onze visie"
            className="w-[80%] relative sm:w-full align-center h-auto sm:rounded-2xl sm:shadow-2xl ml-10  "
          />
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
