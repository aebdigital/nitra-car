import Slider1 from '../assets/Slider1.jpg';

const ServicesPage = () => {
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
          <h1 className="text-3xl font-bold text-white">
            Naše služby
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage; 