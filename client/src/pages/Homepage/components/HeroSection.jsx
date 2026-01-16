import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const heroFeatures = [
    { icon: "Sparkles", title: "Premium Services", description: "Expert styling & treatments" },
    { icon: "Users", title: "Master Stylists", description: "Award-winning professionals" },
    { icon: "Calendar", title: "Easy Booking", description: "Schedule in seconds" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80"
          alt="Luxurious modern salon interior with elegant styling chairs, large mirrors with professional lighting, and sophisticated champagne-toned decor creating an upscale beauty sanctuary atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel-strong rounded-3xl p-8 md:p-12 lg:p-16 mb-8 md:mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-6 md:mb-8"
            >
              <Icon name="Award" size={20} color="var(--color-accent)" />
              <span className="text-accent font-cta text-sm md:text-base font-semibold">Award-Winning Salon Experience</span>
            </motion.div>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Your Reflection,
              <span className="block text-accent mt-2">Perfected</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience clarity in beauty through our transparent luxury services. Where sophisticated glassmorphism design meets world-class styling expertise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link to="/book-date-time" className="w-full sm:w-auto">
                <Button variant="default" size="lg" iconName="Calendar" iconPosition="left" fullWidth className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" iconName="Sparkles" iconPosition="left" fullWidth className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {heroFeatures?.map((feature, index) => (
              <motion.div
                key={feature?.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={28} color="var(--color-accent)" />
                </div>
                <h3 className="font-cta text-lg md:text-xl font-semibold text-foreground mb-2">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {feature?.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-muted-foreground text-xs md:text-sm font-cta">Scroll to explore</span>
          <Icon name="ChevronDown" size={24} color="var(--color-accent)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
