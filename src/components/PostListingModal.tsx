'use client';

import React, { useState } from 'react';
import { RoomListing, City, RoomType, FoodPreference, GenderPreference } from '../types';
import { X, Building2, IndianRupee, ShieldCheck, Check, Upload, Plus } from 'lucide-react';

interface PostListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: City;
  onSaveListing: (listing: RoomListing) => void;
}

const DEFAULT_ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
];

const AMENITY_OPTIONS = [
  'Air Conditioner',
  'Attached Washroom',
  'Private Balcony',
  'High-Speed WiFi',
  'Washing Machine',
  'Daily Cook Service',
  'Daily Maid Cleaning',
  '100% Power Backup',
  'Covered Parking',
  'Society Gym & Pool',
  'Geyser in Washroom',
  'Modular Kitchen',
];

export const PostListingModal: React.FC<PostListingModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSaveListing,
}) => {
  const [city, setCity] = useState<City>(currentCity);
  const [title, setTitle] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('private-master');
  const [rent, setRent] = useState<number>(15000);
  const [deposit, setDeposit] = useState<number>(35000);
  const [maintenance, setMaintenance] = useState<number>(1200);
  const [maidCook, setMaidCook] = useState<number>(2000);
  const [foodPref, setFoodPref] = useState<FoodPreference>('veg-only');
  const [genderPref, setGenderPref] = useState<GenderPreference>('male-only');
  const [furnishing, setFurnishing] = useState<'Fully Furnished' | 'Semi Furnished' | 'Unfurnished'>('Fully Furnished');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Air Conditioner',
    'High-Speed WiFi',
    'Washing Machine',
    'Daily Maid Cleaning',
  ]);
  const [hostName, setHostName] = useState('');
  const [hostCompany, setHostCompany] = useState('');
  const [hostRole, setHostRole] = useState('Senior Engineer');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const toggleAmenity = (item: string) => {
    setSelectedAmenities(prev => 
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newListing: RoomListing = {
      id: `listing-${Date.now()}`,
      title: title || `${roomType === 'private-master' ? 'Master Bedroom' : 'Private Room'} in ${locality}`,
      description: description || `Looking for a friendly and responsible flatmate in our flat in ${locality}. Flat is well-maintained with all amenities.`,
      city,
      locality: locality || 'HSR Layout',
      landmark: landmark || 'Near Main Road',
      roomType,
      rentPerMonth: Number(rent),
      securityDeposit: Number(deposit),
      maintenanceSplit: Number(maintenance),
      maidCookSplitPerPerson: Number(maidCook),
      furnishingStatus: furnishing,
      zeroBrokerage: true,
      isAvailable: true,
      availableFrom: 'Immediately',
      images: DEFAULT_ROOM_IMAGES.slice(0, 3),
      amenities: selectedAmenities,
      genderPreference: genderPref,
      foodPreference: foodPref,
      lifestyleHabits: {
        smoking: 'no',
        drinking: 'socially',
        partyHabits: 'rarely',
        wfhPolicy: 'hybrid',
        wakeSchedule: 'early-bird',
        petFriendly: false,
      },
      currentFlatmates: [
        {
          name: hostName || 'You',
          age: 26,
          role: hostRole || 'Working Professional',
          companyOrCollege: hostCompany || 'Tech Startup',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bio: 'Chilled out, respectful, neat.',
          habitsSummary: `${foodPref === 'veg-only' ? 'Vegetarian' : 'Flexible'}, non-smoker.`
        }
      ],
      postedBy: {
        name: hostName || 'You',
        role: 'Current Flatmate',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        isVerified: true,
        verificationType: 'Corporate Email',
        phone: '+91 98765 43210',
        whatsapp: whatsapp.replace(/\D/g, '') || '919876543210',
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSaveListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                List an Available Room in Your Flat
              </h3>
              <p className="text-xs text-slate-500">100% Zero Brokerage • Direct Tenant to Tenant</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* City & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Locality / Sector</label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. HSR Layout Sector 2, Indiranagar"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Title & Landmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Listing Headline</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sunny Master Bed with Balcony in 3BHK"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Landmark / Metro Proximity</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. 5 mins walk from Sony World / Metro"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Room Type & Furnishing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomType)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              >
                <option value="private-master">Master Bedroom (Attached Washroom)</option>
                <option value="private-standard">Private Standard Bedroom</option>
                <option value="shared-2sharing">2-Sharing Bedroom</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Furnishing Status</label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              >
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 block text-xs">Financial Split Breakdown (INR)</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">Rent / month</label>
                <input
                  type="number"
                  required
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">Refundable Deposit</label>
                <input
                  type="number"
                  required
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">Maid &amp; Cook share</label>
                <input
                  type="number"
                  value={maidCook}
                  onChange={(e) => setMaidCook(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-0.5">Maintenance share</label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Indian Lifestyle & Food Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kitchen Food Preference</label>
              <select
                value={foodPref}
                onChange={(e) => setFoodPref(e.target.value as FoodPreference)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              >
                <option value="veg-only">Strictly Vegetarian Kitchen</option>
                <option value="jain-only">Jain Food Only</option>
                <option value="eggetarian">Eggetarian Allowed</option>
                <option value="non-veg-friendly">Non-Veg Friendly</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Preferred Flatmate Gender</label>
              <select
                value={genderPref}
                onChange={(e) => setGenderPref(e.target.value as GenderPreference)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              >
                <option value="male-only">Male Only</option>
                <option value="female-only">Female Only</option>
                <option value="any">Any Gender / Neutral</option>
                <option value="couples-friendly">Couples Friendly</option>
              </select>
            </div>
          </div>

          {/* Amenities selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Amenities Available</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AMENITY_OPTIONS.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`p-2 rounded-lg border text-left flex items-center gap-1.5 transition-colors ${
                    selectedAmenities.includes(item)
                      ? 'bg-orange-50 border-orange-500 text-orange-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${selectedAmenities.includes(item) ? 'text-orange-600' : 'text-slate-300'}`} />
                  <span className="line-clamp-1">{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Flat Description &amp; House Rules</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell prospective flatmates about your flat atmosphere, society facilities, and who currently lives there..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
            />
          </div>

          {/* Host Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company / College</label>
              <input
                type="text"
                value={hostCompany}
                onChange={(e) => setHostCompany(e.target.value)}
                placeholder="e.g. Flipkart / IIMB"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">WhatsApp Number</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. 9845012345"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Publish Zero-Brokerage Room Listing</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
