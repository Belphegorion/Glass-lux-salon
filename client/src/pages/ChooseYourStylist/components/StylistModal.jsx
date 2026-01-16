import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function StylistModal({ stylist, onClose }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate('/book-date-time', { state: { stylist } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-charcoal/80 backdrop-blur-sm">
      <div className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-warm-charcoal/50 text-white hover:bg-warm-charcoal transition-colors"
          >
            <Icon name="X" size={20} />
          </button>

          <Image
            src={stylist.image}
            alt={stylist.name}
            className="w-full h-80 object-cover rounded-t-lg"
          />
        </div>

        <div className="p-8">
          <h2 className="font-headline text-3xl text-foreground mb-2">
            {stylist.name}
          </h2>
          <p className="text-accent font-medium mb-4">{stylist.specialty}</p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Icon name="Award" size={20} className="text-accent" />
              <span className="text-muted-foreground">{stylist.experience} years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={20} className="fill-accent text-accent" />
              <span className="text-muted-foreground">{stylist.rating} ({stylist.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">{stylist.bio}</p>

          <div className="glass-card p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                {stylist.specialty}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={handleBook}
              disabled={!stylist.available}
            >
              {stylist.available ? 'Book Appointment' : 'Currently Unavailable'}
            </Button>
            <Button
              variant="outline"
              iconName="Instagram"
              iconPosition="left"
              onClick={() => window.open('https://instagram.com', '_blank')}
            >
              Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
