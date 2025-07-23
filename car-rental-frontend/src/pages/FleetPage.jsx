import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  StarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { carsAPI } from '../services/api';
import Slider1 from '../assets/Slider1.jpg';

const FleetPage = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    priceRange: 'all',
    transmission: 'all',
    fuelType: 'all',
    sortBy: 'price-asc'
  });


  // Load cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const carsData = await carsAPI.getAvailableCars();
        setCars(carsData);
        setFilteredCars(carsData);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setError('Failed to load cars. Please try again later.');
        setCars([]);
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...cars];


    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(car => car.dailyRate >= min && car.dailyRate <= max);
      } else {
        filtered = filtered.filter(car => car.dailyRate >= min);
      }
    }

    // Transmission filter
    if (filters.transmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Fuel type filter  
    if (filters.fuelType !== 'all') {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.dailyRate - b.dailyRate;
        case 'price-desc':
          return b.dailyRate - a.dailyRate;
        case 'seats-asc':
          return a.seats - b.seats;
        case 'seats-desc':
          return b.seats - a.seats;
        default:
          return 0;
      }
    });

    setFilteredCars(filtered);
  }, [cars, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítavajú sa vozidlá...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chyba pri načítaní vozidiel</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Skúsiť znova
          </button>
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

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '90rem' }}>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar with Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <div className="flex items-center gap-2 mb-6">
                <FunnelIcon className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filtre</h3>
              </div>


              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Cenové rozpätie</h4>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Všetky ceny</option>
                  <option value="0-40">Do 40€</option>
                  <option value="40-60">40€ - 60€</option>
                  <option value="60-80">60€ - 80€</option>
                  <option value="80-999">Nad 80€</option>
                </select>
              </div>

              {/* Transmission */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Prevodovka</h4>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Všetky</option>
                  <option value="automatic">Automatická</option>
                  <option value="manual">Manuálna</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Palivo</h4>
                <select
                  value={filters.fuelType}
                  onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Všetky</option>
                  <option value="petrol">Benzín</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Zoradiť podľa</h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="price-asc">Cena (od najnižšej)</option>
                  <option value="price-desc">Cena (od najvyššej)</option>
                  <option value="seats-asc">Počet miest (od najmenej)</option>
                  <option value="seats-desc">Počet miest (od najviac)</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  priceRange: 'all',
                  transmission: 'all',
                  fuelType: 'all',
                  sortBy: 'price-asc'
                })}
                className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Vymazať filtre
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Naša flotila
              </h1>
            </div>

            {/* Cars Grid */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Žiadne vozidlá neboli nájdené pre zadané kritériá.</p>
                <button
                  onClick={() => setFilters({
                    priceRange: 'all',
                    transmission: 'all',
                    fuelType: 'all',
                    sortBy: 'price-asc'
                  })}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Vymazať filtre
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Link key={car._id} to={`/car/${car._id}`} className="block">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                      {/* Car Image */}
                      <div className="h-48 bg-gray-200">
                        <img
                          src={car.images?.[0]?.url || '/placeholder-car.jpg'}
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
                            <p className="text-sm text-gray-500 capitalize">
                              {car.category === 'ekonomicka' ? 'Ekonomická' : 
                               car.category === 'stredna' ? 'Stredná trieda' :
                               car.category === 'vyssia' ? 'Vyššia trieda' :
                               car.category === 'viacmiestne' ? 'Viacmiestne' : car.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-black">{car.dailyRate}€</p>
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default FleetPage;