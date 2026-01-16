import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

export default function ServiceCard({ service, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <Image
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        {service.popular && (
          <div className="absolute top-3 right-3 glass-panel-strong px-3 py-1 rounded-full text-sm font-cta font-medium flex items-center gap-1">
            <Icon name="Star" size={16} color="var(--color-accent)" className="fill-current" />
            <span className="text-accent">Popular</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs text-accent font-cta font-medium">{service.category}</span>
        </div>
        <h3 className="font-headline text-xl text-foreground mb-2">
          {service.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {service.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span className="text-sm">{service.duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-accent font-cta font-semibold">
            <Icon name="DollarSign" size={16} />
            <span>${service.price}</span>
          </div>
        </div>

        <Button fullWidth size="sm">
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}
