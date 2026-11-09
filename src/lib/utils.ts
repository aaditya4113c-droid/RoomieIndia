import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RoomListing, UserQuizPreferences } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateCompatibility(
  listing: RoomListing,
  userPrefs: UserQuizPreferences | null
): { score: number; highlights: string[]; dealbreakers: string[] } {
  if (!userPrefs) {
    return {
      score: 85,
      highlights: ['Take the 60-sec RoomieQuiz to see personalized score'],
      dealbreakers: []
    };
  }

  let points = 0;
  let maxPoints = 100;
  const highlights: string[] = [];
  const dealbreakers: string[] = [];

  // 1. Food habits check (25 points)
  if (userPrefs.diet === 'veg-only' || userPrefs.diet === 'jain-only') {
    if (listing.foodPreference === 'veg-only' || listing.foodPreference === 'jain-only') {
      points += 25;
      highlights.push('Vegetarian kitchen aligned');
    } else if (listing.foodPreference === 'eggetarian') {
      points += 15;
      highlights.push('Eggetarian-friendly');
    } else {
      points += 5;
      dealbreakers.push('Listing allows non-veg cooking');
    }
  } else {
    // User is non-veg or flexible
    if (listing.foodPreference === 'all' || listing.foodPreference === 'non-veg-friendly') {
      points += 25;
      highlights.push('Non-veg friendly kitchen');
    } else {
      points += 15;
      highlights.push('Veg kitchen respected');
    }
  }

  // 2. Smoking check (20 points)
  if (userPrefs.smoking === 'no') {
    if (listing.lifestyleHabits.smoking === 'no') {
      points += 20;
      highlights.push('Strictly non-smoking flat');
    } else if (listing.lifestyleHabits.smoking === 'balcony-only') {
      points += 12;
      highlights.push('Smoking allowed only in balcony');
    } else {
      dealbreakers.push('Smoking allowed inside flat');
    }
  } else {
    if (listing.lifestyleHabits.smoking !== 'no') {
      points += 20;
      highlights.push('Smoking friendly / balcony available');
    } else {
      points += 5;
      dealbreakers.push('Non-smoking flat');
    }
  }

  // 3. Sleep / Wake Schedule (15 points)
  if (userPrefs.schedule === listing.lifestyleHabits.wakeSchedule) {
    points += 15;
    highlights.push(userPrefs.schedule === 'early-bird' ? 'Both early risers' : 'Both night owls');
  } else if (userPrefs.schedule === 'flexible' || listing.lifestyleHabits.wakeSchedule === 'flexible') {
    points += 12;
  } else {
    points += 5;
  }

  // 4. WFH alignment (15 points)
  if (userPrefs.wfh === listing.lifestyleHabits.wfhPolicy) {
    points += 15;
    highlights.push('Matching work rhythm');
  } else {
    points += 10;
  }

  // 5. Drinking & Social vibe (15 points)
  if (userPrefs.drinking === listing.lifestyleHabits.drinking) {
    points += 15;
    highlights.push('Similar social & drinking habits');
  } else {
    points += 10;
  }

  // 6. Budget fit (10 points)
  if (userPrefs.maxBudget && listing.rentPerMonth <= userPrefs.maxBudget) {
    points += 10;
    highlights.push('Within your monthly rent budget');
  } else if (userPrefs.maxBudget) {
    const diff = listing.rentPerMonth - userPrefs.maxBudget;
    if (diff <= 3000) {
      points += 5;
    } else {
      dealbreakers.push(`Rent is ₹${diff.toLocaleString('en-IN')} above budget`);
    }
  } else {
    points += 10;
  }

  // Normalize between 50 and 99
  const score = Math.min(99, Math.max(52, points));

  return { score, highlights: highlights.slice(0, 3), dealbreakers: dealbreakers.slice(0, 2) };
}
