import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import PackageDeals from './components/PackageDeals';
import Icon from '../../components/AppIcon';

const allServices = [
  { id: 1, name: 'Haircut & Style', category: 'Hair', price: 85, duration: 60, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', description: 'Professional cut and styling', popular: true },
  { id: 2, name: 'Balayage', category: 'Hair Color', price: 250, duration: 180, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', description: 'Hand-painted highlights', popular: true },
  { id: 3, name: 'Keratin Treatment', category: 'Hair Treatment', price: 300, duration: 120, image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80', description: 'Smoothing treatment' },
  { id: 4, name: 'Facial Treatment', category: 'Skincare', price: 120, duration: 75, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', description: 'Deep cleansing facial', popular: true },
  { id: 5, name: 'Manicure & Pedicure', category: 'Nails', price: 95, duration: 90, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', description: 'Complete nail care' },
  { id: 6, name: 'Makeup Application', category: 'Makeup', price: 150, duration: 60, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', description: 'Professional makeup' },
  { id: 7, name: 'Bridal Package', category: 'Special', price: 500, duration: 240, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', description: 'Complete bridal styling', popular: true },
  { id: 8, name: 'Hair Extensions', category: 'Hair', price: 400, duration: 180, image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80', description: 'Premium extensions' }
];

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filteredServices, setFilteredServices] = useState(allServices);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    let filtered = allServices;

    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    filtered = filtered.filter(s => s.price >= priceRange[0] && s.price <= priceRange[1]);

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <>
      <Helmet>
        <title>Our Services - GlassLux Salon</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="main-content pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
                <Icon name="Sparkles" size={20} color="var(--color-accent)" />
                <span className="text-accent font-cta text-sm md:text-base font-semibold">Our Services</span>
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Transparent Luxury Services
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Discover our range of luxury beauty services designed to enhance your natural radiance
              </p>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="grid lg:grid-cols-4 gap-8 mt-8">
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />

              <div className="lg:col-span-3">
                <PackageDeals />

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                  {filteredServices.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onClick={() => setSelectedService(service)}
                    />
                  ))}
                </div>

                {filteredServices.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No services found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </div>
    </>
  );
}
