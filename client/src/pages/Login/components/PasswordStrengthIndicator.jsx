export default function PasswordStrengthIndicator({ password }) {
  const getStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    if (password.length < 6) return { level: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { level: 2, label: 'Medium', color: 'bg-yellow-500' };
    return { level: 3, label: 'Strong', color: 'bg-green-500' };
  };

  const { level, label, color } = getStrength();

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= level ? color : 'bg-warm-cream'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-warm-gray">{label}</p>
    </div>
  );
}
