import Icon from '../../../components/AppIcon';

const services = [
  { id: 1, name: 'Haircut & Style', price: 85, duration: 60 },
  { id: 2, name: 'Balayage', price: 250, duration: 180 },
  { id: 3, name: 'Keratin Treatment', price: 300, duration: 120 },
  { id: 4, name: 'Facial Treatment', price: 120, duration: 75 },
  { id: 5, name: 'Manicure & Pedicure', price: 95, duration: 90 },
  { id: 6, name: 'Makeup Application', price: 150, duration: 60 }
];

export default function ServiceSelector({ selected, onSelect }) {
  return (
    <div>
      <h2 className="font-headline text-2xl text-foreground mb-6">
        Select a Service
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map(service => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selected?.id === service.id
                ? 'border-accent bg-accent/10'
                : 'border-[var(--color-border)] hover:border-accent/50'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{service.name}</h3>
              {selected?.id === service.id && (
                <Icon name="Check" size={20} className="text-accent" />
              )}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${service.price}</span>
              <span>{service.duration} min</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
