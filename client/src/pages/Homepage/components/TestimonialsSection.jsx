import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    service: 'Balayage & Styling',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    text: 'Absolutely stunning results! The team at GlassLux transformed my hair beyond my expectations. The attention to detail and luxurious experience made it worth every penny.',
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    service: 'Bridal Package',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    text: 'My wedding day hair and makeup were flawless! The team was professional, punctual, and made me feel like royalty. I received so many compliments!',
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Jessica Chen',
    service: 'Keratin Treatment',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    text: 'Best keratin treatment I\'ve ever had! My hair is silky smooth and manageable. The salon ambiance is so relaxing and elegant.',
    date: '3 weeks ago'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="MessageCircle" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Testimonials</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Real experiences from our valued clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl relative"
            >
              <Icon name="Quote" size={48} color="var(--color-accent)" className="absolute top-6 right-6 opacity-10" />
              
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <h3 className="font-cta font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={18} color="var(--color-accent)" className="fill-current" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              <p className="text-sm text-muted-foreground/70">{testimonial.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
