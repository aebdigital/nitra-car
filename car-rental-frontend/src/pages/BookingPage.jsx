import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import CarImage from '../components/CarImage';
import DatePicker from '../components/DatePicker';
import { carsAPI, bookingAPI, authAPI } from '../services/api';
import Slider1 from '../assets/Slider1.jpg';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCarId = searchParams.get('car');
  
  const [currentStep, setCurrentStep] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  
  // Generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  
  const [formData, setFormData] = useState({
    // Rental details (always visible on right side)
    pickupDate: null,
    returnDate: null,
    pickupTime: '08:00',
    returnTime: '08:00',
    pickupLocation: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'SK'
    },
    returnLocation: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'SK'
    },
    
    // Step 1: Personal Information (for new customers)
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseExpiry: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'SK'
    },
    
    // Step 2: Review & Confirmation
    additionalDrivers: [],
    specialRequests: '',
    gps: false,
    childSeat: false,
    fullInsurance: false
  });

  const steps = [
    { number: 1, title: 'Ponuka vozidiel' },
    { number: 2, title: selectedCar ? `${selectedCar.brand} ${selectedCar.model}` : 'Výber vozidla' },
    { number: 3, title: 'Informácie o zákazníkovi' },
    { number: 4, title: 'Potvrdenie' }
  ];

  // Predefined locations - Slovak locations (Bratislava)
  const locations = [
    {
      name: 'Centrum - Bratislava',
      address: 'Hlavná 123',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '821 08',
      country: 'SK'
    },
    {
      name: 'Letisko - M. R. Štefánika',
      address: 'Letisko M. R. Štefánika',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '823 05',
      country: 'SK'
    },
    {
      name: 'Petržalka - Bratislava',
      address: 'Petržalská 456',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '851 01',
      country: 'SK'
    },
    {
      name: 'Ružinov - Bratislava',
      address: 'Ružinovská 789',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '821 01',
      country: 'SK'
    },
    {
      name: 'Nové Mesto - Bratislava',
      address: 'Nové Mesto 321',
      city: 'Bratislava',
      state: 'Bratislavský kraj',
      postalCode: '831 01',
      country: 'SK'
    }
  ];

  // Load selected car and current user
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Parse URL parameters for pre-filled data
        const pickupDateParam = searchParams.get('pickupDate');
        const returnDateParam = searchParams.get('returnDate');
        const pickupTimeParam = searchParams.get('pickupTime');
        const returnTimeParam = searchParams.get('returnTime');
        const pickupLocationParam = searchParams.get('pickupLocation');
        const returnLocationParam = searchParams.get('returnLocation');
        
        // Load current user if logged in
        const user = await authAPI.getCurrentUser();
        setCurrentUser(user);
        
        // If user is logged in, pre-fill form data
        if (user) {
          setFormData(prev => ({
            ...prev,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
            licenseNumber: user.licenseNumber || '',
            licenseExpiry: user.licenseExpiry ? user.licenseExpiry.split('T')[0] : '',
            address: user.address || prev.address
          }));
        }
        
        // Pre-fill dates, times and locations from URL parameters
        setFormData(prev => ({
          ...prev,
          pickupDate: pickupDateParam ? new Date(pickupDateParam) : prev.pickupDate,
          returnDate: returnDateParam ? new Date(returnDateParam) : prev.returnDate,
          pickupTime: pickupTimeParam || prev.pickupTime,
          returnTime: returnTimeParam || prev.returnTime,
          pickupLocation: pickupLocationParam ? 
            locations.find(loc => loc.name === pickupLocationParam) || { name: pickupLocationParam, address: '', city: 'Bratislava', state: 'Bratislavský kraj', postalCode: '', country: 'SK' } : 
            prev.pickupLocation,
          returnLocation: returnLocationParam ? 
            locations.find(loc => loc.name === returnLocationParam) || { name: returnLocationParam, address: '', city: 'Bratislava', state: 'Bratislavský kraj', postalCode: '', country: 'SK' } : 
            prev.returnLocation,
        }));
        
        // Load selected car
        if (selectedCarId) {
          const car = await carsAPI.getCarDetails(selectedCarId);
          setSelectedCar(car);
          
          // Load initial availability for next 6 months
          const startDate = new Date();
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 6);
          
          try {
            const availability = await carsAPI.getCarAvailability(selectedCarId, startDate, endDate);
            setUnavailableDates(availability.unavailableDates || []);
          } catch (err) {
            console.warn('Nepodarilo sa načítať údaje rezervácie:', err);
            setUnavailableDates([]);
          }
        } else {
          setError('Nebol vybratý žiadny automobil');
        }
      } catch (err) {
        console.error('Chyba pri načítavaní dát:', err);
        setError('Chyba pri načítavaní dát');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCarId, searchParams]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleDateSelect = (field, date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleLocationChange = (locationType, locationIndex) => {
    if (locationIndex === '' || locationIndex < 0) {
      setFormData(prev => ({
        ...prev,
        [locationType]: { name: '', address: '', city: '', state: '', postalCode: '', country: 'SK' }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [locationType]: locations[locationIndex]
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 3) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep3Valid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone && 
           formData.dateOfBirth && formData.licenseNumber && formData.licenseExpiry &&
           formData.address.street && formData.address.city && formData.address.postalCode &&
           formData.pickupDate && formData.returnDate && formData.pickupLocation.name && formData.returnLocation.name;
  };

  const canNavigateToStep = (stepNumber) => {
    if (stepNumber <= 2) return true; // Steps 1 and 2 are already completed
    if (stepNumber === 3) return true; // Can always go to step 3 (current step)
    if (stepNumber === 4) return isStep3Valid(); // Can go to step 4 if step 3 is valid
    return false;
  };

  const goToStep = (stepNumber) => {
    if (canNavigateToStep(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCar || !isStep3Valid()) {
      setError('Prosím vyplňte všetky požadované údaje');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare booking data
      const bookingData = {
        selectedCarId: selectedCarId,
        startDate: formData.pickupDate.toISOString(),
        endDate: formData.returnDate.toISOString(),
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.returnLocation,
        additionalDrivers: formData.additionalDrivers,
        specialRequests: formData.specialRequests
      };

      // Prepare customer data (if new customer)
      const customerData = currentUser ? null : {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
        address: formData.address
      };

      // Complete booking
      const result = await bookingAPI.completeBooking(bookingData, customerData);
      setBookingResult(result);
      setCurrentStep(5); // Go to success step
      
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.message || 'Rezervácia neúspešná. Skúste to prosím znova.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedCar || !formData.pickupDate || !formData.returnDate) return 0;
    const days = Math.ceil((formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24));
    return selectedCar.dailyRate * days;
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    return Math.ceil((formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítavajú sa detaily rezervácie...</p>
        </div>
      </div>
    );
  }

  if (error && !selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chyba rezervácie</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/fleet')}>
            Späť na flotilu
          </Button>
        </div>
      </div>
    );
  }

  // Confirmation step
  if (currentStep === 5 && bookingResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-16">
          {/* Thank You Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Ďakujeme!
            </h1>
          </div>

          {/* Car Summary Container */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            {/* Car Image and Details */}
            {selectedCar && (
              <div className="mb-8">
                <CarImage
                  car={selectedCar}
                  size="large"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="space-y-8">
                  {/* Car Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Objedané vozidlo</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Vozidlo:</strong> {selectedCar.brand} {selectedCar.model} ({selectedCar.year})</p>
                      <p><strong>Kategória:</strong> {selectedCar.category}</p>
                      <p><strong>Dátum prevzatia:</strong> {formData.pickupDate?.toLocaleDateString()}</p>
                      <p><strong>Dátum vrátenia:</strong> {formData.returnDate?.toLocaleDateString()}</p>
                      <p><strong>Miesto prevzatia:</strong> {formData.pickupLocation.name}</p>
                      <p><strong>Miesto vrátenia:</strong> {formData.returnLocation.name}</p>
                      <p><strong>Dni prenájmu:</strong> {calculateDays()} dní</p>
                      <p><strong>Celková cena:</strong> <span className="text-green-600 font-semibold">{calculateTotal() + selectedCar.deposit}€</span></p>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Kontaktné údaje</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Meno:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Telefón:</strong> {formData.phone}</p>
                      <p><strong>Adresa:</strong> {formData.address.street}, {formData.address.city}</p>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Kontaktujeme Vás na mailovej adrese:</strong><br />
                        <span className="font-semibold">{formData.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-top"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
        }}
      >
      </div>

      {/* Progress Steps at Top */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Step circles and connecting lines */}
            <div className="relative mb-6">
              {/* Background connecting line */}
              <div className="absolute top-8 left-8 right-8 h-1 bg-gray-300"></div>
              
              {/* Progress line overlay */}
              <div 
                className="absolute top-8 left-8 h-1 bg-blue-600 transition-all duration-300"
                style={{
                  width: `calc(${((currentStep - 1) / 3) * 100}% - 2rem)`
                }}
              ></div>
              
              {/* Step circles */}
              <div className="relative flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex flex-col items-center">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-lg relative z-10 ${
                        currentStep > step.number 
                          ? 'bg-gradient-to-t from-blue-700 to-blue-400 text-white' 
                          : currentStep === step.number
                          ? 'bg-gradient-to-t from-blue-600 to-blue-300 text-white'
                          : 'bg-gradient-to-t from-gray-400 to-gray-200 text-white'
                      }`}
                      style={{
                        background: currentStep > step.number 
                          ? 'linear-gradient(to top, #1d4ed8, #60a5fa)'
                          : currentStep === step.number
                          ? 'linear-gradient(to top, #2563eb, #93c5fd)'
                          : 'linear-gradient(to top, #9ca3af, #d1d5db)'
                      }}
                    >
                      {currentStep > step.number ? (
                        <CheckIcon className="h-8 w-8 font-bold" />
                      ) : (
                        <span className="font-bold">{step.number}</span>
                      )}
                    </div>
                    {/* Step title directly below each circle */}
                    <p className={`text-sm font-medium mt-3 text-center max-w-[120px] ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Form Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="text-red-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Chyba</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 3: Customer Information */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">
                      Osobné údaje
                    </h2>
                    
                    {currentUser && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                        <p className="text-green-800">Vitajte späť, {currentUser.firstName}! Vaše údaje sú predvyplnené nižšie.</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Meno*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                                              <div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Priezvisko*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Telefónne číslo*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="E-mail*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          placeholder="Číslo občianskeho preukazu*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          placeholder="Rodné číslo (bez lomítka)*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="licenseExpiry"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          placeholder="Číslo vodičského preukazu*"
                          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={!!currentUser}
                        />
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-left">Kontaktné údaje *</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            placeholder="Adresa*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            placeholder="Mesto*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleInputChange}
                            placeholder="Smerovacíe číslo*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            placeholder="Krajina*"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            disabled={!!currentUser}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Document Upload Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-left">Identifikačné údaje</h3>
                      <div className="space-y-3">
                        <div className="border border-gray-300 rounded-lg p-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Občiansky preukaz - predná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                        <div className="border border-gray-300 rounded-lg p-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Občiansky preukaz - zadná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                        <div className="border border-gray-300 rounded-lg p-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Vodičský preukaz - predná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                        <div className="border border-gray-300 rounded-lg p-2 flex justify-between items-center">
                          <div className="text-left">
                            <p className="text-gray-700 text-sm">Vodičský preukaz - zadná strana</p>
                            <p className="text-gray-400 text-xs">Vyberte súbor</p>
                          </div>
                          <span className="text-blue-600 text-sm cursor-pointer hover:text-blue-700">Choose file</span>
                        </div>
                      </div>
                    </div>

                    {/* Agreement Section */}
                    <div className="mt-8">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="businessTerms"
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                          required
                        />
                        <label htmlFor="businessTerms" className="text-gray-900 text-sm text-left">
                          Súhlasím so <span className="text-blue-600 underline">všeobecnými obchodnými podmienkami</span> *
                        </label>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="dataProcessing"
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                            required
                          />
                          <label htmlFor="dataProcessing" className="text-gray-900 text-sm text-left">
                            Súhlasím so <span className="text-blue-600 underline">spracovaním osobných údajov</span> *
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start mt-8">
                      <Button variant="outline" onClick={() => navigate(-1)}>
                        Späť
                      </Button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>

          {/* Right Side - Rental Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky" style={{ top: '140px' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Detaily prenájmu</h3>
              
              {/* Selected Car */}
              {selectedCar && (
                <div className="mb-6">
                  <CarImage
                    car={selectedCar}
                    size="medium"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedCar.brand} {selectedCar.model}</h4>
                    <p className="text-sm text-gray-600 capitalize">{selectedCar.category}</p>
                  </div>
                </div>
              )}

              {/* 6 Select Fields in 3 Rows of 2 Columns */}
              <div className="space-y-4 mb-6">
                {/* Row 1: Location Selects */}
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.pickupLocation.name ? locations.findIndex(loc => loc.name === formData.pickupLocation.name) : ''}
                    onChange={(e) => handleLocationChange('pickupLocation', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Vyberte miesto prevzatia</option>
                    {locations.map((location, index) => (
                      <option key={index} value={index}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.returnLocation.name ? locations.findIndex(loc => loc.name === formData.returnLocation.name) : ''}
                    onChange={(e) => handleLocationChange('returnLocation', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Vyberte miesto vrátenia</option>
                    {locations.map((location, index) => (
                      <option key={index} value={index}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 2: Date Selects */}
                <div className="grid grid-cols-2 gap-4">
                  <DatePicker
                    selectedDate={formData.pickupDate}
                    onDateSelect={(date) => handleDateSelect('pickupDate', date)}
                    minDate={new Date()}
                    unavailableDates={unavailableDates}
                    carId={selectedCarId}
                    className="w-full"
                  />
                  <DatePicker
                    selectedDate={formData.returnDate}
                    onDateSelect={(date) => handleDateSelect('returnDate', date)}
                    minDate={formData.pickupDate ? new Date(formData.pickupDate.getTime() + 86400000) : new Date()}
                    unavailableDates={unavailableDates}
                    carId={selectedCarId}
                    className="w-full"
                  />
                </div>

                {/* Row 3: Time Selects */}
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange({ target: { name: 'pickupTime', value: e.target.value } })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <select
                    value={formData.returnTime}
                    onChange={(e) => handleInputChange({ target: { name: 'returnTime', value: e.target.value } })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing Summary */}
              {selectedCar && formData.pickupDate && formData.returnDate && (
                <div className="border-t pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Denná sadzba:</span>
                      <span className="font-medium">{selectedCar.dailyRate}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Počet dní:</span>
                      <span className="font-medium">{calculateDays()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cena prenájmu:</span>
                      <span className="font-medium">{calculateTotal()}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Depozit:</span>
                      <span className="font-medium">{selectedCar.deposit}€</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Celkom:</span>
                        <span className="text-blue-600">{calculateTotal() + selectedCar.deposit}€</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Button */}
                  {currentStep === 3 && (
                    <div className="mt-6">
                      <Button 
                        type="button" 
                        onClick={handleSubmit}
                        disabled={!isStep3Valid() || loading}
                        fullWidth
                      >
                        {loading ? 'Spracováva sa...' : 'Objednať'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage; 