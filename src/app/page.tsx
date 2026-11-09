'use client';

import React, { useState, useEffect } from 'react';
import { 
  City, 
  RoomListing, 
  TeamUpProfile, 
  UserQuizPreferences, 
  Conversation, 
  FoodPreference, 
  GenderPreference, 
  RoomType 
} from '../types';
import { 
  getStoredListings, 
  saveListing, 
  getStoredTeamUps, 
  saveTeamUpProfile, 
  getStoredUserQuiz, 
  saveUserQuiz, 
  getStoredBookmarks, 
  toggleBookmark, 
  getStoredConversations, 
  addChatMessage, 
  startOrGetConversation 
} from '../lib/storage';
import { SEED_LISTINGS, SEED_TEAM_UPS } from '../data/seedData';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FilterBar } from '../components/FilterBar';
import { ListingCard } from '../components/ListingCard';
import { ListingModal } from '../components/ListingModal';
import { TeamUpSection } from '../components/TeamUpSection';
import { MatchQuizModal } from '../components/MatchQuizModal';
import { PostListingModal } from '../components/PostListingModal';
import { PostTeamUpModal } from '../components/PostTeamUpModal';
import { ChatDrawer } from '../components/ChatDrawer';
import { BookmarksDrawer } from '../components/BookmarksDrawer';
import { Footer } from '../components/Footer';
import { Building2, Sparkles, PlusCircle, Search, SlidersHorizontal, Users } from 'lucide-react';

export default function HomePage() {
  const [currentCity, setCurrentCity] = useState<City>('Bengaluru');
  const [activeTab, setActiveTab] = useState<'listings' | 'teamup'>('listings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodPreference>('all');
  const [selectedGender, setSelectedGender] = useState<GenderPreference>('any');
  const [roomType, setRoomType] = useState<RoomType | 'all'>('all');
  const [maxBudget, setMaxBudget] = useState<number>(40000);
  const [zeroBrokerageOnly, setZeroBrokerageOnly] = useState<boolean>(false);

  // Stored state
  const [listings, setListings] = useState<RoomListing[]>(SEED_LISTINGS);
  const [teamUps, setTeamUps] = useState<TeamUpProfile[]>(SEED_TEAM_UPS);
  const [userPrefs, setUserPrefs] = useState<UserQuizPreferences | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Modals & Drawers state
  const [selectedListingModal, setSelectedListingModal] = useState<RoomListing | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPostListingOpen, setIsPostListingOpen] = useState(false);
  const [isPostTeamUpOpen, setIsPostTeamUpOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Initialize data on client load
  useEffect(() => {
    setListings(getStoredListings());
    setTeamUps(getStoredTeamUps());
    setUserPrefs(getStoredUserQuiz());
    setBookmarks(getStoredBookmarks());
    setConversations(getStoredConversations());
  }, []);

  // Filter listings based on user selection
  const filteredListings = listings.filter((listing) => {
    const matchesCity = listing.city === currentCity;
    const matchesFood = selectedFood === 'all' || listing.foodPreference === selectedFood;
    const matchesGender = selectedGender === 'any' || listing.genderPreference === selectedGender || listing.genderPreference === 'any';
    const matchesRoomType = roomType === 'all' || listing.roomType === roomType;
    const matchesBudget = listing.rentPerMonth <= maxBudget;
    const matchesZeroBrokerage = !zeroBrokerageOnly || listing.zeroBrokerage;

    const matchesSearch = !searchQuery.trim() || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCity && matchesFood && matchesGender && matchesRoomType && matchesBudget && matchesZeroBrokerage && matchesSearch;
  });

  const hasActiveFilters = selectedFood !== 'all' || selectedGender !== 'any' || roomType !== 'all' || maxBudget < 40000 || zeroBrokerageOnly || searchQuery !== '';

  const handleResetFilters = () => {
    setSelectedFood('all');
    setSelectedGender('any');
    setRoomType('all');
    setMaxBudget(40000);
    setZeroBrokerageOnly(false);
    setSearchQuery('');
  };

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setBookmarks(updated);
  };

  const handleSaveQuiz = (prefs: UserQuizPreferences) => {
    saveUserQuiz(prefs);
    setUserPrefs(prefs);
  };

  const handleSaveListing = (newListing: RoomListing) => {
    const updated = saveListing(newListing);
    setListings(updated);
    if (newListing.city !== currentCity) {
      setCurrentCity(newListing.city);
    }
  };

  const handleSaveTeamUp = (newProfile: TeamUpProfile) => {
    const updated = saveTeamUpProfile(newProfile);
    setTeamUps(updated);
    setActiveTab('teamup');
    if (newProfile.targetCity !== currentCity) {
      setCurrentCity(newProfile.targetCity);
    }
  };

  const handleStartChatWithListing = (listing: RoomListing) => {
    const { conversation } = startOrGetConversation(listing);
    setConversations(getStoredConversations());
    setActiveConversationId(conversation.id);
    setIsChatOpen(true);
  };

  const handleStartChatWithTeamUp = (profile: TeamUpProfile) => {
    const tempConvId = 'conv-teamup-' + profile.id;
    const conversations = getStoredConversations();
    let target = conversations.find(c => c.id === tempConvId);
    if (!target) {
      const newConv: Conversation = {
        id: tempConvId,
        participantName: profile.name,
        participantAvatar: profile.avatar,
        participantRole: `${profile.occupation} • Seeking ${profile.targetCity}`,
        lastMessage: `Hi ${profile.name}! Let's team up to hunt for a flat together.`,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: 'msg-' + Date.now(),
            conversationId: tempConvId,
            senderId: 'teamup',
            senderName: profile.name,
            senderAvatar: profile.avatar,
            text: `Hey! I saw you are also looking for a flat in ${profile.targetLocalities.join('/')}. What is your preferred move-in date?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: false,
          }
        ]
      };
      const updated = [newConv, ...conversations];
      if (typeof window !== 'undefined') {
        localStorage.setItem('roomie_india_conversations_v1', JSON.stringify(updated));
      }
      setConversations(updated);
    }
    setActiveConversationId(tempConvId);
    setIsChatOpen(true);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const updated = addChatMessage(conversationId, text, true);
    setConversations([...updated]);

    // Simulate realistic automated reply after 1.5 seconds
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! Yes, that works for us. Would you like to drop by to see the flat and meet the current flatmates?",
        "Sounds great! The kitchen has a dedicated cook who comes daily. You can definitely join the meal split.",
        "Yes, 100% zero brokerage! The security deposit is directly refundable as per our standard flat agreement.",
        "Awesome! Let's connect over a quick WhatsApp call to finalize the timings for a room visit."
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      const afterReply = addChatMessage(conversationId, randomReply, false);
      setConversations([...afterReply]);
    }, 1200);
  };

  const savedListings = listings.filter((l) => bookmarks.includes(l.id));
  const unreadTotal = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navigation */}
      <Navbar
        currentCity={currentCity}
        onCityChange={(c) => {
          setCurrentCity(c);
          setSearchQuery('');
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenPostListing={() => setIsPostListingOpen(true)}
        onOpenPostTeamUp={() => setIsPostTeamUpOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarks.length}
        unreadCount={unreadTotal}
      />

      {/* Hero Section */}
      <HeroSection
        currentCity={currentCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFood={selectedFood}
        onFoodChange={setSelectedFood}
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
        onOpenQuiz={() => setIsQuizOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'listings' ? (
          <>
            {/* Filter Bar for Rooms */}
            <FilterBar
              roomType={roomType}
              onRoomTypeChange={setRoomType}
              maxBudget={maxBudget}
              onMaxBudgetChange={setMaxBudget}
              selectedFood={selectedFood}
              onFoodChange={setSelectedFood}
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
              zeroBrokerageOnly={zeroBrokerageOnly}
              onZeroBrokerageChange={setZeroBrokerageOnly}
              onResetFilters={handleResetFilters}
              totalCount={filteredListings.length}
              hasActiveFilters={hasActiveFilters}
              hasUserQuiz={!!userPrefs}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />

            {/* Listings Grid Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Quiz Banner if not yet taken */}
              {!userPrefs && (
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Find flatmates who match your kitchen &amp; lifestyle rhythm
                      </h4>
                      <p className="text-xs text-slate-600">
                        Take our 60-second quiz to calculate your % match score against each room listing.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    Take 60-Sec RoomieQuiz™
                  </button>
                </div>
              )}

              {/* Feed Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Verified Rooms &amp; Flatmates in {currentCity}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Direct connect with existing flatmates • 100% Zero Brokerage
                  </p>
                </div>

                <button
                  onClick={() => setIsPostListingOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Have an empty room? Post free</span>
                </button>
              </div>

              {/* Listings Grid */}
              {filteredListings.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
                  <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-800 text-base">No rooms match your filter criteria</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try relaxing the food habit or budget slider to see more available rooms in {currentCity}.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-xl hover:bg-orange-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      userPrefs={userPrefs}
                      isBookmarked={bookmarks.includes(listing.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onSelectListing={setSelectedListingModal}
                      onDirectConnect={handleStartChatWithListing}
                    />
                  ))}
                </div>
              )}

            </div>
          </>
        ) : (
          /* Team-Up to Rent Section */
          <TeamUpSection
            currentCity={currentCity}
            teamUps={teamUps}
            onOpenPostTeamUp={() => setIsPostTeamUpOpen(true)}
            onStartChatWithTeamUp={handleStartChatWithTeamUp}
          />
        )}
      </main>

      {/* Listing Detail Full Modal */}
      <ListingModal
        listing={selectedListingModal}
        onClose={() => setSelectedListingModal(null)}
        userPrefs={userPrefs}
        isBookmarked={selectedListingModal ? bookmarks.includes(selectedListingModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onStartChat={handleStartChatWithListing}
      />

      {/* RoomieQuiz Modal */}
      <MatchQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        currentPrefs={userPrefs}
        onSaveQuiz={handleSaveQuiz}
      />

      {/* Post Room Listing Wizard Modal */}
      <PostListingModal
        isOpen={isPostListingOpen}
        onClose={() => setIsPostListingOpen(false)}
        currentCity={currentCity}
        onSaveListing={handleSaveListing}
      />

      {/* Post Team Up Profile Modal */}
      <PostTeamUpModal
        isOpen={isPostTeamUpOpen}
        onClose={() => setIsPostTeamUpOpen(false)}
        currentCity={currentCity}
        onSaveTeamUp={handleSaveTeamUp}
      />

      {/* In-App Interactive Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onSendMessage={handleSendMessage}
      />

      {/* Shortlisted Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedListings={savedListings}
        onRemoveBookmark={handleToggleBookmark}
        onSelectListing={setSelectedListingModal}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
