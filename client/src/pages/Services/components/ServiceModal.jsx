import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function ServiceModal({ service, onClose }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate('/book-date-time', { state: { service } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-charcoal/80 backdrop-blur-sm">
      <div className="glass-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-warm-charcoal/50 text-white hover:bg-warm-charcoal transition-colors"
          >
            <Icon name="X" size={20} />
          </button>

          <Image
            src={service.image}
            alt={service.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>

        <div className="p-8">
          <div className="mb-4">
            <span className="text-sm text-accent font-medium">{service.category}</span>
          </div>

          <h2 className="font-headline text-3xl text-foreground mb-4">
            {service.name}
          </h2>

          <p className="text-muted-foreground mb-6">
            {service.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="font-semibold text-foreground">{service.duration} minutes</p>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Icon name="DollarSign" size={20} className="text-accent" />
                <span className="text-sm">Price</span>
              </div>
              <p className="font-semibold text-foreground">${service.price}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={handleBook}
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
