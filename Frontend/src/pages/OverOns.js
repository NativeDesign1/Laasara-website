import React from 'react';
import { Heart, Users, Gift, Building, Globe, Handshake } from 'lucide-react';
import missie from "../assets/missie.png"
import visie from "../assets/visie.png"
import abdel from "../assets/team/Abdelaziz.png"
import Hakim from "../assets/team/Hakim.png"
import Ilias from "../assets/team/Ilias.png"
import Moussa from "../assets/team/Moussa.png"
import Moustapha from "../assets/team/Moustapha.png"


function Over() {
  const goals = [
    {
      icon: Heart,
      title: 'Gemeenschap & Ontwikkeling',
      description: 'Mensen helpen en gemeenschappen versterken door middel van lokale initiatieven en samenwerking.'
    },
    {
      icon: Gift,
      title: 'Donaties & water structuren',
      description: 'Hulppakketten verstrekken en toegang tot schoon water mogelijk maken voor iedereen in nood.'
    },
    {
      icon: Users,
      title: 'Onderwijs & Beschutting',
      description: 'Toegang tot kwaliteitsonderwijs en veilige omgevingen creëren voor alle leden van de gemeenschap.'
    },
    {
      icon: Building,
      title: 'Sociale rechtvaardigheid',
      description: 'Gelijke kansen voor iedereen creëren, ongeacht achtergrond of sociale status.'
    },
    {
      icon: Globe,
      title: 'Cultuur & tradities',
      description: 'Culturele waarden behouden en delen om de rijke geschiedenis en identiteit te bewaren.'
    },
    {
      icon: Handshake,
      title: 'Lokaal betrokken',
      description: 'Directe samenwerking met lokale gemeenschappen om duurzame impact te realiseren.'
    }
  ];

  const team = [
  { name: 'Moussa Ahammar', role: 'Penningmeester', image: Moussa },
  { name: 'Abdelaziz Ahammar', role: 'Voorzitter', image: abdel },
  { name: 'Abdelhakim Koubaa', role: '2de penningmeester', image: Hakim },
  { name: 'Moustapha El Founti', role: 'Secretaris', image: Moustapha }, 
  { name: 'Ilias El Founti', role: 'Vice voorzitter', image: Ilias }
];

  return (
    <div className="pt-32">
      <section className="bg-gradient-to-br from-emerald-600 to-cyan-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">Over ons</h1>
          <p className="text-xl max-w-3xl mx-auto text-emerald-50">
            Ontdek wie we zijn, wat we doen en hoe we samen een verschil maken in de wereld.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Onze Missie</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Stichting Laassara zet zich in om het dorp Laassara en haar bewoners te helpen.
                De stichting is opgericht door een groep mensen die zich betrokken voelen bij de
                gemeenschap en zich willen inzetten om de levensomstandigheden van de mensen te verbeteren.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Onze missie is om mensen te helpen en hen te leren zelfredzaam te zijn. Door middel
                van onze hulp willen we een duurzame verandering bewerkstelligen, zodat mensen niet
                alleen geholpen worden op korte termijn, maar ook op lange termijn kunnen profiteren
                van de vaardigheden die ze hebben geleerd.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl opacity-20"></div>
              <img
                src={missie}
                loading='lazy'
                alt="Ons team"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-96"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl opacity-20"></div>
              <img
                src={visie}
                loading='lazy'
                alt="Onze visie"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-96"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Onze Visie</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Wij kijken naar onze wereldwijde gemeenschap om ervoor te zorgen dat ze de steun
                krijgen die ze verdienen. Door middel van onze projecten streven we naar een wereld
                waarin iedereen toegang heeft tot basisbehoeften zoals onderwijs, gezondheidszorg,
                schoon water en een veilige leefomgeving.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We geloven in het kracht van samenwerking en lokale betrokkenheid. Alleen door
                samen te werken met de gemeenschappen zelf kunnen we duurzame en betekenisvolle
                verandering realiseren.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Onze <span className="text-emerald-600">Doelen</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We richten ons op zes kerngebieden om maximale impact te maken in de gemeenschappen die we dienen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-2xl transition group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <goal.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{goal.title}</h3>
                <p className="text-gray-600 leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Ons <span className="text-cyan-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontmoet de toegewijde mensen die zich inzetten om onze missie te realiseren.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl shadow-sm hover:shadow-xl transition text-center p-8 group"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600 text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Over;
