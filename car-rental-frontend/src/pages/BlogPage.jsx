import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, EyeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Slider1 from '../assets/Slider1.jpg';
import Slider2 from '../assets/Slider2.jpg';
import Slider3 from '../assets/Slider3.jpg';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Hero images array for random selection
  const heroImages = [Slider1, Slider2, Slider3];
  
  // Function to get random hero image
  const getRandomHeroImage = (id) => {
    return heroImages[id % heroImages.length];
  };

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Tipy na prenájom auta na dovolenku',
      excerpt: 'Plánujete dovolenku a potrebujete prenajať si auto? Prečítajte si naše užitočné tipy pre bezproblémový prenájom.',
      category: 'tipy',
      author: 'Marek Svoboda',
      date: '2025-01-15',
      views: 1250,
      readTime: '5 min',
      image: getRandomHeroImage(1),
      featured: true
    },
    {
      id: 2,
      title: 'Ako si vybrať správne auto pre vašu potrebu',
      excerpt: 'Ekonomické, stredná trieda alebo prémiové vozidlo? Pomôžeme vám vybrať to pravé auto pre vašu situáciu.',
      category: 'novinky',
      author: 'Anna Kováčová',
      date: '2025-01-12',
      views: 980,
      readTime: '7 min',
      image: getRandomHeroImage(2),
      featured: false
    },
    {
      id: 3,
      title: 'Nové vozidlá vo flotile - Škoda Scala a Toyota Corolla',
      excerpt: 'Do našej flotily sme pridali nové moderné vozidlá s najnovšími technológiami a vylepšeným komfortom.',
      category: 'novinky',
      author: 'Peter Novák',
      date: '2025-01-10',
      views: 1450,
      readTime: '4 min',
      image: getRandomHeroImage(3),
      featured: false
    },
    {
      id: 4,
      title: 'Bezpečnosť na cestách počas zimy',
      excerpt: 'Dôležité bezpečnostné opatrenia pri jazde v zimných podmienkach. Všetko o zimných pneumatikách a príprave vozidla.',
      category: 'bezpecnost',
      author: 'Lucia Hrubá',
      date: '2025-01-08',
      views: 890,
      readTime: '6 min',
      image: getRandomHeroImage(4),
      featured: false
    },
    {
      id: 5,
      title: 'Cenové akcie na prenájom na dlhšie obdobie',
      excerpt: 'Špeciálne zľavy pre dlhodobý prenájom vozidiel. Ušetrite až 30% pri prenájme na mesiac a viac.',
      category: 'akcie',
      author: 'Ján Moravčík',
      date: '2025-01-05',
      views: 2100,
      readTime: '3 min',
      image: getRandomHeroImage(5),
      featured: true
    },
    {
      id: 6,
      title: 'Ako správne skontrolovať auto pred použitím',
      excerpt: 'Praktický návod na kontrolu vozidla pred jeho prevzatím. Čo si overiť a na čo si dať pozor.',
      category: 'tipy',
      author: 'Miroslav Baláž',
      date: '2025-01-03',
      views: 1320,
      readTime: '8 min',
      image: getRandomHeroImage(6),
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Všetky články', count: blogPosts.length },
    { id: 'novinky', name: 'Novinky', count: blogPosts.filter(post => post.category === 'novinky').length },
    { id: 'tipy', name: 'Tipy a rady', count: blogPosts.filter(post => post.category === 'tipy').length },
    { id: 'akcie', name: 'Akcie a zľavy', count: blogPosts.filter(post => post.category === 'akcie').length },
    { id: 'bezpecnost', name: 'Bezpečnosť', count: blogPosts.filter(post => post.category === 'bezpecnost').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-top"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${Slider1})`
        }}
      >
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '90rem' }}>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar with Categories */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategórie</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex justify-between items-center group ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            
            {/* Featured Posts */}
            {selectedCategory === 'all' && featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Odporúčané články</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="group">
                      <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {categories.find(cat => cat.id === post.category)?.name}
                            </span>
                            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Odporúčané
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-4 w-4" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{new Date(post.date).toLocaleDateString('sk-SK')}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <EyeIcon className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Všetky články' : categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredPosts.length} článkov
                </span>
              </div>
              
              <div className="grid gap-6">
                {(selectedCategory === 'all' ? regularPosts : filteredPosts).map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="group">
                    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="aspect-w-16 aspect-h-9 md:aspect-h-12 bg-gray-200">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {categories.find(cat => cat.id === post.category)?.name}
                            </span>
                            <span className="text-xs text-gray-500">{post.readTime} čítania</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-4 w-4" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{new Date(post.date).toLocaleDateString('sk-SK')}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <EyeIcon className="h-4 w-4" />
                                <span>{post.views}</span>
                              </div>
                              <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-8">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Načítať viac článkov
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;