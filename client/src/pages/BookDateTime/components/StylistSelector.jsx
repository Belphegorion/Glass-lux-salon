import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const stylists = [
  { id: 1, name: 'Isabella Martinez', specialty: 'Color Specialist', rating: 4.9, image: '/stylists/isabella.jpg' },
  { id: 2, name: 'Sophia Chen', specialty: 'Hair Cutting', rating: 4.8, image: '/stylists/sophia.jpg' },
  { id: 3, name: 'Emma Thompson', specialty: 'Bridal Styling', rating: 5.0, image: '/stylists/emma.jpg' },
  { id: 4, name: 'Olivia Rodriguez', specialty: 'Extensions', rating: 4.9, image: '/stylists/olivia.jpg' },
  { id: 5, name: 'Any Available', specialty: 'First available stylist', rating: null, image: null }
];

export default function StylistSelector({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-headline text-2xl text-foreground mb-6">
        Choose Your Stylist
      </h2>

      <div className="space-y-4">
        {stylists.map(stylist => (
          <button
            key={stylist.id}
            onClick={() => onSelect(stylist)}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
              selected?.id === stylist.id
                ? 'border-accent bg-accent/10'
                : 'border-[var(--color-border)] hover:border-accent/50'
            }`}
          >
            {stylist.image ? (
              <Image
                src={stylist.image}
                alt={stylist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            )}

            <div className="flex-1 text-left">
              <h3 className="font-semibold text-foreground">{stylist.name}</h3>
              <p className="text-sm text-muted-foreground">{stylist.specialty}</p>
              {stylist.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="Star" size={16} className="fill-accent text-accent" />
                  <span className="text-sm text-muted-foreground">{stylist.rating}</span>
                </div>
              )}
            </div>

            {selected?.id === stylist.id && (
              <Icon name="Check" size={24} className="text-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
