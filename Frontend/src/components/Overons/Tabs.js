// Tabs.js
import React, { useState } from "react";
import masjied from "../../assets/masjied-laassara/Masjied-Laassara3.jpg";
import Laassaramaroc from "../../assets/masjied-laassara/Jamiaa_Laassara_Morocco.jpg";
import Aqboush from "../../assets/masjied-laassara/Aqboush.jpg";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "tab1", label: "Werking", content: <TabContent1 /> },
    { id: "tab2", label: "Masjied Laassara", content: <TabContent2 /> },
    { id: "tab3", label: "Aqbousch", content: <TabContent3 /> },
  ];

  return (
    <section className="flex items-center justify-center min-h-96 bg-opacity-20 bg-gradient-to-r from-softBlue via-darkGreen to-lightGreen p-4">
      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex flex-col sm:flex-row">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-gray-600 py-4 px-6 block hover:text-darkGreen focus:outline-none ${
                  activeTab === tab.id
                    ? "text-lightGreen border-b-2 font-medium border-lightGreen"
                    : "border-b-2 border-transparent"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <div key={tab.id} className="animate-fade-in">
                  {tab.content}
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

const TabContent1 = () => (
  <div className="text-center space-y-4">
    
    <img
      src={Laassaramaroc}
      alt="Home"
      className="w-full h-auto mb-6 rounded-lg shadow-md max-w-md mx-auto"
    />
    <p className="text-gray-600 leading-relaxed">
    De stichting werkt samen met lokale gemeenschapsleiders en instellingen om ervoor te zorgen dat de hulp op de juiste plek terechtkomt en dat de mensen die het meest nodig hebben, geholpen worden. We zijn er trots op dat wij de gemeenschap kunnen ondersteunen en een positief verschil kunnen maken in het dagelijks leven van de mensen die er wonen. Dankzij de inzet van vrijwilligers en betrokkenen hebben de bewoners van het dorp nu meer kansen en mogelijkheden om hun leven te verbeteren en een betere toekomst op te bouwen.
    </p>
  </div>
);

const TabContent2 = () => (
  <div className="text-center">
    
    <img
      src={masjied}
      alt="About"
      className="w-full h-auto mb-6 rounded-lg shadow-md max-w-md mx-auto"
    />
    <p className="text-gray-600 leading-relaxed">
      Het imposante Masjied Laassara gebouw, is een ware getuige van de
      geschiedenis en heeft de tand des tijds doorstaan sinds de bezetting van
      Portugal op Marokko tussen 1415 en 1769. Dit gebouw is eeuwenoud en wordt
      tot op de dag van vandaag met zorg onderhouden. Het staat symbool voor de
      veerkracht en de culturele verwevenheid tussen deze twee landen.
      Tegenwoordig wordt Masjied Laassara beheerd door een speciale commissie
      die verantwoordelijk is voor het behoud en de restauratie ervan.
      Deskundigen en Laassara-dorpsbewoners werken nauw samen om de architectuur
      en de historische waarde van het gebouw te behouden. Dit vereist een
      voortdurende inspanning om de materialen en technieken van weleer te
      begrijpen en toe te passen.
    </p>
  </div>
);

const TabContent3 = () => (
  <div className="text-center">
    
    <img
      src={Aqboush}
      alt="Contact"
      className="w-full h-auto mb-6 rounded-lg shadow-md max-w-md mx-auto"
    />
    <p className="text-gray-600 leading-relaxed">
      Het dorpje Laassara, ook wel bekend als Aqbousch – wat “de waterpot”
      betekent (zie foto) – staat al tientallen jaren bekend om de inzet van
      verschillende generaties van de familie El Founti om de waterpot meerdere
      keren per dag te vullen voor voetgangers. Bovendien fungeert Aqbousch als
      een belangrijk knooppunt voor bussen en taxi’s, waar passagiers in- en
      uitstappen. Dankzij de modernisering door de Stichting Laassara is
      Aqbousch nu aangepast aan de hedendaagse tijd.
    </p>
  </div>
);

export default Tabs;
