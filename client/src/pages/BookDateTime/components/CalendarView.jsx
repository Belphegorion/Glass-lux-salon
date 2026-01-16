import { useState } from 'react';
import Icon from '../../../components/AppIcon';

export default function CalendarView({ selected, onSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const today = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (selectedDate >= today) {
      onSelect(selectedDate);
    }
  };

  const isSelected = (day) => {
    if (!selected) return false;
    return selected.getDate() === day &&
           selected.getMonth() === currentMonth.getMonth() &&
           selected.getFullYear() === currentMonth.getFullYear();
  };

  const isPast = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < today.setHours(0, 0, 0, 0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-2xl text-foreground">
          Select Date
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <span className="font-medium text-foreground min-w-[150px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}

        {[...Array(startingDayOfWeek)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const selectedDay = isSelected(day);

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              disabled={past}
              className={`aspect-square rounded-lg transition-all ${
                selectedDay
                  ? 'bg-accent text-white'
                  : past
                  ? 'text-muted-foreground/30 cursor-not-allowed'
                  : 'hover:bg-accent/10 text-foreground'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
