import React from 'react';
import { motion } from 'framer-motion';
import headerImage from '../assets/headerImage.png';

const HeaderSection = () => {
  return (
    <section className="bg-white sm:py-12 pt-5">
      <div className="container mx-auto sm:mx-auto flex flex-col-reverse sm:flex-row md:mt-7 ">
        {/* Left Text Section */}
        <motion.div
          className="justify-center  sm:pl-24 text-center space-y-8 flex-2 md:text-left px-15 w-full sm:w-1/2 pt-9"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Samen maken we het verschil
          </h1>
          <p className="text-gray-600 text-md text-wrap pr-0 sm:pr-20 mx-2 sm:mx-0">
            Stichting Laassara zet zich in om het dorp Laassara en haar bewoners te helpen. 
            De stichting is opgericht door een groep mensen die zich betrokken voelen bij de 
            gemeenschap en zich willen inzetten om de levensomstandigheden van de mensen te verbeteren.
          </p>
          <a
            href="/over"
            className="bg-softBlue text-white px-6 py-3 rounded-lg text-lg hover:scale-105 transition duration-300 inline-block mt-3"
          >
            Lees meer
          </a>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="bg-transparent relative flex-1 w-full sm:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={headerImage} // Replace with your image URL
            alt="Laassara Foundation"
            className="relative z-10 w-full mx-auto max-w-lg md:rounded-tr-2xl md:rounded-br-2xl"
          />
           <div className='bg-softBlue absolute -top-6 right-16 w-40 h-24 z-0 rounded-tr-2xl'></div>
           <div className='bg-softBlue absolute -bottom-6 left-16 w-40 h-24 z-0 rounded-bl-2xl'></div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeaderSection;