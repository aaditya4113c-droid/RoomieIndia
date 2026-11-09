'use client';

import React from 'react';
import { City } from '../types';
import { 
  Building2, 
  MapPin, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  Sparkles, 
  Users, 
  Search,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentCity: City;
  onCityChange: (city: City) => void;
  activeTab: 'listings' | 'teamup';
  onTabChange: (tab: 'listings' | 'teamup') => void;
  onOpenQuiz: () => void;
  onOpenPostListing: () => void;
  onOpenPostTeamUp: () => void;
  onOpenChat: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  unreadCount: number;
}

const CITIES: City[] = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'];

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onCityChange,
  activeTab,
  onTabChange,
  onOpenQuiz,
  onOpenPostListing,
  onOpenPostTeamUp,
  onOpenChat,
  onOpenBookmarks,
  bookmarkCount,
  unreadCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-announcement banner for Indian zero brokerage */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-teal-700 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-amber-200" />
        <span>100% Zero Brokerage Verified Roommates & Flats in Top Tech Hubs</span>
        <span className="hidden sm:inline-block bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">Direct Flatmate Connect</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div 
              onClick={() => onTabChange('listings')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
                  Roomie<span className="text-orange-600">India</span>
                  <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 px-1.5 py-0.2 rounded">सहपाठी</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Flatmates & Rooms</span>
              </div>
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 bg-slate-100/80 hover:bg-slate-200/80 transition-colors px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <select
                  value={currentCity}
                  onChange={(e) => onCityChange(e.target.value as City)}
                  className="bg-transparent border-none outline-none cursor-pointer pr-1 text-xs font-medium text-slate-800"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => onTabChange('listings')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'listings'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-orange-500" />
              Find a Room
            </button>
            <button
              onClick={() => onTabChange('teamup')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'teamup'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-teal-600" />
              Team Up to Rent
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">New</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compatibility Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
              title="Test your lifestyle compatibility"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">RoomieQuiz™</span>
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Saved Rooms"
            >
              <Heart className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* In-App Messages */}
            <button
              onClick={onOpenChat}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Messages & Connects"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Post button dropdown / action */}
            <div className="flex items-center gap-1">
              <button
                onClick={activeTab === 'teamup' ? onOpenPostTeamUp : onOpenPostListing}
                className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm shadow-orange-500/25 transition-all hover:shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{activeTab === 'teamup' ? 'Post Team Up' : 'List a Room'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Sub-Navigation for Tab Switcher */}
        <div className="flex md:hidden items-center justify-center pb-2.5 pt-1 gap-2">
          <button
            onClick={() => onTabChange('listings')}
            className={`flex-1 py-1.5 text-xs text-center rounded-lg font-medium ${
              activeTab === 'listings'
                ? 'bg-orange-50 text-orange-700 border border-orange-200 font-semibold'
                : 'text-slate-600 bg-slate-100'
            }`}
          >
            🏠 Find a Room
          </button>
          <button
            onClick={() => onTabChange('teamup')}
            className={`flex-1 py-1.5 text-xs text-center rounded-lg font-medium ${
              activeTab === 'teamup'
                ? 'bg-teal-50 text-teal-700 border border-teal-200 font-semibold'
                : 'text-slate-600 bg-slate-100'
            }`}
          >
            🤝 Team Up to Rent
          </button>
        </div>

      </div>
    </header>
  );
};
