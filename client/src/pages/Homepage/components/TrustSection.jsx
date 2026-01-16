import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const trustBadges = [
  {
    icon: 'Award',
    title: 'Award Winning',
    description: 'Best Luxury Salon 2023'
  },
  {
    icon: 'Shield',
    title: 'Licensed & Insured',
    description: 'Fully certified professionals'
  },
  {
    icon: 'Users',
    title: '10,000+ Happy Clients',
    description: 'Trusted by thousands'
  },
  {
    icon: 'Clock',
    title: '15+ Years Experience',
    description: 'Industry expertise'
  }
];

export default function TrustSection() {
  return (
    <section className="py-12 md:py-16 px-4 glass-panel-strong">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/10 mb-4">
                <Icon name={badge.icon} size={32} color="var(--color-accent)" />
              </div>
              <h3 className="font-cta font-semibold text-foreground mb-2 text-sm md:text-base">
                {badge.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
