import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Users, Gift, ArrowRight } from 'lucide-react';
import headerImage from "../assets/headerPic1.png"

function Home() {
  const { t } = useTranslation();

  return (
    <div className="pt-28 md:pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
              {t('home.hero.title')} <span className="text-emerald-600">{t('home.hero.titleHighlight')}</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/over-ons"
                className="bg-emerald-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2"
              >
                {t('home.hero.learnMore')}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/doneer"
                className="bg-white border-2 border-emerald-600 text-emerald-600 px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold hover:bg-emerald-50 transition text-center"
              >
                {t('home.hero.donateNow')}
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
              <div className="text-emerald-100 text-sm md:text-base font-medium">{t('home.stats.projects')}</div>
            </div>
            <div className="p-4 md:p-8">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2">15+</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">{t('home.stats.yearsActive')}</div>
            </div>
            <div className="p-4 md:p-8">
              <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-2">100%</div>
              <div className="text-emerald-100 text-sm md:text-base font-medium">{t('home.stats.transparent')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-medium tracking-wider text-emerald-600 uppercase mb-3">
              {t('home.why.subtitle')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('home.why.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.why.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">{t('home.why.community.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.why.community.description')}
              </p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">{t('home.why.transparent.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.why.transparent.description')}
              </p>
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                <Gift className="text-white" size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">{t('home.why.impact.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.why.impact.description')}
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
              {t('home.cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/doneer"
                className="bg-emerald-600 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-lg font-semibold hover:bg-emerald-700 transition text-lg"
              >
                {t('home.cta.donateNow')}
              </Link>
              <Link
                to="/projecten"
                className="border-2 border-gray-300 text-gray-700 px-8 md:px-10 py-3.5 md:py-4 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition text-lg"
              >
                {t('home.cta.viewProjects')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
