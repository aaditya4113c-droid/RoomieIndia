import { RoomListing, TeamUpProfile, UserQuizPreferences, Conversation, ChatMessage } from '../types';
import { SEED_LISTINGS, SEED_TEAM_UPS, INITIAL_CONVERSATIONS } from '../data/seedData';

const LISTINGS_KEY = 'roomie_india_listings_v1';
const TEAMUPS_KEY = 'roomie_india_teamups_v1';
const USER_PREFS_KEY = 'roomie_india_user_quiz_v1';
const BOOKMARKS_KEY = 'roomie_india_bookmarks_v1';
const CONVERSATIONS_KEY = 'roomie_india_conversations_v1';

export function getStoredListings(): RoomListing[] {
  if (typeof window === 'undefined') return SEED_LISTINGS;
  try {
    const raw = localStorage.getItem(LISTINGS_KEY);
    if (!raw) {
      localStorage.setItem(LISTINGS_KEY, JSON.stringify(SEED_LISTINGS));
      return SEED_LISTINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading listings from storage:', err);
    return SEED_LISTINGS;
  }
}

export function saveListing(newListing: RoomListing): RoomListing[] {
  if (typeof window === 'undefined') return [];
  const current = getStoredListings();
  const updated = [newListing, ...current];
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredTeamUps(): TeamUpProfile[] {
  if (typeof window === 'undefined') return SEED_TEAM_UPS;
  try {
    const raw = localStorage.getItem(TEAMUPS_KEY);
    if (!raw) {
      localStorage.setItem(TEAMUPS_KEY, JSON.stringify(SEED_TEAM_UPS));
      return SEED_TEAM_UPS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading team-ups from storage:', err);
    return SEED_TEAM_UPS;
  }
}

export function saveTeamUpProfile(newProfile: TeamUpProfile): TeamUpProfile[] {
  if (typeof window === 'undefined') return [];
  const current = getStoredTeamUps();
  const updated = [newProfile, ...current];
  localStorage.setItem(TEAMUPS_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredUserQuiz(): UserQuizPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_PREFS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function saveUserQuiz(prefs: UserQuizPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_PREFS_KEY, JSON.stringify(prefs));
}

export function getStoredBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function toggleBookmark(listingId: string): string[] {
  if (typeof window === 'undefined') return [];
  const bookmarks = getStoredBookmarks();
  const exists = bookmarks.includes(listingId);
  const updated = exists ? bookmarks.filter(id => id !== listingId) : [...bookmarks, listingId];
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredConversations(): Conversation[] {
  if (typeof window === 'undefined') return INITIAL_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    if (!raw) {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
      return INITIAL_CONVERSATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_CONVERSATIONS;
  }
}

export function addChatMessage(conversationId: string, messageText: string, isUser: boolean = true): Conversation[] {
  if (typeof window === 'undefined') return [];
  const conversations = getStoredConversations();
  const convIndex = conversations.findIndex(c => c.id === conversationId);

  const newMsg: ChatMessage = {
    id: 'msg-' + Date.now(),
    conversationId,
    senderId: isUser ? 'user' : 'other',
    senderName: isUser ? 'You' : (convIndex >= 0 ? conversations[convIndex].participantName : 'Flatmate'),
    senderAvatar: isUser ? '' : (convIndex >= 0 ? conversations[convIndex].participantAvatar : ''),
    text: messageText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isUser,
  };

  if (convIndex >= 0) {
    const target = { ...conversations[convIndex] };
    target.messages = [...target.messages, newMsg];
    target.lastMessage = messageText;
    target.lastTimestamp = newMsg.timestamp;
    target.unreadCount = isUser ? 0 : target.unreadCount + 1;
    conversations[convIndex] = target;
  } else {
    // create a new thread
    conversations.unshift({
      id: conversationId,
      participantName: 'Roommate',
      participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      participantRole: 'Listing Host',
      lastMessage: messageText,
      lastTimestamp: newMsg.timestamp,
      unreadCount: 0,
      messages: [newMsg],
    });
  }

  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  return conversations;
}

export function startOrGetConversation(listing: RoomListing): { conversation: Conversation; isNew: boolean } {
  const conversations = getStoredConversations();
  const existing = conversations.find(c => c.listingId === listing.id);

  if (existing) {
    return { conversation: existing, isNew: false };
  }

  const newConv: Conversation = {
    id: 'conv-' + Date.now(),
    listingId: listing.id,
    listingTitle: listing.title,
    participantName: listing.postedBy.name,
    participantAvatar: listing.postedBy.avatar,
    participantRole: `${listing.locality}`,
    lastMessage: `Inquired about ${listing.roomType === 'private-master' ? 'Master Bedroom' : 'Room'} in ${listing.locality}`,
    lastTimestamp: 'Just now',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-init-' + Date.now(),
        conversationId: 'conv-' + Date.now(),
        senderId: 'host',
        senderName: listing.postedBy.name,
        senderAvatar: listing.postedBy.avatar,
        text: `Hi there! Thanks for your interest in our flat at ${listing.locality}. Feel free to ask about the room, house rules, or set up a visit!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      }
    ]
  };

  const updated = [newConv, ...conversations];
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(updated));
  }
  return { conversation: newConv, isNew: true };
}
