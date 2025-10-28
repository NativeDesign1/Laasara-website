import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Gift, ArrowRight } from 'lucide-react';
import headerImage from "../assets/headerPic1.png"

function Home() {
  return (
    <div className="pt-32">
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl font-bold text-gray-800 mb-8 leading-tight">
              Samen maken we het <span className="text-emerald-600">verschil</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Stichting Laassara zet zich in om het dorp Laassara en haar bewoners te helpen.
              De stichting is opgericht door een groep mensen die zich betrokken voelen bij de
              gemeenschap en zich willen inzetten om de levensomstandigheden van de mensen te verbeteren.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/over-ons"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition inline-flex items-center gap-2"
              >
                Lees meer over ons
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/doneer"
                className="bg-white border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition"
              >
                Doneer nu
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl opacity-20"></div>
            <img
              src={headerImage}
              alt="Laassara Foundation"
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-500 to-cyan-500 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-2xl">
              <div className="text-6xl font-bold mb-3">15+</div>
              <div className="text-emerald-100 font-medium text-lg">Projecten</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-2xl">
              <div className="text-6xl font-bold mb-3">15+</div>
              <div className="text-cyan-100 font-medium text-lg">Jaren</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-2xl">
              <div className="text-6xl font-bold mb-3">15+</div>
              <div className="text-teal-100 font-medium text-lg">Actief Gepland</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Waarom <span className="text-emerald-600">Laassara Foundation</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We geloven in het creëren van duurzame impact door middel van onderwijs, ontwikkeling en gemeenschapsondersteuning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group">
              <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Heart className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Gemeenschap eerst</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We luisteren naar de behoeften van de lokale gemeenschap en werken samen aan oplossingen die echt verschil maken.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl hover:shadow-xl transition h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Users className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Transparant & Eerlijk</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Volledige transparantie in hoe we donaties besteden. Elk project wordt gedocumenteerd en gerapporteerd.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Gift className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Duurzame impact</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We richten ons op projecten die langdurige positieve verandering brengen in de levens van mensen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-emerald-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Klaar om het verschil te maken?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Elke bijdrage, groot of klein, helpt ons om levens te veranderen en gemeenschappen te versterken.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/doneer"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition text-lg"
              >
                Doneer nu
              </Link>
              <Link
                to="/projecten"
                className="bg-white border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-lg font-semibold hover:border-emerald-500 hover:text-emerald-600 transition text-lg"
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
