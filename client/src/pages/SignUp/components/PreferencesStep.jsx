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
                  ? 'border-2 border-accent bg-accent/10'
                  : 'border border-[var(--color-border)] hover:border-accent/50'
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
                  ? 'border-2 border-accent'
                  : 'border border-[var(--color-border)] hover:border-accent/50'
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
                    ? 'border-2 border-accent bg-accent/10'
                    : 'border border-[var(--color-border)] hover:border-accent/50'
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
