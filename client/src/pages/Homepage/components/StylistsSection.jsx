import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StylistsSection = () => {
  const stylists = [
    { id: 1, name: "Isabella Martinez", title: "Master Stylist & Color Specialist", image: "https://img.rocket.new/generatedImages/rocket_gen_img_150474b8c-1766756743789.png", imageAlt: "Professional female hairstylist Isabella Martinez with blonde hair wearing elegant black uniform, smiling confidently in modern luxury salon with professional lighting", specialties: ["Balayage", "Color Correction", "Bridal Styling"], experience: "12 years", rating: 4.9, reviews: 287 },
    { id: 2, name: "Marcus Chen", title: "Creative Director & Hair Artist", image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4c2c18d-1763296854990.png", imageAlt: "Professional male stylist Marcus Chen with short dark hair in black apron, holding styling tools with confident expression in contemporary barbershop setting", specialties: ["Precision Cuts", "Men's Grooming", "Avant-Garde"], experience: "15 years", rating: 5.0, reviews: 342 },
    { id: 3, name: "Sophia Anderson", title: "Senior Stylist & Extension Expert", image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa624c6c-1766869193920.png", imageAlt: "Elegant senior stylist Sophia Anderson with sophisticated updo hairstyle, wearing professional attire and pearl accessories, radiating expertise and grace in upscale salon", specialties: ["Extensions", "Updos", "Special Events"], experience: "10 years", rating: 4.8, reviews: 219 }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 glass-panel">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="Users" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Our Team</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">Meet Our Master Stylists</h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">Award-winning professionals dedicated to bringing your vision to life with expertise and artistry.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stylists?.map((stylist, index) => (
            <motion.div key={stylist?.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="glass-card rounded-2xl overflow-hidden group">
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                <Image src={stylist?.image} alt={stylist?.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 glass-panel-strong px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} color="var(--color-accent)" />
                    <span className="text-accent text-sm font-cta font-semibold">{stylist?.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">{stylist?.name}</h3>
                <p className="text-accent text-sm md:text-base font-cta font-semibold mb-4">{stylist?.title}</p>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Award" size={18} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">{stylist?.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={18} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">{stylist?.reviews} reviews</span>
                  </div>
                </div>
                <div className="mb-4 md:mb-6">
                  <p className="text-muted-foreground text-xs md:text-sm mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {stylist?.specialties?.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full glass-card text-foreground text-xs md:text-sm font-cta">{specialty}</span>
                    ))}
                  </div>
                </div>
                <Link to="/choose-your-stylist" className="block">
                  <Button variant="outline" fullWidth iconName="Calendar" iconPosition="right">Book with {stylist?.name?.split(' ')?.[0]}</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center mt-12 md:mt-16">
          <Link to="/choose-your-stylist">
            <Button variant="default" size="lg" iconName="Users" iconPosition="right" className="text-base md:text-lg px-6 md:px-8">View All Stylists</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StylistsSection;
