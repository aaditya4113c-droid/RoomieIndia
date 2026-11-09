'use client';

import React from 'react';
import { Building2, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Roomie<span className="text-orange-500">India</span>
                <span className="ml-1.5 text-[10px] bg-teal-900 text-teal-300 border border-teal-700 px-1.5 py-0.2 rounded font-medium">सहपाठी</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              India&apos;s dedicated flatmate matching &amp; zero-brokerage room renting community. Connecting techies, students, and working professionals without awkward food or lifestyle friction.
            </p>
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Zero Brokerage Community</span>
            </div>
          </div>

          {/* Top Tech Hubs in India */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Top Indian Cities
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-white cursor-pointer">Bengaluru (HSR, Koramangala, Indiranagar, Whitefield)</span></li>
              <li><span className="hover:text-white cursor-pointer">Mumbai (Andheri West, Bandra, Powai, BKC)</span></li>
              <li><span className="hover:text-white cursor-pointer">Delhi NCR (Gurgaon Cyber City, DLF Phase 3, Noida 62)</span></li>
              <li><span className="hover:text-white cursor-pointer">Pune (Hinjewadi, Baner, Viman Nagar, Wakad)</span></li>
              <li><span className="hover:text-white cursor-pointer">Hyderabad (Gachibowli, Hitec City, Madhapur)</span></li>
            </ul>
          </div>

          {/* Specialized Indian Filters */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Lifestyle &amp; Cultural Matching
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-white cursor-pointer">Strictly Vegetarian Kitchens</span></li>
              <li><span className="hover:text-white cursor-pointer">Jain Food Only Flats</span></li>
              <li><span className="hover:text-white cursor-pointer">Eggetarian &amp; Non-Veg Friendly Flats</span></li>
              <li><span className="hover:text-white cursor-pointer">Girls Only &amp; Boys Only Flats</span></li>
              <li><span className="hover:text-white cursor-pointer">Night Owls &amp; Remote Tech Workers</span></li>
              <li><span className="hover:text-white cursor-pointer">Pet Friendly Shared Apartments</span></li>
            </ul>
          </div>

          {/* Community & Safety */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Safety &amp; Verification
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 text-teal-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Corporate Email Verification
              </li>
              <li className="flex items-center gap-1.5 text-teal-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Aadhaar Verified Profiles
              </li>
              <li><span className="hover:text-white cursor-pointer">Fair Security Deposit Guidelines</span></li>
              <li><span className="hover:text-white cursor-pointer">Maid &amp; Cook Expense Splitter</span></li>
              <li><span className="hover:text-white cursor-pointer">Rental Agreement Templates</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <div>
            &copy; {new Date().getFullYear()} RoomieIndia (सहपाठी). Built for Indian urban renters.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>for flat hunters across India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
