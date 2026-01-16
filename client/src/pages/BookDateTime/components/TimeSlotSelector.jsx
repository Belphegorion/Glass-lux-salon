import Icon from '../../../components/AppIcon';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

export default function TimeSlotSelector({ selected, onSelect, date }) {
  const unavailableSlots = ['10:00 AM', '2:00 PM', '4:30 PM'];

  return (
    <div>
      <h2 className="font-headline text-2xl text-foreground mb-2">
        Select Time
      </h2>
      {date && (
        <p className="text-muted-foreground mb-6">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      )}

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map(time => {
          const isUnavailable = unavailableSlots.includes(time);
          const isSelected = selected === time;

          return (
            <button
              key={time}
              onClick={() => onSelect(time)}
              disabled={isUnavailable}
              className={`p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-accent bg-accent/10 text-accent'
                  : isUnavailable
                  ? 'border-[var(--color-border)] bg-accent/5 text-muted-foreground/50 cursor-not-allowed'
                  : 'border-[var(--color-border)] hover:border-accent/50 text-foreground'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Icon name="Clock" size={16} />
                <span className="text-sm font-medium">{time}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-accent rounded"></div>
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent/5 border-2 border-[var(--color-border)] rounded"></div>
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
