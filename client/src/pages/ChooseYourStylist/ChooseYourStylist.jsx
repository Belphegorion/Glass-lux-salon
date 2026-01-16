import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import StylistCard from './components/StylistCard';
import StylistModal from './components/StylistModal';
import FilterPanel from './components/FilterPanel';
import StylistMatchQuiz from './components/StylistMatchQuiz';
import Icon from '../../components/AppIcon';

const stylists = [
  { id: 1, name: 'Isabella Martinez', specialty: 'Color Specialist', experience: 12, rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80', bio: 'Expert in balayage and color correction', available: true },
  { id: 2, name: 'Sophia Chen', specialty: 'Hair Cutting', experience: 8, rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', bio: 'Precision cuts and modern styles', available: true },
  { id: 3, name: 'Emma Thompson', specialty: 'Bridal Styling', experience: 15, rating: 5.0, reviews: 312, image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80', bio: 'Specializing in wedding hair and makeup', available: false },
  { id: 4, name: 'Olivia Rodriguez', specialty: 'Extensions', experience: 10, rating: 4.9, reviews: 201, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80', bio: 'Premium hair extension specialist', available: true },
  { id: 5, name: 'Ava Johnson', specialty: 'Keratin Treatments', experience: 7, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=80', bio: 'Smoothing and treatment expert', available: true },
  { id: 6, name: 'Mia Williams', specialty: 'Makeup Artist', experience: 9, rating: 4.8, reviews: 178, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', bio: 'Professional makeup for all occasions', available: true }
];

export default function ChooseYourStylist() {
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [filters, setFilters] = useState({ specialty: 'All', available: false });

  const filteredStylists = stylists.filter(s => {
    if (filters.specialty !== 'All' && s.specialty !== filters.specialty) return false;
    if (filters.available && !s.available) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Choose Your Stylist - GlassLux Salon</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="main-content pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
                <Icon name="Users" size={20} color="var(--color-accent)" />
                <span className="text-accent font-cta text-sm md:text-base font-semibold">Our Team</span>
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Choose Your Stylist
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6">
                Meet our talented team of beauty professionals
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="text-accent hover:underline font-cta font-medium inline-flex items-center gap-2"
              >
                Not sure? Take our stylist match quiz
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              <FilterPanel filters={filters} onFiltersChange={setFilters} />

              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredStylists.map(stylist => (
                    <StylistCard
                      key={stylist.id}
                      stylist={stylist}
                      onClick={() => setSelectedStylist(stylist)}
                    />
                  ))}
                </div>

                {filteredStylists.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No stylists match your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {selectedStylist && (
          <StylistModal
            stylist={selectedStylist}
            onClose={() => setSelectedStylist(null)}
          />
        )}

        {showQuiz && (
          <StylistMatchQuiz onClose={() => setShowQuiz(false)} />
        )}
      </div>
    </>
  );
}
