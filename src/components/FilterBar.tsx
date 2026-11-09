'use client';

import React from 'react';
import { RoomType, FoodPreference, GenderPreference } from '../types';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterBarProps {
  roomType: RoomType | 'all';
  onRoomTypeChange: (type: RoomType | 'all') => void;
  maxBudget: number;
  onMaxBudgetChange: (budget: number) => void;
  selectedFood: FoodPreference;
  onFoodChange: (food: FoodPreference) => void;
  selectedGender: GenderPreference;
  onGenderChange: (gender: GenderPreference) => void;
  zeroBrokerageOnly: boolean;
  onZeroBrokerageChange: (val: boolean) => void;
  onResetFilters: () => void;
  totalCount: number;
  hasActiveFilters: boolean;
  hasUserQuiz: boolean;
  onOpenQuiz: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  roomType,
  onRoomTypeChange,
  maxBudget,
  onMaxBudgetChange,
  selectedFood,
  onFoodChange,
  selectedGender,
  onGenderChange,
  zeroBrokerageOnly,
  onZeroBrokerageChange,
  onResetFilters,
  totalCount,
  hasActiveFilters,
  hasUserQuiz,
  onOpenQuiz,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 py-3.5 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Quick Filter Pills */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            
            <div className="flex items-center gap-1 text-slate-500 font-semibold mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-700" />
              <span>Filters:</span>
            </div>

            {/* Room Type Selector */}
            <select
              value={roomType}
              onChange={(e) => onRoomTypeChange(e.target.value as RoomType | 'all')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                roomType !== 'all'
                  ? 'bg-orange-50 border-orange-300 text-orange-900 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <option value="all">Room: Any Type</option>
              <option value="private-master">Master Bed (Attached Bath)</option>
              <option value="private-standard">Private Standard Room</option>
              <option value="shared-2sharing">2-Sharing Room</option>
            </select>

            {/* Gender Filter */}
            <select
              value={selectedGender}
              onChange={(e) => onGenderChange(e.target.value as GenderPreference)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                selectedGender !== 'any'
                  ? 'bg-orange-50 border-orange-300 text-orange-900 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <option value="any">Flatmate Gender: Any</option>
              <option value="male-only">👨 Male Flatmates Only</option>
              <option value="female-only">👩 Female Flatmates Only</option>
              <option value="couples-friendly">👫 Couples Friendly</option>
              <option value="lgbtq-friendly">🌈 LGBTQ+ Friendly</option>
            </select>

            {/* Food Habits Filter */}
            <select
              value={selectedFood}
              onChange={(e) => onFoodChange(e.target.value as FoodPreference)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                selectedFood !== 'all'
                  ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <option value="all">Food: Any Kitchen</option>
              <option value="veg-only">🥦 Strict Veg Flat</option>
              <option value="jain-only">🙏 Jain Kitchen Only</option>
              <option value="eggetarian">🥚 Eggetarian Allowed</option>
              <option value="non-veg-friendly">🍗 Non-Veg Friendly</option>
            </select>

            {/* Zero Brokerage Toggle Pill */}
            <button
              onClick={() => onZeroBrokerageChange(!zeroBrokerageOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                zeroBrokerageOnly
                  ? 'bg-teal-600 border-teal-600 text-white font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {zeroBrokerageOnly && <Check className="w-3.5 h-3.5" />}
              <span>Zero Brokerage</span>
            </button>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-slate-500 hover:text-orange-600 px-2 py-1 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

          </div>

          {/* Budget Range & Match Status */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
            {/* Budget slider */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium whitespace-nowrap">
                Max Rent: <strong className="text-slate-800">₹{maxBudget.toLocaleString('en-IN')}/mo</strong>
              </span>
              <input
                type="range"
                min={8000}
                max={45000}
                step={1000}
                value={maxBudget}
                onChange={(e) => onMaxBudgetChange(Number(e.target.value))}
                className="w-24 sm:w-32 accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Quiz match status banner or button */}
            {!hasUserQuiz ? (
              <button
                onClick={onOpenQuiz}
                className="hidden sm:flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 px-2.5 py-1.5 rounded-lg border border-amber-200 font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Calculate Match %</span>
              </button>
            ) : (
              <button
                onClick={onOpenQuiz}
                className="hidden sm:flex items-center gap-1 bg-teal-50 hover:bg-teal-100 text-teal-800 px-2.5 py-1.5 rounded-lg border border-teal-200 font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Quiz Active (Edit)</span>
              </button>
            )}

            {/* Count Indicator */}
            <span className="text-slate-500 font-medium text-xs whitespace-nowrap">
              <strong className="text-slate-900">{totalCount}</strong> verified rooms
            </span>

          </div>

        </div>

      </div>
    </div>
  );
};
