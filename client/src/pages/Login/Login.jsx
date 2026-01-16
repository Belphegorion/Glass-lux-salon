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
                  <div className="w-full border-t border-[var(--color-border)]" />
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

              <div className="pt-4 md:pt-6 border-t border-[var(--color-border)] text-center">
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
