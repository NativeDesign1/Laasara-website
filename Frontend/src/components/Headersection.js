import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Gift, ArrowRight } from 'lucide-react';
import headerImage from "../assets/headerPic1.png"

function Home() {
  return (
    <div className="pt-28 md:pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              Samen maken we het <span className="text-emerald-600">verschil</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed">
              Stichting Laassara zet zich in om het dorp Laassara en haar bewoners te helpen.
              De stichting is opgericht door een groep mensen die zich betrokken voelen bij de
              gemeenschap en zich willen inzetten om de levensomstandigheden van de mensen te verbeteren.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/over-ons"
                className="bg-emerald-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2"
              >
                Lees meer over ons
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/doneer"
                className="bg-white border-2 border-emerald-600 text-emerald-600 px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold hover:bg-emerald-50 transition text-center"
              >
                Doneer nu
              </Link>
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <img
              src={headerImage}
              fetchPriority="high"
              alt="Laassara Foundation"
              className="rounded-2xl w-full object-cover h-[300px] sm:h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-emerald-600 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center text-white">
            <div className="p-4 md:p-8">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2">15+</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Projecten</div>
            </div>
            <div className="p-4 md:p-8">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2">15+</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Jaren actief</div>
            </div>
            <div className="p-4 md:p-8">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2">100%</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">Transparant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-medium tracking-wider text-emerald-600 uppercase mb-3">
              Waarom wij
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Waarom Laassara Foundation?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We geloven in het creëren van duurzame impact door middel van onderwijs en gemeenschapsondersteuning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Gemeenschap eerst</h3>
              <p className="text-gray-600 leading-relaxed">
                We luisteren naar de behoeften van de lokale gemeenschap en werken samen aan oplossingen die echt verschil maken.
              </p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Transparant & Eerlijk</h3>
              <p className="text-gray-600 leading-relaxed">
                Volledige transparantie in hoe we donaties besteden. Elk project wordt gedocumenteerd en gerapporteerd.
              </p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Gift className="text-white" size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Duurzame impact</h3>
              <p className="text-gray-600 leading-relaxed">
                We richten ons op projecten die langdurige positieve verandering brengen in de levens van mensen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Klaar om het verschil te maken?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10">
              Elke bijdrage, groot of klein, helpt ons om levens te veranderen en gemeenschappen te versterken.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/doneer"
                className="bg-emerald-600 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-lg font-semibold hover:bg-emerald-700 transition text-lg"
              >
                Doneer nu
              </Link>
              <Link
                to="/projecten"
                className="border-2 border-gray-300 text-gray-700 px-8 md:px-10 py-3.5 md:py-4 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition text-lg"
              >
                Bekijk projecten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
