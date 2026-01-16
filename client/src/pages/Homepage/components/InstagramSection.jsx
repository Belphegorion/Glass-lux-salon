import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    likes: 1234,
    comments: 89
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    likes: 2156,
    comments: 134
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80',
    likes: 1876,
    comments: 92
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80',
    likes: 3421,
    comments: 201
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    likes: 1654,
    comments: 78
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    likes: 2987,
    comments: 167
  }
];

export default function InstagramSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="Instagram" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Follow Us</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-6">
            @glassluxsalon - Get inspired by our latest work
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 glass-panel-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-foreground">
                  <Icon name="Heart" size={24} />
                  <span className="font-cta font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Icon name="MessageCircle" size={24} />
                  <span className="font-cta font-semibold">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            iconName="Instagram"
            iconPosition="left"
            onClick={() => window.open('https://instagram.com/glassluxsalon', '_blank')}
          >
            Follow @glassluxsalon
          </Button>
        </div>
      </div>
    </section>
  );
}
