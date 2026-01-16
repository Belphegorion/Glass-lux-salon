import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = React.memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = useMemo(() => [
    { path: '/homepage', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/choose-your-stylist', label: 'Stylists' },
    { path: '/book-date-time', label: 'Book Now' },
  ], []);

  const isActivePath = useCallback((path) => {
    return location?.pathname === path;
  }, [location?.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header className={`header-container ${isScrolled ? 'shadow-glass-md' : ''}`}>
        <div className="header-content">
          <Link to="/homepage" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="Sparkles" size={24} />
            </div>
            <span>GlassLux Salon</span>
          </Link>

          <nav className="header-nav">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`header-nav-link ${isActivePath(item?.path) ? 'active' : ''}`}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/login" className="hidden lg:block">
              <Button variant="ghost" iconName="LogIn" iconPosition="left">
                Sign In
              </Button>
            </Link>
            
            <Link to="/sign-up" className="hidden lg:block">
              <Button variant="default" iconName="UserPlus" iconPosition="left">
                Get Started
              </Button>
            </Link>

            <button
              className="header-mobile-toggle lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu-overlay lg:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/homepage" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="Sparkles" size={24} />
            </div>
            <span>GlassLux Salon</span>
          </Link>
          
          <button
            className="mobile-menu-close"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`mobile-menu-link ${isActivePath(item?.path) ? 'active' : ''}`}
            >
              {item?.label}
            </Link>
          ))}
          
          <div className="mt-8 space-y-3">
            <Link to="/login" className="block">
              <Button variant="outline" fullWidth iconName="LogIn" iconPosition="left">
                Sign In
              </Button>
            </Link>
            
            <Link to="/sign-up" className="block">
              <Button variant="default" fullWidth iconName="UserPlus" iconPosition="left">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
