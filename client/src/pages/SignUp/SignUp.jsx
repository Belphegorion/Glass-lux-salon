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
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[var(--color-border)]">
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
