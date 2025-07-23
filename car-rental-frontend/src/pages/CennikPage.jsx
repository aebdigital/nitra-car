import React from 'react';
import Slider1 from '../assets/Slider1.jpg';
import ScalaImg from '../assets/AUTA/SKODA SCALA ambition/OG-Scala.jpg';
import MonteCarloImg from '../assets/AUTA/SKODA SCALA MonterCarlo/OG-MonteCarlo.jpeg';
import ArkanaImg from '../assets/AUTA/RENAULT ARKANA/OG-Arkana.jpg';
import CorollaImg from '../assets/AUTA/Toyota/OG-Corolla.jpg';
import OctaviaImg from '../assets/AUTA/SKODA OCTAVIA 4/OG-Octavia.png';
import TouranImg from '../assets/AUTA/VOLKSWAGEN TOURAN/OG-Touran.jpg';
import TarracoImg from '../assets/AUTA/SEAT TARRACO/OG-Tarraco.jpg';

const CennikPage = () => {
  const carPricing = [
    {
      name: 'Škoda Scala MonteCarlo AT',
      image: MonteCarloImg,
      prices: {
        '1_day': '70 €',
        '2-3_days': '50 €',
        '4-9_days': '43 €',
        '10-25_days': '34 €',
        '26+_days': '30 €'
      }
    },
    {
      name: 'Škoda Scala Ambition AT',
      image: ScalaImg,
      prices: {
        '1_day': '70 €',
        '2-3_days': '50 €',
        '4-9_days': '43 €',
        '10-25_days': '34 €',
        '26+_days': '30 €'
      }
    },
    {
      name: 'Renault Arkana AT',
      image: ArkanaImg,
      prices: {
        '1_day': '80 €',
        '2-3_days': '60 €',
        '4-9_days': '49 €',
        '10-25_days': '42 €',
        '26+_days': '37 €'
      }
    },
    {
      name: 'Toyota Corolla Sedan AT',
      image: CorollaImg,
      prices: {
        '1_day': '80 €',
        '2-3_days': '55 €',
        '4-9_days': '47 €',
        '10-25_days': '39 €',
        '26+_days': '34 €'
      }
    },
    {
      name: 'Škoda Octavia 4 Combi AT',
      image: OctaviaImg,
      prices: {
        '1_day': '90 €',
        '2-3_days': '60 €',
        '4-9_days': '49 €',
        '10-25_days': '42 €',
        '26+_days': '37 €'
      }
    },
    {
      name: 'Volkswagen Touran AT 7miest',
      image: TouranImg,
      prices: {
        '1_day': '100 €',
        '2-3_days': '70 €',
        '4-9_days': '55 €',
        '10-25_days': '48 €',
        '26+_days': '42 €'
      }
    },
    {
      name: 'Seat Tarraco FR 4WD AT',
      image: TarracoImg,
      prices: {
        '1_day': '200 €',
        '2-3_days': '100€',
        '4-9_days': '75 €',
        '10-25_days': '70 €',
        '26+_days': '60 €'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-top flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
        }}
      >
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: '90rem' }}>
        
        {/* Pricing Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-2 px-6 text-gray-800 font-medium uppercase">AUTO</th>
                  <th className="py-2 px-4 text-gray-800 font-medium text-center uppercase">1 DEŇ</th>
                  <th className="py-2 px-4 text-gray-800 font-medium text-center uppercase">2–3 DNI</th>
                  <th className="py-2 px-4 text-gray-800 font-medium text-center uppercase">4–9 DNI</th>
                  <th className="py-2 px-4 text-gray-800 font-medium text-center uppercase">10–25 DNI</th>
                  <th className="py-2 px-4 text-gray-800 font-medium text-center uppercase">26+ DNI</th>
                  <th className="py-2 px-4 text-gray-800 font-medium text-center uppercase">ZÁLOHA</th>
                </tr>
              </thead>
              <tbody>
                {carPricing.map((car, index) => (
                  <tr key={index} className={`${index === carPricing.length - 1 ? '' : 'border-b border-gray-200'} hover:bg-gray-50 transition-colors`}>
                    <td className="py-2 px-6">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="font-normal text-gray-900">{car.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center font-normal text-gray-900">{car.prices['1_day']}</td>
                    <td className="py-2 px-4 text-center font-normal text-gray-900">{car.prices['2-3_days']}</td>
                    <td className="py-2 px-4 text-center font-normal text-gray-900">{car.prices['4-9_days']}</td>
                    <td className="py-2 px-4 text-center font-normal text-gray-900">{car.prices['10-25_days']}</td>
                    <td className="py-2 px-4 text-center font-normal text-gray-900">{car.prices['26+_days']}</td>
                    <td className="py-2 px-4 text-center font-normal text-gray-900">200 €</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Dôležité informácie</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• V cene je zahrnutých 200 km za každý deň prenájmu</li>
            <li>• Za každý kilometer navyše sa pripočítava 0,13 EUR</li>
            <li>• Ceny sú uvedené vrátane DPH</li>
            <li>• Platba vopred pri preberaní vozidla</li>
            <li>• Vratná záloha sa vyžaduje podľa typu vozidla</li>
          </ul>
        </div>
      </div>
      
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
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
              
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

export default CennikPage;