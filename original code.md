import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                success: "bg-success text-success-foreground hover:bg-success/90",
                warning: "bg-warning text-warning-foreground hover:bg-warning/90",
                danger: "bg-error text-error-foreground hover:bg-error/90",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
                xs: "h-8 rounded-md px-2 text-xs",
                xl: "h-12 rounded-md px-10 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";

    // Icon size mapping based on button size
    const iconSizeMap = {
        xs: 12,
        sm: 14,
        default: 16,
        lg: 18,
        xl: 20,
        icon: 16,
    };

    const calculatedIconSize = iconSize || iconSizeMap?.[size] || 16;

    // Loading spinner
    const LoadingSpinner = () => (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

    const renderIcon = () => {
        if (!iconName) return null;
        try {
            return (
                <Icon
                    name={iconName}
                    size={calculatedIconSize}
                    className={cn(
                        children && iconPosition === 'left' && "mr-2",
                        children && iconPosition === 'right' && "ml-2"
                    )}
                />
            );
        } catch {
            return null;
        }
    };

    const renderFallbackButton = () => (
        <button
            className={cn(
                buttonVariants({ variant, size, className }),
                fullWidth && "w-full"
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </button>
    );

    // When asChild is true, merge icons into the child element
    if (asChild) {
        try {
            if (!children || React.Children?.count(children) !== 1) {
                return renderFallbackButton();
            }

            const child = React.Children?.only(children);

            if (!React.isValidElement(child)) {
                return renderFallbackButton();
            }
            const content = (
                <>
                    {loading && <LoadingSpinner />}
                    {iconName && iconPosition === 'left' && renderIcon()}
                    {child?.props?.children}
                    {iconName && iconPosition === 'right' && renderIcon()}
                </>
            );

            const clonedChild = React.cloneElement(child, {
                className: cn(
                    buttonVariants({ variant, size, className }),
                    fullWidth && "w-full",
                    child?.props?.className
                ),
                disabled: disabled || loading || child?.props?.disabled,
                children: content,
            });

            return <Comp ref={ref} {...props}>{clonedChild}</Comp>;
        } catch {
            return renderFallbackButton();
        }
    }

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size, className }),
                fullWidth && "w-full"
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner />}
            {iconName && iconPosition === 'left' && renderIcon()}
            {children}
            {iconName && iconPosition === 'right' && renderIcon()}
        </Comp>
    );
});

Button.displayName = "Button";
export default Button;



import React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../utils/cn";

const Checkbox = React.forwardRef(({
    className,
    id,
    checked,
    indeterminate = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    size = "default",
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const checkboxId = id || `checkbox-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Size variants
    const sizeClasses = {
        sm: "h-4 w-4",
        default: "h-4 w-4",
        lg: "h-5 w-5"
    };

    return (
        <div className={cn("flex items-start space-x-2", className)}>
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    ref={ref}
                    id={checkboxId}
                    checked={checked}
                    disabled={disabled}
                    required={required}
                    className="sr-only"
                    {...props}
                />

                <label
                    htmlFor={checkboxId}
                    className={cn(
                        "peer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer transition-colors",
                        sizeClasses?.[size],
                        checked && "bg-primary text-primary-foreground border-primary",
                        indeterminate && "bg-primary text-primary-foreground border-primary",
                        error && "border-destructive",
                        disabled && "cursor-not-allowed opacity-50"
                    )}
                >
                    {checked && !indeterminate && (
                        <Check className="h-3 w-3 text-current flex items-center justify-center" />
                    )}
                    {indeterminate && (
                        <Minus className="h-3 w-3 text-current flex items-center justify-center" />
                    )}
                </label>
            </div>
            {(label || description || error) && (
                <div className="flex-1 space-y-1">
                    {label && (
                        <label
                            htmlFor={checkboxId}
                            className={cn(
                                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                                error ? "text-destructive" : "text-foreground"
                            )}
                        >
                            {label}
                            {required && <span className="text-destructive ml-1">*</span>}
                        </label>
                    )}

                    {description && !error && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

Checkbox.displayName = "Checkbox";

// Checkbox Group component
const CheckboxGroup = React.forwardRef(({
    className,
    children,
    label,
    description,
    error,
    required = false,
    disabled = false,
    ...props
}, ref) => {
    return (
        <fieldset
            ref={ref}
            disabled={disabled}
            className={cn("space-y-3", className)}
            {...props}
        >
            {label && (
                <legend className={cn(
                    "text-sm font-medium",
                    error ? "text-destructive" : "text-foreground"
                )}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </legend>
            )}

            {description && !error && (
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            <div className="space-y-2">
                {children}
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </fieldset>
    );
});

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };





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
    <footer className="glass-panel border-t border-border mt-auto">
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

        <div className="mt-12 pt-8 border-t border-border">
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





import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
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

  const navigationItems = [
    { path: '/homepage', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/choose-your-stylist', label: 'Stylists' },
    { path: '/book-date-time', label: 'Book Now' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

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
              onClick={() => setIsMobileMenuOpen(true)}
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
            onClick={() => setIsMobileMenuOpen(false)}
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
};

export default Header;




import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(({
    className,
    type = "text",
    label,
    description,
    error,
    required = false,
    id,
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Base input classes
    const baseInputClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Checkbox-specific styles
    if (type === "checkbox") {
        return (
            <input
                type="checkbox"
                className={cn(
                    "h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />
        );
    }

    // Radio button-specific styles
    if (type === "radio") {
        return (
            <input
                type="radio"
                className={cn(
                    "h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />
        );
    }

    // For regular inputs with wrapper structure
    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}

            <input
                type={type}
                className={cn(
                    baseInputClasses,
                    error && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                ref={ref}
                id={inputId}
                {...props}
            />

            {description && !error && (
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;




// components/ui/Select.jsx - Shadcn style Select
import React, { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

const Select = React.forwardRef(({
    className,
    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",
    multiple = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    searchable = false,
    clearable = false,
    loading = false,
    id,
    name,
    onChange,
    onOpenChange,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Generate unique ID if not provided
    const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Filter options based on search
    const filteredOptions = searchable && searchTerm
        ? options?.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            (option?.value && option?.value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
        )
        : options;

    // Get selected option(s) for display
    const getSelectedDisplay = () => {
        if (!value) return placeholder;

        if (multiple) {
            const selectedOptions = options?.filter(opt => value?.includes(opt?.value));
            if (selectedOptions?.length === 0) return placeholder;
            if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
            return `${selectedOptions?.length} items selected`;
        }

        const selectedOption = options?.find(opt => opt?.value === value);
        return selectedOption ? selectedOption?.label : placeholder;
    };

    const handleToggle = () => {
        if (!disabled) {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            onOpenChange?.(newIsOpen);
            if (!newIsOpen) {
                setSearchTerm("");
            }
        }
    };

    const handleOptionSelect = (option) => {
        if (multiple) {
            const newValue = value || [];
            const updatedValue = newValue?.includes(option?.value)
                ? newValue?.filter(v => v !== option?.value)
                : [...newValue, option?.value];
            onChange?.(updatedValue);
        } else {
            onChange?.(option?.value);
            setIsOpen(false);
            onOpenChange?.(false);
        }
    };

    const handleClear = (e) => {
        e?.stopPropagation();
        onChange?.(multiple ? [] : '');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e?.target?.value);
    };

    const isSelected = (optionValue) => {
        if (multiple) {
            return value?.includes(optionValue) || false;
        }
        return value === optionValue;
    };

    const hasValue = multiple ? value?.length > 0 : value !== undefined && value !== '';

    return (
        <div className={cn("relative", className)}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    ref={ref}
                    id={selectId}
                    type="button"
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive focus:ring-destructive",
                        !hasValue && "text-muted-foreground"
                    )}
                    onClick={handleToggle}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    {...props}
                >
                    <span className="truncate">{getSelectedDisplay()}</span>

                    <div className="flex items-center gap-1">
                        {loading && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}

                        {clearable && hasValue && !loading && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4"
                                onClick={handleClear}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}

                        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    </div>
                </button>

                {/* Hidden native select for form submission */}
                <select
                    name={name}
                    value={value || ''}
                    onChange={() => { }} // Controlled by our custom logic
                    className="sr-only"
                    tabIndex={-1}
                    multiple={multiple}
                    required={required}
                >
                    <option value="">Select...</option>
                    {options?.map(option => (
                        <option key={option?.value} value={option?.value}>
                            {option?.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white text-black border border-border rounded-md shadow-md">
                        {searchable && (
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search options..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="py-1 max-h-60 overflow-auto">
                            {filteredOptions?.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    {searchTerm ? 'No options found' : 'No options available'}
                                </div>
                            ) : (
                                filteredOptions?.map((option) => (
                                    <div
                                        key={option?.value}
                                        className={cn(
                                            "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                            isSelected(option?.value) && "bg-primary text-primary-foreground",
                                            option?.disabled && "pointer-events-none opacity-50"
                                        )}
                                        onClick={() => !option?.disabled && handleOptionSelect(option)}
                                    >
                                        <span className="flex-1">{option?.label}</span>
                                        {multiple && isSelected(option?.value) && (
                                            <Check className="h-4 w-4" />
                                        )}
                                        {option?.description && (
                                            <span className="text-xs text-muted-foreground ml-2">
                                                {option?.description}
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            {description && !error && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export default Select;






import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) {
    const IconComponent = LucideIcons?.[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;






import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;



import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    error.__ErrorBoundary = true;
    window.__COMPONENT_ERROR__?.(error, errorInfo);
    // console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8 max-w-md">
            <div className="flex justify-center items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 32 33" fill="none">
                <path d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z" stroke="#343330" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M11.5 15.5C12.3284 15.5 13 14.8284 13 14C13 13.1716 12.3284 12.5 11.5 12.5C10.6716 12.5 10 13.1716 10 14C10 14.8284 10.6716 15.5 11.5 15.5Z" fill="#343330" />
                <path d="M20.5 15.5C21.3284 15.5 22 14.8284 22 14C22 13.1716 21.3284 12.5 20.5 12.5C19.6716 12.5 19 13.1716 19 14C19 14.8284 19.6716 15.5 20.5 15.5Z" fill="#343330" />
                <path d="M21 22.5C19.9625 20.7062 18.2213 19.5 16 19.5C13.7787 19.5 12.0375 20.7062 11 22.5" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <h1 className="text-2xl font-medium text-neutral-800">Something went wrong</h1>
              <p className="text-neutral-600 text-base w w-8/12 mx-auto">We encountered an unexpected error while processing your request.</p>
            </div>
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Icon name="ArrowLeft" size={18} color="#fff" />
                Back
              </button>
            </div>
          </div >
        </div >
      );
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;





import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;





import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ selectedService, selectedStylist, selectedLocation, selectedDate, selectedTime, locations }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const location = locations?.find(loc => loc?.id === selectedLocation);

  const isComplete = selectedService && selectedStylist && selectedLocation && selectedDate && selectedTime;

  const handleConfirmBooking = () => {
    if (isComplete) {
      alert(`Booking confirmed!\n\nService: ${selectedService?.name}\nStylist: ${selectedStylist?.name}\nLocation: ${location?.name}\nDate: ${formatDate(selectedDate)}\nTime: ${formatTime(selectedTime)}\n\nYou will receive a confirmation email shortly.`);
      navigate('/homepage');
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8 sticky top-24">
      <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-4 md:mb-6">
        Booking Summary
      </h3>
      <div className="space-y-4 md:space-y-6">
        {selectedService ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="Scissors" size={16} />
              <span className="font-cta font-medium">Service</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground">{selectedService?.name}</p>
            <div className="mt-2 flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">{selectedService?.duration} min</span>
              <span className="font-semibold text-accent">${selectedService?.price}</span>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="Scissors" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs md:text-sm text-muted-foreground">No service selected</p>
          </div>
        )}

        {selectedStylist ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-muted-foreground text-xs md:text-sm">
              <Icon name="User" size={16} />
              <span className="font-cta font-medium">Stylist</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={selectedStylist?.image}
                  alt={selectedStylist?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-foreground">{selectedStylist?.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{selectedStylist?.specialty}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="User" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs md:text-sm text-muted-foreground">No stylist selected</p>
          </div>
        )}

        {location ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="MapPin" size={16} />
              <span className="font-cta font-medium">Location</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground mb-1">{location?.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{location?.address}</p>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="MapPin" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs md:text-sm text-muted-foreground">No location selected</p>
          </div>
        )}

        {selectedDate && selectedTime ? (
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs md:text-sm">
              <Icon name="Calendar" size={16} />
              <span className="font-cta font-medium">Date &amp; Time</span>
            </div>
            <p className="text-sm md:text-base font-medium text-foreground mb-1">
              {formatDate(selectedDate)}
            </p>
            <p className="text-xs md:text-sm text-accent font-semibold">
              {formatTime(selectedTime)}
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-4 text-center">
            <Icon name="Calendar" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-xs md:text-sm text-muted-foreground">No date &amp; time selected</p>
          </div>
        )}
      </div>
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className="text-sm md:text-base text-muted-foreground">Total</span>
          <span className="text-xl md:text-2xl font-headline font-bold text-accent">
            ${selectedService ? selectedService?.price : '0.00'}
          </span>
        </div>

        <Button
          variant="default"
          fullWidth
          disabled={!isComplete}
          onClick={handleConfirmBooking}
          iconName="Check"
          iconPosition="left"
        >
          Confirm Booking
        </Button>

        {!isComplete && (
          <p className="mt-3 text-xs text-center text-muted-foreground">
            Please complete all selections to confirm booking
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;





import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarView = ({ selectedDate, onDateSelect, availableSlots }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateAvailable = (day) => {
    const dateStr = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return availableSlots?.some(slot => slot?.date === dateStr);
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    const dateStr = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const isPastDate = (day) => {
    const today = new Date(2026, 0, 10);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const handleDateClick = (day) => {
    if (isPastDate(day) || !isDateAvailable(day)) return;
    const dateStr = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    onDateSelect(dateStr);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const emptyDays = Array(startingDayOfWeek)?.fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-foreground">
          {monthNames?.[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-card flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
            aria-label="Previous month"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-card flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
            aria-label="Next month"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4">
        {dayNames?.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-cta font-semibold text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4">
        {emptyDays?.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {monthDays?.map((day) => {
          const available = isDateAvailable(day);
          const selected = isDateSelected(day);
          const past = isPastDate(day);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={past || !available}
              className={`
                aspect-square rounded-xl flex items-center justify-center text-sm md:text-base font-cta font-medium transition-all duration-300
                ${selected ? 'bg-accent text-white shadow-lg scale-105' : ''}
                ${!selected && available && !past ? 'glass-card text-foreground hover:bg-accent/10 hover:text-accent hover:scale-105' : ''}
                ${past || !available ? 'text-muted-foreground/40 cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-label={`Select ${monthNames?.[month]} ${day}, ${year}`}
            >
              {day}
              {available && !past && !selected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent" />
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded glass-card border border-accent/30" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted-foreground/20" />
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;



import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LocationSelector = ({ selectedLocation, onLocationSelect, locations }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-foreground mb-2">
          Choose Location
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Select your preferred salon location
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {locations?.map((location) => (
          <button
            key={location?.id}
            onClick={() => onLocationSelect(location?.id)}
            className={`
              glass-card rounded-xl p-4 md:p-6 text-left transition-all duration-300
              ${selectedLocation === location?.id 
                ? 'border-2 border-accent bg-accent/5 scale-105' :'border border-border hover:border-accent/50 hover:scale-105'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={location?.image}
                  alt={location?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base md:text-lg font-cta font-semibold text-foreground mb-1 md:mb-2">
                  {location?.name}
                </h4>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                    <Icon name="MapPin" size={16} className="flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{location?.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Icon name="Phone" size={16} className="flex-shrink-0" />
                    <span>{location?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} className="flex-shrink-0" />
                    <span>{location?.hours}</span>
                  </div>
                </div>
                {location?.distance && (
                  <div className="mt-2 md:mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium">
                    <Icon name="Navigation" size={12} />
                    <span>{location?.distance} away</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;




import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceSelector = ({ selectedService, onServiceSelect, services }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-foreground mb-2">
          Select Service
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Choose the service you would like to book
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {services?.map((service) => (
          <button
            key={service?.id}
            onClick={() => onServiceSelect(service)}
            className={`
              glass-card rounded-xl p-4 md:p-6 text-left transition-all duration-300
              ${selectedService?.id === service?.id 
                ? 'border-2 border-accent bg-accent/5 scale-105' :'border border-border hover:border-accent/50 hover:scale-105'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`
                w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0
                ${selectedService?.id === service?.id ? 'bg-accent/20' : 'bg-accent/10'}
              `}>
                <Icon 
                  name={service?.icon} 
                  size={24} 
                  color={selectedService?.id === service?.id ? 'var(--color-accent)' : 'var(--color-muted-foreground)'} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base md:text-lg font-cta font-semibold text-foreground mb-1 md:mb-2">
                  {service?.name}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2 md:mb-3">
                  {service?.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{service?.duration} min</span>
                  </div>
                  <span className="text-base md:text-lg font-semibold text-accent">
                    ${service?.price}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;



import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StylistSelector = ({ selectedStylist, onStylistSelect, stylists }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-foreground mb-2">
          Choose Your Stylist
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Select your preferred stylist for this appointment
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stylists?.map((stylist) => (
          <button
            key={stylist?.id}
            onClick={() => onStylistSelect(stylist)}
            className={`
              glass-card rounded-xl p-4 md:p-6 text-left transition-all duration-300
              ${selectedStylist?.id === stylist?.id 
                ? 'border-2 border-accent bg-accent/5 scale-105' :'border border-border hover:border-accent/50 hover:scale-105'
              }
            `}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`
                w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 md:mb-4
                ${selectedStylist?.id === stylist?.id ? 'ring-4 ring-accent' : 'ring-2 ring-border'}
              `}>
                <Image
                  src={stylist?.image}
                  alt={stylist?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-base md:text-lg font-cta font-semibold text-foreground mb-1">
                {stylist?.name}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                {stylist?.specialty}
              </p>
              <div className="flex items-center gap-1 mb-2 md:mb-3">
                <Icon name="Star" size={14} color="var(--color-accent)" />
                <span className="text-xs md:text-sm font-medium text-foreground">
                  {stylist?.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({stylist?.reviews})
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Award" size={14} />
                <span>{stylist?.experience}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StylistSelector;




import React from 'react';
import Icon from '../../../components/AppIcon';

const TimeSlotSelector = ({ selectedDate, selectedTime, onTimeSelect, availableSlots, serviceDuration }) => {
  if (!selectedDate) {
    return (
      <div className="glass-panel rounded-2xl p-6 md:p-8 lg:p-10 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-accent/10 flex items-center justify-center">
          <Icon name="Calendar" size={32} color="var(--color-accent)" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-headline font-bold text-foreground mb-2 md:mb-3">
          Select a Date First
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Please choose a date from the calendar to view available time slots
        </p>
      </div>
    );
  }

  const dateSlots = availableSlots?.find(slot => slot?.date === selectedDate);
  
  if (!dateSlots || dateSlots?.times?.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-6 md:p-8 lg:p-10 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-warning/10 flex items-center justify-center">
          <Icon name="AlertCircle" size={32} color="var(--color-warning)" />
        </div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-headline font-bold text-foreground mb-2 md:mb-3">
          No Slots Available
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Unfortunately, there are no available time slots for this date. Please select another date.
        </p>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const morningSlots = dateSlots?.times?.filter(time => {
    const hour = parseInt(time?.split(':')?.[0]);
    return hour < 12;
  });

  const afternoonSlots = dateSlots?.times?.filter(time => {
    const hour = parseInt(time?.split(':')?.[0]);
    return hour >= 12 && hour < 17;
  });

  const eveningSlots = dateSlots?.times?.filter(time => {
    const hour = parseInt(time?.split(':')?.[0]);
    return hour >= 17;
  });

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const TimeSlotButton = ({ time }) => (
    <button
      onClick={() => onTimeSelect(time)}
      className={`
        px-4 py-3 md:px-6 md:py-4 rounded-xl font-cta font-medium text-sm md:text-base transition-all duration-300
        ${selectedTime === time 
          ? 'bg-accent text-white shadow-lg scale-105' 
          : 'glass-card text-foreground hover:bg-accent/10 hover:text-accent hover:scale-105'
        }
      `}
    >
      {formatTime(time)}
    </button>
  );

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold text-foreground mb-2">
          Available Time Slots
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          {formatDate(selectedDate)}
        </p>
        <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Service duration: {serviceDuration} minutes</span>
        </div>
      </div>
      <div className="space-y-6 md:space-y-8">
        {morningSlots?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Icon name="Sunrise" size={20} color="var(--color-accent)" />
              <h4 className="text-base md:text-lg font-cta font-semibold text-foreground">
                Morning
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {morningSlots?.map(time => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>
        )}

        {afternoonSlots?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Icon name="Sun" size={20} color="var(--color-accent)" />
              <h4 className="text-base md:text-lg font-cta font-semibold text-foreground">
                Afternoon
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {afternoonSlots?.map(time => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>
        )}

        {eveningSlots?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Icon name="Moon" size={20} color="var(--color-accent)" />
              <h4 className="text-base md:text-lg font-cta font-semibold text-foreground">
                Evening
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {eveningSlots?.map(time => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;



import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import CalendarView from './components/CalendarView';
import TimeSlotSelector from './components/TimeSlotSelector';
import LocationSelector from './components/LocationSelector';
import BookingSummary from './components/BookingSummary';
import ServiceSelector from './components/ServiceSelector';
import StylistSelector from './components/StylistSelector';
import Icon from '../../components/AppIcon';

const BookDateTime = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const services = [
  {
    id: 1,
    name: "Signature Haircut",
    description: "Precision cut tailored to your face shape and lifestyle with complimentary styling",
    duration: 60,
    price: "85.00",
    icon: "Scissors"
  },
  {
    id: 2,
    name: "Color Transformation",
    description: "Full color service including consultation, application, and glossing treatment",
    duration: 180,
    price: "225.00",
    icon: "Palette"
  },
  {
    id: 3,
    name: "Balayage Highlights",
    description: "Hand-painted highlights for natural, sun-kissed dimension and movement",
    duration: 240,
    price: "285.00",
    icon: "Sparkles"
  },
  {
    id: 4,
    name: "Keratin Treatment",
    description: "Smoothing treatment that eliminates frizz and reduces styling time",
    duration: 150,
    price: "350.00",
    icon: "Droplet"
  },
  {
    id: 5,
    name: "Bridal Styling",
    description: "Complete bridal hair styling with trial session and day-of service",
    duration: 120,
    price: "450.00",
    icon: "Heart"
  },
  {
    id: 6,
    name: "Deep Conditioning",
    description: "Intensive moisture treatment with scalp massage and heat therapy",
    duration: 45,
    price: "65.00",
    icon: "Waves"
  }];


  const stylists = [
  {
    id: 1,
    name: "Isabella Martinez",
    specialty: "Color Specialist",
    experience: "12 years",
    rating: "4.9",
    reviews: "287",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14d9d1e3f-1763293907442.png",
    imageAlt: "Professional portrait of Hispanic woman with long dark hair wearing elegant black blazer and warm smile"
  },
  {
    id: 2,
    name: "James Chen",
    specialty: "Master Stylist",
    experience: "15 years",
    rating: "5.0",
    reviews: "342",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b96df5c7-1763298849215.png",
    imageAlt: "Professional headshot of Asian man with short black hair in navy suit with confident expression"
  },
  {
    id: 3,
    name: "Sophie Anderson",
    specialty: "Bridal Expert",
    experience: "10 years",
    rating: "4.8",
    reviews: "198",
    image: "https://images.unsplash.com/photo-1624667773099-1b80ae774080",
    imageAlt: "Professional portrait of blonde woman with elegant updo wearing white blouse and pearl earrings"
  },
  {
    id: 4,
    name: "Marcus Johnson",
    specialty: "Texture Specialist",
    experience: "8 years",
    rating: "4.9",
    reviews: "156",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f23d9c3d-1763295425663.png",
    imageAlt: "Professional headshot of African American man with short fade haircut wearing gray suit and friendly smile"
  },
  {
    id: 5,
    name: "Emma Thompson",
    specialty: "Balayage Artist",
    experience: "11 years",
    rating: "5.0",
    reviews: "264",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15206e335-1763294892586.png",
    imageAlt: "Professional portrait of woman with wavy auburn hair wearing cream blazer with artistic expression"
  },
  {
    id: 6,
    name: "David Kim",
    specialty: "Precision Cutting",
    experience: "14 years",
    rating: "4.9",
    reviews: "312",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_186bcbc32-1763296664891.png",
    imageAlt: "Professional headshot of Asian man with modern styled hair wearing black turtleneck with sophisticated look"
  }];


  const locations = [
  {
    id: 1,
    name: "Downtown Flagship",
    address: "123 Luxury Avenue, Suite 100, Manhattan, NY 10001",
    phone: "(212) 555-0123",
    hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM",
    distance: "0.8 miles",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_199e820df-1764798593178.png",
    imageAlt: "Modern luxury salon interior with glass walls, elegant white chairs, and gold accent lighting fixtures"
  },
  {
    id: 2,
    name: "Upper East Side",
    address: "456 Madison Avenue, 2nd Floor, New York, NY 10022",
    phone: "(212) 555-0456",
    hours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM",
    distance: "2.3 miles",
    image: "https://images.unsplash.com/photo-1706629503720-13cad35ce2e5",
    imageAlt: "Sophisticated salon space with floor-to-ceiling windows, marble floors, and contemporary styling stations"
  },
  {
    id: 3,
    name: "Brooklyn Heights",
    address: "789 Montague Street, Brooklyn, NY 11201",
    phone: "(718) 555-0789",
    hours: "Tue-Sat: 10AM-8PM, Sun: 11AM-6PM",
    distance: "4.1 miles",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6",
    imageAlt: "Boutique salon with exposed brick walls, vintage mirrors, and modern glass styling stations with natural light"
  },
  {
    id: 4,
    name: "Tribeca Studio",
    address: "321 Greenwich Street, Ground Floor, New York, NY 10013",
    phone: "(212) 555-0321",
    hours: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-7PM",
    distance: "1.5 miles",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17df356fe-1766867046333.png",
    imageAlt: "Industrial-chic salon with concrete floors, glass partitions, and minimalist black styling chairs with pendant lighting"
  }];


  const availableSlots = [
  {
    date: "2026-01-15",
    times: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  },
  {
    date: "2026-01-16",
    times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]
  },
  {
    date: "2026-01-17",
    times: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "18:00"]
  },
  {
    date: "2026-01-18",
    times: ["09:00", "10:00", "13:00", "14:00", "15:00", "17:00", "18:00"]
  },
  {
    date: "2026-01-20",
    times: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]
  },
  {
    date: "2026-01-21",
    times: ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  },
  {
    date: "2026-01-22",
    times: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]
  },
  {
    date: "2026-01-23",
    times: ["09:00", "10:00", "13:00", "14:00", "15:00", "16:00", "18:00"]
  },
  {
    date: "2026-01-24",
    times: ["10:00", "11:00", "13:00", "14:00", "15:00", "17:00", "18:00"]
  },
  {
    date: "2026-01-25",
    times: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4 md:mb-6">
                <Icon name="Calendar" size={20} color="var(--color-accent)" />
                <span className="text-sm md:text-base font-cta font-medium text-accent">
                  Smart Booking System
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-3 md:mb-4">
                Book Your Appointment
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Select your preferred service, stylist, location, and time slot to complete your booking
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <ServiceSelector
                  selectedService={selectedService}
                  onServiceSelect={setSelectedService}
                  services={services} />


                <StylistSelector
                  selectedStylist={selectedStylist}
                  onStylistSelect={setSelectedStylist}
                  stylists={stylists} />


                <LocationSelector
                  selectedLocation={selectedLocation}
                  onLocationSelect={setSelectedLocation}
                  locations={locations} />


                <CalendarView
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  availableSlots={availableSlots} />


                <TimeSlotSelector
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  availableSlots={availableSlots}
                  serviceDuration={selectedService?.duration || 60} />

              </div>

              <div className="lg:col-span-1">
                <BookingSummary
                  selectedService={selectedService}
                  selectedStylist={selectedStylist}
                  selectedLocation={selectedLocation}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  locations={locations} />

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

};

export default BookDateTime;





import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const specializationOptions = [
    { value: 'all', label: 'All Specializations' },
    { value: 'hair-coloring', label: 'Hair Coloring' },
    { value: 'hair-cutting', label: 'Hair Cutting' },
    { value: 'styling', label: 'Styling' },
    { value: 'treatments', label: 'Treatments' },
    { value: 'extensions', label: 'Extensions' },
    { value: 'bridal', label: 'Bridal Services' },
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Availability' },
    { value: 'available', label: 'Available Today' },
    { value: 'limited', label: 'Limited Slots' },
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: '1-3', label: '1-3 Years' },
    { value: '4-7', label: '4-7 Years' },
    { value: '8+', label: '8+ Years' },
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5+', label: '4.5+ Stars' },
    { value: '4.0+', label: '4.0+ Stars' },
    { value: '3.5+', label: '3.5+ Stars' },
  ];

  return (
    <div className="glass-card p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="SlidersHorizontal" size={20} className="text-accent" />
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-sm md:text-base text-accent hover:text-accent/80 font-cta font-medium transition-colors"
        >
          Reset All
        </button>
      </div>
      <div className="space-y-4">
        <Select
          label="Specialization"
          options={specializationOptions}
          value={filters?.specialization}
          onChange={(value) => onFilterChange('specialization', value)}
        />

        <Select
          label="Availability"
          options={availabilityOptions}
          value={filters?.availability}
          onChange={(value) => onFilterChange('availability', value)}
        />

        <Select
          label="Experience"
          options={experienceOptions}
          value={filters?.experience}
          onChange={(value) => onFilterChange('experience', value)}
        />

        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange('rating', value)}
        />

        <div className="pt-4 border-t border-border">
          <h4 className="font-cta text-sm md:text-base font-semibold text-foreground mb-3">
            Additional Filters
          </h4>
          <div className="space-y-3">
            <Checkbox
              label="Certified Professionals Only"
              checked={filters?.certifiedOnly}
              onChange={(e) => onFilterChange('certifiedOnly', e?.target?.checked)}
            />
            <Checkbox
              label="Video Introduction Available"
              checked={filters?.videoIntro}
              onChange={(e) => onFilterChange('videoIntro', e?.target?.checked)}
            />
            <Checkbox
              label="Accepts New Clients"
              checked={filters?.acceptingNew}
              onChange={(e) => onFilterChange('acceptingNew', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;





import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylistCard = ({ stylist, onViewProfile, onBookNow }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e) => {
    e?.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'limited':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'booked':
        return 'bg-red-500/20 text-red-600 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  return (
    <div className="glass-card group cursor-pointer" onClick={() => onViewProfile(stylist)}>
      <div className="relative overflow-hidden rounded-t-2xl h-64 md:h-72 lg:h-80">
        <Image
          src={stylist?.image}
          alt={stylist?.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel-strong flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon
            name="Heart"
            size={20}
            className={`transition-all duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>

        <div className={`absolute bottom-4 left-4 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel border ${getAvailabilityColor(stylist?.availability)}`}>
          <span className="text-xs md:text-sm font-cta font-medium whitespace-nowrap">
            {stylist?.availability === 'available' && 'Available Today'}
            {stylist?.availability === 'limited' && 'Limited Slots'}
            {stylist?.availability === 'booked' && 'Fully Booked'}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-headline text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1 truncate">
              {stylist?.name}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground truncate">
              {stylist?.title}
            </p>
          </div>
          
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Icon name="Star" size={16} className="fill-accent text-accent" />
            <span className="font-cta text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
              {stylist?.rating}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {stylist?.specializations?.slice(0, 3)?.map((spec, index) => (
            <span
              key={index}
              className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg glass-panel text-xs md:text-sm text-muted-foreground border border-border"
            >
              {spec}
            </span>
          ))}
          {stylist?.specializations?.length > 3 && (
            <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg glass-panel text-xs md:text-sm text-accent border border-accent/30">
              +{stylist?.specializations?.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Icon name="Award" size={16} className="text-accent" />
            <span className="whitespace-nowrap">{stylist?.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="whitespace-nowrap">{stylist?.clients}+ clients</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={(e) => {
              e?.stopPropagation();
              onViewProfile(stylist);
            }}
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            onClick={(e) => {
              e?.stopPropagation();
              onBookNow(stylist);
            }}
            disabled={stylist?.availability === 'booked'}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylistCard;




import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const StylistMatchQuiz = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    serviceType: '',
    hairType: '',
    stylePreference: '',
    budget: '',
    experience: '',
  });

  const questions = [
    {
      id: 'serviceType',
      question: 'What service are you looking for?',
      options: [
        { value: 'coloring', label: 'Hair Coloring' },
        { value: 'cutting', label: 'Hair Cutting' },
        { value: 'styling', label: 'Styling' },
        { value: 'treatment', label: 'Hair Treatment' },
        { value: 'bridal', label: 'Bridal Services' },
      ],
    },
    {
      id: 'hairType',
      question: 'What is your hair type?',
      options: [
        { value: 'straight', label: 'Straight' },
        { value: 'wavy', label: 'Wavy' },
        { value: 'curly', label: 'Curly' },
        { value: 'coily', label: 'Coily' },
        { value: 'mixed', label: 'Mixed Texture' },
      ],
    },
    {
      id: 'stylePreference',
      question: 'What style do you prefer?',
      options: [
        { value: 'classic', label: 'Classic & Timeless' },
        { value: 'trendy', label: 'Trendy & Modern' },
        { value: 'bold', label: 'Bold & Experimental' },
        { value: 'natural', label: 'Natural & Minimal' },
        { value: 'elegant', label: 'Elegant & Sophisticated' },
      ],
    },
    {
      id: 'budget',
      question: 'What is your budget range?',
      options: [
        { value: 'economy', label: '$50 - $100' },
        { value: 'standard', label: '$100 - $200' },
        { value: 'premium', label: '$200 - $300' },
        { value: 'luxury', label: '$300+' },
      ],
    },
    {
      id: 'experience',
      question: 'Preferred stylist experience level?',
      options: [
        { value: 'any', label: 'Any Experience Level' },
        { value: 'mid', label: '4-7 Years' },
        { value: 'senior', label: '8+ Years' },
        { value: 'master', label: 'Master Stylist (10+ Years)' },
      ],
    },
  ];

  const currentQuestion = questions?.[step - 1];
  const totalSteps = questions?.length;

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion?.id]: value });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isAnswered = answers?.[currentQuestion?.id] !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-panel-strong w-full max-w-2xl rounded-3xl overflow-hidden"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="glass-panel-strong border-b border-border p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground">
              Find Your Perfect Stylist
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center hover:bg-accent/10 transition-colors"
              aria-label="Close quiz"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps })?.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                  index < step ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <p className="text-sm md:text-base text-muted-foreground mt-3">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          <h3 className="font-headline text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-6">
            {currentQuestion?.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion?.options?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleAnswer(option?.value)}
                className={`w-full p-4 md:p-5 rounded-2xl text-left transition-all duration-300 ${
                  answers?.[currentQuestion?.id] === option?.value
                    ? 'glass-panel-strong border-2 border-accent text-accent' :'glass-card hover:border-accent/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-cta text-sm md:text-base font-medium">
                    {option?.label}
                  </span>
                  {answers?.[currentQuestion?.id] === option?.value && (
                    <Icon name="CheckCircle2" size={20} className="text-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel-strong border-t border-border p-4 md:p-6">
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                size="lg"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName={step === totalSteps ? 'Sparkles' : 'ChevronRight'}
              iconPosition="right"
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {step === totalSteps ? 'Find My Stylist' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistMatchQuiz;




import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StylistModal = ({ stylist, onClose, onBookNow, onMessage }) => {
  const [activeTab, setActiveTab] = useState('portfolio');

  if (!stylist) return null;

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-panel-strong w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="sticky top-0 z-10 glass-panel-strong border-b border-border p-4 md:p-6 rounded-t-3xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={stylist?.image}
                  alt={stylist?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-headline text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 truncate">
                  {stylist?.name}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-2 truncate">
                  {stylist?.title}
                </p>
                <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{stylist?.rating}</span>
                  </div>
                  <span>•</span>
                  <span className="whitespace-nowrap">{stylist?.experience}</span>
                  <span>•</span>
                  <span className="whitespace-nowrap">{stylist?.clients}+ clients</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-panel flex items-center justify-center hover:bg-accent/10 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        <div className="border-b border-border overflow-x-auto">
          <div className="flex gap-2 p-4 md:p-6 min-w-max">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl font-cta font-medium transition-all duration-300 flex-shrink-0 ${
                  activeTab === tab?.id
                    ? 'glass-panel-strong text-accent border border-accent/30' :'text-muted-foreground hover:text-foreground hover:bg-accent/5'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="text-sm md:text-base whitespace-nowrap">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-4">
                  Portfolio Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {stylist?.portfolio?.map((item, index) => (
                    <div key={index} className="glass-card overflow-hidden group cursor-pointer">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={item?.image}
                          alt={item?.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs md:text-sm font-medium text-foreground line-clamp-1">
                          {item?.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {stylist?.videoIntro && (
                <div>
                  <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-4">
                    Introduction Video
                  </h3>
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Icon name="Play" size={48} className="text-accent mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Video Player</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-3">
                  About {stylist?.name}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {stylist?.bio}
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-3">
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stylist?.specializations?.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 md:px-4 md:py-2 rounded-xl glass-panel text-sm md:text-base text-foreground border border-border"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-3">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stylist?.languages?.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 md:px-4 md:py-2 rounded-xl glass-panel text-sm md:text-base text-muted-foreground border border-border"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-4">
                Client Reviews ({stylist?.reviews?.length})
              </h3>
              {stylist?.reviews?.map((review) => (
                <div key={review?.id} className="glass-card p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={review?.clientImage}
                        alt={review?.clientImageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-cta text-sm md:text-base font-semibold text-foreground truncate">
                          {review?.clientName}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Icon name="Star" size={14} className="fill-accent text-accent" />
                          <span className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
                            {review?.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {review?.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {review?.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <h3 className="font-headline text-lg md:text-xl font-bold text-foreground mb-4">
                Professional Certifications
              </h3>
              {stylist?.certifications?.map((cert, index) => (
                <div key={index} className="glass-card p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl glass-panel flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-cta text-base md:text-lg font-semibold text-foreground mb-1">
                        {cert?.title}
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        {cert?.issuer}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Issued: {cert?.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 glass-panel-strong border-t border-border p-4 md:p-6 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => onMessage(stylist)}
            >
              Send Message
            </Button>
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onBookNow(stylist)}
              disabled={stylist?.availability === 'booked'}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistModal;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import StylistCard from './components/StylistCard';
import StylistModal from './components/StylistModal';
import FilterPanel from './components/FilterPanel';
import StylistMatchQuiz from './components/StylistMatchQuiz';

const ChooseYourStylist = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [filters, setFilters] = useState({
    specialization: 'all',
    availability: 'all',
    experience: 'all',
    rating: 'all',
    certifiedOnly: false,
    videoIntro: false,
    acceptingNew: false
  });

  const stylists = [
  {
    id: 1,
    name: "Isabella Martinez",
    title: "Master Hair Colorist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19368e8d5-1763301847637.png",
    imageAlt: "Professional female stylist with long dark hair wearing elegant black outfit in modern salon setting",
    rating: 4.9,
    experience: "12 Years",
    clients: 850,
    availability: "available",
    specializations: ["Hair Coloring", "Balayage", "Color Correction", "Highlights", "Ombre"],
    languages: ["English", "Spanish"],
    bio: "Isabella is a master colorist with over 12 years of experience specializing in advanced color techniques. She has trained with top colorists in New York and Paris, bringing cutting-edge techniques to create stunning, personalized color transformations. Her expertise in color theory and commitment to hair health ensures beautiful, long-lasting results.",
    videoIntro: true,
    portfolio: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1045e2fb9-1764765219540.png",
      imageAlt: "Beautiful blonde balayage hair color transformation on long wavy hair with natural highlights",
      title: "Balayage Transformation"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13b3d2191-1766502461242.png",
      imageAlt: "Vibrant red hair color with copper tones on medium length hair styled in loose waves",
      title: "Vibrant Red Color"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa213697-1765358189804.png",
      imageAlt: "Platinum blonde hair color with silver tones on short pixie cut styled sleek",
      title: "Platinum Blonde"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12e67806c-1766520005986.png",
      imageAlt: "Brunette hair with caramel highlights on long straight hair with glossy finish",
      title: "Caramel Highlights"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15a293e5d-1766602191971.png",
      imageAlt: "Rose gold hair color on shoulder length hair with soft curls and dimensional tones",
      title: "Rose Gold Tones"
    },
    {
      image: "https://images.unsplash.com/photo-1665544178332-1c83a1dc0446",
      imageAlt: "Dark chocolate brown hair with subtle highlights on long layered hair styled straight",
      title: "Chocolate Brown"
    }],

    reviews: [
    {
      id: 1,
      clientName: "Sarah Johnson",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1985c262f-1763294244026.png",
      clientImageAlt: "Professional headshot of blonde woman with blue eyes wearing white blouse smiling warmly",
      rating: 5.0,
      date: "January 5, 2026",
      comment: "Isabella is absolutely amazing! She transformed my hair with the most beautiful balayage. She took the time to understand exactly what I wanted and the results exceeded my expectations. Her attention to detail and expertise in color is unmatched."
    },
    {
      id: 2,
      clientName: "Emily Chen",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1839f83d3-1763293825256.png",
      clientImageAlt: "Professional headshot of Asian woman with black hair wearing navy blazer with confident smile",
      rating: 5.0,
      date: "December 28, 2025",
      comment: "Best colorist I've ever been to! Isabella's color correction work is phenomenal. She fixed a previous bad dye job and gave me the most gorgeous color. She's a true artist and I won't trust anyone else with my hair."
    },
    {
      id: 3,
      clientName: "Maria Rodriguez",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36548bd-1763296665300.png",
      clientImageAlt: "Professional headshot of Hispanic woman with brown hair wearing red dress with warm smile",
      rating: 4.8,
      date: "December 15, 2025",
      comment: "Isabella is incredibly talented and professional. She explained every step of the coloring process and made sure I was comfortable throughout. The color she created is exactly what I envisioned. Highly recommend!"
    }],

    certifications: [
    {
      title: "Advanced Color Theory Certification",
      issuer: "Vidal Sassoon Academy",
      date: "March 2022"
    },
    {
      title: "Master Colorist Certification",
      issuer: "L\'Oréal Professional",
      date: "June 2020"
    },
    {
      title: "Balayage Specialist Certification",
      issuer: "Redken Education",
      date: "September 2019"
    }]

  },
  {
    id: 2,
    name: "Marcus Thompson",
    title: "Celebrity Hair Stylist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19f379b97-1763295215528.png",
    imageAlt: "Professional male stylist with short dark hair and beard wearing black shirt in upscale salon environment",
    rating: 4.8,
    experience: "10 Years",
    clients: 720,
    availability: "limited",
    specializations: ["Hair Cutting", "Styling", "Men\'s Grooming", "Texture Work"],
    languages: ["English"],
    bio: "Marcus is a celebrity hair stylist known for his precision cutting and innovative styling techniques. With a decade of experience working with high-profile clients and fashion shows, he brings red-carpet expertise to every appointment. His modern approach to classic cuts and styling has made him one of the most sought-after stylists in the industry.",
    videoIntro: true,
    portfolio: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_11e23fac2-1764641430459.png",
      imageAlt: "Modern men\'s haircut with textured top and fade sides styled with matte finish product",
      title: "Modern Men\'s Cut"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12a613205-1766499886850.png",
      imageAlt: "Sleek bob haircut on woman with straight hair styled with glossy finish and center part",
      title: "Precision Bob"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d691fb2d-1764786603420.png",
      imageAlt: "Layered haircut on long hair with face-framing pieces styled in soft waves",
      title: "Layered Styling"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_188f5e40d-1764786604929.png",
      imageAlt: "Short pixie haircut on woman styled with texture and volume on top",
      title: "Pixie Perfection"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16fa0d539-1764782368286.png",
      imageAlt: "Classic men's pompadour hairstyle with high volume and slicked back sides",
      title: "Classic Pompadour"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18303819e-1767634332436.png",
      imageAlt: "Shag haircut with curtain bangs on medium length hair styled with natural texture",
      title: "Modern Shag"
    }],

    reviews: [
    {
      id: 1,
      clientName: "David Miller",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1296b206a-1763293633760.png",
      clientImageAlt: "Professional headshot of man with brown hair wearing gray suit with confident expression",
      rating: 5.0,
      date: "January 3, 2026",
      comment: "Marcus is the best! He gave me the perfect haircut that works for both professional and casual settings. His attention to detail and understanding of face shapes is impressive. I always leave feeling confident."
    },
    {
      id: 2,
      clientName: "Jennifer Lee",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10768e6f9-1763301570339.png",
      clientImageAlt: "Professional headshot of Asian woman with short black hair wearing white blouse smiling brightly",
      rating: 4.9,
      date: "December 20, 2025",
      comment: "Marcus transformed my hair with an amazing pixie cut. He understood exactly what would work with my face shape and lifestyle. His cutting technique is flawless and the styling tips he gave me are so helpful."
    },
    {
      id: 3,
      clientName: "Robert Anderson",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12b2510c7-1763300947798.png",
      clientImageAlt: "Professional headshot of man with gray hair wearing navy blazer with warm smile",
      rating: 4.7,
      date: "December 10, 2025",
      comment: "Great experience with Marcus. He's professional, skilled, and really listens to what you want. The haircut looks great and is easy to maintain. Will definitely be coming back."
    }],

    certifications: [
    {
      title: "Advanced Cutting Techniques",
      issuer: "Toni&Guy Academy",
      date: "May 2021"
    },
    {
      title: "Men\'s Grooming Specialist",
      issuer: "American Crew",
      date: "August 2020"
    },
    {
      title: "Fashion Week Stylist Certification",
      issuer: "New York Fashion Week",
      date: "February 2019"
    }]

  },
  {
    id: 3,
    name: "Sophia Chen",
    title: "Bridal Hair Specialist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_150474b8c-1766756743789.png",
    imageAlt: "Professional female stylist with elegant updo wearing sophisticated cream dress in luxury salon setting",
    rating: 5.0,
    experience: "8 Years",
    clients: 650,
    availability: "available",
    specializations: ["Bridal Styling", "Updos", "Special Occasions", "Hair Extensions"],
    languages: ["English", "Mandarin"],
    bio: "Sophia specializes in creating breathtaking bridal hairstyles and special occasion looks. With 8 years of experience and hundreds of weddings under her belt, she has mastered the art of creating romantic, timeless styles that photograph beautifully. Her calm demeanor and attention to detail make her a favorite among brides seeking perfection on their special day.",
    videoIntro: true,
    portfolio: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd2f2bd1-1764648662516.png",
      imageAlt: "Elegant bridal updo with soft curls and delicate floral accessories on blonde hair",
      title: "Romantic Bridal Updo"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3f84f15-1768057243362.png",
      imageAlt: "Loose bridal waves with half-up half-down style adorned with pearl pins",
      title: "Soft Bridal Waves"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_168883835-1765225697833.png",
      imageAlt: "Classic chignon bun with braided details and baby\'s breath flowers for wedding",
      title: "Classic Chignon"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_193ead83c-1768057243498.png",
      imageAlt: "Bohemian bridal braid with loose texture and greenery accents on long hair",
      title: "Boho Bridal Braid"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a90ec1ee-1768057243505.png",
      imageAlt: "Sleek low bun with side part and crystal hair accessories for formal event",
      title: "Elegant Low Bun"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18a3e019c-1768057243558.png",
      imageAlt: "Textured updo with volume and romantic loose pieces framing face for wedding",
      title: "Textured Bridal Style"
    }],

    reviews: [
    {
      id: 1,
      clientName: "Amanda White",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c910ab3b-1763298473544.png",
      clientImageAlt: "Professional headshot of blonde woman with blue eyes wearing white dress with joyful smile",
      rating: 5.0,
      date: "December 30, 2025",
      comment: "Sophia made me feel like a princess on my wedding day! She created the most beautiful updo that stayed perfect all day and night. She was so calm and professional during the trial and on the big day. I couldn't have asked for better!"
    },
    {
      id: 2,
      clientName: "Lisa Thompson",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
      clientImageAlt: "Professional headshot of brunette woman with brown eyes wearing pink dress with radiant smile",
      rating: 5.0,
      date: "December 18, 2025",
      comment: "Sophia is absolutely amazing! She did my hair for my wedding and it was exactly what I dreamed of. She listened to all my ideas and created something even more beautiful. The hair lasted through ceremony, photos, and dancing. Highly recommend!"
    },
    {
      id: 3,
      clientName: "Rachel Martinez",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1040de6b2-1763293731979.png",
      clientImageAlt: "Professional headshot of Hispanic woman with dark hair wearing ivory dress with elegant smile",
      rating: 5.0,
      date: "November 25, 2025",
      comment: "Sophia is a true artist! She did hair for me and my bridesmaids and everyone looked stunning. She was organized, professional, and made the morning so relaxing. The styles were gorgeous and held up perfectly. Thank you, Sophia!"
    }],

    certifications: [
    {
      title: "Bridal Hair Specialist Certification",
      issuer: "International Bridal Academy",
      date: "April 2022"
    },
    {
      title: "Advanced Updo Techniques",
      issuer: "Paul Mitchell Schools",
      date: "July 2021"
    },
    {
      title: "Hair Extension Specialist",
      issuer: "Great Lengths",
      date: "January 2020"
    }]

  },
  {
    id: 4,
    name: "James Wilson",
    title: "Texture & Curl Specialist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18799c4d5-1763299918282.png",
    imageAlt: "Professional male stylist with curly hair and glasses wearing casual black attire in modern salon",
    rating: 4.9,
    experience: "9 Years",
    clients: 580,
    availability: "available",
    specializations: ["Curly Hair", "Texture Work", "Natural Hair", "DevaCut"],
    languages: ["English", "French"],
    bio: "James is a certified DevaCurl specialist with extensive experience in cutting and styling textured and curly hair. His deep understanding of curl patterns and texture allows him to create customized cuts that enhance natural beauty. He's passionate about educating clients on proper curl care and helping them embrace their natural texture with confidence.",
    videoIntro: false,
    portfolio: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1edf804be-1765181386065.png",
      imageAlt: "Natural curly hair with defined ringlets and volume styled with curl-enhancing products",
      title: "Defined Curls"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1290608f2-1766549863686.png",
      imageAlt: "Wavy hair with beachy texture and natural movement styled with sea salt spray",
      title: "Beachy Waves"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_11e6302dc-1767806686253.png",
      imageAlt: "Coily hair with tight curl pattern styled in natural afro with shape and definition",
      title: "Natural Afro"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1290608f2-1766549863686.png",
      imageAlt: "Loose curls with soft texture and shine styled with curl cream for bouncy look",
      title: "Soft Curls"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1edf804be-1765181386065.png",
      imageAlt: "Textured pixie cut on curly hair with defined pieces and natural volume",
      title: "Curly Pixie"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10ee7f5c8-1768057241283.png",
      imageAlt: "Medium length curly hair with layers and face-framing curls styled naturally",
      title: "Layered Curls"
    }],

    reviews: [
    {
      id: 1,
      clientName: "Jasmine Brown",
      clientImage: "https://images.unsplash.com/photo-1684422296576-481b2e9810ed",
      clientImageAlt: "Professional headshot of Black woman with natural curly hair wearing yellow top with bright smile",
      rating: 5.0,
      date: "January 2, 2026",
      comment: "James is a curl wizard! He gave me the best DevaCut and taught me how to properly care for my curls. My hair has never looked better. He really understands curly hair and knows how to bring out its natural beauty."
    },
    {
      id: 2,
      clientName: "Michelle Garcia",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18a09b944-1763301498243.png",
      clientImageAlt: "Professional headshot of Hispanic woman with wavy brown hair wearing blue blouse with warm smile",
      rating: 4.9,
      date: "December 22, 2025",
      comment: "Finally found someone who knows how to cut curly hair! James is amazing. He explained everything he was doing and gave me great product recommendations. My curls are so much more defined and manageable now."
    },
    {
      id: 3,
      clientName: "Taylor Johnson",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6a9f69d-1763296590694.png",
      clientImageAlt: "Professional headshot of woman with curly red hair wearing green dress with confident smile",
      rating: 4.8,
      date: "December 8, 2025",
      comment: "James transformed my curls! He\'s so knowledgeable about texture and curl patterns. The cut he gave me works perfectly with my natural texture. I\'m so happy I found him!"
    }],

    certifications: [
    {
      title: "DevaCurl Certified Specialist",
      issuer: "DevaChan Academy",
      date: "June 2021"
    },
    {
      title: "Natural Hair Care Certification",
      issuer: "Texture Hair Academy",
      date: "September 2020"
    },
    {
      title: "Advanced Curl Cutting Techniques",
      issuer: "Ouidad Salon",
      date: "March 2019"
    }]

  },
  {
    id: 5,
    name: "Emma Rodriguez",
    title: "Hair Treatment Expert",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a30b37b3-1763295571780.png",
    imageAlt: "Professional female stylist with sleek brown hair wearing white coat in clinical salon environment",
    rating: 4.7,
    experience: "7 Years",
    clients: 490,
    availability: "limited",
    specializations: ["Keratin Treatments", "Hair Repair", "Scalp Care", "Smoothing"],
    languages: ["English", "Spanish", "Portuguese"],
    bio: "Emma specializes in transformative hair treatments that restore health and vitality to damaged hair. With expertise in keratin treatments, bond repair systems, and scalp health, she helps clients achieve smooth, healthy, manageable hair. Her holistic approach combines advanced treatment techniques with personalized care routines for long-lasting results.",
    videoIntro: true,
    portfolio: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13410bc67-1764658795895.png",
      imageAlt: "Smooth straight hair with glossy shine after keratin treatment showing healthy texture",
      title: "Keratin Treatment"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_120b40165-1766549863219.png",
      imageAlt: "Restored damaged hair with improved texture and shine after bond repair treatment",
      title: "Bond Repair"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_113a39f47-1764658796265.png",
      imageAlt: "Healthy scalp and hair roots after deep conditioning treatment with visible improvement",
      title: "Scalp Treatment"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15939a1f7-1768057241324.png",
      imageAlt: "Frizz-free smooth hair with natural movement after smoothing treatment",
      title: "Smoothing Service"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_120b40165-1766549863219.png",
      imageAlt: "Revitalized hair with restored elasticity and shine after protein treatment",
      title: "Protein Treatment"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_19ec5918a-1768057241050.png",
      imageAlt: "Hydrated hair with improved moisture balance after deep conditioning mask",
      title: "Deep Conditioning"
    }],

    reviews: [
    {
      id: 1,
      clientName: "Nicole Davis",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_16e75c406-1763294340369.png",
      clientImageAlt: "Professional headshot of woman with straight blonde hair wearing gray blazer with satisfied smile",
      rating: 5.0,
      date: "December 28, 2025",
      comment: "Emma saved my damaged hair! The keratin treatment she did was life-changing. My hair is so smooth and manageable now. She really knows her stuff when it comes to hair health and treatments."
    },
    {
      id: 2,
      clientName: "Patricia Wilson",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
      clientImageAlt: "Professional headshot of woman with brown hair wearing blue top with grateful expression",
      rating: 4.8,
      date: "December 15, 2025",
      comment: "Emma is wonderful! She assessed my hair damage and recommended the perfect treatment plan. My hair feels healthier than it has in years. She\'s knowledgeable and really cares about hair health."
    },
    {
      id: 3,
      clientName: "Karen Martinez",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a36548bd-1763296665300.png",
      clientImageAlt: "Professional headshot of Hispanic woman with dark hair wearing red dress with happy smile",
      rating: 4.5,
      date: "November 30, 2025",
      comment: "Great experience with Emma. The treatment she recommended worked wonders on my frizzy hair. She explained everything clearly and gave me good advice for maintaining the results at home."
    }],

    certifications: [
    {
      title: "Keratin Treatment Specialist",
      issuer: "Brazilian Blowout",
      date: "August 2022"
    },
    {
      title: "Olaplex Bond Building Certification",
      issuer: "Olaplex Inc.",
      date: "May 2021"
    },
    {
      title: "Trichology Fundamentals",
      issuer: "International Association of Trichologists",
      date: "February 2020"
    }]

  },
  {
    id: 6,
    name: "Alexander Kim",
    title: "Editorial Stylist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_150474b8c-1766756743789.png",
    imageAlt: "Professional male stylist with modern hairstyle wearing designer black outfit in artistic salon space",
    rating: 4.8,
    experience: "11 Years",
    clients: 620,
    availability: "booked",
    specializations: ["Editorial Styling", "Fashion Shows", "Photo Shoots", "Avant-Garde"],
    languages: ["English", "Korean"],
    bio: "Alexander is an award-winning editorial stylist with extensive experience in fashion shows, photo shoots, and editorial work. His creative vision and technical expertise have been featured in major fashion publications. He brings high-fashion artistry to every client, creating bold, innovative looks that push boundaries while maintaining wearability.",
    videoIntro: true,
    portfolio: [
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_181a530bc-1768057243464.png",
      imageAlt: "Avant-garde hairstyle with geometric shapes and bold structure for fashion editorial",
      title: "Editorial Avant-Garde"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1206f9af0-1768057243525.png",
      imageAlt: "High fashion sleek ponytail with dramatic height and shine for runway show",
      title: "Runway Ready"
    },
    {
      image: "https://images.unsplash.com/photo-1606251706444-d069cd266189",
      imageAlt: "Creative braided updo with intricate patterns and texture for photo shoot",
      title: "Creative Braiding"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15feb5c2c-1764648659544.png",
      imageAlt: "Bold asymmetric haircut with sharp lines and modern edge for fashion campaign",
      title: "Asymmetric Edge"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd34e8b5-1768057246929.png",
      imageAlt: "Textured mohawk style with volume and definition for editorial magazine spread",
      title: "Modern Mohawk"
    },
    {
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6225c90-1768057242436.png",
      imageAlt: "Sculptural updo with architectural elements and clean lines for haute couture show",
      title: "Sculptural Style"
    }],

    reviews: [
    {
      id: 1,
      clientName: "Victoria Chang",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfcb00c3-1763300954016.png",
      clientImageAlt: "Professional headshot of Asian woman with edgy short hair wearing black leather jacket with confident look",
      rating: 5.0,
      date: "December 20, 2025",
      comment: "Alexander is a true artist! He created the most amazing editorial look for my photo shoot. His creativity and technical skill are outstanding. He knows how to push boundaries while keeping the look wearable."
    },
    {
      id: 2,
      clientName: "Olivia Bennett",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8e083cd-1763296000743.png",
      clientImageAlt: "Professional headshot of woman with platinum blonde hair wearing white top with sophisticated expression",
      rating: 4.9,
      date: "December 5, 2025",
      comment: "Working with Alexander was incredible! He has such a unique vision and the skills to execute it perfectly. The hairstyle he created for my fashion show was stunning and got so many compliments."
    },
    {
      id: 3,
      clientName: "Sophia Anderson",
      clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a0c8e8cf-1763298176198.png",
      clientImageAlt: "Professional headshot of woman with bold red hair wearing designer outfit with artistic expression",
      rating: 4.6,
      date: "November 18, 2025",
      comment: "Alexander is very talented and creative. He gave me a bold new look that I absolutely love. His editorial background really shows in his work. Great experience overall!"
    }],

    certifications: [
    {
      title: "Fashion Week Master Stylist",
      issuer: "Paris Fashion Week",
      date: "October 2022"
    },
    {
      title: "Editorial Styling Certification",
      issuer: "Vogue Beauty Academy",
      date: "June 2021"
    },
    {
      title: "Avant-Garde Hair Design",
      issuer: "London Hair Academy",
      date: "March 2020"
    }]

  }];


  const [filteredStylists, setFilteredStylists] = useState(stylists);

  useEffect(() => {
    let result = stylists;

    if (searchQuery) {
      result = result?.filter(
        (stylist) =>
        stylist?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        stylist?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        stylist?.specializations?.some((spec) =>
        spec?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    if (filters?.specialization !== 'all') {
      result = result?.filter((stylist) =>
      stylist?.specializations?.some((spec) =>
      spec?.toLowerCase()?.includes(filters?.specialization?.toLowerCase())
      )
      );
    }

    if (filters?.availability !== 'all') {
      result = result?.filter((stylist) => stylist?.availability === filters?.availability);
    }

    if (filters?.experience !== 'all') {
      result = result?.filter((stylist) => {
        const years = parseInt(stylist?.experience);
        if (filters?.experience === '1-3') return years >= 1 && years <= 3;
        if (filters?.experience === '4-7') return years >= 4 && years <= 7;
        if (filters?.experience === '8+') return years >= 8;
        return true;
      });
    }

    if (filters?.rating !== 'all') {
      const minRating = parseFloat(filters?.rating);
      result = result?.filter((stylist) => stylist?.rating >= minRating);
    }

    if (filters?.certifiedOnly) {
      result = result?.filter((stylist) => stylist?.certifications?.length > 0);
    }

    if (filters?.videoIntro) {
      result = result?.filter((stylist) => stylist?.videoIntro);
    }

    if (filters?.acceptingNew) {
      result = result?.filter((stylist) => stylist?.availability !== 'booked');
    }

    setFilteredStylists(result);
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      specialization: 'all',
      availability: 'all',
      experience: 'all',
      rating: 'all',
      certifiedOnly: false,
      videoIntro: false,
      acceptingNew: false
    });
    setSearchQuery('');
  };

  const handleViewProfile = (stylist) => {
    setSelectedStylist(stylist);
  };

  const handleBookNow = (stylist) => {
    navigate('/book-date-time', { state: { selectedStylist: stylist } });
  };

  const handleMessage = (stylist) => {
    alert(`Message feature coming soon! You can contact ${stylist?.name} directly.`);
  };

  const handleQuizComplete = (answers) => {
    setShowQuiz(false);
    alert('Based on your preferences, we recommend checking out our top-rated stylists!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="glass-panel-strong border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Choose Your Perfect Stylist
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                Meet our team of expert stylists and find the perfect match for your beauty needs. 
                Each professional brings unique skills and specializations to create your ideal look.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Sparkles"
                  iconPosition="left"
                  onClick={() => setShowQuiz(true)}>

                  Take Stylist Match Quiz
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName={showFilters ? 'X' : 'SlidersHorizontal'}
                  iconPosition="left"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden">

                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6 md:mb-8">
            <Input
              type="search"
              placeholder="Search by name, specialty, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="max-w-2xl mx-auto" />

          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <aside className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters} />

              </div>
            </aside>

            <div className="flex-1">
              {filteredStylists?.length > 0 ?
              <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm md:text-base text-muted-foreground">
                      Showing {filteredStylists?.length} {filteredStylists?.length === 1 ? 'stylist' : 'stylists'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filteredStylists?.map((stylist) =>
                  <StylistCard
                    key={stylist?.id}
                    stylist={stylist}
                    onViewProfile={handleViewProfile}
                    onBookNow={handleBookNow} />

                  )}
                  </div>
                </> :

              <div className="glass-card p-12 text-center">
                  <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">
                    No Stylists Found
                  </h3>
                  <p className="text-base text-muted-foreground mb-6">
                    Try adjusting your filters or search criteria to find more stylists.
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {selectedStylist &&
      <StylistModal
        stylist={selectedStylist}
        onClose={() => setSelectedStylist(null)}
        onBookNow={handleBookNow}
        onMessage={handleMessage} />

      }
      {showQuiz &&
      <StylistMatchQuiz
        onComplete={handleQuizComplete}
        onClose={() => setShowQuiz(false)} />

      }
    </div>);

};

export default ChooseYourStylist;



import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 glass-panel"></div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel-strong rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 md:mb-8"
          >
            <Icon name="Sparkles" size={40} color="var(--color-accent)" />
          </motion.div>

          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Ready to Transform Your Look?
          </h2>

          <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            Book your appointment today and experience the clarity, luxury, and confidence that comes with professional beauty care at GlassLux Salon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
            <Link to="/book-date-time" className="w-full sm:w-auto">
              <Button 
                variant="default" 
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                fullWidth
                className="text-base md:text-lg px-8 md:px-10 py-4"
              >
                Book Your Appointment
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg"
                iconName="Sparkles"
                iconPosition="left"
                fullWidth
                className="text-base md:text-lg px-8 md:px-10 py-4"
              >
                Explore Services
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 pt-8 md:pt-10 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center">
                <Icon name="Phone" size={20} color="var(--color-accent)" />
              </div>
              <div className="text-left">
                <p className="text-muted-foreground text-xs md:text-sm">Call us</p>
                <p className="text-foreground font-cta text-sm md:text-base font-semibold whitespace-nowrap">
                  (555) 123-4567
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-border"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center">
                <Icon name="Mail" size={20} color="var(--color-accent)" />
              </div>
              <div className="text-left">
                <p className="text-muted-foreground text-xs md:text-sm">Email us</p>
                <p className="text-foreground font-cta text-sm md:text-base font-semibold">
                  hello@glasslux.com
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-border"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card flex items-center justify-center">
                <Icon name="MapPin" size={20} color="var(--color-accent)" />
              </div>
              <div className="text-left">
                <p className="text-muted-foreground text-xs md:text-sm">Visit us</p>
                <p className="text-foreground font-cta text-sm md:text-base font-semibold">
                  123 Luxury Ave, NYC
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const heroFeatures = [
  {
    icon: "Sparkles",
    title: "Premium Services",
    description: "Expert styling & treatments"
  },
  {
    icon: "Users",
    title: "Master Stylists",
    description: "Award-winning professionals"
  },
  {
    icon: "Calendar",
    title: "Easy Booking",
    description: "Schedule in seconds"
  }];


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1706629506571-a6d86798916b"
          alt="Luxurious modern salon interior with elegant styling chairs, large mirrors with professional lighting, and sophisticated champagne-toned decor creating an upscale beauty sanctuary atmosphere"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel-strong rounded-3xl p-8 md:p-12 lg:p-16 mb-8 md:mb-12">

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-6 md:mb-8">

              <Icon name="Award" size={20} color="var(--color-accent)" />
              <span className="text-accent font-cta text-sm md:text-base font-semibold">Award-Winning Salon Experience</span>
            </motion.div>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Your Reflection,
              <span className="block text-accent mt-2">Perfected</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience clarity in beauty through our transparent luxury services. Where sophisticated glassmorphism design meets world-class styling expertise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link to="/book-date-time" className="w-full sm:w-auto">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  fullWidth
                  className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">

                  Book Appointment
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Sparkles"
                  iconPosition="left"
                  fullWidth
                  className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">

                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

            {heroFeatures?.map((feature, index) =>
            <motion.div
              key={feature?.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="glass-card p-6 md:p-8 rounded-2xl hover:scale-105 transition-transform duration-300">

                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={28} color="var(--color-accent)" />
                </div>
                <h3 className="font-cta text-lg md:text-xl font-semibold text-foreground mb-2">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {feature?.description}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-10">

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 cursor-pointer">

          <span className="text-muted-foreground text-xs md:text-sm font-cta">Scroll to explore</span>
          <Icon name="ChevronDown" size={24} color="var(--color-accent)" />
        </motion.div>
      </motion.div>
    </section>);

};

export default HeroSection;

import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InstagramSection = () => {
  const instagramPosts = [
  {
    id: 1,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1045e2fb9-1764765219540.png",
    imageAlt: "Stunning before and after hair transformation showing client's journey from dark brown to beautiful blonde balayage with perfect toning in luxury salon setting",
    likes: 1247,
    comments: 89
  },
  {
    id: 2,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14f9e2de0-1767088493849.png",
    imageAlt: "Elegant bridal updo hairstyle with delicate white flowers and pearl accessories, showcasing intricate braiding and sophisticated styling for wedding day",
    likes: 2156,
    comments: 134
  },
  {
    id: 3,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_171e51832-1767771092289.png",
    imageAlt: "Professional hairstylist creating beautiful layered haircut with precision scissors, demonstrating expert cutting technique in modern glassmorphism salon interior",
    likes: 987,
    comments: 67
  },
  {
    id: 4,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_190d83868-1768057242732.png",
    imageAlt: "Close-up of vibrant hair color application process showing rich caramel highlights being painted onto dark hair sections with professional coloring brush",
    likes: 1543,
    comments: 102
  },
  {
    id: 5,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_136e4d492-1765823582417.png",
    imageAlt: "Modern men\'s grooming session featuring precision fade haircut and beard styling with professional clippers in contemporary barbershop atmosphere",
    likes: 1876,
    comments: 145
  },
  {
    id: 6,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9eb5c47-1768040812456.png",
    imageAlt: "Luxurious hair treatment application showing stylist massaging restorative keratin treatment into client\'s long flowing hair for ultimate shine and health",
    likes: 1324,
    comments: 91
  }];


  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">

          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="Instagram" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Follow Us</span>
          </div>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            #GlassLuxTransformations
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 md:mb-8">
            Join our community and share your beauty journey. Follow us on Instagram for daily inspiration, styling tips, and exclusive behind-the-scenes content.
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-accent/10 transition-all duration-300">

            <Icon name="Instagram" size={20} color="var(--color-accent)" />
            <span className="text-foreground font-cta text-sm md:text-base font-semibold">
              @glassluxsalon
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {instagramPosts?.map((post, index) =>
          <motion.div
            key={post?.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer">

              <Image
              src={post?.image}
              alt={post?.imageAlt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={20} color="var(--color-accent)" />
                    <span className="text-foreground text-sm font-cta font-semibold">
                      {post?.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} color="var(--color-accent)" />
                    <span className="text-foreground text-sm font-cta font-semibold">
                      {post?.comments}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass-panel-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="Instagram" size={16} color="var(--color-accent)" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default InstagramSection;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServicesSection = () => {
  const services = [
  {
    id: 1,
    title: "Hair Styling",
    description: "Expert cuts, styling, and transformations by master stylists",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1234dbe69-1767974297384.png",
    imageAlt: "Professional female hairstylist with blonde hair in black uniform carefully cutting and styling client's long brown hair in modern salon with bright lighting",
    icon: "Scissors",
    price: "From $85",
    duration: "60-90 min",
    popular: true
  },
  {
    id: 2,
    title: "Color Services",
    description: "Premium coloring, highlights, and balayage techniques",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f",
    imageAlt: "Close-up of professional colorist applying rich brown hair dye with precision brush to client\'s hair sections in upscale salon setting",
    icon: "Palette",
    price: "From $120",
    duration: "2-3 hours",
    popular: true
  },
  {
    id: 3,
    title: "Hair Treatments",
    description: "Restorative treatments for healthy, lustrous hair",
    image: "https://images.unsplash.com/photo-1652807132121-dabf0bda4e20",
    imageAlt: "Relaxed woman with eyes closed receiving luxurious hair treatment application with professional stylist massaging treatment into her long dark hair",
    icon: "Droplets",
    price: "From $65",
    duration: "45-60 min",
    popular: false
  },
  {
    id: 4,
    title: "Special Occasions",
    description: "Bridal styling, updos, and event-ready looks",
    image: "https://images.unsplash.com/photo-1594032633387-599feebc8299",
    imageAlt: "Elegant bride with sophisticated updo hairstyle adorned with delicate white flowers and pearl accessories, professional makeup highlighting natural beauty",
    icon: "Crown",
    price: "From $150",
    duration: "90-120 min",
    popular: false
  },
  {
    id: 5,
    title: "Men\'s Grooming",
    description: "Precision cuts, beard styling, and grooming services",
    image: "https://images.unsplash.com/photo-1669568921948-f0346e0ee73e",
    imageAlt: "Professional male barber in black apron using electric trimmer to style young man\'s short dark hair and beard in modern barbershop with vintage decor",
    icon: "User",
    price: "From $55",
    duration: "45 min",
    popular: false
  },
  {
    id: 6,
    title: "Extensions & Styling",
    description: "Premium hair extensions and advanced styling techniques",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1234dbe69-1767974297384.png",
    imageAlt: "Stylist\'s hands carefully applying and blending long blonde hair extensions into client\'s natural hair using professional techniques in bright modern salon",
    icon: "Wand2",
    price: "From $200",
    duration: "2-4 hours",
    popular: false
  }];


  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">

          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="Sparkles" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Our Services</span>
          </div>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Transparent Luxury Services
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Experience clarity in beauty with our comprehensive range of premium services, each designed to enhance your natural radiance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services?.map((service, index) =>
          <motion.div
            key={service?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl overflow-hidden group">

              {service?.popular &&
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full glass-panel-strong">
                  <span className="text-accent text-xs md:text-sm font-cta font-semibold">Popular</span>
                </div>
            }

              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <Image
                src={service?.image}
                alt={service?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-panel-strong flex items-center justify-center">
                      <Icon name={service?.icon} size={24} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h3 className="font-cta text-lg md:text-xl font-semibold text-foreground">
                        {service?.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 line-clamp-2">
                  {service?.description}
                </p>

                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={18} color="var(--color-accent)" />
                    <span className="text-foreground font-cta text-sm md:text-base font-semibold whitespace-nowrap">
                      {service?.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                      {service?.duration}
                    </span>
                  </div>
                </div>

                <Link to="/book-date-time" className="block">
                  <Button
                  variant="outline"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="right"
                  className="group-hover:bg-accent/10">

                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12 md:mt-16">

          <Link to="/services">
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="text-base md:text-lg px-6 md:px-8">

              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>);

};

export default ServicesSection;



import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StylistsSection = () => {
  const stylists = [
  {
    id: 1,
    name: "Isabella Martinez",
    title: "Master Stylist & Color Specialist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_150474b8c-1766756743789.png",
    imageAlt: "Professional female hairstylist Isabella Martinez with blonde hair wearing elegant black uniform, smiling confidently in modern luxury salon with professional lighting",
    specialties: ["Balayage", "Color Correction", "Bridal Styling"],
    experience: "12 years",
    rating: 4.9,
    reviews: 287
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Creative Director & Hair Artist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4c2c18d-1763296854990.png",
    imageAlt: "Professional male stylist Marcus Chen with short dark hair in black apron, holding styling tools with confident expression in contemporary barbershop setting",
    specialties: ["Precision Cuts", "Men\'s Grooming", "Avant-Garde"],
    experience: "15 years",
    rating: 5.0,
    reviews: 342
  },
  {
    id: 3,
    name: "Sophia Anderson",
    title: "Senior Stylist & Extension Expert",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa624c6c-1766869193920.png",
    imageAlt: "Elegant senior stylist Sophia Anderson with sophisticated updo hairstyle, wearing professional attire and pearl accessories, radiating expertise and grace in upscale salon",
    specialties: ["Extensions", "Updos", "Special Events"],
    experience: "10 years",
    rating: 4.8,
    reviews: 219
  }];


  return (
    <section className="py-16 md:py-20 lg:py-24 glass-panel">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">

          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="Users" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Our Team</span>
          </div>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Meet Our Master Stylists
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Award-winning professionals dedicated to bringing your vision to life with expertise and artistry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stylists?.map((stylist, index) =>
          <motion.div
            key={stylist?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl overflow-hidden group">

              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                <Image
                src={stylist?.image}
                alt={stylist?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 right-4 glass-panel-strong px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} color="var(--color-accent)" />
                    <span className="text-accent text-sm font-cta font-semibold">{stylist?.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">
                  {stylist?.name}
                </h3>
                
                <p className="text-accent text-sm md:text-base font-cta font-semibold mb-4">
                  {stylist?.title}
                </p>

                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Award" size={18} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                      {stylist?.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={18} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                      {stylist?.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="mb-4 md:mb-6">
                  <p className="text-muted-foreground text-xs md:text-sm mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {stylist?.specialties?.map((specialty, idx) =>
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full glass-card text-foreground text-xs md:text-sm font-cta">

                        {specialty}
                      </span>
                  )}
                  </div>
                </div>

                <Link to="/choose-your-stylist" className="block">
                  <Button
                  variant="outline"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="right">

                    Book with {stylist?.name?.split(' ')?.[0]}
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12 md:mt-16">

          <Link to="/choose-your-stylist">
            <Button
              variant="default"
              size="lg"
              iconName="Users"
              iconPosition="right"
              className="text-base md:text-lg px-6 md:px-8">

              View All Stylists
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>);

};

export default StylistsSection;



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: "Emily Richardson",
    role: "Marketing Executive",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18652783a-1763294194429.png",
    imageAlt: "Professional woman Emily Richardson with elegant updo hairstyle, wearing pearl accessories and sophisticated makeup, smiling warmly against soft neutral background",
    rating: 5,
    text: "GlassLux Salon transformed my wedding day look beyond my wildest dreams. Isabella's attention to detail and artistic vision created the perfect bridal style. The entire experience felt luxurious yet comfortable. I've never felt more beautiful and confident.",
    service: "Bridal Styling Package",
    date: "December 2025"
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Tech Entrepreneur",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17f4e6f32-1763299691321.png",
    imageAlt: "Professional businessman Michael Torres with neat short dark hair and well-groomed beard, wearing navy suit with confident smile in modern office setting",
    rating: 5,
    text: "Marcus is a true master of his craft. His precision cuts and grooming expertise have elevated my professional image significantly. The glassmorphism aesthetic of the salon creates such a calming, premium atmosphere. Worth every penny.",
    service: "Men\'s Grooming & Styling",
    date: "January 2026"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Fashion Designer",
    image: "https://images.unsplash.com/photo-1636393913936-187da0a372e3",
    imageAlt: "Stylish woman Sarah Chen with flowing blonde hair styled in loose waves, wearing elegant black outfit with artistic jewelry, radiating creative confidence",
    rating: 5,
    text: "The balayage color work Sophia did is absolutely stunning. She understood exactly what I wanted and delivered results that exceeded my expectations. The transparency in pricing and the luxurious experience make GlassLux my go-to salon.",
    service: "Balayage & Color Treatment",
    date: "December 2025"
  }];


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials?.length);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 glass-panel"></div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">

          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="MessageCircle" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Client Stories</span>
          </div>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            What Our Clients Say
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Real experiences from real clients who've discovered clarity in beauty at GlassLux Salon.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-panel-strong rounded-3xl p-8 md:p-12 lg:p-16">

              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                <div className="w-full lg:w-1/3 flex-shrink-0">
                  <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto rounded-2xl overflow-hidden glass-card">
                      <Image
                        src={testimonials?.[activeIndex]?.image}
                        alt={testimonials?.[activeIndex]?.imageAlt}
                        className="w-full h-full object-cover" />

                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 glass-panel-strong px-4 py-2 rounded-full">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonials?.[activeIndex]?.rating)]?.map((_, i) =>
                        <Icon key={i} name="Star" size={16} color="var(--color-accent)" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6 md:mb-8">
                    <Icon name="Quote" size={48} color="var(--color-accent)" className="opacity-20 mb-4" />
                    <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8">
                      {testimonials?.[activeIndex]?.text}
                    </p>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <h4 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">
                      {testimonials?.[activeIndex]?.name}
                    </h4>
                    <p className="text-accent text-sm md:text-base font-cta font-semibold mb-2">
                      {testimonials?.[activeIndex]?.role}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                      <Icon name="Sparkles" size={16} color="var(--color-accent)" />
                      <span className="text-muted-foreground text-xs md:text-sm">
                        {testimonials?.[activeIndex]?.service}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
                      <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-muted-foreground text-xs md:text-sm">
                        {testimonials?.[activeIndex]?.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center hover:bg-accent/10 transition-all duration-300"
              aria-label="Previous testimonial">

              <Icon name="ChevronLeft" size={24} color="var(--color-foreground)" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-muted'}`
                }
                aria-label={`Go to testimonial ${index + 1}`} />

              )}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center hover:bg-accent/10 transition-all duration-300"
              aria-label="Next testimonial">

              <Icon name="ChevronRight" size={24} color="var(--color-foreground)" />
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;


import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSection = () => {
  const trustBadges = [
    {
      icon: "Shield",
      title: "Secure Booking",
      description: "SSL encrypted payment processing"
    },
    {
      icon: "Award",
      title: "Certified Professionals",
      description: "Licensed & award-winning stylists"
    },
    {
      icon: "Star",
      title: "5-Star Rated",
      description: "4.9/5 from 1,200+ reviews"
    },
    {
      icon: "Clock",
      title: "Flexible Scheduling",
      description: "Easy rescheduling & cancellation"
    }
  ];

  const stats = [
    { value: "15K+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "25+", label: "Expert Stylists" },
    { value: "12", label: "Years Experience" }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 glass-panel">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full glass-card mb-4 md:mb-6">
            <Icon name="ShieldCheck" size={20} color="var(--color-accent)" />
            <span className="text-accent font-cta text-sm md:text-base font-semibold">Trust & Excellence</span>
          </div>
          
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Your Trust, Our Priority
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Experience peace of mind with our commitment to security, professionalism, and exceptional service quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {trustBadges?.map((badge, index) => (
            <motion.div
              key={badge?.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Icon name={badge?.icon} size={32} color="var(--color-accent)" />
              </div>
              <h3 className="font-cta text-lg md:text-xl font-semibold text-foreground mb-2">
                {badge?.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                {badge?.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-panel-strong rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats?.map((stat, index) => (
              <motion.div
                key={stat?.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2 md:mb-4">
                  {stat?.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base font-cta">
                  {stat?.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;



import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StylistsSection from './components/StylistsSection';
import TestimonialsSection from './components/TestimonialsSection';
import InstagramSection from './components/InstagramSection';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <HeroSection />
        <ServicesSection />
        <StylistsSection />
        <TestimonialsSection />
        <InstagramSection />
        <TrustSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;


import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BiometricButton = ({ onAuthenticate }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [biometricType, setBiometricType] = useState(null);

  useEffect(() => {
    const checkBiometricSupport = () => {
      if (window.PublicKeyCredential) {
        setIsSupported(true);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setBiometricType(isTouchDevice ? 'fingerprint' : 'scan-face');
      }
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      await onAuthenticate();
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleBiometricAuth}
      className="glass-card w-full p-4 flex items-center justify-center gap-3 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
      aria-label="Sign in with biometric authentication"
    >
      <Icon name={biometricType} size={20} color="var(--color-accent)" />
      <span className="font-cta text-body-md text-accent">
        Use {biometricType === 'fingerprint' ? 'Touch ID' : 'Face ID'}
      </span>
    </button>
  );
};

export default BiometricButton;


import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="glass-panel-strong w-full max-w-md rounded-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-heading-lg md:text-heading-xl font-bold text-foreground">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-accent/10 transition-all duration-300"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-body-md text-muted-foreground">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <Input
              type="email"
              label="Email Address"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
              error={error}
              required
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                fullWidth
                iconName="Send"
                iconPosition="right"
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
              <Icon name="Mail" size={32} color="var(--color-success)" />
            </div>
            <div className="space-y-2">
              <h3 className="font-cta text-heading-md font-semibold text-foreground">
                Check Your Email
              </h3>
              <p className="text-body-md text-muted-foreground">
                We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
            <Button
              variant="default"
              fullWidth
              onClick={handleClose}
            >
              Got It
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;



import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { level: 0, text: '', color: '' };
    
    let strength = 0;
    if (pwd?.length >= 8) strength++;
    if (pwd?.length >= 12) strength++;
    if (/[a-z]/?.test(pwd) && /[A-Z]/?.test(pwd)) strength++;
    if (/\d/?.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/?.test(pwd)) strength++;

    const levels = [
      { level: 0, text: '', color: '' },
      { level: 1, text: 'Weak', color: 'bg-error' },
      { level: 2, text: 'Fair', color: 'bg-warning' },
      { level: 3, text: 'Good', color: 'bg-accent' },
      { level: 4, text: 'Strong', color: 'bg-success' },
      { level: 5, text: 'Very Strong', color: 'bg-success' }
    ];

    return levels?.[strength];
  };

  let strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`flex-1 rounded-full transition-all duration-300 ${
              level <= strength?.level ? strength?.color : 'bg-muted/30'
            }`}
          />
        ))}
      </div>
      {strength?.text && (
        <p className="text-body-sm text-muted-foreground">
          Password strength: <span className="font-medium">{strength?.text}</span>
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;


import React from 'react';

const RememberMeToggle = ({ checked, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e?.target?.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 glass-card rounded-full peer-checked:bg-accent/20 peer-checked:border-accent/50 transition-all duration-300" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full transition-all duration-300 peer-checked:translate-x-5 peer-checked:bg-accent" />
      </div>
      <span className="text-body-md text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        Remember me for 30 days
      </span>
    </label>
  );
};

export default RememberMeToggle;import React from 'react';

const RememberMeToggle = ({ checked, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e?.target?.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 glass-card rounded-full peer-checked:bg-accent/20 peer-checked:border-accent/50 transition-all duration-300" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full transition-all duration-300 peer-checked:translate-x-5 peer-checked:bg-accent" />
      </div>
      <span className="text-body-md text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        Remember me for 30 days
      </span>
    </label>
  );
};

export default RememberMeToggle;


import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialLoginButton = ({ provider, icon, onClick, disabled }) => {
  const providerColors = {
    google: 'hover:bg-red-500/10 hover:border-red-500/30',
    facebook: 'hover:bg-blue-500/10 hover:border-blue-500/30',
    apple: 'hover:bg-gray-800/10 hover:border-gray-800/30'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`glass-card w-full p-4 flex items-center justify-center gap-3 transition-all duration-300 ${providerColors?.[provider]} disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={`Sign in with ${provider}`}
    >
      <Icon name={icon} size={20} />
      <span className="font-cta text-body-md">
        Continue with {provider?.charAt(0)?.toUpperCase() + provider?.slice(1)}
      </span>
    </button>
  );
};

export default SocialLoginButton;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SocialLoginButton from './components/SocialLoginButton';
import BiometricButton from './components/BiometricButton';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import RememberMeToggle from './components/RememberMeToggle';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [shakeError, setShakeError] = useState(false);

  const mockCredentials = {
    email: 'client@glasslux.com',
    password: 'GlassLux2026!'
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoginError('');

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        navigate('/homepage');
      } else {
        setLoginError('Invalid email or password. Please use: client@glasslux.com / GlassLux2026!');
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/homepage');
    }, 1500);
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/homepage');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Sign In - GlassLux Salon | Premium Beauty Services</title>
        <meta name="description" content="Sign in to your GlassLux Salon account to manage appointments, view your beauty journey, and access exclusive member benefits." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="main-content flex-1 flex items-center justify-center px-4 py-8 md:py-12">
          <div className="w-full max-w-md">
            <div className="glass-panel-strong rounded-2xl p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <Icon name="Sparkles" size={32} color="var(--color-accent)" />
                </div>
                <h1 className="font-headline text-heading-xl md:text-heading-2xl font-bold text-foreground">
                  Welcome Back
                </h1>
                <p className="text-body-md md:text-body-lg text-muted-foreground">
                  Sign in to continue your beauty journey
                </p>
              </div>

              {loginError && (
                <div className={`glass-card p-4 border-error/50 bg-error/10 rounded-xl ${shakeError ? 'animate-shake' : ''}`}>
                  <div className="flex items-start gap-3">
                    <Icon name="AlertCircle" size={20} color="var(--color-error)" />
                    <p className="text-body-sm text-error flex-1">{loginError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={formData?.email}
                  onChange={handleChange}
                  error={errors?.email}
                  required
                />

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={formData?.password}
                      onChange={handleChange}
                      error={errors?.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors duration-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>
                  <PasswordStrengthIndicator password={formData?.password} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <RememberMeToggle
                    checked={rememberMe}
                    onChange={setRememberMe}
                  />
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-body-sm text-accent hover:text-accent/80 transition-colors duration-300 text-left sm:text-right"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  loading={isLoading}
                  iconName="LogIn"
                  iconPosition="right"
                >
                  Sign In
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-body-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <SocialLoginButton
                  provider="google"
                  icon="Chrome"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                />
                <SocialLoginButton
                  provider="facebook"
                  icon="Facebook"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                />
                <SocialLoginButton
                  provider="apple"
                  icon="Apple"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                />
                <BiometricButton onAuthenticate={handleBiometricAuth} />
              </div>

              <div className="pt-4 md:pt-6 border-t border-border text-center">
                <p className="text-body-md text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/sign-up"
                    className="text-accent hover:text-accent/80 font-medium transition-colors duration-300"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-success">
                  <Icon name="Shield" size={16} />
                  <span className="text-body-sm font-medium">Secure Login</span>
                </div>
                <p className="text-body-xs text-muted-foreground">
                  Your data is protected with 256-bit SSL encryption and JWT authentication
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-center">
              <p className="text-body-sm text-muted-foreground">
                By signing in, you agree to our{' '}
                <Link to="/homepage" className="text-accent hover:text-accent/80 transition-colors duration-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/homepage" className="text-accent hover:text-accent/80 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
      `}</style>
    </>
  );
};

export default Login;


import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  durationFilter,
  onDurationFilterChange,
  sortBy,
  onSortByChange,
  onClearFilters
}) => {
  const priceRangeOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '0-30', label: 'Under 30 min' },
    { value: '30-60', label: '30 - 60 min' },
    { value: '60-120', label: '1 - 2 hours' },
    { value: '120+', label: '2+ hours' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'duration', label: 'Duration' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl md:text-2xl font-semibold text-foreground">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onClearFilters}
        >
          Clear
        </Button>
      </div>
      <div>
        <h3 className="font-cta text-sm font-semibold text-foreground mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category?.id
                  ? 'bg-accent text-white' :'glass-card text-foreground hover:bg-accent/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon name={category?.icon} size={16} />
                {category?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <Select
          label="Price Range"
          options={priceRangeOptions}
          value={priceRange}
          onChange={onPriceRangeChange}
        />
      </div>
      <div>
        <Select
          label="Duration"
          options={durationOptions}
          value={durationFilter}
          onChange={onDurationFilterChange}
        />
      </div>
      <div>
        <Select
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={onSortByChange}
        />
      </div>
    </div>
  );
};

export default FilterPanel;


import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PackageDeals = ({ packages, onBookPackage }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Package Deals
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Save more with our curated service bundles
          </p>
        </div>
        <Icon name="Gift" size={32} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {packages?.map((pkg) => (
          <div key={pkg?.id} className="glass-card group h-full flex flex-col">
            <div className="relative h-40 md:h-48 overflow-hidden rounded-t-2xl">
              <Image
                src={pkg?.image}
                alt={pkg?.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-accent text-white">
                <span className="text-xs font-semibold">Save {pkg?.discount}</span>
              </div>
            </div>

            <div className="p-4 md:p-5 flex flex-col flex-grow">
              <h3 className="font-headline text-lg md:text-xl font-semibold text-foreground mb-2">
                {pkg?.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {pkg?.description}
              </p>

              <div className="space-y-2 mb-4">
                {pkg?.services?.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-accent flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground line-through">
                      ${pkg?.originalPrice}
                    </p>
                    <p className="text-xl font-bold text-accent">${pkg?.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-semibold text-foreground">{pkg?.duration}</p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={() => onBookPackage(pkg)}
                >
                  Book Package
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageDeals;


import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, resultsCount }) => {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search services, treatments, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-12"
        />
      </div>
      {searchQuery && (
        <p className="mt-3 text-sm text-muted-foreground">
          Found {resultsCount} {resultsCount === 1 ? 'service' : 'services'} matching "{searchQuery}"
        </p>
      )}
    </div>
  );
};

export default SearchBar;


import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onViewDetails, onBookNow }) => {
  return (
    <div className="glass-card group cursor-pointer h-full flex flex-col">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl">
        <Image
          src={service?.image}
          alt={service?.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {service?.isPopular && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-panel-strong">
            <span className="text-accent text-xs font-cta font-semibold flex items-center gap-1">
              <Icon name="Star" size={14} />
              Popular
            </span>
          </div>
        )}
        {service?.isNew && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
            <span className="text-white text-xs font-cta font-semibold">New</span>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-headline text-lg md:text-xl lg:text-2xl font-semibold text-foreground line-clamp-2 flex-grow">
            {service?.name}
          </h3>
          <div className="ml-2 flex-shrink-0">
            <Icon name={service?.categoryIcon} size={24} className="text-accent" />
          </div>
        </div>

        <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-3 flex-grow">
          {service?.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Icon name="Clock" size={18} className="text-accent flex-shrink-0" />
            <span className="text-foreground font-medium">{service?.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <Icon name="DollarSign" size={18} className="text-accent flex-shrink-0" />
            <span className="text-foreground font-semibold">{service?.price}</span>
          </div>
          {service?.rating && (
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Icon name="Star" size={18} className="text-accent flex-shrink-0" />
              <span className="text-foreground font-medium">
                {service?.rating} ({service?.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Info"
            iconPosition="left"
            onClick={() => onViewDetails(service)}
          >
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            onClick={() => onBookNow(service)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;


import React, { useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceModal = ({ service, isOpen, onClose, onBookNow }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="glass-panel-strong rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 glass-panel-strong border-b border-border p-4 md:p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="font-headline text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            {service?.name}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-accent/10 transition-all duration-300"
            aria-label="Close modal"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div className="space-y-4">
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl">
                <Image
                  src={service?.image}
                  alt={service?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {service?.beforeAfter && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-32 md:h-40 overflow-hidden rounded-xl">
                    <Image
                      src={service?.beforeAfter?.before}
                      alt={service?.beforeAfter?.beforeAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg glass-panel-strong">
                      <span className="text-xs font-semibold text-foreground">Before</span>
                    </div>
                  </div>
                  <div className="relative h-32 md:h-40 overflow-hidden rounded-xl">
                    <Image
                      src={service?.beforeAfter?.after}
                      alt={service?.beforeAfter?.afterAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg glass-panel-strong">
                      <span className="text-xs font-semibold text-accent">After</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="glass-card p-4 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-lg font-semibold text-foreground">{service?.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon name="DollarSign" size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-lg font-semibold text-foreground">{service?.price}</p>
                  </div>
                </div>
                {service?.rating && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon name="Star" size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="text-lg font-semibold text-foreground">
                        {service?.rating} ({service?.reviewCount} reviews)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-headline text-lg md:text-xl font-semibold text-foreground mb-3">
                  Description
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {service?.fullDescription}
                </p>
              </div>

              {service?.benefits && (
                <div>
                  <h3 className="font-headline text-lg md:text-xl font-semibold text-foreground mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {service?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm md:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service?.process && (
                <div>
                  <h3 className="font-headline text-lg md:text-xl font-semibold text-foreground mb-3">
                    Treatment Process
                  </h3>
                  <ol className="space-y-3">
                    {service?.process?.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-semibold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-muted-foreground text-sm md:text-base pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {service?.recommendedStylists && (
                <div>
                  <h3 className="font-headline text-lg md:text-xl font-semibold text-foreground mb-3">
                    Recommended Stylists
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service?.recommendedStylists?.map((stylist, index) => (
                      <div key={index} className="glass-card px-3 py-2 rounded-lg">
                        <span className="text-sm font-medium text-foreground">{stylist}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              iconName="X"
              iconPosition="left"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onBookNow(service)}
            >
              Book This Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;


import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import PackageDeals from './components/PackageDeals';

const Services = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
  { id: 'all', name: 'All Services', icon: 'Sparkles' },
  { id: 'hair', name: 'Hair Styling', icon: 'Scissors' },
  { id: 'color', name: 'Color Services', icon: 'Palette' },
  { id: 'treatment', name: 'Treatments', icon: 'Droplet' },
  { id: 'special', name: 'Special Occasions', icon: 'Crown' },
  { id: 'nails', name: 'Nail Care', icon: 'Hand' },
  { id: 'makeup', name: 'Makeup', icon: 'Brush' }];


  const services = [
  {
    id: 1,
    name: "Signature Haircut & Style",
    description: "Precision cutting tailored to your face shape and lifestyle, finished with expert styling.",
    fullDescription: "Our signature haircut service combines consultation, precision cutting, and expert styling to create a look that perfectly complements your features and lifestyle. Each cut is customized to your hair type, face shape, and personal style preferences.",
    image: "https://images.unsplash.com/photo-1553519430-e89e67401ed5",
    imageAlt: "Professional female hairstylist cutting blonde woman\'s hair in modern salon with natural lighting",
    category: "hair",
    categoryIcon: "Scissors",
    duration: "60 minutes",
    price: "$85",
    rating: 4.9,
    reviewCount: 342,
    isPopular: true,
    benefits: [
    "Personalized consultation",
    "Precision cutting technique",
    "Professional styling",
    "Hair care recommendations",
    "Complimentary scalp massage"],

    process: [
    "Initial consultation to discuss your desired look",
    "Hair analysis and face shape assessment",
    "Precision cutting using advanced techniques",
    "Professional blow-dry and styling",
    "Styling tips and product recommendations"],

    recommendedStylists: ["Emma Rodriguez", "Michael Chen", "Sofia Martinez"],
    beforeAfter: {
      before: "https://img.rocket.new/generatedImages/rocket_gen_img_119bf49c4-1764648663255.png",
      beforeAlt: "Woman with long unstyled brown hair before haircut in salon setting",
      after: "https://img.rocket.new/generatedImages/rocket_gen_img_182afaed9-1766814451305.png",
      afterAlt: "Same woman with stylish layered bob haircut and professional styling"
    }
  },
  {
    id: 2,
    name: "Balayage Color Treatment",
    description: "Hand-painted highlights for natural, sun-kissed dimension with seamless blending.",
    fullDescription: "Experience the art of balayage with our expert colorists who hand-paint highlights to create natural-looking dimension and depth. This technique provides a low-maintenance color solution with beautiful, seamless results.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19bd73f52-1767016501336.png",
    imageAlt: "Hairstylist applying balayage highlights to brunette woman\'s hair using foil technique in upscale salon",
    category: "color",
    categoryIcon: "Palette",
    duration: "2.5 hours",
    price: "$195",
    rating: 4.8,
    reviewCount: 287,
    isPopular: true,
    benefits: [
    "Natural-looking dimension",
    "Low maintenance color",
    "Customized color placement",
    "Seamless blending",
    "Long-lasting results"],

    process: [
    "Color consultation and strand test",
    "Strategic sectioning for optimal placement",
    "Hand-painted color application",
    "Processing and toning",
    "Styling and aftercare instructions"],

    recommendedStylists: ["Isabella Thompson", "James Wilson", "Aria Patel"]
  },
  {
    id: 3,
    name: "Keratin Smoothing Treatment",
    description: "Transform frizzy hair into smooth, manageable locks with our premium keratin treatment.",
    fullDescription: "Our keratin smoothing treatment infuses your hair with protein to eliminate frizz, reduce styling time, and create silky-smooth results that last for months. Perfect for all hair types seeking manageability and shine.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13410bc67-1764658795895.png",
    imageAlt: "Woman with long straight glossy brown hair after keratin treatment in professional salon environment",
    category: "treatment",
    categoryIcon: "Droplet",
    duration: "3 hours",
    price: "$285",
    rating: 4.9,
    reviewCount: 198,
    benefits: [
    "Eliminates frizz for 3-5 months",
    "Reduces styling time by 50%",
    "Adds incredible shine",
    "Strengthens hair structure",
    "Safe for color-treated hair"],

    process: [
    "Deep cleansing shampoo",
    "Keratin treatment application",
    "Heat activation with flat iron",
    "Sealing and finishing treatment",
    "Aftercare product recommendations"],

    recommendedStylists: ["Olivia Anderson", "Lucas Martinez"]
  },
  {
    id: 4,
    name: "Bridal Hair & Makeup",
    description: "Complete bridal beauty package with trial session, ensuring you look flawless on your special day.",
    fullDescription: "Our comprehensive bridal package includes a trial session to perfect your look, plus full hair and makeup services on your wedding day. We ensure you feel confident and beautiful from ceremony to reception.",
    image: "https://images.unsplash.com/photo-1653127637262-8e1b275b6392",
    imageAlt: "Bride with elegant updo hairstyle and natural makeup getting final touches from makeup artist in bridal suite",
    category: "special",
    categoryIcon: "Crown",
    duration: "4 hours",
    price: "$450",
    rating: 5.0,
    reviewCount: 156,
    isNew: true,
    benefits: [
    "Complimentary trial session",
    "Long-lasting makeup formula",
    "Professional photography-ready styling",
    "Touch-up kit included",
    "Stress-free experience"],

    process: [
    "Initial consultation and trial session",
    "Wedding day preparation timeline",
    "Hair styling and setting",
    "Professional makeup application",
    "Final touches and photography prep"],

    recommendedStylists: ["Victoria Chen", "Alexander Brown"]
  },
  {
    id: 5,
    name: "Luxury Manicure & Pedicure",
    description: "Indulge in our spa-quality nail care with premium products and relaxing massage.",
    fullDescription: "Experience ultimate relaxation with our luxury manicure and pedicure service. Includes exfoliation, massage, cuticle care, and your choice of polish or gel application in our serene spa environment.",
    image: "https://images.unsplash.com/photo-1599206676335-193c82b13c9e",
    imageAlt: "Close-up of hands receiving professional manicure with nail polish application in luxury spa setting",
    category: "nails",
    categoryIcon: "Hand",
    duration: "90 minutes",
    price: "$95",
    rating: 4.7,
    reviewCount: 421,
    benefits: [
    "Premium organic products",
    "Relaxing hand and foot massage",
    "Long-lasting gel options",
    "Cuticle care and conditioning",
    "Complimentary beverage"],

    process: [
    "Soaking and softening treatment",
    "Exfoliation and callus removal",
    "Cuticle care and shaping",
    "Massage with aromatherapy oils",
    "Polish or gel application"],

    recommendedStylists: ["Mia Johnson", "Ethan Davis"]
  },
  {
    id: 6,
    name: "Special Event Makeup",
    description: "Professional makeup application for any special occasion, customized to your style and outfit.",
    fullDescription: "Look stunning for any special event with our professional makeup service. We create customized looks that photograph beautifully and last throughout your event, from subtle elegance to dramatic glamour.",
    image: "https://images.unsplash.com/photo-1621083487521-f44dccca8024",
    imageAlt: "Makeup artist applying foundation to woman\'s face with professional brushes in well-lit makeup studio",
    category: "makeup",
    categoryIcon: "Brush",
    duration: "75 minutes",
    price: "$125",
    rating: 4.8,
    reviewCount: 267,
    benefits: [
    "Customized to your style",
    "Long-lasting formula",
    "Photography-ready finish",
    "Complimentary lashes",
    "Touch-up tips included"],

    process: [
    "Skin preparation and priming",
    "Foundation and contouring",
    "Eye makeup application",
    "Lip color and finishing touches",
    "Setting spray for longevity"],

    recommendedStylists: ["Sophia Lee", "Noah Taylor"]
  },
  {
    id: 7,
    name: "Deep Conditioning Treatment",
    description: "Intensive moisture therapy to restore vitality and shine to damaged or dry hair.",
    fullDescription: "Revitalize your hair with our deep conditioning treatment that penetrates the hair shaft to repair damage, restore moisture, and enhance natural shine. Perfect for color-treated or heat-damaged hair.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd607eb9-1767041634540.png",
    imageAlt: "Woman receiving deep conditioning hair treatment with steam therapy in modern salon spa",
    category: "treatment",
    categoryIcon: "Droplet",
    duration: "45 minutes",
    price: "$65",
    rating: 4.6,
    reviewCount: 189,
    benefits: [
    "Repairs damaged hair",
    "Restores moisture balance",
    "Enhances natural shine",
    "Strengthens hair fibers",
    "Improves manageability"],

    process: [
    "Hair analysis and consultation",
    "Deep cleansing shampoo",
    "Treatment application with heat",
    "Scalp massage during processing",
    "Rinse and style finish"],

    recommendedStylists: ["Emma Rodriguez", "Lucas Martinez"]
  },
  {
    id: 8,
    name: "Men\'s Grooming Package",
    description: "Complete grooming service including haircut, beard trim, and hot towel treatment.",
    fullDescription: "Our comprehensive men's grooming package offers a complete refresh with precision haircut, expert beard shaping, and relaxing hot towel treatment. Experience barbershop luxury in our modern salon.",
    image: "https://images.unsplash.com/photo-1718053627123-0d42505c00a9",
    imageAlt: "Male client receiving professional haircut and beard trim from barber in upscale grooming salon",
    category: "hair",
    categoryIcon: "Scissors",
    duration: "60 minutes",
    price: "$75",
    rating: 4.9,
    reviewCount: 312,
    isPopular: true,
    benefits: [
    "Precision haircut",
    "Expert beard shaping",
    "Hot towel treatment",
    "Scalp massage",
    "Styling product application"],

    process: [
    "Consultation and style discussion",
    "Precision cutting and shaping",
    "Beard trim and detailing",
    "Hot towel relaxation treatment",
    "Styling and product recommendations"],

    recommendedStylists: ["Michael Chen", "Alexander Brown"]
  }];


  const packageDeals = [
  {
    id: 1,
    name: "Bridal Beauty Bundle",
    description: "Complete wedding day preparation with trial sessions included",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15af01fb1-1768057243573.png",
    imageAlt: "Elegant bridal preparation setup with makeup products and flowers on vanity table",
    services: [
    "Bridal Hair & Makeup with Trial",
    "Pre-Wedding Deep Conditioning",
    "Luxury Manicure & Pedicure",
    "Complimentary Touch-up Kit"],

    originalPrice: "625",
    price: "499",
    discount: "20%",
    duration: "Full Day"
  },
  {
    id: 2,
    name: "Color Refresh Package",
    description: "Complete color transformation with conditioning treatment",
    image: "https://images.unsplash.com/photo-1667539916609-c706d5b7ed65",
    imageAlt: "Hair color swatches and professional coloring tools arranged on salon counter",
    services: [
    "Balayage Color Treatment",
    "Deep Conditioning Treatment",
    "Signature Haircut & Style",
    "Color-Safe Product Set"],

    originalPrice: "410",
    price: "329",
    discount: "20%",
    duration: "4 hours"
  },
  {
    id: 3,
    name: "Monthly Maintenance",
    description: "Everything you need for regular beauty upkeep",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1359c56a0-1766869195537.png",
    imageAlt: "Organized beauty maintenance products and tools displayed on white marble surface",
    services: [
    "Signature Haircut & Style",
    "Luxury Manicure & Pedicure",
    "Deep Conditioning Treatment",
    "10% Off Next Visit"],

    originalPrice: "245",
    price: "199",
    discount: "19%",
    duration: "3 hours"
  }];


  const filteredServices = useMemo(() => {
    let filtered = services;

    if (selectedCategory !== 'all') {
      filtered = filtered?.filter((service) => service?.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered?.filter((service) =>
      service?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      service?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      filtered = filtered?.filter((service) => {
        const price = parseInt(service?.price?.replace('$', ''));
        if (priceRange === '0-50') return price < 50;
        if (priceRange === '50-100') return price >= 50 && price <= 100;
        if (priceRange === '100-200') return price > 100 && price <= 200;
        if (priceRange === '200+') return price > 200;
        return true;
      });
    }

    if (durationFilter !== 'all') {
      filtered = filtered?.filter((service) => {
        const duration = parseInt(service?.duration);
        if (durationFilter === '0-30') return duration < 30;
        if (durationFilter === '30-60') return duration >= 30 && duration <= 60;
        if (durationFilter === '60-120') return duration > 60 && duration <= 120;
        if (durationFilter === '120+') return duration > 120;
        return true;
      });
    }

    filtered?.sort((a, b) => {
      if (sortBy === 'popular') return (b?.reviewCount || 0) - (a?.reviewCount || 0);
      if (sortBy === 'price-low') return parseInt(a?.price?.replace('$', '')) - parseInt(b?.price?.replace('$', ''));
      if (sortBy === 'price-high') return parseInt(b?.price?.replace('$', '')) - parseInt(a?.price?.replace('$', ''));
      if (sortBy === 'duration') return parseInt(a?.duration) - parseInt(b?.duration);
      if (sortBy === 'rating') return (b?.rating || 0) - (a?.rating || 0);
      return 0;
    });

    return filtered;
  }, [services, selectedCategory, searchQuery, priceRange, durationFilter, sortBy]);

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookNow = (service) => {
    navigate('/book-date-time', { state: { selectedService: service } });
  };

  const handleBookPackage = (pkg) => {
    navigate('/book-date-time', { state: { selectedPackage: pkg } });
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setDurationFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="glass-panel-strong py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Icon name="Sparkles" size={20} className="text-accent" />
                <span className="text-sm font-cta font-semibold text-accent">
                  Premium Beauty Services
                </span>
              </div>
              
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Discover Your Perfect
                <span className="block text-accent mt-2">Beauty Experience</span>
              </h1>
              
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                Explore our comprehensive range of luxury beauty services, from precision haircuts to transformative color treatments. Each service is crafted to enhance your natural beauty.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultsCount={filteredServices?.length} />


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
            <div className="lg:col-span-1">
              <FilterPanel
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                durationFilter={durationFilter}
                onDurationFilterChange={setDurationFilter}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                onClearFilters={handleClearFilters} />

            </div>

            <div className="lg:col-span-3">
              {filteredServices?.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {filteredServices?.map((service) =>
                <ServiceCard
                  key={service?.id}
                  service={service}
                  onViewDetails={handleViewDetails}
                  onBookNow={handleBookNow} />

                )}
                </div> :

              <div className="glass-panel rounded-2xl p-8 md:p-12 text-center">
                  <Icon name="SearchX" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-headline text-xl md:text-2xl font-semibold text-foreground mb-2">
                    No Services Found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                  <button
                  onClick={handleClearFilters}
                  className="cta-button">

                    <span>Clear All Filters</span>
                  </button>
                </div>
              }
            </div>
          </div>

          <div className="mt-12 md:mt-16 lg:mt-20">
            <PackageDeals
              packages={packageDeals}
              onBookPackage={handleBookPackage} />

          </div>

          <div className="mt-12 md:mt-16 glass-panel rounded-2xl p-6 md:p-8 lg:p-12 text-center">
            <Icon name="Sparkles" size={48} className="text-accent mx-auto mb-4" />
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Our expert stylists can create custom treatments tailored to your specific needs. Contact us for a personalized consultation.
            </p>
            <button
              onClick={() => navigate('/choose-your-stylist')}
              className="cta-button">

              <span className="flex items-center gap-2">
                <Icon name="MessageCircle" size={20} />
                Consult with a Stylist
              </span>
            </button>
          </div>
        </div>
      </main>
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookNow={handleBookNow} />

      <Footer />
    </div>);

};

export default Services;


import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInfoStep = ({ formData, errors, onChange, onPhotoUpload, photoPreview }) => {
  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const file = e?.dataTransfer?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      onPhotoUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Personal Information
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Let's start with your basic details
        </p>
      </div>
      <div className="flex justify-center mb-6 md:mb-8">
        <div
          className="relative group"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full glass-panel-strong overflow-hidden border-4 border-accent/20 group-hover:border-accent/40 transition-all duration-300">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Profile photo preview showing uploaded user image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Icon name="User" size={48} />
              </div>
            )}
          </div>
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent text-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
          >
            <Icon name="Camera" size={20} />
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={onChange}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={onChange}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        value={formData?.email}
        onChange={onChange}
        error={errors?.email}
        description="We'll send a verification link to this email"
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="+1 (555) 000-0000"
        value={formData?.phone}
        onChange={onChange}
        error={errors?.phone}
        description="For appointment reminders and updates"
        required
      />
      <Input
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData?.dateOfBirth}
        onChange={onChange}
        error={errors?.dateOfBirth}
        required
      />
    </div>
  );
};

export default PersonalInfoStep;


import React from 'react';
import Icon from '../../../components/AppIcon';

const PreferencesStep = ({ formData, onChange }) => {
  const hairTypes = [
    { value: 'straight', label: 'Straight', icon: 'Minus' },
    { value: 'wavy', label: 'Wavy', icon: 'TrendingUp' },
    { value: 'curly', label: 'Curly', icon: 'Wind' },
    { value: 'coily', label: 'Coily', icon: 'Sparkles' },
  ];

  const skinTones = [
    { value: 'fair', label: 'Fair', color: '#FFE4C4' },
    { value: 'light', label: 'Light', color: '#F5D5B8' },
    { value: 'medium', label: 'Medium', color: '#D4A574' },
    { value: 'olive', label: 'Olive', color: '#C19A6B' },
    { value: 'tan', label: 'Tan', color: '#A67B5B' },
    { value: 'deep', label: 'Deep', color: '#8B5A3C' },
  ];

  const services = [
    { value: 'haircut', label: 'Haircut & Styling', icon: 'Scissors' },
    { value: 'coloring', label: 'Hair Coloring', icon: 'Palette' },
    { value: 'treatment', label: 'Hair Treatment', icon: 'Sparkles' },
    { value: 'makeup', label: 'Makeup', icon: 'Brush' },
    { value: 'nails', label: 'Nail Care', icon: 'Hand' },
    { value: 'skincare', label: 'Skincare', icon: 'Heart' },
  ];

  const handleHairTypeSelect = (value) => {
    onChange({ target: { name: 'hairType', value } });
  };

  const handleSkinToneSelect = (value) => {
    onChange({ target: { name: 'skinTone', value } });
  };

  const handleServiceToggle = (value) => {
    const currentServices = formData?.preferredServices || [];
    const newServices = currentServices?.includes(value)
      ? currentServices?.filter((s) => s !== value)
      : [...currentServices, value];
    onChange({ target: { name: 'preferredServices', value: newServices } });
  };

  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Beauty Preferences
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Help us personalize your experience
        </p>
      </div>
      <div>
        <label className="block text-sm md:text-base font-cta font-medium text-foreground mb-4">
          Hair Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {hairTypes?.map((type) => (
            <button
              key={type?.value}
              type="button"
              onClick={() => handleHairTypeSelect(type?.value)}
              className={`glass-card p-4 md:p-6 flex flex-col items-center gap-3 transition-all duration-300 ${
                formData?.hairType === type?.value
                  ? 'border-2 border-accent bg-accent/10' :'border border-border hover:border-accent/50'
              }`}
            >
              <Icon name={type?.icon} size={32} color={formData?.hairType === type?.value ? 'var(--color-accent)' : 'currentColor'} />
              <span className="text-sm md:text-base font-body">{type?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm md:text-base font-cta font-medium text-foreground mb-4">
          Skin Tone
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {skinTones?.map((tone) => (
            <button
              key={tone?.value}
              type="button"
              onClick={() => handleSkinToneSelect(tone?.value)}
              className={`glass-card p-4 flex flex-col items-center gap-3 transition-all duration-300 ${
                formData?.skinTone === tone?.value
                  ? 'border-2 border-accent' :'border border-border hover:border-accent/50'
              }`}
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: tone?.color }}
              />
              <span className="text-xs md:text-sm font-body">{tone?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm md:text-base font-cta font-medium text-foreground mb-4">
          Preferred Services
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {services?.map((service) => {
            const isSelected = (formData?.preferredServices || [])?.includes(service?.value);
            return (
              <button
                key={service?.value}
                type="button"
                onClick={() => handleServiceToggle(service?.value)}
                className={`glass-card p-4 md:p-5 flex items-center gap-4 transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-accent bg-accent/10' :'border border-border hover:border-accent/50'
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-accent text-white' : 'glass-panel text-muted-foreground'
                }`}>
                  <Icon name={service?.icon} size={20} />
                </div>
                <span className="text-sm md:text-base font-body flex-1 text-left">{service?.label}</span>
                {isSelected && (
                  <Icon name="Check" size={20} color="var(--color-accent)" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreferencesStep;

import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8 md:mb-10 lg:mb-12">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-cta text-sm md:text-base lg:text-lg transition-all duration-500 ${
                    isCompleted
                      ? 'bg-accent text-white shadow-lg shadow-accent/30'
                      : isCurrent
                      ? 'glass-panel-strong border-2 border-accent text-accent' :'glass-panel text-muted-foreground'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span
                  className={`mt-2 text-xs md:text-sm font-body transition-colors duration-300 ${
                    isCurrent ? 'text-accent font-medium' : 'text-muted-foreground'
                  }`}
                >
                  Step {stepNumber}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className="flex-1 h-1 mx-2 md:mx-3 lg:mx-4 glass-panel overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      stepNumber < currentStep ? 'bg-accent' : 'bg-transparent'
                    }`}
                    style={{ width: stepNumber < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="w-full h-2 glass-panel overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;


import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecurityStep = ({ formData, errors, onChange, onTermsAccept, termsAccepted }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (password?.length >= 12) strength++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z0-9]/?.test(password)) strength++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Weak', color: 'bg-error' },
      { strength: 2, label: 'Fair', color: 'bg-warning' },
      { strength: 3, label: 'Good', color: 'bg-accent' },
      { strength: 4, label: 'Strong', color: 'bg-success' },
      { strength: 5, label: 'Very Strong', color: 'bg-success' },
    ];

    return levels?.[strength];
  };

  const currentStrength = passwordStrength(formData?.password);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Account Security
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Create a secure password for your account
        </p>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={onChange}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          
          {formData?.password && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 glass-panel rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${currentStrength?.color}`}
                    style={{ width: `${(currentStrength?.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs md:text-sm font-body text-muted-foreground">
                  {currentStrength?.label}
                </span>
              </div>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <Icon name={formData?.password?.length >= 8 ? 'Check' : 'X'} size={14} color={formData?.password?.length >= 8 ? 'var(--color-success)' : 'var(--color-error)'} />
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <Icon name={/[A-Z]/?.test(formData?.password) && /[a-z]/?.test(formData?.password) ? 'Check' : 'X'} size={14} color={/[A-Z]/?.test(formData?.password) && /[a-z]/?.test(formData?.password) ? 'var(--color-success)' : 'var(--color-error)'} />
                  Upper and lowercase letters
                </li>
                <li className="flex items-center gap-2">
                  <Icon name={/\d/?.test(formData?.password) ? 'Check' : 'X'} size={14} color={/\d/?.test(formData?.password) ? 'var(--color-success)' : 'var(--color-error)'} />
                  At least one number
                </li>
                <li className="flex items-center gap-2">
                  <Icon name={/[^a-zA-Z0-9]/?.test(formData?.password) ? 'Check' : 'X'} size={14} color={/[^a-zA-Z0-9]/?.test(formData?.password) ? 'var(--color-success)' : 'var(--color-error)'} />
                  Special character
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData?.confirmPassword}
            onChange={onChange}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <div className="glass-panel p-4 md:p-6 space-y-4">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            checked={termsAccepted}
            onChange={(e) => onTermsAccept(e?.target?.checked)}
            required
          />
          
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="flex items-center gap-2 text-sm md:text-base text-accent hover:text-accent/80 transition-colors"
            >
              <Icon name={showTerms ? 'ChevronDown' : 'ChevronRight'} size={16} />
              View Terms of Service
            </button>
            
            {showTerms && (
              <div className="glass-panel-strong p-4 text-xs md:text-sm text-muted-foreground space-y-2 max-h-48 overflow-y-auto">
                <p className="font-medium text-foreground">Terms of Service</p>
                <p>By creating an account, you agree to our terms and conditions. These include but are not limited to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Accurate information provision</li>
                  <li>Respectful conduct towards staff and other clients</li>
                  <li>Timely payment for services rendered</li>
                  <li>24-hour cancellation notice for appointments</li>
                  <li>Compliance with salon policies and procedures</li>
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPrivacy(!showPrivacy)}
              className="flex items-center gap-2 text-sm md:text-base text-accent hover:text-accent/80 transition-colors"
            >
              <Icon name={showPrivacy ? 'ChevronDown' : 'ChevronRight'} size={16} />
              View Privacy Policy
            </button>
            
            {showPrivacy && (
              <div className="glass-panel-strong p-4 text-xs md:text-sm text-muted-foreground space-y-2 max-h-48 overflow-y-auto">
                <p className="font-medium text-foreground">Privacy Policy</p>
                <p>We are committed to protecting your privacy. This policy outlines:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>What information we collect and why</li>
                  <li>How we use and protect your data</li>
                  <li>Your rights regarding your personal information</li>
                  <li>Cookie usage and tracking policies</li>
                  <li>Third-party data sharing practices</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStep;


import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WelcomeStep = ({ formData, photoPreview, onComplete }) => {
  const benefits = [
    {
      icon: 'Calendar',
      title: 'Easy Booking',
      description: 'Schedule appointments with your favorite stylists in seconds',
    },
    {
      icon: 'Bell',
      title: 'Smart Reminders',
      description: 'Never miss an appointment with automated notifications',
    },
    {
      icon: 'Star',
      title: 'Exclusive Rewards',
      description: 'Earn points and unlock special member benefits',
    },
    {
      icon: 'Sparkles',
      title: 'Personalized Experience',
      description: 'Get service recommendations based on your preferences',
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full glass-panel-strong flex items-center justify-center">
            <Icon name="PartyPopper" size={48} color="var(--color-accent)" />
          </div>
        </div>
        
        <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          Welcome to GlassLux Salon!
        </h2>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Your account has been created successfully
        </p>
      </div>
      <div className="glass-panel-strong p-6 md:p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full glass-panel overflow-hidden border-4 border-accent/30">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="User profile photo showing completed registration"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Icon name="User" size={48} />
              </div>
            )}
          </div>
        </div>
        
        <h3 className="font-headline text-xl md:text-2xl font-bold text-foreground mb-2">
          {formData?.firstName} {formData?.lastName}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base">{formData?.email}</p>
      </div>
      <div className="space-y-4 md:space-y-6">
        <h3 className="font-cta text-lg md:text-xl font-semibold text-foreground text-center">
          What's Next?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="glass-card p-4 md:p-6 flex gap-4 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={24} color="var(--color-accent)" />
              </div>
              <div className="flex-1">
                <h4 className="font-cta text-base md:text-lg font-semibold text-foreground mb-1">
                  {benefit?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel p-4 md:p-6 flex items-start gap-3">
        <Icon name="Mail" size={24} color="var(--color-accent)" className="flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm md:text-base text-foreground font-medium mb-1">
            Verify Your Email
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            We've sent a verification link to <span className="font-medium text-accent">{formData?.email}</span>. 
            Please check your inbox and click the link to activate your account.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
        <Button
          variant="outline"
          fullWidth
          iconName="Home"
          iconPosition="left"
          onClick={() => window.location.href = '/homepage'}
        >
          Go to Homepage
        </Button>
        <Button
          variant="default"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={onComplete}
        >
          Book Your First Appointment
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressBar from './components/ProgressBar';
import PersonalInfoStep from './components/PersonalInfoStep';
import PreferencesStep from './components/PreferencesStep';
import SecurityStep from './components/SecurityStep';
import WelcomeStep from './components/WelcomeStep';

const SignUp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [photoPreview, setPhotoPreview] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    hairType: '',
    skinTone: '',
    preferredServices: [],
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePhotoUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader?.result);
    };
    reader?.readAsDataURL(file);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData?.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s\-()]+$/?.test(formData?.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (step === 3) {
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!termsAccepted) {
        newErrors.terms = 'You must accept the terms and privacy policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    navigate('/book-date-time');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onPhotoUpload={handlePhotoUpload}
            photoPreview={photoPreview}
          />
        );
      case 2:
        return (
          <PreferencesStep
            formData={formData}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <SecurityStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onTermsAccept={setTermsAccepted}
            termsAccepted={termsAccepted}
          />
        );
      case 4:
        return (
          <WelcomeStep
            formData={formData}
            photoPreview={photoPreview}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="main-content flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl glass-panel-strong flex items-center justify-center">
                  <Icon name="UserPlus" size={28} color="var(--color-accent)" />
                </div>
                <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Create Account
                </h1>
              </div>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
                Join GlassLux Salon and experience luxury beauty services
              </p>
            </div>

            <div className="glass-panel-strong p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl">
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

              <div className="min-h-[400px] md:min-h-[500px]">
                {renderStep()}
              </div>

              {currentStep < 4 && (
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      className="sm:w-auto"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    variant="default"
                    onClick={handleNext}
                    iconName={currentStep === 3 ? 'Check' : 'ChevronRight'}
                    iconPosition="right"
                    fullWidth={currentStep === 1}
                    className={currentStep > 1 ? 'sm:ml-auto' : ''}
                  >
                    {currentStep === 3 ? 'Complete Registration' : 'Continue'}
                  </Button>
                </div>
              )}

              {errors?.terms && (
                <div className="mt-4 p-4 glass-panel border border-error/30 rounded-lg flex items-start gap-3">
                  <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-error">{errors?.terms}</p>
                </div>
              )}
            </div>

            <div className="text-center mt-6 md:mt-8">
              <p className="text-sm md:text-base text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">Page Not Found</h2>
        <p className="text-onBackground/70 mb-8">
          The page you're looking for doesn't exist. Let's get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            icon={<Icon name="ArrowLeft" />}
            iconPosition="left"
            onClick={() => window.history?.back()}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            icon={<Icon name="Home" />}
            iconPosition="left"
            onClick={handleGoHome}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


index. css

body {
  margin: 0;
  padding: 0;
  font-family: Inter;
}

* {
  box-sizing: border-box;
  line-height: normal;
  font-family: inherit;
  margin: unset;
}


Tailwind.css

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Primary Colors - Champagne White Base */
    --color-primary: #F8F6F0; /* champagne-50 */
    --color-primary-foreground: #2C2A26; /* charcoal-900 */
    
    /* Secondary Colors - Warm Neutral Depth */
    --color-secondary: #E8E2D4; /* warm-neutral-100 */
    --color-secondary-foreground: #2C2A26; /* charcoal-900 */
    
    /* Accent Colors - Luxury Gold */
    --color-accent: #D4AF37; /* gold-500 */
    --color-accent-foreground: #FFFFFF; /* white */
    
    /* Background & Surface */
    --color-background: #FEFDFB; /* off-white */
    --color-foreground: #2C2A26; /* charcoal-900 */
    --color-surface: #F5F2EA; /* warm-gray-50 */
    
    /* Card & Popover */
    --color-card: #F8F6F0; /* champagne-50 */
    --color-card-foreground: #2C2A26; /* charcoal-900 */
    --color-popover: #FFFFFF; /* white */
    --color-popover-foreground: #2C2A26; /* charcoal-900 */
    
    /* Muted States */
    --color-muted: #E8E2D4; /* warm-neutral-100 */
    --color-muted-foreground: #6B6762; /* gray-600 */
    
    /* Border & Input */
    --color-border: rgba(212, 175, 55, 0.2); /* gold-alpha-20 */
    --color-input: #F5F2EA; /* warm-gray-50 */
    --color-ring: #D4AF37; /* gold-500 */
    
    /* Semantic Colors */
    --color-success: #8FBC8F; /* sage-400 */
    --color-success-foreground: #FFFFFF; /* white */
    --color-warning: #DAA520; /* goldenrod-500 */
    --color-warning-foreground: #2C2A26; /* charcoal-900 */
    --color-error: #CD853F; /* terracotta-500 */
    --color-error-foreground: #FFFFFF; /* white */
    --color-destructive: #CD853F; /* terracotta-500 */
    --color-destructive-foreground: #FFFFFF; /* white */
    
    /* Glass Effect Variables */
    --glass-blur: 20px;
    --glass-opacity: 0.1;
    --glass-border: rgba(255, 255, 255, 0.2);
    
    /* Spacing & Layout */
    --radius: 16px;
    --header-height: 80px;
    --sidebar-width: 280px;
    --sidebar-collapsed-width: 80px;
  }

  .dark {
    --color-background: #1A1816; /* dark-charcoal */
    --color-foreground: #F8F6F0; /* champagne-50 */
    --color-card: #2C2A26; /* charcoal-900 */
    --color-card-foreground: #F8F6F0; /* champagne-50 */
    --color-popover: #2C2A26; /* charcoal-900 */
    --color-popover-foreground: #F8F6F0; /* champagne-50 */
    --color-primary: #E8E2D4; /* warm-neutral-100 */
    --color-primary-foreground: #1A1816; /* dark-charcoal */
    --color-secondary: #3A3632; /* charcoal-800 */
    --color-secondary-foreground: #F8F6F0; /* champagne-50 */
    --color-muted: #3A3632; /* charcoal-800 */
    --color-muted-foreground: #A8A39E; /* gray-400 */
    --color-accent: #D4AF37; /* gold-500 */
    --color-accent-foreground: #1A1816; /* dark-charcoal */
    --color-border: rgba(212, 175, 55, 0.3); /* gold-alpha-30 */
    --color-input: #3A3632; /* charcoal-800 */
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
  }

  button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
}

@layer components {
  /* Glass Effect Utilities */
  .glass-panel {
    background: rgba(248, 246, 240, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    box-shadow: 0 8px 32px rgba(44, 42, 38, 0.1);
  }

  .glass-panel-strong {
    background: rgba(248, 246, 240, 0.2);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid var(--glass-border);
    box-shadow: 0 10px 40px rgba(44, 42, 38, 0.15);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass-card:hover {
    transform: translateY(-8px);
    border-radius: 24px;
    box-shadow: 0 12px 48px rgba(44, 42, 38, 0.15);
  }

  /* Header Styles */
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    z-index: 50;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--glass-border);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
    text-decoration: none;
    transition: opacity 0.3s ease;
  }

  .header-logo:hover {
    opacity: 0.8;
  }

  .header-logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);
  }

  .header-nav {
    display: none;
  }

  @media (min-width: 1024px) {
    .header-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }

  .header-nav-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.9375rem;
    color: var(--color-foreground);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }

  .header-nav-link:hover {
    background: rgba(212, 175, 55, 0.1);
    color: var(--color-accent);
  }

  .header-nav-link.active {
    background: rgba(212, 175, 55, 0.15);
    color: var(--color-accent);
  }

  .header-nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 1rem;
    right: 1rem;
    height: 2px;
    background: var(--color-accent);
    border-radius: 2px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid var(--glass-border);
    color: var(--color-foreground);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  @media (min-width: 1024px) {
    .header-mobile-toggle {
      display: none;
    }
  }

  .header-mobile-toggle:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: scale(1.05);
  }

  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-background);
    z-index: 60;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mobile-menu-overlay.open {
    transform: translateX(0);
  }

  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .mobile-menu-close {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid var(--glass-border);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mobile-menu-close:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: rotate(90deg);
  }

  .mobile-menu-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mobile-menu-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 1.125rem;
    color: var(--color-foreground);
    text-decoration: none;
    padding: 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    background: rgba(248, 246, 240, 0.05);
    border: 1px solid transparent;
  }

  .mobile-menu-link:hover,
  .mobile-menu-link.active {
    background: rgba(212, 175, 55, 0.1);
    border-color: var(--glass-border);
    color: var(--color-accent);
  }

  /* CTA Button Styles */
  .cta-button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(212, 175, 55, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .cta-button:hover::before {
    width: 300px;
    height: 300px;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
  }

  .cta-button span {
    position: relative;
    z-index: 1;
  }

  /* Main Content Offset */
  .main-content {
    margin-top: var(--header-height);
    min-height: calc(100vh - var(--header-height));
  }

  /* Animation Utilities */
  @keyframes glass-shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .glass-shimmer {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    background-size: 200% 100%;
    animation: glass-shimmer 3s infinite;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .glass-blur-sm {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .glass-blur-md {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }

  .glass-blur-lg {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .glass-blur-xl {
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
  }
}


