import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search services..."
        className="w-full pl-12 pr-4 py-4 glass-panel rounded-lg text-warm-charcoal placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-luxury-gold"
      />
    </div>
  );
}
