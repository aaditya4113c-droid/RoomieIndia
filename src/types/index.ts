export type City = 
  | 'Bengaluru' 
  | 'Mumbai' 
  | 'Delhi NCR' 
  | 'Pune' 
  | 'Hyderabad' 
  | 'Chennai';

export type RoomType = 
  | 'private-master' 
  | 'private-standard' 
  | 'shared-2sharing' 
  | '1bhk-full';

export type GenderPreference = 
  | 'any' 
  | 'male-only' 
  | 'female-only' 
  | 'couples-friendly'
  | 'lgbtq-friendly';

export type FoodPreference = 
  | 'all' 
  | 'veg-only' 
  | 'non-veg-friendly' 
  | 'jain-only' 
  | 'eggetarian';

export interface LifestyleHabits {
  smoking: 'no' | 'balcony-only' | 'yes';
  drinking: 'no' | 'socially' | 'regular';
  partyHabits: 'rarely' | 'weekends' | 'never';
  wfhPolicy: 'office' | 'hybrid' | 'full-wfh';
  wakeSchedule: 'early-bird' | 'night-owl' | 'flexible';
  petFriendly: boolean;
}

export interface FlatmateProfile {
  name: string;
  age: number;
  role: string;
  companyOrCollege: string;
  avatar: string;
  bio: string;
  habitsSummary: string;
}

export interface RoomListing {
  id: string;
  title: string;
  description: string;
  city: City;
  locality: string;
  landmark: string;
  roomType: RoomType;
  rentPerMonth: number;
  securityDeposit: number;
  maintenanceSplit: number;
  maidCookSplitPerPerson: number;
  furnishingStatus: 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';
  zeroBrokerage: boolean;
  isAvailable: boolean;
  availableFrom: string;
  images: string[];
  amenities: string[];
  genderPreference: GenderPreference;
  foodPreference: FoodPreference;
  lifestyleHabits: LifestyleHabits;
  currentFlatmates: FlatmateProfile[];
  postedBy: {
    name: string;
    role: string;
    avatar: string;
    isVerified: boolean;
    verificationType: 'Aadhaar' | 'Corporate Email' | 'College ID';
    phone: string;
    whatsapp: string;
  };
  createdAt: string;
}

export interface TeamUpProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-Binary';
  occupation: string;
  companyOrCollege: string;
  avatar: string;
  targetCity: City;
  targetLocalities: string[];
  budgetMin: number;
  budgetMax: number;
  targetMoveInDate: string;
  preferredRoomType: RoomType;
  foodPreference: FoodPreference;
  lifestyleHabits: LifestyleHabits;
  bio: string;
  isVerified: boolean;
  whatsappContact: string;
  lookingForFlatmatesCount: number;
  createdAt: string;
}

export interface UserQuizPreferences {
  diet: 'veg-only' | 'non-veg-friendly' | 'jain-only' | 'eggetarian' | 'any';
  smoking: 'no' | 'balcony-only' | 'yes';
  drinking: 'no' | 'socially' | 'regular';
  schedule: 'early-bird' | 'night-owl' | 'flexible';
  wfh: 'office' | 'hybrid' | 'full-wfh';
  gender: 'male' | 'female' | 'any';
  maxBudget: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

export interface Conversation {
  id: string;
  listingId?: string;
  listingTitle?: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
}
