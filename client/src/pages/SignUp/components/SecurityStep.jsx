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
