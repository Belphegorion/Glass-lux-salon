import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ selectedService, selectedStylist, selectedLocation, selectedDate, selectedTime, locations }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const location = locations?.find(loc => loc?.id === selectedLocation);

  const isComplete = selectedService && selectedStylist && selectedLocation && selectedDate && selectedTime;

  const handleConfirmBooking = () => {
    if (isComplete) {
      alert(`Booking confirmed!\n\nService: ${selectedService?.name}\nStylist: ${selectedStylist?.name}\nLocation: ${location?.name}\nDate: ${formatDate(selectedDate)}\nTime: ${formatTime(selectedTime)}\n\nYou will receive a confirmation email shortly.`);
      navigate('/homepage');
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8 sticky top-24">
      <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-4 md:mb-6">
        Booking Summary
      </h3>
      <div className="space-y-4 md:space-y-6">
        {selectedService ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="Scissors" size={16} />
              <span className="font-cta font-medium">Service</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground">{selectedService?.name}</p>
            <div className="mt-2 flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">{selectedService?.duration} min</span>
              <span className="font-semibold text-accent">${selectedService?.price}</span>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="Scissors" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No service selected</p>
          </div>
        )}

        {selectedStylist ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="User" size={16} />
              <span className="font-cta font-medium">Stylist</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground">{selectedStylist?.name}</p>
            {selectedStylist?.specialty && (
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{selectedStylist?.specialty}</p>
            )}
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="User" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No stylist selected</p>
          </div>
        )}

        {selectedLocation && location ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="MapPin" size={16} />
              <span className="font-cta font-medium">Location</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground">{location?.name}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{location?.address}</p>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="MapPin" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No location selected</p>
          </div>
        )}

        {selectedDate && selectedTime ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="Calendar" size={16} />
              <span className="font-cta font-medium">Date & Time</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground">{formatDate(selectedDate)}</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{formatTime(selectedTime)}</p>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="Calendar" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No date & time selected</p>
          </div>
        )}

        {selectedService && (
          <div className="glass-card rounded-xl p-4 bg-accent/5">
            <div className="flex items-center justify-between">
              <span className="font-cta font-semibold text-foreground">Total</span>
              <span className="text-xl md:text-2xl font-bold text-accent">${selectedService?.price}</span>
            </div>
          </div>
        )}

        <Button
          variant="default"
          fullWidth
          onClick={handleConfirmBooking}
          disabled={!isComplete}
          iconName="Check"
          iconPosition="right"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
