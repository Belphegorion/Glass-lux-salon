import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WelcomeStep = ({ formData, photoPreview, onComplete }) => {
  const benefits = [
    {
      icon: 'Calendar',
      title: 'Easy Booking',
      description: 'Schedule appointments with your favorite stylists in seconds',
    },
    {
      icon: 'Bell',
      title: 'Smart Reminders',
      description: 'Never miss an appointment with automated notifications',
    },
    {
      icon: 'Star',
      title: 'Exclusive Rewards',
      description: 'Earn points and unlock special member benefits',
    },
    {
      icon: 'Sparkles',
      title: 'Personalized Experience',
      description: 'Get service recommendations based on your preferences',
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full glass-panel-strong flex items-center justify-center">
            <Icon name="PartyPopper" size={48} color="var(--color-accent)" />
          </div>
        </div>
        
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Welcome to GlassLux Salon!
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Your account has been created successfully
        </p>
      </div>
      <div className="glass-panel-strong p-6 md:p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full glass-panel overflow-hidden border-4 border-accent/30">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="User profile photo showing completed registration"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Icon name="User" size={48} />
              </div>
            )}
          </div>
        </div>
        
        <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">
          {formData?.firstName} {formData?.lastName}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">{formData?.email}</p>
      </div>
      <div className="space-y-4 md:space-y-6">
        <h3 className="font-cta text-lg md:text-xl font-semibold text-foreground text-center">
          What's Next?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="glass-card p-4 md:p-6 flex gap-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={24} color="var(--color-accent)" />
              </div>
              <div className="flex-1">
                <h4 className="font-cta text-base md:text-lg font-semibold text-foreground mb-1">
                  {benefit?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel p-4 md:p-6 flex items-start gap-3">
        <Icon name="Mail" size={24} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm md:text-base text-foreground font-medium mb-1">
            Verify Your Email
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            We've sent a verification link to <span className="font-medium text-accent">{formData?.email}</span>. 
            Please check your inbox and click the link to activate your account.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
        <Button
          variant="outline"
          fullWidth
          iconName="Home"
          iconPosition="left"
          onClick={() => window.location.href = '/homepage'}
        >
          Go to Homepage
        </Button>
        <Button
          variant="default"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={onComplete}
        >
          Book Your First Appointment
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
