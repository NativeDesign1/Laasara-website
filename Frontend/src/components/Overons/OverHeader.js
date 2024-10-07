import React from 'react';
import teamImage from '../../assets/laassaarateamover.png';
import VisionSection from './Viosion';

const OverHeader = () => {
  return (
    <>
    <section className="bg-white mx-auto mt-6 flex flex-col ">
      
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6 sm:mt-6">
          Over ons
        </h2>
      </div>
      
      <div className=" h-36 sm:hidden inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${teamImage})` }}></div>

      {/* Full-Width Image Section */}
      <div className="relative flex flex-col sm:h-[550px] w-full team mt-5">
        {/* Team Image */}

      
        
        <div className=" hidden sm:block absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${teamImage})` }}></div>
        {/* Overlay */}
        <div className=" sm:absolute sm:left-[170px]  sm:top-[170px]  flex flex-col items-center md:items-start">
          <div className="bg-transparent max-w-xl mt-69 md:max-w-2xl">
            <p className="text-black text-center sm:text-white sm:text-left tracking-wider text-lg sm:text-xl font-semibold leading-relaxed px-5 mb-4">
              Stichting Laassara zet zich in om het dorp Laassara en haar bewoners te helpen. De stichting is opgericht door een groep mensen die zich betrokken voelen bij de gemeenschap en zich willen inzetten om de levensomstandigheden van de mensen te verbeteren.
            </p>

            {/* Donate Button */}
            <div className="flex justify-center sm:justify-start">
                <button className="bg-softBlue from-[#38B6FF] to-[#5EB23F] shadow-2xl text-white font-semibold py-2 px-9 sm:px-12 rounded-lg hover:scale-110 transition duration-300">
                  Doneer
                </button>
              </div>
          </div>
        </div>
      </div>
    </section>
    <VisionSection />
    </>
  );
};

export default OverHeader;
