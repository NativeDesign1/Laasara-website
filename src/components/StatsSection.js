import React from 'react';


const StatsSection = () => {
  return (
    <section className="bg-darkGreen py-8 sm:mt-[150px] mt-12  sm:h-40 h-96 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 text-center text-white gap-14 sm:gap-4 ">
        {/* Statistic 1 */}
        <div>
          <h3 className="text-3xl font-bold">15+</h3>
          <p className="text-lg">Projecten</p>
        </div>

        {/* Statistic 2 */}
        <div>
          <h3 className="text-3xl font-bold">15+</h3>
          <p className="text-lg">Dorpen</p>
        </div>

        {/* Statistic 3 */}
        <div>
          <h3 className="text-3xl font-bold">15+</h3>
          <p className="text-lg">Arme gevoed</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
