import { Filter } from 'lucide-react';

const categories = ['All', 'Hair', 'Hair Color', 'Hair Treatment', 'Skincare', 'Nails', 'Makeup', 'Special'];

export default function FilterPanel({ selectedCategory, onCategoryChange, priceRange, onPriceRangeChange }) {
  return (
    <div className="glass-panel p-6 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-luxury-gold" />
        <h3 className="font-semibold text-warm-charcoal">Filters</h3>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-warm-charcoal mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-luxury-gold text-white'
                  : 'text-warm-gray hover:bg-warm-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-warm-charcoal mb-3">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-luxury-gold"
          />
          <div className="flex justify-between text-sm text-warm-gray">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
