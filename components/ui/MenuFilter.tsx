"use client";

interface MenuFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onFilter: (category: string) => void;
}

export default function MenuFilter({
  categories,
  activeCategory,
  onFilter,
}: MenuFilterProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onFilter(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-5 md:py-2.5 ${
              isActive
                ? "bg-wine text-white"
                : "bg-cream text-charcoal/70 hover:bg-cream/80 hover:text-wine"
            }`}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
