import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BoltIcon, 
  GlobeAltIcon, 
  CogIcon, 
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import CarImage from '../components/CarImage';
import DatePicker from '../components/DatePicker';
import { carsAPI } from '../services/api';
import Slider1 from '../assets/Slider1.jpg';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: null,
    returnDate: null,
    pickupTime: '08:00',
    returnTime: '08:00',
    allowedKm: 200,
    kmPackage: null
  });

  const locations = [
    'Centrum - Bratislava',
    'Letisko - M. R. Štefánika',
    'Petržalka - Bratislava',
    'Ružinov - Bratislava',
    'Nové Mesto - Bratislava'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const carData = await carsAPI.getCarDetails(id);
        setCar(carData);
        
        // Load availability
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 6);
        
        try {
          const availability = await carsAPI.getCarAvailability(id, startDate, endDate);
          setUnavailableDates(availability.unavailableDates || []);
        } catch (err) {
          console.warn('Could not load availability:', err);
        }
      } catch (err) {
        setError('Nepodarilo sa načítať detaily vozidla');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCarDetails();
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKmPackageChange = (packageValue) => {
    setBookingData(prev => ({
      ...prev,
      kmPackage: prev.kmPackage === packageValue ? null : packageValue
    }));
  };

  const calculatePrice = () => {
    if (!car || !bookingData.pickupDate || !bookingData.returnDate) return 0;
    const days = Math.ceil((bookingData.returnDate - bookingData.pickupDate) / (1000 * 60 * 60 * 24));
    return car.dailyRate * days;
  };

  const getKmPackagePrice = () => {
    if (!bookingData.kmPackage) return 0;
    switch (bookingData.kmPackage) {
      case '500': return 65;
      case '1000': return 120;
      case '2000': return 200;
      default: return 0;
    }
  };

  const getDeposit = () => {
    if (!car) return 0;
    return car.deposit || 1000;
  };

  const handleBookNow = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate || !bookingData.pickupLocation || !bookingData.returnLocation) {
      alert('Prosím vyplňte všetky požadované údaje rezervácie');
      return;
    }
    
    const queryParams = new URLSearchParams({
      car: id,
      pickupDate: bookingData.pickupDate.toISOString().split('T')[0],
      returnDate: bookingData.returnDate.toISOString().split('T')[0],
      pickupLocation: bookingData.pickupLocation,
      returnLocation: bookingData.returnLocation
    });
    
    navigate(`/booking?${queryParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mini Hero Section */}
        <div 
          className="relative h-[20vh] bg-cover bg-top flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
          </div>
        </div>

        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Načítavajú sa detaily vozidla...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mini Hero Section */}
        <div 
          className="relative h-[20vh] bg-cover bg-top flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
          </div>
        </div>

        <div className="flex items-center justify-center py-24">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Vozidlo sa nenašlo</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => navigate('/fleet')}>
              Späť na flotilu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[15vh] bg-cover bg-top flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Slider1})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2">
            {/* Car Header */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-xl text-gray-600 mb-4 capitalize">{car.category}</p>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-1">
                  <BoltIcon className="h-5 w-5" />
                  <span>110 kW</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GlobeAltIcon className="h-5 w-5" />
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CogIcon className="h-5 w-5" />
                  <span>5 l/100km</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="h-5 w-5" />
                  <span>{car.transmission}</span>
                </div>
              </div>
            </div>

            {/* Car Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              {car.status === 'available' && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    Dostupné na prenájom
                  </span>
                </div>
              )}
              <CarImage
                car={car}
                size="large"
                className="w-full h-96 object-cover"
                fallbackClass="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-500"
              />
            </div>


            {/* Car Specifications */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Špecifikácie vozidla</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-gray-500 text-sm font-medium">Rok</div>
                  <div className="text-lg font-semibold text-gray-900">{car.year}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm font-medium">Sedadlá</div>
                  <div className="text-lg font-semibold text-gray-900">{car.seats}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm font-medium">Prevodovka</div>
                  <div className="text-lg font-semibold text-gray-900">{car.transmission === 'manual' ? 'Manuálna' : car.transmission === 'automatic' ? 'Automatická' : car.transmission}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm font-medium">Typ paliva</div>
                  <div className="text-lg font-semibold text-gray-900">{car.fuelType === 'petrol' ? 'Benzín' : car.fuelType === 'diesel' ? 'Diesel' : car.fuelType === 'electric' ? 'Elektrické' : car.fuelType === 'hybrid' ? 'Hybrid' : car.fuelType}</div>
                </div>
                {car.mileage && (
                  <div>
                    <div className="text-gray-500 text-sm font-medium">Najazdené</div>
                    <div className="text-lg font-semibold text-gray-900">{car.mileage?.toLocaleString()} km</div>
                  </div>
                )}
                {car.doors && (
                  <div>
                    <div className="text-gray-500 text-sm font-medium">Dvere</div>
                    <div className="text-lg font-semibold text-gray-900">{car.doors}</div>
                  </div>
                )}
                {car.color && (
                  <div>
                    <div className="text-gray-500 text-sm font-medium">Farba</div>
                    <div className="text-lg font-semibold text-gray-900 capitalize">{car.color}</div>
                  </div>
                )}
                <div>
                  <div className="text-gray-500 text-sm font-medium">Denná sadzba</div>
                  <div className="text-lg font-semibold text-primary">{car.dailyRate}€</div>
                </div>
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vybavenie a funkcie</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-gray-700 capitalize">{feature.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg border sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rezervovať toto vozidlo</h2>
              
              <div className="space-y-4">
                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />
                    Miesto prevzatia
                  </label>
                  <select
                    value={bookingData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Vyberte miesto prevzatia</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Return Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />
                    Miesto vrátenia
                  </label>
                  <select
                    value={bookingData.returnLocation}
                    onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Vyberte miesto vrátenia</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                      Dátum prevzatia
                    </label>
                    <DatePicker
                      selectedDate={bookingData.pickupDate}
                      onDateSelect={(date) => handleInputChange('pickupDate', date)}
                      minDate={new Date()}
                      unavailableDates={unavailableDates}
                      carId={id}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                      Dátum vrátenia
                    </label>
                    <DatePicker
                      selectedDate={bookingData.returnDate}
                      onDateSelect={(date) => handleInputChange('returnDate', date)}
                      minDate={bookingData.pickupDate ? new Date(bookingData.pickupDate.getTime() + 86400000) : new Date()}
                      unavailableDates={unavailableDates}
                      carId={id}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Čas prevzatia
                    </label>
                    <select
                      value={bookingData.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Čas vrátenia
                    </label>
                    <select
                      value={bookingData.returnTime}
                      onChange={(e) => handleInputChange('returnTime', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3 border">
                  <h4 className="font-semibold text-gray-900">Cenové detaily</h4>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Povolené kilometre:</span>
                    <span className="font-semibold text-gray-900">{bookingData.allowedKm + (bookingData.kmPackage ? parseInt(bookingData.kmPackage) : 0)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cena prenájmu:</span>
                    <span className="font-semibold text-primary text-lg">{calculatePrice().toFixed(2)}€</span>
                  </div>
                  {bookingData.kmPackage && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Balík kilometrov:</span>
                      <span className="font-semibold text-gray-900">{getKmPackagePrice()}€</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-900 font-semibold">Celková cena:</span>
                    <span className="font-semibold text-primary text-lg">{(calculatePrice() + getKmPackagePrice()).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cena za nadmerný km:</span>
                    <span className="font-semibold text-gray-900">0,15€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Depozit:</span>
                    <span className="font-semibold text-gray-900">{getDeposit().toFixed(2)}€</span>
                  </div>
                </div>

                {/* Kilometer Packages */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Ponúkame výhodné balíčky na kilometre navyše</h4>
                    
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="kmPackage"
                            value="500"
                            checked={bookingData.kmPackage === '500'}
                            onChange={() => handleKmPackageChange('500')}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">500km balík za 65 EUR</span>
                        </div>
                        <span className="text-sm text-gray-500">1 ks.</span>
                      </label>
                      
                      <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="kmPackage"
                            value="1000"
                            checked={bookingData.kmPackage === '1000'}
                            onChange={() => handleKmPackageChange('1000')}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">1000km balík za 120 EUR</span>
                        </div>
                        <span className="text-sm text-gray-500">1 ks.</span>
                      </label>
                      
                      <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name="kmPackage"
                            value="2000"
                            checked={bookingData.kmPackage === '2000'}
                            onChange={() => handleKmPackageChange('2000')}
                            className="text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">2000km balík za 200 EUR</span>
                        </div>
                        <span className="text-sm text-gray-500">1 ks.</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  onClick={handleBookNow}
                  fullWidth
                  className="mt-6"
                  disabled={car.status !== 'available'}
                >
                  {car.status === 'available' ? 'Rezervovať teraz' : 'Momentálne nedostupné'}
                </Button>
              </div>
            </div>
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
    </div>
  );
};

export default CarDetailsPage; 