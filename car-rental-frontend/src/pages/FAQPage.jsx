import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Slider1 from '../assets/Slider1.jpg';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Aké doklady sú potrebné pri prenájme vozidla?",
      answer: `Fyzická osoba (občan Slovenskej republiky):
• občiansky preukaz
• vodičský preukaz

Fyzická osoba (cudzinec):
• cestovný pas
• vodičský preukaz

Právnická osoba:
• výpis z obchodného registra alebo živnostenský list nie starší ako 3 mesiace
• občiansky a vodičský preukaz osoby, ktorá bude vozidlo užívať
• zmluvu o prenájme vozidla môže podpísať iba konateľ spoločnosti alebo jeho splnomocnenec (potrebné overené splnomocnenie)`
    },
    {
      question: "Aké sú platobné podmienky?",
      answer: `Za prenájom sa platí vopred pri preberaní auta, a to v hotovosti, prevodom na bankový účet alebo kartou online. Hradí sa čiastka za prenájom vozidla a vratná záloha, ktorá sa v plnej výške vráti klientovi pri vrátení nepoškodeného vozidla.

Akceptujeme tieto platobné karty:
• Visa
• Mastercard
• American Express
• Maestro`
    },
    {
      question: "Ako si rezervovať auto?",
      answer: "Auto si môžete rezervovať on-line cez našu stránku, telefonicky prípadne elektronickou poštou."
    },
    {
      question: "Koľko kilometrov je zahrnutých v cene prenájmu?",
      answer: "V cene je zahrnutých 200 km za každý deň prenájmu vozidla (tzn. ak si vozidlo prenajmete na 2 dni tak máte 400 km v cene). Za každý kilometer navyše sa pripočítava 0,13 EUR."
    },
    {
      question: "Sú ceny uvedené na internetovej stránke Nitra-car aktuálne?",
      answer: "Áno, na stránke Nitra-car sú ceny vždy aktuálne a konečné."
    },
    {
      question: "Môžem s vozidlom vycestovať do zahraničia?",
      answer: "S vozidlom môžete cestovať po celej Európe, okrem krajín: Ukrajina, Rumunsko a Albánsko."
    },
    {
      question: "Sú vozidlá Nitra-car poistené?",
      answer: "Naše vozidlá sú plne havarijne a zákonne poistené. V prípade hrubého porušenia predpisov (užitie alkoholu, drog a iných omamných látok) je klient plne zodpovedný za všetky škody spôsobené na prenajatom vozidle."
    },
    {
      question: "Aký je technický stav vozidiel?",
      answer: "Našou prioritou je, aby zákazník dostal vždy vozidlo vo výbornom technickom stave, a preto zabezpečujeme jeho pravidelnú údržbu v autorizovanom servise."
    }
  ];


  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ maxWidth: '90rem' }}>
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-xl"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUpIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="max-w-4xl mx-auto mt-12 bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Ďalšie informácie</h3>
            <p className="text-blue-800 mb-4">
              Stiahnite si zmluvné podmienky <a href="#" className="text-blue-600 underline">tu</a>.
            </p>
            <p className="text-blue-800">
              Ak ste nenašli odpoveď na vašu otázku, radi vám odpovieme telefonicky alebo emailom:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-blue-800 font-semibold">📞 +421 907 633 517</p>
              <p className="text-blue-800 font-semibold">✉️ info@nitracar.sk</p>
            </div>
          </div>
        </section>
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

export default FAQPage;