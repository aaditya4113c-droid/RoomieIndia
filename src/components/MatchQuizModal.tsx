'use client';

import React, { useState } from 'react';
import { UserQuizPreferences } from '../types';
import { X, Sparkles, Check, ArrowRight, Utensils, Cigarette, Moon, Briefcase, IndianRupee } from 'lucide-react';

interface MatchQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrefs: UserQuizPreferences | null;
  onSaveQuiz: (prefs: UserQuizPreferences) => void;
}

export const MatchQuizModal: React.FC<MatchQuizModalProps> = ({
  isOpen,
  onClose,
  currentPrefs,
  onSaveQuiz,
}) => {
  const [diet, setDiet] = useState<UserQuizPreferences['diet']>(currentPrefs?.diet || 'veg-only');
  const [smoking, setSmoking] = useState<UserQuizPreferences['smoking']>(currentPrefs?.smoking || 'no');
  const [drinking, setDrinking] = useState<UserQuizPreferences['drinking']>(currentPrefs?.drinking || 'socially');
  const [schedule, setSchedule] = useState<UserQuizPreferences['schedule']>(currentPrefs?.schedule || 'early-bird');
  const [wfh, setWfh] = useState<UserQuizPreferences['wfh']>(currentPrefs?.wfh || 'hybrid');
  const [maxBudget, setMaxBudget] = useState<number>(currentPrefs?.maxBudget || 22000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveQuiz({
      diet,
      smoking,
      drinking,
      schedule,
      wfh,
      gender: 'any',
      maxBudget,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background spark decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/60 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                60-Sec RoomieQuiz™
              </h3>
              <p className="text-xs text-slate-500">
                Personalize your compatibility score with Indian flatmates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-xs">
          
          {/* Question 1: Food habits */}
          <div>
            <label className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-orange-600" />
              1. Kitchen &amp; Food Habits
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { val: 'veg-only', label: '🥦 Strict Veg', desc: 'No meat in kitchen' },
                { val: 'jain-only', label: '🙏 Jain Only', desc: 'No onion/garlic' },
                { val: 'eggetarian', label: '🥚 Eggetarian', desc: 'Eggs OK' },
                { val: 'non-veg-friendly', label: '🍗 Non-Veg OK', desc: 'Cook/eat meat' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setDiet(opt.val as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    diet === opt.val
                      ? 'bg-orange-50 border-orange-500 text-orange-950 ring-2 ring-orange-500/20 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Smoking */}
          <div>
            <label className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
              <Cigarette className="w-4 h-4 text-slate-600" />
              2. Smoking Policy
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 'no', label: '🚭 Strictly No', desc: 'Smoke-free flat' },
                { val: 'balcony-only', label: '💨 Balcony Only', desc: 'Outside rooms only' },
                { val: 'yes', label: '🚬 Flexible', desc: 'Smoking friendly' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setSmoking(opt.val as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    smoking === opt.val
                      ? 'bg-orange-50 border-orange-500 text-orange-950 ring-2 ring-orange-500/20 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Daily rhythm / sleep schedule */}
          <div>
            <label className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-indigo-600" />
              3. Sleeping &amp; Daily Rhythm
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 'early-bird', label: '🌅 Early Bird', desc: 'Asleep by 11 PM' },
                { val: 'night-owl', label: '🌙 Night Owl', desc: 'Active after midnight' },
                { val: 'flexible', label: '⚡ Flexible', desc: 'Easy either way' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setSchedule(opt.val as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    schedule === opt.val
                      ? 'bg-orange-50 border-orange-500 text-orange-950 ring-2 ring-orange-500/20 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Work rhythm */}
          <div>
            <label className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-teal-600" />
              4. Work Pattern
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 'hybrid', label: '🏢 Hybrid', desc: 'Mix of office & home' },
                { val: 'full-wfh', label: '💻 Full WFH', desc: 'Work from room daily' },
                { val: 'office', label: '🚗 Regular Office', desc: 'Out during daytime' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setWfh(opt.val as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    wfh === opt.val
                      ? 'bg-orange-50 border-orange-500 text-orange-950 ring-2 ring-orange-500/20 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: Target max budget */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-amber-600" />
                5. Ideal Monthly Rent Budget
              </label>
              <span className="font-black text-orange-600 text-sm">
                ₹{maxBudget.toLocaleString('en-IN')} / month
              </span>
            </div>
            <input
              type="range"
              min={8000}
              max={45000}
              step={1000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Calculate My RoomieMatch™ Scores</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
