'use client';

import React, { useState } from 'react';
import { TeamUpProfile, City, FoodPreference, RoomType } from '../types';
import { X, Users, MapPin, Briefcase, Plus, Check } from 'lucide-react';

interface PostTeamUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: City;
  onSaveTeamUp: (profile: TeamUpProfile) => void;
}

export const PostTeamUpModal: React.FC<PostTeamUpModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSaveTeamUp,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Non-Binary'>('Male');
  const [occupation, setOccupation] = useState('');
  const [company, setCompany] = useState('');
  const [targetCity, setTargetCity] = useState<City>(currentCity);
  const [localitiesStr, setLocalitiesStr] = useState('');
  const [budgetMin, setBudgetMin] = useState<number>(15000);
  const [budgetMax, setBudgetMax] = useState<number>(25000);
  const [moveInDate, setMoveInDate] = useState('1st of Next Month');
  const [foodPref, setFoodPref] = useState<FoodPreference>('veg-only');
  const [smoking, setSmoking] = useState<'no' | 'balcony-only' | 'yes'>('no');
  const [schedule, setSchedule] = useState<'early-bird' | 'night-owl' | 'flexible'>('early-bird');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [lookingCount, setLookingCount] = useState<number>(2);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const localities = localitiesStr
      ? localitiesStr.split(',').map(s => s.trim()).filter(Boolean)
      : ['Koramangala', 'HSR Layout'];

    const newProfile: TeamUpProfile = {
      id: `teamup-${Date.now()}`,
      name: name || 'Renter',
      age: Number(age),
      gender,
      occupation: occupation || 'Software Professional',
      companyOrCollege: company || 'Tech Firm',
      avatar: gender === 'Female' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      targetCity,
      targetLocalities: localities,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      targetMoveInDate: moveInDate,
      preferredRoomType: 'private-master',
      foodPreference: foodPref,
      lifestyleHabits: {
        smoking,
        drinking: 'socially',
        partyHabits: 'rarely',
        wfhPolicy: 'hybrid',
        wakeSchedule: schedule,
        petFriendly: false,
      },
      bio: bio || `Looking for ${lookingCount} like-minded flatmate(s) to take a 2BHK/3BHK in ${targetCity}.`,
      isVerified: true,
      whatsappContact: whatsapp.replace(/\D/g, '') || '919876543210',
      lookingForFlatmatesCount: Number(lookingCount),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSaveTeamUp(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Create &quot;Team Up to Rent&quot; Card
              </h3>
              <p className="text-xs text-slate-500">Find like-minded roommates to lease a flat together</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Name & Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Age</label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
              </select>
            </div>
          </div>

          {/* Profession & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Occupation / Role</label>
              <input
                type="text"
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Product Designer, SDE-2"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company or College</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Razorpay, Swiggy, IIT"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Target City & Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target City</label>
              <select
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value as City)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
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
              <label className="font-semibold text-slate-700 block mb-1">Target Areas (comma-separated)</label>
              <input
                type="text"
                required
                value={localitiesStr}
                onChange={(e) => setLocalitiesStr(e.target.value)}
                placeholder="e.g. Koramangala, HSR Layout, Indiranagar"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Budget & Flatmates needed */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <label className="text-[11px] text-slate-500 block mb-1">Min Budget (₹/mo)</label>
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-500 block mb-1">Max Budget (₹/mo)</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-500 block mb-1">Flatmates Needed</label>
              <select
                value={lookingCount}
                onChange={(e) => setLookingCount(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
              >
                <option value={1}>1 Flatmate (for 2BHK)</option>
                <option value={2}>2 Flatmates (for 3BHK)</option>
                <option value={3}>3 Flatmates (for 4BHK)</option>
              </select>
            </div>
          </div>

          {/* Food & Habits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Food Habit</label>
              <select
                value={foodPref}
                onChange={(e) => setFoodPref(e.target.value as FoodPreference)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="veg-only">🥦 Strict Veg</option>
                <option value="jain-only">🙏 Jain Only</option>
                <option value="eggetarian">🥚 Eggetarian</option>
                <option value="non-veg-friendly">🍗 Non-Veg OK</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Smoking</label>
              <select
                value={smoking}
                onChange={(e) => setSmoking(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="no">🚭 Non-Smoker</option>
                <option value="balcony-only">💨 Balcony Only</option>
                <option value="yes">🚬 Smoking Friendly</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Sleep Schedule</label>
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="early-bird">🌅 Early Bird</option>
                <option value="night-owl">🌙 Night Owl</option>
                <option value="flexible">⚡ Flexible</option>
              </select>
            </div>
          </div>

          {/* WhatsApp & Move-in */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Move-in Timeline</label>
              <input
                type="text"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                placeholder="e.g. Immediately or 1st Next Month"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">About You &amp; Ideal Flatmate</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other seekers what kind of apartment you want to lease together, cleanliness expectations, etc..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Post Team-Up Card</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
