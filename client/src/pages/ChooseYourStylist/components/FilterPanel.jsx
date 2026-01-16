import { Filter } from 'lucide-react';
import { Checkbox } from '../../../components/ui/Checkbox';

const specialties = ['All', 'Color Specialist', 'Hair Cutting', 'Bridal Styling', 'Extensions', 'Keratin Treatments', 'Makeup Artist'];

export default function FilterPanel({ filters, onFiltersChange }) {
  return (
    <div className="glass-panel p-6 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-luxury-gold" />
        <h3 className="font-semibold text-warm-charcoal">Filters</h3>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-warm-charcoal mb-3">Specialty</h4>
        <div className="space-y-2">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => onFiltersChange({ ...filters, specialty: spec })}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.specialty === spec
                  ? 'bg-luxury-gold text-white'
                  : 'text-warm-gray hover:bg-warm-cream'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Checkbox
          checked={filters.available}
          onChange={(checked) => onFiltersChange({ ...filters, available: checked })}
          label="Available only"
        />
      </div>
    </div>
  );
}
