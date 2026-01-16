import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ServiceSelector from './components/ServiceSelector';
import StylistSelector from './components/StylistSelector';
import LocationSelector from './components/LocationSelector';
import CalendarView from './components/CalendarView';
import TimeSlotSelector from './components/TimeSlotSelector';
import BookingSummary from './components/BookingSummary';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

export default function BookDateTime() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    service: location.state?.service || null,
    stylist: location.state?.stylist || null,
    location: null,
    date: null,
    time: null
  });

  const updateBooking = (field, value) => {
    setBooking({ ...booking, [field]: value });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return booking.service;
      case 2: return booking.stylist;
      case 3: return booking.location;
      case 4: return booking.date;
      case 5: return booking.time;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Book Appointment - GlassLux Salon</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="main-content pt-24 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
                <Icon name="Calendar" size={20} color="var(--color-accent)" />
                <span className="text-accent font-cta text-sm md:text-base font-semibold">Book Appointment</span>
              </div>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Book Your Appointment
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Step {step} of 6
              </p>
            </div>

            <div className="flex gap-2 mb-8 overflow-x-auto">
              {['Service', 'Stylist', 'Location', 'Date', 'Time', 'Confirm'].map((label, index) => (
                <div
                  key={index}
                  className={`flex-1 min-w-[100px] h-2 rounded-full transition-colors ${
                    index + 1 <= step ? 'bg-accent' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="glass-panel p-8">
                  {step === 1 && (
                    <ServiceSelector
                      selected={booking.service}
                      onSelect={(service) => updateBooking('service', service)}
                    />
                  )}
                  {step === 2 && (
                    <StylistSelector
                      selected={booking.stylist}
                      onSelect={(stylist) => updateBooking('stylist', stylist)}
                    />
                  )}
                  {step === 3 && (
                    <LocationSelector
                      selected={booking.location}
                      onSelect={(loc) => updateBooking('location', loc)}
                    />
                  )}
                  {step === 4 && (
                    <CalendarView
                      selected={booking.date}
                      onSelect={(date) => updateBooking('date', date)}
                    />
                  )}
                  {step === 5 && (
                    <TimeSlotSelector
                      selected={booking.time}
                      onSelect={(time) => updateBooking('time', time)}
                      date={booking.date}
                    />
                  )}
                  {step === 6 && (
                    <div className="text-center py-8">
                      <h2 className="font-headline text-2xl md:text-3xl text-foreground mb-4">
                        Review Your Booking
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Please review your appointment details before confirming
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button
                        variant="outline"
                        iconName="ArrowLeft"
                        iconPosition="left"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    )}
                    {step < 6 ? (
                      <Button
                        fullWidth
                        iconName="ArrowRight"
                        iconPosition="right"
                        onClick={handleNext}
                        disabled={!canProceed()}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        onClick={handleConfirm}
                      >
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <BookingSummary 
                  selectedService={booking.service}
                  selectedStylist={booking.stylist}
                  selectedLocation={booking.location?.id}
                  selectedDate={booking.date}
                  selectedTime={booking.time}
                  locations={[
                    { id: 1, name: 'Downtown Location', address: '123 Main St, City, ST 12345', phone: '(123) 456-7890' },
                    { id: 2, name: 'Uptown Location', address: '456 Park Ave, City, ST 12345', phone: '(123) 456-7891' },
                    { id: 3, name: 'Westside Location', address: '789 West Blvd, City, ST 12345', phone: '(123) 456-7892' }
                  ]}
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
