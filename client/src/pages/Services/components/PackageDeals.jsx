import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const packages = [
  {
    id: 1,
    name: 'Bridal Bliss',
    services: ['Hair Styling', 'Makeup', 'Manicure'],
    originalPrice: 385,
    packagePrice: 320,
    savings: 65
  },
  {
    id: 2,
    name: 'Pamper Day',
    services: ['Haircut', 'Facial', 'Pedicure'],
    originalPrice: 300,
    packagePrice: 250,
    savings: 50
  }
];

export default function PackageDeals() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Sparkles" size={24} className="text-accent" />
        <h2 className="font-headline text-2xl text-foreground">Package Deals</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 border-2 border-accent/30"
          >
            <h3 className="font-headline text-xl text-foreground mb-3">
              {pkg.name}
            </h3>
            <ul className="text-muted-foreground text-sm mb-4 space-y-1">
              {pkg.services.map((service, i) => (
                <li key={i}>• {service}</li>
              ))}
            </ul>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-muted-foreground line-through text-sm">${pkg.originalPrice}</span>
                <span className="text-accent font-bold text-2xl ml-2">${pkg.packagePrice}</span>
              </div>
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                Save ${pkg.savings}
              </span>
            </div>
            <Button fullWidth size="sm">
              Book Package
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
