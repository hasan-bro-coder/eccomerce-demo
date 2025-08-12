"use client";

import { useState } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/utils/data";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categories: string[];
    priceRange: [number, number];
  };
  onFiltersChange: (filters: any) => void;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...localFilters.categories, categoryId]
      : localFilters.categories.filter((id) => id !== categoryId);

    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // const handleBrandChange = (brand: string, checked: boolean) => {
  //   const newBrands = checked
  //     ? [...localFilters.brands, brand]
  //     : localFilters.brands.filter(b => b !== brand);

  //   const newFilters = { ...localFilters, brands: newBrands };
  //   setLocalFilters(newFilters);
  //   onFiltersChange(newFilters);
  // };

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...localFilters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      categories: [],
      brands: [],
      priceRange: [0, 2000] as [number, number],
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black  lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`rounded-2xl fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-background border-r border-accent z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 flex-col">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Filters</h2>
            </div>
            <button onClick={onClose} className="lg:hidden">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-white font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={category.id}
                        checked={localFilters.categories.includes(category.id)}
                        onCheckedChange={(checked: any) =>
                          handleCategoryChange(category.id, checked as boolean)
                        }
                        className="border-accent"
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm text-gray-300 cursor-pointer hover:text-white"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-white font-medium mb-3">Brands</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto"></div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-white font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={localFilters.priceRange}
                    max={2000}
                    min={0}
                    step={10}
                    onValueChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${localFilters.priceRange[0]}</span>
                    <span>${localFilters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full border-accent text-white hover:bg-white/10"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
