'use client';

import React from 'react';
import { City, FoodPreference, GenderPreference } from '../types';
import { Search, MapPin, Sparkles, ShieldCheck, Utensils, Users, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  currentCity: City;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFood: FoodPreference;
  onFoodChange: (food: FoodPreference) => void;
  selectedGender: GenderPreference;
  onGenderChange: (gender: GenderPreference) => void;
  onOpenQuiz: () => void;
  activeTab: 'listings' | 'teamup';
  onTabChange: (tab: 'listings' | 'teamup') => void;
}

const CITY_TRENDING_HUBS: Record<City, string[]> = {
  'Bengaluru': ['HSR Layout', 'Koramangala', 'Indiranagar', 'Whitefield', 'Bellandur'],
  'Mumbai': ['Andheri West', 'Bandra', 'Powai', 'Lower Parel', 'Goregaon'],
  'Delhi NCR': ['DLF Phase 3', 'Cyber City', 'Golf Course Rd', 'Noida Sec 62', 'Hauz Khas'],
  'Pune': ['Hinjewadi', 'Viman Nagar', 'Baner', 'Kalyani Nagar', 'Wakand'],
  'Hyderabad': ['Gachibowli', 'Hitec City', 'Madhapur', 'Kondapur', 'Kukatpally'],
  'Chennai': ['OMR', 'Velachery', 'Thiruvanmiyur', 'Adyar', 'Perungudi']
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCity,
  searchQuery,
  onSearchChange,
  selectedFood,
  onFoodChange,
  selectedGender,
  onGenderChange,
  onOpenQuiz,
  activeTab,
  onTabChange,
}) => {
  const trendingHubs = CITY_TRENDING_HUBS[currentCity] || [];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-amber-50/30 to-slate-50 pt-8 pb-10 border-b border-slate-200">
      
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-1/4 -mt-12 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top badge */}
        <div className="flex justify-center mb-4">
          <div 
            onClick={onOpenQuiz}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-orange-200 text-orange-800 text-xs font-semibold shadow-xs hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>Don&apos;t know who you match with? Take 60-Sec RoomieQuiz™</span>
            <ArrowRight className="w-3 h-3 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Compatible Flatmates &amp; Rooms in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              {currentCity}
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Zero Brokerage. Verified techies &amp; working professionals. Filter by Veg/Non-Veg kitchens, lifestyle habits, and clear maid/cook splits.
          </p>
        </div>

        {/* Mode switcher tabs on hero */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white p-1 rounded-xl shadow-xs border border-slate-200">
            <button
              onClick={() => onTabChange('listings')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'listings'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏠 I Need a Room in an Existing Flat
            </button>
            <button
              onClick={() => onTabChange('teamup')}
              className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'teamup'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🤝 Team Up to Rent a New 2BHK/3BHK
            </button>
          </div>
        </div>

        {/* Primary Search Bar Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200/90 p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input for Area/Locality */}
            <div className="sm:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-orange-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={`Search locality, tech park, or landmark in ${currentCity}...`}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Food Filter Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Utensils className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <select
                  value={selectedFood}
                  onChange={(e) => onFoodChange(e.target.value as FoodPreference)}
                  className="w-full pl-9 pr-6 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-700 cursor-pointer"
                >
                  <option value="all">Food: Any Kitchen</option>
                  <option value="veg-only">Strict Veg Only</option>
                  <option value="jain-only">Jain Food Only</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="non-veg-friendly">Non-Veg Friendly</option>
                </select>
              </div>
            </div>

            {/* Gender Filter Dropdown */}
            <div className="sm:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <select
                  value={selectedGender}
                  onChange={(e) => onGenderChange(e.target.value as GenderPreference)}
                  className="w-full pl-9 pr-6 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-slate-700 cursor-pointer"
                >
                  <option value="any">Gender: Any</option>
                  <option value="male-only">Male Only</option>
                  <option value="female-only">Female Only</option>
                  <option value="couples-friendly">Couples Ok</option>
                  <option value="lgbtq-friendly">LGBTQ+ Friendly</option>
                </select>
              </div>
            </div>

            {/* Direct Quiz Trigger or Clear */}
            <div className="sm:col-span-2">
              <button
                onClick={onOpenQuiz}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Match %</span>
              </button>
            </div>

          </div>

          {/* Trending Indian Tech & Residential Micro-Markets */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange-500" /> Popular in {currentCity}:
            </span>
            {trendingHubs.map((hub) => (
              <button
                key={hub}
                onClick={() => onSearchChange(hub)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  searchQuery.toLowerCase() === hub.toLowerCase()
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {hub}
              </button>
            ))}
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-orange-600 hover:text-orange-800 font-semibold underline ml-auto"
              >
                Clear Search
              </button>
            )}
          </div>

        </div>

        {/* Value Proposition Highlights */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-center text-xs text-slate-600">
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-medium text-slate-800">Zero Brokerage Guarantee</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-center gap-2">
            <Utensils className="w-4 h-4 text-orange-600 shrink-0" />
            <span className="font-medium text-slate-800">Strict Veg &amp; Non-Veg Filters</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-center gap-2">
            <span className="font-bold text-amber-600">₹</span>
            <span className="font-medium text-slate-800">Maid &amp; Cook Split Clarity</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-medium text-slate-800">Lifestyle RoomieMatch™</span>
          </div>
        </div>

      </div>
    </div>
  );
};
