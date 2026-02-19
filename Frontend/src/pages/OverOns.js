import React from 'react';
import { Heart, Users, Gift, Building, Globe, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import missie from "../assets/missie.png"
import visie from "../assets/visie.png"
import abdel from "../assets/team/Abdelaziz.png"
import Hakim from "../assets/team/Hakim.png"
import Ilias from "../assets/team/Ilias.png"
import Moussa from "../assets/team/Moussa.png"
import Moustapha from "../assets/team/Moustapha.png"


function Over() {
  const { t } = useTranslation();
  
  const goals = [
    {
      icon: Heart,
      title: t('about.goals.community.title'),
      description: t('about.goals.community.description')
    },
    {
      icon: Gift,
      title: t('about.goals.donations.title'),
      description: t('about.goals.donations.description')
    },
    {
      icon: Users,
      title: t('about.goals.education.title'),
      description: t('about.goals.education.description')
    },
    {
      icon: Building,
      title: t('about.goals.justice.title'),
      description: t('about.goals.justice.description')
    },
    {
      icon: Globe,
      title: t('about.goals.culture.title'),
      description: t('about.goals.culture.description')
    },
    {
      icon: Handshake,
      title: t('about.goals.local.title'),
      description: t('about.goals.local.description')
    }
  ];

  const team = [
  { name: 'Moussa Ahammar', role: t('about.team.roles.treasurer'), image: Moussa },
  { name: 'Abdelaziz Ahammar', role: t('about.team.roles.chairman'), image: abdel },
  { name: 'Abdelhakim Koubaa', role: t('about.team.roles.treasurer2'), image: Hakim },
  { name: 'Moustapha El Founti', role: t('about.team.roles.secretary'), image: Moustapha }, 
  { name: 'Ilias El Founti', role: t('about.team.roles.viceChairman'), image: Ilias }
];

  return (
    <div className="pt-32">
      <section className="bg-gradient-to-br from-emerald-600 to-cyan-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">{t('about.title')}</h1>
          <p className="text-xl max-w-3xl mx-auto text-emerald-50">
            {t('about.description')}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('about.mission.text1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.mission.text2')}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl opacity-20"></div>
              <img
                src={missie}
                fetchPriority="high"
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
              <h2 className="text-4xl font-bold text-gray-800 mb-6">{t('about.vision.title')}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('about.vision.text1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.vision.text2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              {t('about.goals.title')} <span className="text-emerald-600">{t('about.goals.titleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.goals.description')}
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
              {t('about.team.title')} <span className="text-cyan-600">{t('about.team.titleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.team.description')}
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
