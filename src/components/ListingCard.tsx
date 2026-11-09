'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RoomListing, UserQuizPreferences } from '../types';
import { calculateCompatibility, formatINR } from '../lib/utils';
import { 
  MapPin, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Utensils, 
  Cigarette, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Building
} from 'lucide-react';

interface ListingCardProps {
  listing: RoomListing;
  userPrefs: UserQuizPreferences | null;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectListing: (listing: RoomListing) => void;
  onDirectConnect: (listing: RoomListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  userPrefs,
  isBookmarked,
  onToggleBookmark,
  onSelectListing,
  onDirectConnect,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { score, highlights } = calculateCompatibility(listing, userPrefs);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1));
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case 'private-master': return 'Master Bed (Attached Bath)';
      case 'private-standard': return 'Private Room';
      case 'shared-2sharing': return '2-Sharing Room';
      default: return 'Private Room';
    }
  };

  const getFoodBadge = (food: string) => {
    switch (food) {
      case 'veg-only': return { label: 'Veg Only Flat', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'jain-only': return { label: 'Jain Kitchen', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'eggetarian': return { label: 'Eggetarian', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      default: return { label: 'Non-Veg Friendly', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const foodBadge = getFoodBadge(listing.foodPreference);

  return (
    <div 
      onClick={() => onSelectListing(listing)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Carousel Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 select-none">
        <Image
          src={listing.images[currentImageIndex] || listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-102 transition-transform duration-500"
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {listing.zeroBrokerage && (
              <span className="bg-teal-700/90 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Zero Brokerage
              </span>
            )}
            <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
              {getRoomTypeLabel(listing.roomType)}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(listing.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isBookmarked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
            title={isBookmarked ? 'Remove from Saved' : 'Save Room'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Image navigation controls if multiple images */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {listing.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom image overlay: Compatibility Match Score */}
        <div className="absolute bottom-2.5 left-3">
          <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md backdrop-blur-md ${
            score >= 85 
              ? 'bg-emerald-600/90 text-white' 
              : score >= 70 
              ? 'bg-amber-500/90 text-white' 
              : 'bg-slate-700/90 text-white'
          }`}>
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>{score}% RoomieMatch</span>
          </div>
        </div>

        {/* Available from tag */}
        <div className="absolute bottom-2.5 right-3 text-[11px] text-white/95 font-medium drop-shadow-sm">
          Available: {listing.availableFrom}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Deposit Row */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                {formatINR(listing.rentPerMonth)}
              </span>
              <span className="text-xs text-slate-500 font-normal"> / month</span>
            </div>

            <div className="text-right text-xs text-slate-500">
              <span>Deposit: </span>
              <strong className="text-slate-700 font-semibold">{formatINR(listing.securityDeposit)}</strong>
            </div>
          </div>

          {/* Transparent recurring splits (Maid + Cook) */}
          <div className="mb-2.5 text-[11px] text-slate-600 bg-amber-50/60 border border-amber-200/60 rounded-lg px-2.5 py-1 flex items-center justify-between">
            <span>Maid &amp; Cook share: <strong>{formatINR(listing.maidCookSplitPerPerson)}/mo</strong></span>
            <span>Maint: <strong>{formatINR(listing.maintenanceSplit)}/mo</strong></span>
          </div>

          {/* Title & Locality */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
            {listing.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="font-medium text-slate-700">{listing.locality}</span>
            <span className="text-slate-300">•</span>
            <span className="line-clamp-1">{listing.landmark}</span>
          </div>

          {/* Lifestyle Badges (Food, Smoking, Gender) */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${foodBadge.bg}`}>
              <Utensils className="w-3 h-3" />
              {foodBadge.label}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {listing.genderPreference === 'female-only' ? '👩 Girls Only' : 
               listing.genderPreference === 'male-only' ? '👨 Guys Only' : '👥 Any Gender'}
            </span>

            {listing.lifestyleHabits.smoking === 'no' && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                🚭 Non-Smoker
              </span>
            )}

            {listing.lifestyleHabits.petFriendly && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                🐾 Pet Ok
              </span>
            )}
          </div>

          {/* Current Roommates Profile Preview */}
          <div className="pt-3 border-t border-slate-100 mb-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                {listing.currentFlatmates.map((mate, idx) => (
                  <div key={idx} className="relative w-6 h-6 rounded-full ring-2 ring-white overflow-hidden bg-slate-200">
                    <Image
                      src={mate.avatar}
                      alt={mate.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-slate-600 line-clamp-1">
                Roommates: <strong className="text-slate-800">{listing.currentFlatmates.map(m => `${m.name} (${m.companyOrCollege})`).join(', ')}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDirectConnect(listing);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat with Flatmate</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectListing(listing);
            }}
            className="p-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors"
            title="View Full Details & House Rules"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
