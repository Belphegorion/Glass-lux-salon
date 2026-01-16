import Button from '../../../components/ui/Button';

export default function SocialLoginButton({ provider }) {
  const config = {
    google: {
      icon: '🔍',
      label: 'Google',
      color: 'bg-white border-2 border-[var(--color-border)] hover:border-accent'
    },
    facebook: {
      icon: '📘',
      label: 'Facebook',
      color: 'bg-white border-2 border-[var(--color-border)] hover:border-accent'
    }
  };

  const { icon, label, color } = config[provider];

  return (
    <button
      type="button"
      className={`${color} px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-foreground font-medium`}
      onClick={() => alert(`${label} login clicked`)}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
