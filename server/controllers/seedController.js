import Service from '../models/Service.js';
import Stylist from '../models/Stylist.js';
import Location from '../models/Location.js';

export async function seedDatabase(req, res) {
  try {
    // Seed Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      await Service.insertMany([
        { name: 'Haircut & Style', description: 'Professional haircut with styling', price: 85, duration: 60, category: 'Hair', icon: 'Scissors', popular: true },
        { name: 'Balayage', description: 'Hand-painted highlights for natural look', price: 250, duration: 180, category: 'Color', icon: 'Palette', popular: true },
        { name: 'Keratin Treatment', description: 'Smoothing treatment for frizz-free hair', price: 300, duration: 120, category: 'Treatment', icon: 'Sparkles' },
        { name: 'Facial Treatment', description: 'Rejuvenating facial for glowing skin', price: 120, duration: 75, category: 'Skincare', icon: 'Heart' },
        { name: 'Manicure & Pedicure', description: 'Complete nail care and polish', price: 95, duration: 90, category: 'Nails', icon: 'Hand' },
        { name: 'Makeup Application', description: 'Professional makeup for any occasion', price: 150, duration: 60, category: 'Makeup', icon: 'Brush' }
      ]);
    }

    // Seed Stylists
    const stylistsCount = await Stylist.countDocuments();
    if (stylistsCount === 0) {
      await Stylist.insertMany([
        { name: 'Isabella Martinez', email: 'isabella@glasslux.com', phone: '(555) 123-4567', specialty: 'Color Specialist', rating: 4.9, yearsExperience: 8, bio: 'Expert in balayage and color correction' },
        { name: 'Sophia Chen', email: 'sophia@glasslux.com', phone: '(555) 123-4568', specialty: 'Hair Cutting', rating: 4.8, yearsExperience: 6, bio: 'Precision cuts and modern styles' },
        { name: 'Emma Thompson', email: 'emma@glasslux.com', phone: '(555) 123-4569', specialty: 'Bridal Styling', rating: 5.0, yearsExperience: 10, bio: 'Specializing in wedding and special occasion styling' },
        { name: 'Olivia Rodriguez', email: 'olivia@glasslux.com', phone: '(555) 123-4570', specialty: 'Extensions', rating: 4.9, yearsExperience: 7, bio: 'Hair extension specialist' }
      ]);
    }

    // Seed Locations
    const locationsCount = await Location.countDocuments();
    if (locationsCount === 0) {
      await Location.insertMany([
        { 
          name: 'Downtown Location', 
          address: '123 Main St, City, ST 12345', 
          phone: '(123) 456-7890',
          email: 'downtown@glasslux.com',
          hours: {
            monday: '9:00 AM - 8:00 PM',
            tuesday: '9:00 AM - 8:00 PM',
            wednesday: '9:00 AM - 8:00 PM',
            thursday: '9:00 AM - 8:00 PM',
            friday: '9:00 AM - 9:00 PM',
            saturday: '8:00 AM - 6:00 PM',
            sunday: '10:00 AM - 5:00 PM'
          }
        },
        { 
          name: 'Uptown Location', 
          address: '456 Park Ave, City, ST 12345', 
          phone: '(123) 456-7891',
          email: 'uptown@glasslux.com',
          hours: {
            monday: '9:00 AM - 8:00 PM',
            tuesday: '9:00 AM - 8:00 PM',
            wednesday: '9:00 AM - 8:00 PM',
            thursday: '9:00 AM - 8:00 PM',
            friday: '9:00 AM - 9:00 PM',
            saturday: '8:00 AM - 6:00 PM',
            sunday: '10:00 AM - 5:00 PM'
          }
        },
        { 
          name: 'Westside Location', 
          address: '789 West Blvd, City, ST 12345', 
          phone: '(123) 456-7892',
          email: 'westside@glasslux.com',
          hours: {
            monday: '9:00 AM - 8:00 PM',
            tuesday: '9:00 AM - 8:00 PM',
            wednesday: '9:00 AM - 8:00 PM',
            thursday: '9:00 AM - 8:00 PM',
            friday: '9:00 AM - 9:00 PM',
            saturday: '8:00 AM - 6:00 PM',
            sunday: 'Closed'
          }
        }
      ]);
    }

    res.json({ 
      message: 'Database seeded successfully',
      services: await Service.countDocuments(),
      stylists: await Stylist.countDocuments(),
      locations: await Location.countDocuments()
    });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ error: 'Seed failed' });
  }
}
