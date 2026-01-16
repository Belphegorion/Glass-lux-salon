import Icon from '../../../components/AppIcon';

const locations = [
  { id: 1, name: 'Downtown Location', address: '123 Main St, City, ST 12345', phone: '(123) 456-7890' },
  { id: 2, name: 'Uptown Location', address: '456 Park Ave, City, ST 12345', phone: '(123) 456-7891' },
  { id: 3, name: 'Westside Location', address: '789 West Blvd, City, ST 12345', phone: '(123) 456-7892' }
];

export default function LocationSelector({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-headline text-2xl text-foreground mb-6">
        Select Location
      </h2>

      <div className="space-y-4">
        {locations.map(location => (
          <button
            key={location.id}
            onClick={() => onSelect(location)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selected?.id === location.id
                ? 'border-accent bg-accent/10'
                : 'border-[var(--color-border)] hover:border-accent/50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={20} className="text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {location.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{location.address}</p>
                  <p className="text-sm text-muted-foreground">{location.phone}</p>
                </div>
              </div>
              {selected?.id === location.id && (
                <Icon name="Check" size={24} className="text-accent" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
