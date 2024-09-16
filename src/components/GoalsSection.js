import React from 'react';
import { FaHeart, FaGift, FaGraduationCap, FaUsers, FaLeaf, FaHandsHelping } from 'react-icons/fa'; // Importing icons from React-icons library

const GoalsSection = () => {
  return (
    <section className="bg-gray-100 py-12 goalsection">
      <div className="container flex flex-col space-y-8 gap-14 mx-auto text-center my-4">
        {/* Section Title */}
        <div >
            <h2 className="text-4xl font-bold mb-4 my-8 text-wrap">
          Onze <span className="text-lightGreen">Doelen</span>, <span className="text-gray-700">Jouw Steun</span>
            </h2>
        </div>
        

        {/* Icons with Descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-3   gap-[120px] mb-10">
          {/* Item 1 */}
          <div className="flex gap-3 flex-col items-center">
            <FaHeart className="text-4xl text-gray-700 mb-2" />
            <p className="text-lg">Gezondheidszorg & noodhulp</p>
          </div>

          {/* Item 2 */}
          <div className="flex gap-3 flex-col items-center">
            <FaGift className="text-4xl text-gray-700 mb-2" />
            <p className="text-lg">Donaties & vaste donateurs</p>
          </div>

          {/* Item 3 */}
          <div className="flex gap-3 flex-col items-center">
            <FaGraduationCap className="text-4xl text-gray-700 mb-2" />
            <p className="text-lg">Onderwijs & Basisbehoefte</p>
          </div>

          {/* Item 4 */}
          <div className="flex gap-3 flex-col items-center">
            <FaUsers className="text-4xl text-gray-700 mb-2" />
            <p className="text-lg">Sociale rechtvaardigheid</p>
          </div>

          {/* Item 5 */}
          <div className="flex gap-3 flex-col items-center">
            <FaLeaf className="text-4xl text-gray-700 mb-2" />
            <p className="text-lg">Cultuur & tradities</p>
          </div>

          {/* Item 6 */}
          <div className="flex gap-3 flex-col items-center">
            <FaHandsHelping className="text-4xl text-gray-700 mb-2" />
            <p className="text-lg">Gelijkheid</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row  justify-center space-y-6 sm:space-y-0 sm:space-x-8 space-x-0 mb-8 px-8 sm:mt-12">
          <a
            href="#word-lid"
            className="bg-lightGreen text-white px-12 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Word lid
          </a>
          <a
            href="#doneer"
            className="bg-softBlue text-white px-12 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300 shadow-lg "
          >
            Doneer
          </a>
        </div>

        {/* Quote */}
        <p className="text-gray-500 italic mx-auto px-5 text-center">
          De profeet Mohammed ﷺ zei: "De meest geliefde daad bij Allah is de goede daad die regelmatig wordt verricht."
        </p>
      </div>
    </section>
  );
};

export default GoalsSection;