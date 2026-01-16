import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServicesSection = () => {
  const services = [
    { id: 1, title: "Hair Styling", description: "Expert cuts, styling, and transformations by master stylists", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80", imageAlt: "Professional female hairstylist with blonde hair in black uniform carefully cutting and styling client's long brown hair in modern salon with bright lighting", icon: "Scissors", price: "From $85", duration: "60-90 min", popular: true },
    { id: 2, title: "Color Services", description: "Premium coloring, highlights, and balayage techniques", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", imageAlt: "Close-up of professional colorist applying rich brown hair dye with precision brush to client's hair sections in upscale salon setting", icon: "Palette", price: "From $120", duration: "2-3 hours", popular: true },
    { id: 3, title: "Hair Treatments", description: "Restorative treatments for healthy, lustrous hair", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80", imageAlt: "Relaxed woman with eyes closed receiving luxurious hair treatment application with professional stylist massaging treatment into her long dark hair", icon: "Droplets", price: "From $65", duration: "45-60 min", popular: false },
    { id: 4, title: "Special Occasions", description: "Bridal styling, updos, and event-ready looks", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", imageAlt: "Elegant bride with sophisticated updo hairstyle adorned with delicate white flowers and pearl accessories, professional makeup highlighting natural beauty", icon: "Crown", price: "From $150", duration: "90-120 min", popular: false },
    { id: 5, title: "Men's Grooming", description: "Precision cuts, beard styling, and grooming services", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", imageAlt: "Professional male barber in black apron using electric trimmer to style young man's short dark hair and beard in modern barbershop with vintage decor", icon: "User", price: "From $55", duration: "45 min", popular: false },
    { id: 6, title: "Extensions & Styling", description: "Premium hair extensions and advanced styling techniques", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80", imageAlt: "Stylist's hands carefully applying and blending long blonde hair extensions into client's natural hair using professional techniques in bright modern salon", icon: "Wand2", price: "From $200", duration: "2-4 hours", popular: false }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="Sparkles" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Our Services</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">Transparent Luxury Services</h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">Experience clarity in beauty with our comprehensive range of premium services, each designed to enhance your natural radiance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services?.map((service, index) => (
            <motion.div key={service?.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="glass-card rounded-2xl overflow-hidden group">
              {service?.popular && <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full glass-panel-strong"><span className="text-accent text-xs md:text-sm font-cta font-semibold">Popular</span></div>}
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <Image src={service?.image} alt={service?.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-panel-strong flex items-center justify-center">
                      <Icon name={service?.icon} size={24} color="var(--color-accent)" />
                    </div>
                    <div><h3 className="font-cta text-lg md:text-xl font-semibold text-foreground">{service?.title}</h3></div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 line-clamp-2">{service?.description}</p>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={18} color="var(--color-accent)" />
                    <span className="text-foreground font-cta text-sm md:text-base font-semibold whitespace-nowrap">{service?.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">{service?.duration}</span>
                  </div>
                </div>
                <Link to="/book-date-time" className="block">
                  <Button variant="outline" fullWidth iconName="Calendar" iconPosition="right" className="group-hover:bg-accent/10">Book Now</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center mt-12 md:mt-16">
          <Link to="/services">
            <Button variant="default" size="lg" iconName="ArrowRight" iconPosition="right" className="text-base md:text-lg px-6 md:px-8">View All Services</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
