export const services = [
  {
    id: 1,
    name: 'Signature Haircut & Style',
    duration: 60,
    price: 85,
    originalPrice: 95,
    description: 'Premium cut with personalized styling consultation by master stylists',
    icon: '✂️',
    popular: true,
    category: 'Hair',
    benefits: ['Precision Cut','Style Consultation','Premium Products','Finishing Touch'],
    rating: 4.8,
    reviews: 128,
    discount: 10,
    beforeAfter: ['hair_before_1.jpg','hair_after_1.jpg'],
    videoDemo: 'haircut_demo.mp4',
    sustainability: 'Eco-friendly products',
    trending: true,
    difficulty: 'Professional',
    maintenanceTime: '4-6 weeks'
  },
  // ... include items 2..6 exactly as you provided (copy/paste)
];

export const galleryImages = [
  { id:1, url:'https://images.unsplash.com/photo-1560869713-bf1d0eb5fc38?w=400', title:'Precision Haircuts', category:'Hair', likes:234, views:1205 },
  // ... others
];

export const blogPosts = [
  { id:1, title:'The Future of Beauty: AI and AR in Salons', excerpt:'Discover...', author:'Sarah Johnson', date:'2024-08-10', readTime:'5 min read', image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400', tags:['Technology','AI','Future'], likes:142, shares:28 },
  // ... others
];

export const stylists = [
  { id:1, name:'Sarah Johnson', specialty:'Master Stylist & AI Beauty Expert', rating:4.9, image:'👩‍🦰', experience:'8 years', awards:['Best Stylist 2023','AI Innovation Award','Client Choice Award'], description:'Pioneer in AI-assisted beauty...', availability:'Mon-Fri, 9AM-6PM', languages:['English','Spanish'], nextAvailable:'2024-08-12', specialties:['AI Analysis','Precision Cuts','Color Theory'], socialMedia:{instagram:'@sarah_styles', followers:'45.2K', posts:892}, certifications:['AI Beauty Specialist','Advanced Color Theory','Sustainable Practices'], bookingRate:94, repeatClients:87 },
  // ... others
];

export const allReviews = [
  { id:1, name:"Jessica Martinez", rating:5, text:"Absolutely incredible experience! ...", avatar:"👩‍💼", service:"AI-Enhanced Facial Analysis", location:"New York", date:"2024-08-12", verified:true, helpful:23, images:['review1_1.jpg','review1_2.jpg'] },
  // ... others
];

export const packages = [
  { id:'pkg1', name:'Tech Beauty Complete', services:[1,3,4], originalPrice:280, price:220, savings:60, description:'Experience the future...', features:['AI Analysis','AR Preview','Premium Styling'], duration:195, popularity:'trending' },
  // ... etc
];

export const socialFeedData = [
  // as provided
];

export const analyticsData = {
  todayBookings: 23,
  weeklyGrowth: 15.8,
  customerSatisfaction: 4.9,
  popularService: 'AI-Enhanced Facial',
  busyHours: ['10:00 AM','2:00 PM','4:00 PM'],
  monthlyRevenue: 45650,
  newCustomers: 127,
  repeatCustomers: 89.3
};
