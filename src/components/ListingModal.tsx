'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RoomListing, UserQuizPreferences } from '../types';
import { calculateCompatibility, formatINR } from '../lib/utils';
import { 
  X, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Utensils, 
  Cigarette, 
  Sparkles, 
  Check, 
  Share2, 
  Phone, 
  MessageCircle,
  Calendar,
  Building,
  UserCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  Users
} from 'lucide-react';

interface ListingModalProps {
  listing: RoomListing | null;
  onClose: () => void;
  userPrefs: UserQuizPreferences | null;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onStartChat: (listing: RoomListing) => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  listing,
  onClose,
  userPrefs,
  isBookmarked,
  onToggleBookmark,
  onStartChat,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!listing) return null;

  const { score, highlights, dealbreakers } = calculateCompatibility(listing, userPrefs);

  const totalMonthlyOutflow = listing.rentPerMonth + listing.maintenanceSplit + listing.maidCookSplitPerPerson;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {listing.city} • {listing.locality}
            </span>
            {listing.zeroBrokerage && (
              <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Zero Brokerage
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors text-xs flex items-center gap-1"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(listing.id)}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Gallery Section */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <Image
                src={listing.images[selectedImageIdx] || listing.images[0]}
                alt={listing.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                Photo {selectedImageIdx + 1} of {listing.images.length}
              </div>
            </div>

            {/* Thumbnails row */}
            {listing.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      idx === selectedImageIdx ? 'border-orange-500 scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Locality & Pricing Overview */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {listing.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 mt-1">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{listing.locality}, {listing.city}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{listing.landmark}</span>
              </div>
            </div>

            {/* Price Pill */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3.5 text-right shrink-0">
              <div className="text-2xl font-black text-orange-600">
                {formatINR(listing.rentPerMonth)}
                <span className="text-xs font-normal text-slate-600"> / month</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Refundable Deposit: <strong className="text-slate-800">{formatINR(listing.securityDeposit)}</strong>
              </div>
            </div>
          </div>

          {/* Compatibility Banner (RoomieMatch) */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            score >= 85 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg text-white shadow-xs ${
                score >= 85 ? 'bg-emerald-600' : 'bg-amber-500'
              }`}>
                {score}%
              </div>
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Lifestyle Compatibility Score
                </h4>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-slate-700">
                  {highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md font-medium text-slate-800 shadow-2xs">
                      <Check className="w-3 h-3 text-emerald-600" /> {h}
                    </span>
                  ))}
                  {dealbreakers.map((d, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 px-2 py-0.5 rounded-md font-medium border border-rose-200">
                      ⚠️ {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Based on your habits &amp; kitchen preferences
            </div>
          </div>

          {/* Transparent Indian Rental Cost Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              Transparent Monthly Expense Split
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-1">Room Rent</span>
                <span className="font-bold text-slate-900 text-sm">{formatINR(listing.rentPerMonth)}</span>
                <span className="text-[10px] text-slate-400 block">Due 1st of month</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-1">Maid &amp; Cook Share</span>
                <span className="font-bold text-amber-700 text-sm">{formatINR(listing.maidCookSplitPerPerson)}</span>
                <span className="text-[10px] text-slate-400 block">Food + Cleaning split</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-1">Society Maintenance</span>
                <span className="font-bold text-slate-900 text-sm">{formatINR(listing.maintenanceSplit)}</span>
                <span className="text-[10px] text-slate-400 block">Per person share</span>
              </div>

              <div className="bg-orange-600 text-white p-3 rounded-xl shadow-xs">
                <span className="text-orange-200 block mb-1 font-medium">Total Monthly Est.</span>
                <span className="font-black text-base">{formatINR(totalMonthlyOutflow)}</span>
                <span className="text-[10px] text-orange-200 block">+ WiFi &amp; Electricity</span>
              </div>
            </div>
          </div>

          {/* About Flat & Description */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Description &amp; Flat Atmosphere</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Who Lives Here: Current Flatmates */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              Current Flatmates in this Flat ({listing.currentFlatmates.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {listing.currentFlatmates.map((mate, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex gap-3.5 items-start">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-200 ring-2 ring-orange-500/20">
                    <Image src={mate.avatar} alt={mate.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{mate.name}, {mate.age}</h4>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        {mate.role}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      <span>{mate.companyOrCollege}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                      &quot;{mate.bio}&quot;
                    </p>
                    <div className="mt-2 text-[11px] text-slate-700 font-medium bg-white px-2 py-1 rounded-md border border-slate-200">
                      ⚡ {mate.habitsSummary}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules & Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* Amenities */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-2.5">Society &amp; Room Amenities</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {listing.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="line-clamp-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Culture */}
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-2.5">House Rules &amp; Preferences</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Kitchen / Food Habit:</span>
                  <span className="font-semibold text-slate-800">
                    {listing.foodPreference === 'veg-only' ? 'Strictly Vegetarian Kitchen' : 
                     listing.foodPreference === 'jain-only' ? 'Strictly Jain Food Only' : 'Non-Veg Friendly'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Gender Preference:</span>
                  <span className="font-semibold text-slate-800">
                    {listing.genderPreference === 'female-only' ? 'Girls Only' : 
                     listing.genderPreference === 'male-only' ? 'Guys Only' : 'Any Gender'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Smoking Policy:</span>
                  <span className="font-semibold text-slate-800">
                    {listing.lifestyleHabits.smoking === 'no' ? 'Strictly No Smoking' : 
                     listing.lifestyleHabits.smoking === 'balcony-only' ? 'Allowed in Balcony Only' : 'Smoking Allowed'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Work Rhythm:</span>
                  <span className="font-semibold text-slate-800">
                    {listing.lifestyleHabits.wfhPolicy === 'hybrid' ? 'Hybrid (WFH + Office)' : 
                     listing.lifestyleHabits.wfhPolicy === 'full-wfh' ? 'WFH Friendly' : 'Regular Office Shifts'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-500">Pet Policy:</span>
                  <span className="font-semibold text-slate-800">
                    {listing.lifestyleHabits.petFriendly ? '🐾 Pet Friendly' : 'No Pets Allowed'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Host Contact & Verification Box */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-300 ring-2 ring-orange-500">
                <Image src={listing.postedBy.avatar} alt={listing.postedBy.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{listing.postedBy.name}</h4>
                  {listing.postedBy.isVerified && (
                    <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-teal-700" />
                      {listing.postedBy.verificationType} Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">{listing.postedBy.role} • Zero Brokerage Listing</p>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* WhatsApp direct link */}
              <a
                href={`https://wa.me/${listing.postedBy.whatsapp}?text=Hi%20${encodeURIComponent(listing.postedBy.name)},%20I%20saw%20your%20room%20listing%20for%20${encodeURIComponent(listing.locality)}%20on%20RoomieIndia.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <span>WhatsApp</span>
              </a>

              {/* In-app Chat */}
              <button
                onClick={() => {
                  onClose();
                  onStartChat(listing);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat in App</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
