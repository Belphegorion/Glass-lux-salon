import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-charcoal/80 backdrop-blur-sm">
      <div className="glass-panel max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-2xl text-foreground">
            Reset Password
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent/10 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <p className="text-muted-foreground mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={Mail}
              required
            />

            <div className="flex gap-3 mt-6">
              <Button type="submit" className="flex-1">
                Send Reset Link
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={32} className="text-accent" />
            </div>
            <p className="text-foreground font-medium mb-2">Check your email</p>
            <p className="text-muted-foreground text-sm">
              We've sent a password reset link to {email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
