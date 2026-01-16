import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-accent/5"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-6 md:mb-8">
            <Icon name="Sparkles" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Get Started</span>
          </div>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto">
            Book your appointment today and experience the luxury you deserve. Our expert stylists are ready to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
            <Button
              size="lg"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => navigate('/book-date-time')}
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.location.href = 'tel:+1234567890'}
            >
              Call Us Now
            </Button>
          </div>

          <div className="glass-panel p-6 md:p-8 max-w-2xl mx-auto rounded-2xl">
            <h3 className="font-cta text-lg font-semibold text-foreground mb-4">
              Get in Touch
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={20} color="var(--color-accent)" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={20} color="var(--color-accent)" />
                <span>hello@glasslux.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
