import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

export default function StylistCard({ stylist, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64">
        <Image
          src={stylist.image}
          alt={stylist.name}
          className="w-full h-full object-cover"
        />
        {!stylist.available && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="glass-panel-strong px-4 py-2 rounded-full text-foreground font-cta font-medium">
              Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-headline text-xl text-foreground mb-1">
          {stylist.name}
        </h3>
        <p className="text-accent text-sm font-cta font-medium mb-3">
          {stylist.specialty}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Award" size={16} />
            <span>{stylist.experience} years</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} color="var(--color-accent)" className="fill-current" />
            <span>{stylist.rating} ({stylist.reviews})</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">
          {stylist.bio}
        </p>

        <Button
          fullWidth
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          disabled={!stylist.available}
        >
          {stylist.available ? 'Book Now' : 'Unavailable'}
        </Button>
      </div>
    </motion.div>
  );
}
