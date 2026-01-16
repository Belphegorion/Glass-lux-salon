import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { label: 'Hair Styling', path: '/services' },
      { label: 'Color Services', path: '/services' },
      { label: 'Treatments', path: '/services' },
      { label: 'Special Occasions', path: '/services' },
    ],
    company: [
      { label: 'About Us', path: '/homepage' },
      { label: 'Our Stylists', path: '/choose-your-stylist' },
      { label: 'Careers', path: '/homepage' },
      { label: 'Contact', path: '/homepage' },
    ],
    support: [
      { label: 'Book Appointment', path: '/book-date-time' },
      { label: 'Gift Certificates', path: '/homepage' },
      { label: 'FAQs', path: '/homepage' },
      { label: 'Privacy Policy', path: '/homepage' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Youtube', icon: 'Youtube', url: '#' },
  ];

  return (
    <footer className="glass-panel border-t border-[var(--color-border)] mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Icon name="Sparkles" size={28} color="var(--color-accent)" />
              </div>
              <span className="font-headline text-2xl font-bold text-foreground">
                GlassLux Salon
              </span>
            </Link>
            
            <p className="text-muted-foreground text-body-md mb-6 max-w-md">
              Experience luxury beauty services in our sophisticated glassmorphism sanctuary. 
              Where transparency meets elegance.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                  aria-label={social?.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-cta text-heading-sm font-semibold text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks?.services?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-body-md"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cta text-heading-sm font-semibold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-body-md"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cta text-heading-sm font-semibold text-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-body-md"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-body-sm text-center md:text-left">
              © {currentYear} GlassLux Salon. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <Link
                to="/homepage"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-body-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/homepage"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-body-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/homepage"
                className="text-muted-foreground hover:text-accent transition-colors duration-300 text-body-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
