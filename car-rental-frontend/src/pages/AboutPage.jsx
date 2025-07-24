import React from 'react';
import { CheckIcon, ShieldCheckIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import Slider1 from '../assets/Slider1.jpg';
import AboutImage from '../assets/ABOUT-.webp';

const AboutPage = () => {
  const stats = [
    { label: 'Rokov skúseností', value: '20' },
    { label: 'Úspešných prenájmov', value: '3000' },
    { label: 'Spokojných zákazníkov', value: '1000' },
    { label: 'Spokojnosť', value: '100%' },
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Spoľahlivosť',
      description: 'Naše vozidlá udržujeme v najvyššom štandarde a poskytujeme 24/7 pomoc na ceste.'
    },
    {
      icon: StarIcon,
      title: 'Kvalitné služby',
      description: 'Náš tím sa venuje poskytovaniu výnimočných služieb zákazníkom a personalizovanej pozornosti.'
    },
    {
      icon: ClockIcon,
      title: 'Pohodlie',
      description: 'Jednoduché rezervácie, flexibilné miesta prevzatia a bezproblémový proces prenájmu.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-top flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
        }}
      >
      </div>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Náš príbeh</h2>
              <p className="text-gray-600 mb-6">
                Spoločnosť Nitra-Car vznikla v roku 2006. Špecializujeme sa na dlhodobejšie prenájmy vozidiel, 
                pričom spolupracujeme tak s firmami ako i so súkromnými osobami.
              </p>
              <p className="text-gray-600 mb-6">
                Od svojej existencie sme už prepravili desiatky zákazníkov, ktorí sa k nám radi vracajú späť.
              </p>
              <p className="text-gray-600 mb-6">
                Našou vizitkou sú spoľahlivé autá, rýchle jednanie so zákazníkmi a starostlivosť o zákazníka.
              </p>
              <p className="text-gray-600">
                Staňte sa aj vy jedným z našich spokojných zákazníkov, ktorý sa bezpečne a s úsmevom dopraví do svojho cieľa.
              </p>
            </div>
            <div>
              <img
                src={AboutImage}
                alt="Kancelária autopožičovne"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews - Continuous Slider */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recenzie z Google
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-yellow-400 text-xl mr-2">
                {'★'.repeat(5)}
              </div>
              <span className="text-lg font-semibold text-gray-700">4.8</span>
              <span className="text-gray-500 ml-2">(47 recenzií)</span>
            </div>
          </div>

          {/* Slider Container */}
          <div className="relative overflow-hidden">
            {/* Fade gradients on sides */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/60 sm:via-white/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/60 sm:via-white/90 to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling container */}
            <div className="flex animate-scroll space-x-6 bg-white" style={{ width: 'calc(300px * 16)' }}>
              {/* Duplicate reviews for seamless loop */}
              {[...Array(2)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        M
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Marek Svoboda</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Výborné služby, profesionálny prístup a kvalitné vozidlá. Odporúčam všetkým, ktorí hľadajú spoľahlivú autopožičovňu v regióne."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 2 týždňami</p>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Anna Kováčová</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Rýchle vybavenie, čisté vozidlá a férové ceny. Už niekoľkokrát som si tu požičala auto a vždy som bola spokojná."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 1 mesiacom</p>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        P
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Peter Novák</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(4)}
                          <span className="text-gray-300">★</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Dobrá komunikácia a flexibilita. Auto bolo v perfektnom stave. Určite sa vrátim."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 3 týždňami</p>
                  </div>
                  
                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        L
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Lucia Hrubá</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Skvelý servis! Personál je veľmi ochotný a pomôže s čímkoľvek. Vozidlá sú moderne a udržiavané."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 5 dňami</p>
                  </div>
                  
                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        J
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Ján Moravčík</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Najlepšia autopožičovňa v okolí. Vždy majú dostupné vozidlá a ceny sú konkurencieschopné."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 1 týždňom</p>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        M
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Miroslav Baláž</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(4)}
                          <span className="text-gray-300">★</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Veľmi spokojný s kvalitou služieb. Odporúčam pre biznis aj súkromné účely."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 2 mesiacmi</p>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        K
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Katarína Novotná</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Perfektná komunikácia, auto pripravené presne na čas. Ceny sú výhodné a servis na vysokej úrovni."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 4 dňami</p>
                  </div>
                  
                  <div className="bg-white shadow-md rounded-lg p-6 flex-shrink-0" style={{ width: '280px' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        R
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800">Richard Horváth</p>
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Už tretíkrát si tu požičiavam auto a vždy som maximálne spokojný. Čisté vozidlá, profesionálny prístup."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">pred 1 týždňom</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJjWxy0Q1VUUYRTT1jajF5EhQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Zanechajte nám recenziu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 