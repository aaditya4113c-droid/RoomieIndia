'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TeamUpProfile, City, FoodPreference } from '../types';
import { formatINR } from '../lib/utils';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Utensils, 
  MessageCircle, 
  PlusCircle, 
  ShieldCheck, 
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TeamUpSectionProps {
  currentCity: City;
  teamUps: TeamUpProfile[];
  onOpenPostTeamUp: () => void;
  onStartChatWithTeamUp: (profile: TeamUpProfile) => void;
}

export const TeamUpSection: React.FC<TeamUpSectionProps> = ({
  currentCity,
  teamUps,
  onOpenPostTeamUp,
  onStartChatWithTeamUp,
}) => {
  const [filterFood, setFilterFood] = useState<FoodPreference>('all');
  const [searchLocality, setSearchLocality] = useState<string>('');

  const cityProfiles = teamUps.filter((profile) => {
    const matchesCity = profile.targetCity === currentCity;
    const matchesFood = filterFood === 'all' || profile.foodPreference === filterFood;
    const matchesLocality = !searchLocality || profile.targetLocalities.some(loc => 
      loc.toLowerCase().includes(searchLocality.toLowerCase())
    ) || profile.name.toLowerCase().includes(searchLocality.toLowerCase());

    return matchesCity && matchesFood && matchesLocality;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner for Team-Up concept */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Beat the Broker Mafia • Team Up &amp; Rent Together</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Find Flatmates to Jointly Rent a Flat in {currentCity}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Taking an entire 2BHK or 3BHK with like-minded techies or professionals saves up to ₹10,000/month compared to single room sublets. Connect, align on budget, and hunt together!
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPostTeamUp}
              className="bg-white hover:bg-teal-50 text-teal-900 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-teal-700" />
              <span>Create My Team-Up Profile</span>
            </button>
            <span className="text-xs text-teal-200 font-medium">Free • Verified Working Professionals</span>
          </div>
        </div>

        {/* Decorative graphic / background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-400/10 to-transparent pointer-events-none" />
      </div>

      {/* Filter and search bar for teamups */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchLocality}
            onChange={(e) => setSearchLocality(e.target.value)}
            placeholder="Filter by target locality (e.g. HSR, Bandra)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <select
            value={filterFood}
            onChange={(e) => setFilterFood(e.target.value as FoodPreference)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">Food: Any Kitchen</option>
            <option value="veg-only">Strictly Veg Flatmate</option>
            <option value="jain-only">Jain Food Flatmate</option>
            <option value="eggetarian">Eggetarian</option>
            <option value="non-veg-friendly">Non-Veg Friendly</option>
          </select>

          <span className="text-slate-500 text-xs ml-auto sm:ml-2">
            <strong>{cityProfiles.length}</strong> people looking
          </span>
        </div>
      </div>

      {/* Team-Up Cards Grid */}
      {cityProfiles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No active team-up profiles found in this area</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Be the first person in {currentCity} to post a team-up card and attract potential roommates!
          </p>
          <button
            onClick={onOpenPostTeamUp}
            className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-xl hover:bg-teal-800 transition-colors"
          >
            Post Your Requirement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cityProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-200 ring-2 ring-teal-600/30">
                      <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-sm">{profile.name}, {profile.age}</h3>
                        {profile.isVerified && (
                          <span title="Work Email Verified">
                            <ShieldCheck className="w-4 h-4 text-teal-600" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        <span>{profile.occupation} • {profile.companyOrCollege}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                    Needs {profile.lookingForFlatmatesCount} Flatmate{profile.lookingForFlatmatesCount > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Target Localities Pills */}
                <div className="mb-3">
                  <span className="text-[11px] text-slate-400 block mb-1 font-medium">Looking in areas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.targetLocalities.map((loc, i) => (
                      <span key={i} className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-600" />
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Budget & Move-in Date Row */}
                <div className="bg-slate-50 rounded-xl p-2.5 mb-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Budget per room</span>
                    <strong className="text-slate-900 text-xs">
                      {formatINR(profile.budgetMin)} - {formatINR(profile.budgetMax)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Target Move-In</span>
                    <strong className="text-slate-900 text-xs">{profile.targetMoveInDate}</strong>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3 italic">
                  &quot;{profile.bio}&quot;
                </p>

                {/* Habits Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                    {profile.foodPreference === 'veg-only' ? '🥦 Strict Veg' :
                     profile.foodPreference === 'jain-only' ? '🙏 Jain Kitchen' :
                     profile.foodPreference === 'eggetarian' ? '🥚 Eggetarian' : '🍗 Non-Veg Ok'}
                  </span>

                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {profile.lifestyleHabits.smoking === 'no' ? '🚭 Non-Smoker' : 'Smoking Ok'}
                  </span>

                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {profile.lifestyleHabits.wakeSchedule === 'early-bird' ? '🌅 Early Bird' : '🌙 Night Owl'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`https://wa.me/${profile.whatsappContact}?text=Hi%20${encodeURIComponent(profile.name)},%20I%20saw%20your%20team-up%20profile%20on%20RoomieIndia%20for%20${encodeURIComponent(currentCity)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl text-center transition-colors"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => onStartChatWithTeamUp(profile)}
                  className="flex-1 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Team Up</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
