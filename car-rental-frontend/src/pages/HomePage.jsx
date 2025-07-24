import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  PaperAirplaneIcon,
  MapIcon,
  GlobeAltIcon,
  UsersIcon,
  CogIcon,
  BoltIcon,
  FireIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  PhoneArrowUpRightIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import CarCard from '../components/CarCard';
import { carsAPI } from '../services/api';
import Slider1 from '../assets/Slider1.jpg';
import Slider2 from '../assets/Slider2.jpg';
import Slider3 from '../assets/Slider3.jpg';

const HomePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carType, setCarType] = useState('');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Slider images
  const sliderImages = [Slider1, Slider2, Slider3];

  // Reviews data
  const reviews = [
    {
      text: "Výborné služby, profesionálny prístup a kvalitné vozidlá. Odporúčam všetkým!",
      author: "Marek S."
    },
    {
      text: "Rýchle vybavenie, čisté vozidlá a férové ceny. Už niekoľkokrát som si tu požičala auto.",
      author: "Anna K."
    },
    {
      text: "Dobrá komunikácia a flexibilita. Auto bolo v perfektnom stave. Určite sa vrátim.",
      author: "Peter N."
    },
    {
      text: "Skvelý servis! Personál je veľmi ochotný a pomôže s čímkoľvek. Vozidlá sú moderne.",
      author: "Lucia H."
    }
  ];

  // Rotate reviews every 4 seconds
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);
    
    return () => clearInterval(reviewInterval);
  }, [reviews.length]);

  // Rotate slider images every 5 seconds
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    
    return () => clearInterval(sliderInterval);
  }, [sliderImages.length]);

  // Popular cars data (4 selected cars from current fleet)
  const popularCars = [
    {
      _id: 'sca1',
      brand: 'Škoda',
      model: 'Scala Ambition AT',
      image: '/src/assets/AUTA/SKODA SCALA ambition/OG-Scala.jpg',
      price: 35,
      seats: 5,
      transmission: 'automatic',
      fuelType: 'benzín',
      doors: 4,
      power: '110kW',
      fuel: '5.2L/100km'
    },
    {
      _id: 'cor1',
      brand: 'Toyota',
      model: 'Corolla AT',
      image: '/src/assets/AUTA/Toyota/OG-Corolla.jpg',
      price: 38,
      seats: 5,
      transmission: 'automatic',
      fuelType: 'benzín',
      doors: 4,
      power: '125kW',
      fuel: '5.8L/100km'
    },
    {
      _id: 'ark1',
      brand: 'Renault',
      model: 'Arkana AT',
      image: '/src/assets/AUTA/RENAULT ARKANA/OG-Arkana.jpg',
      price: 45,
      seats: 5,
      transmission: 'automatic',
      fuelType: 'benzín',
      doors: 4,
      power: '140kW',
      fuel: '6.1L/100km'
    },
    {
      _id: 'tou1',
      brand: 'Volkswagen',
      model: 'Touran Highline AT, 7 miestne',
      image: '/src/assets/AUTA/VOLKSWAGEN TOURAN/OG-Touran.jpg',
      price: 65,
      seats: 7,
      transmission: 'automatic',
      fuelType: 'diesel',
      doors: 4,
      power: '110kW',
      fuel: '5.8L/100km'
    }
  ];


  // Load cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch cars from backend API
        const carsData = await carsAPI.getAvailableCars();
        setCars(carsData);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setError('Failed to load cars. Please try again later.');
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Map homepage category names to FleetPage filter values
  const getCategoryFilterValue = (categoryName) => {
    const categoryMap = {
      'EKONOMICKÉ': 'ekonomicka',
      'EKONOMICKÁ': 'ekonomicka',
      'STREDNÁ TRIEDA': 'stredna',
      'STREDNÁ': 'stredna', 
      'VYŠŠIA TRIEDA': 'vyssia',
      'VYŠŠIA': 'vyssia',
      'VIACMIESTNE': 'viacmiestne',
      'ÚŽITKOVÉ': 'uzitkove',
      'MOTOCYKLE': 'motorky',
      'KARAVANY': 'karavany',
      'ŠPORTOVÉ': 'sportove'
    };
    return categoryMap[categoryName] || '';
  };

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    const categoryValue = getCategoryFilterValue(categoryName);
    if (categoryValue) {
      window.location.href = `/fleet?category=${categoryValue}`;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (startDate) params.append('pickupDate', startDate);
    if (endDate) params.append('returnDate', endDate);
    if (carType) params.append('category', carType);
    window.location.href = `/fleet?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          {/* Slider Images */}
          {sliderImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>

        
        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-start pt-36 pb-12 lg:pt-20 lg:pb-16" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
          <div className="w-full max-w-2xl lg:max-w-2xl px-2 lg:px-4">
            {/* Liquid Glass Search Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20 ring-1 ring-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center drop-shadow-lg">Nájdite si perfektné auto</h2>
              
              <form onSubmit={handleSearchSubmit} className="space-y-4 sm:space-y-6">
                {/* Date and Time Section */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Pickup Date and Time */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs sm:text-sm font-medium text-white/90 mb-1 sm:mb-2 drop-shadow-sm">
                        Dátum vyzdvihnutia
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 backdrop-blur-md text-white text-sm"
                      />
                    </div>
                    <div className="w-28 sm:w-32">
                      <label className="block text-xs sm:text-sm font-medium text-white/90 mb-1 sm:mb-2 drop-shadow-sm">
                        Čas
                      </label>
                      <select
                        className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 backdrop-blur-md text-white text-sm"
                      >
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Return Date and Time */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs sm:text-sm font-medium text-white/90 mb-1 sm:mb-2 drop-shadow-sm">
                        Dátum vrátenia
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 backdrop-blur-md text-white text-sm"
                      />
                    </div>
                    <div className="w-28 sm:w-32">
                      <label className="block text-xs sm:text-sm font-medium text-white/90 mb-1 sm:mb-2 drop-shadow-sm">
                        Čas
                      </label>
                      <select
                        className="w-full px-2 sm:px-3 py-2 sm:py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 backdrop-blur-md text-white text-sm"
                      >
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Services Checkboxes */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xs sm:text-sm font-medium text-white/90 mb-2 sm:mb-3 drop-shadow-sm">Doplnkové služby</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border border-white/30 bg-white/20 text-white focus:ring-white/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/90">Chladnička</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border border-white/30 bg-white/20 text-white focus:ring-white/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/90">Osobný šofér</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border border-white/30 bg-white/20 text-white focus:ring-white/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/90">Pristavenie v Bratislave</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border border-white/30 bg-white/20 text-white focus:ring-white/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/90">Pristavenie v Nitre</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border border-white/30 bg-white/20 text-white focus:ring-white/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/90">Pristavenie v okolí Bratislavy</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border border-white/30 bg-white/20 text-white focus:ring-white/50 focus:ring-2"
                      />
                      <span className="text-sm text-white/90">Pristavenie v okolí Nitry</span>
                    </label>
                  </div>
                </div>
                
                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg mt-4 sm:mt-6 hover:shadow-xl"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Hľadať autá</span>
                </button>
              </form>
            </div>
          </div>
          
          {/* Reviews Section - Under form on mobile, right side on desktop */}
          <div className="lg:absolute lg:bottom-0 lg:right-0 lg:z-20 mt-4 lg:mt-0" style={{ bottom: '10%', right: '10%' }}>
            {/* Headings - Outside the box, side by side */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 mb-4 lg:justify-end space-y-2 sm:space-y-0">
              <h3 className="text-sm sm:text-lg font-bold text-white drop-shadow-lg text-center sm:text-left lg:whitespace-nowrap">
                1000+ spokojných zákazníkov
              </h3>
              
            
            </div>
            
            {/* Review Container */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 ring-1 ring-white/10 max-w-sm mx-auto lg:mx-0">
              {/* Review Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="flex text-yellow-300 text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-white/80 text-sm">4.8/5</span>
                </div>
                
                <div className="text-white/90 text-sm min-h-[60px] text-center lg:text-left">
                  <p className="italic transition-all duration-500">
                    "{reviews[currentReviewIndex].text}"
                  </p>
                  <p className="text-white/70 text-xs mt-2 transition-all duration-500">
                    - {reviews[currentReviewIndex].author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="pt-16 pb-16 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Obľúbené autá</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCars.map((car) => (
              <Link key={car._id} to={`/car/${car._id}`} className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  {/* Car Image */}
                  <div className="h-48 bg-gray-200">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Car Details */}
                  <div className="p-4">
                    {/* Header with Price */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-sm text-gray-500">Ekonomická</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-black">{car.price}€</p>
                        <div className="flex items-center space-x-1">
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View All Cars Button */}
          <div className="text-center mt-8">
            <Link
              to="/fleet"
              className="inline-flex items-center px-8 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Všetky autá
            </Link>
          </div>
        </div>
      </section>

  

      {/* Services Section - Dark Blue with Blurred White Boxes */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: '90rem' }}>
          {/* Header section with blue heading on top, then white heading aligned with paragraph */}
          <div className="mb-12">
            {/* Blue heading on its own row */}
            <p className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-4">NAŠE VÝHODY</p>
            
            {/* White heading and paragraph aligned on same level */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left side - Big white heading */}
              <div className="flex-1">
                <h2 className="text-5xl font-bold text-white">Prečo práve my?</h2>
              </div>
              
              {/* Right side - Description paragraph */}
              <div className="flex-1 lg:max-w-md">
                <p className="text-gray-300 text-sm leading-relaxed">
                  S našimi službami získavate nie len kvalitné vozidlo, ale aj kompletný servis a podporu. 
                  Naša filozofia je založená na spoľahlivosti, transparentnosti a maximálnej starostlivosti o každého klienta.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <MapIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  DIALNIČNÁ ZNÁMKA
                </h3>
                <p className="text-white/90 text-sm">
                  Všetky naše vozidlá sú vybavené platnou slovenskou diaľničnou známkou, a pokiaľ plánujete cestu do zahraničia, postaráme sa aj o zahraničnú známku.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <TruckIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  VÝMENA VOZIDLA
                </h3>
                <p className="text-white/90 text-sm">
                  V prípade potreby okamžite zabezpečíme náhradné vozidlo, aby ste neprišli o pohodlie a nezmeškali žiadne plány.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <CogIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  SEZÓNNE PREZUTIE
                </h3>
                <p className="text-white/90 text-sm">
                  Naša flotila je vybavená kvalitnými značkovými pneumatikami, ktoré pravidelne meníme v súlade s ročnými obdobiami.
                </p>
              </div>
            </div>

            {/* Service 4 - Aligned to left */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 md:col-start-1">
              <div className="flex flex-col items-start text-left">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <WrenchScrewdriverIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  PRAVIDELNÝ SERVIS
                </h3>
                <p className="text-white/90 text-sm">
                  Všetky naše vozidlá prechádzajú pravidelnými kontrolami a autorizovaným servisom pre maximálnu spoľahlivosť.
                </p>
              </div>
            </div>
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

export default HomePage; 