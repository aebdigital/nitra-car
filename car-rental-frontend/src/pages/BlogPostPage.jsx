import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserIcon, 
  EyeIcon, 
  ClockIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import Slider1 from '../assets/Slider1.jpg';
import Slider2 from '../assets/Slider2.jpg';
import Slider3 from '../assets/Slider3.jpg';

const BlogPostPage = () => {
  const { id } = useParams();

  // Hero images array for random selection
  const heroImages = [Slider1, Slider2, Slider3];
  
  // Function to get random hero image
  const getRandomHeroImage = (id) => {
    return heroImages[id % heroImages.length];
  };

  // Sample blog post data (in real app, would fetch by ID)
  const blogPost = {
    id: 1,
    title: 'Tipy na prenájom auta na dovolenku',
    excerpt: 'Plánujete dovolenku a potrebujete prenajať si auto? Prečítajte si naše užitočné tipy pre bezproblémový prenájom.',
    category: 'tipy',
    author: 'Marek Svoboda',
    date: '2025-01-15',
    views: 1250,
    readTime: '5 min',
    image: getRandomHeroImage(1),
    content: `
      <p>Dovolenka je čas na oddych a relaxáciu, no príprava na nju môže byť niekedy stresujúca, najmä keď sa rozhodujete pre prenájom auta. Aby ste si túto časť plánovania uľahčili a vyhli sa nepríjemným prekvapeniam, pripravili sme pre vás užitočné tipy.</p>

      <h2>1. Rezervujte si auto vopred</h2>
      <p>Najlepšie je rezervovať si auto minimálne 2-3 týždne pred odchodom na dovolenku. V období letných prázdnin alebo okolo sviatkov môže byť dostupnosť vozidiel obmedzená a ceny vyššie. Skorá rezervácia vám zaručí lepší výber vozidiel a často aj výhodnejšie ceny.</p>

      <h2>2. Vyberte si správny typ vozidla</h2>
      <p>Zvážte, aký typ vozidla skutočne potrebujete:</p>
      <ul>
        <li><strong>Ekonomické auto</strong> - ideálne pre mestá a kratšie vzdialenosti</li>
        <li><strong>Stredná trieda</strong> - pohodlné pre dlhšie cesty a viac pasažierov</li>
        <li><strong>SUV alebo kombi</strong> - pre rodinné dovolenky s veľkým množstvom batožiny</li>
      </ul>

      <h2>3. Skontrolujte si potrebné dokumenty</h2>
      <p>Pre prenájom auta budete potrebovať:</p>
      <ul>
        <li>Platný vodičský preukaz (minimálne 1 rok starý)</li>
        <li>Kreditnú kartu na meno vodiča</li>
        <li>Občiansky preukaz alebo pas</li>
      </ul>

      <h2>4. Prečítajte si podmienky prenájmu</h2>
      <p>Dôkladne si prečítajte podmienky prenájmu, najmä časti týkajúce sa:</p>
      <ul>
        <li>Limitov najazdených kilometrov</li>
        <li>Pokrytia poistenia</li>
        <li>Politiky tankovania</li>
        <li>Dodatočných poplatkov</li>
      </ul>

      <h2>5. Skontrolujte vozidlo pred prevzatím</h2>
      <p>Pred podpísaním preberacieho protokolu dôkladne skontrolujte vozidlo. Zdokumentujte všetky existujúce škody, poškodenia laku alebo chýbajúce vybavenie. Toto vás ochráni pred neoprávnenými pohľadávkami pri vrátení vozidla.</p>

      <h2>6. Zoznámte sa s vozidlom</h2>
      <p>Pred odchodom z autopožičovne si nastavte zrkadlá, sedadlo a rádio. Zistite si, kde sú umiestnené dôležité ovládacie prvky ako sú svetlá, smerovky a parkovacia brzda.</p>

      <h2>Záver</h2>
      <p>Dodržaním týchto jednoduchých tipov si zabezpečíte pokojnú a bezproblémovú dovolenku. Nezabudnite, že naša autopožičovňa je tu pre vás 24/7 a v prípade akýchkoľvek problémov nás môžete kontaktovať na našej horúcej linke.</p>

      <p>Želáme vám príjemnú dovolenku a bezpečnú jazdu!</p>
    `
  };

  // Related posts
  const relatedPosts = [
    {
      id: 2,
      title: 'Ako si vybrať správne auto pre vašu potrebu',
      category: 'tipy',
      image: getRandomHeroImage(2),
      readTime: '7 min'
    },
    {
      id: 6,
      title: 'Ako správne skontrolovať auto pred použitím',
      category: 'tipy',
      image: getRandomHeroImage(6),
      readTime: '8 min'
    },
    {
      id: 4,
      title: 'Bezpečnosť na cestách počas zimy',
      category: 'bezpecnost',
      image: getRandomHeroImage(4),
      readTime: '6 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Mini Hero Section */}
      <div 
        className="relative h-[20vh] bg-cover bg-top"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${getRandomHeroImage(parseInt(id) || 1)})`
        }}
      >
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ maxWidth: '90rem' }}>
          <div className="max-w-4xl mx-auto">
            
            {/* Category and Meta Info */}
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Tipy a rady
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{blogPost.readTime} čítania</span>
                </div>
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  <span>{blogPost.views} zobrazení</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blogPost.title}
            </h1>

            {/* Author and Date */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {blogPost.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-900 font-medium">
                    <UserIcon className="h-4 w-4" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(blogPost.date).toLocaleDateString('sk-SK', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
              
              {/* Share and Like Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <HeartIcon className="h-4 w-4" />
                  <span>Páči sa mi</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <ShareIcon className="h-4 w-4" />
                  <span>Zdieľať</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
              style={{
                lineHeight: '1.8',
              }}
            />

            {/* Back Navigation */}
            <div className="mt-8 mb-4">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Späť na blog
              </Link>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-gray-600">Bol tento článok užitočný?</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      👍 Áno
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                      👎 Nie
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className="text-gray-600">Zdieľať:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      f
                    </button>
                    <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                      t
                    </button>
                    <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                      w
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Súvisiace články</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group">
                  <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          {post.category === 'tipy' ? 'Tipy a rady' : post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-end mt-3 text-blue-600 group-hover:text-blue-800">
                        <span className="text-sm font-medium">Čítať viac</span>
                        <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-slate-900 py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '90rem' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Nezmeškajte nové články
            </h2>
            <p className="text-gray-300 mb-6">
              Prihláste sa na odber a dostávajte najnovšie tipy a novinky zo sveta autopožičovne priamo do emailu.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Váš email"
                className="flex-1 px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Odoberať
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;