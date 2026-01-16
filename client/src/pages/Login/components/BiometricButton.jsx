import { Fingerprint } from 'lucide-react';

export default function BiometricButton() {
  return (
    <button
      type="button"
      className="w-full px-4 py-3 bg-white border-2 border-warm-cream hover:border-luxury-gold rounded-lg transition-all flex items-center justify-center gap-2 text-warm-charcoal font-medium"
      onClick={() => alert('Biometric authentication clicked')}
    >
      <Fingerprint className="w-5 h-5 text-luxury-gold" />
      <span>Sign in with Biometrics</span>
    </button>
  );
}
