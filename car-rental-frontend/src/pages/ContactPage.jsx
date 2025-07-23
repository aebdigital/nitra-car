import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';
import Slider1 from '../assets/Slider1.jpg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Ďakujeme za vašu správu! Čoskoro sa vám ozveme.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-top flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
        }}
      >
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Spojte sa s nami</h2>
            <p className="text-gray-600 mb-8">
              Máte otázky k našim službám? Potrebujete pomoc s rezerváciou? 
              
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Telefón</h3>
                  <p className="text-gray-600">0910 524 554</p>
                  
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">nitra-car@nitra-car.sk</p>
               
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Adresa</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Novozámocká 138</p>
                    <p>Horné Krškany</p>
                    <p>949 05 Nitra</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Otváracie hodiny</h3>
                  <div className="text-gray-600">
                    <p>Po-Pia: 9-16:00</p>
                    <p>Nedeľa: zatvorené</p>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-8">
              <div className="space-y-4">
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.062433658598!2d18.08462841567864!3d48.31977764240728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c895c5f8e4e8b%3A0x8b12345678901234!2sNovoz%C3%A1mock%C3%A1%20138%2C%20949%2005%20Horn%C3%A9%20Kr%C5%A1kany!5e0!3m2!1ssk!2ssk!4v1647890123456"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5 lg:col-start-8 bg-white rounded-lg shadow-sm px-8 pt-8 pb-6 self-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pošlite nám správu</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaše meno *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Ján Novák"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefónne číslo
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+421 xxx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emailová adresa *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="jan@priklad.sk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Predmet
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Vyberte predmet</option>
                  <option value="booking">Otázka k rezervácii</option>
                  <option value="support">Zákaznícka podpora</option>
                  <option value="feedback">Spätná väzba</option>
                  <option value="other">Iné</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Správa *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Napíšte nám, ako vám môžeme pomôcť..."
                ></textarea>
              </div>

              <Button type="submit" fullWidth>
                Odoslať správu
              </Button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ContactPage; 