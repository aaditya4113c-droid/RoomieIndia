'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Conversation, ChatMessage } from '../types';
import { X, Send, ShieldCheck, CheckCheck, MessageSquare, ArrowLeft } from 'lucide-react';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

const QUICK_INDIAN_RENTAL_QUESTIONS = [
  'Can I schedule a flat visit this weekend?',
  'Is the cook & maid expense split included?',
  'Is the kitchen strictly vegetarian?',
  'What is the security deposit refund process?',
  'How is the power backup and WiFi speed?',
];

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  // Scroll to bottom when messages update
  useEffect(() => {
    if (activeConv && isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConv?.messages.length, isOpen]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleQuickQuestion = (q: string) => {
    if (!activeConv) return;
    onSendMessage(activeConv.id, q);
  };

  const selectConversationOnMobile = (id: string) => {
    onSelectConversation(id);
    setMobileView('chat');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full sm:w-[520px] md:w-[680px] lg:w-[760px] max-w-full bg-white h-full shadow-2xl flex flex-col md:flex-row overflow-hidden relative min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left Side: Conversation Threads */}
        <div 
          className={`w-full md:w-64 lg:w-72 shrink-0 border-r border-slate-200 flex flex-col bg-slate-50 min-w-0 h-full ${
            mobileView === 'chat' && activeConv ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 px-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Roommate Chats</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Thread List */}
          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No active conversations yet. Click &quot;Chat with Flatmate&quot; on any room listing!
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => selectConversationOnMobile(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    activeConv?.id === conv.id 
                      ? 'bg-orange-50/80 border-r-4 border-orange-600' 
                      : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200 ring-1 ring-slate-200">
                    <Image src={conv.participantAvatar} alt={conv.participantName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{conv.participantName}</h4>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">{conv.lastTimestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{conv.participantRole}</p>
                    <p className="text-xs text-slate-600 truncate mt-1 font-medium">{conv.lastMessage}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Message Stream & Composer */}
        <div 
          className={`flex-1 min-w-0 flex flex-col bg-white h-full overflow-hidden ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConv ? (
            <>
              {/* Chat Header with Close Button */}
              <div className="p-3 px-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-2xs shrink-0 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                  <button 
                    onClick={() => setMobileView('list')}
                    className="md:hidden p-1.5 -ml-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 shrink-0"
                    title="Back to all chats"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-slate-200 ring-2 ring-orange-500/20">
                    <Image src={activeConv.participantAvatar} alt={activeConv.participantName} fill className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {activeConv.participantName}
                      </h4>
                      <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-1.5 py-0.2 rounded-full border border-teal-200 flex items-center gap-0.5 shrink-0">
                        <ShieldCheck className="w-3 h-3 text-teal-600" />
                        Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {activeConv.listingTitle || activeConv.participantRole}
                    </p>
                  </div>
                </div>

                {/* Close Button - Always visible and accessible */}
                <button 
                  onClick={onClose} 
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors shrink-0"
                  title="Close chat window"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                {activeConv.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3 text-xs sm:text-sm shadow-2xs break-words ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${
                        msg.isUser ? 'text-orange-100' : 'text-slate-400'
                      }`}>
                        <span>{msg.timestamp}</span>
                        {msg.isUser && <CheckCheck className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap flex gap-1.5 shrink-0 max-w-full min-w-0">
                {QUICK_INDIAN_RENTAL_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-[11px] bg-slate-100 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 transition-colors shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Message Composer Form */}
              <form 
                onSubmit={handleSend} 
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0 min-w-0"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type message to flatmate (e.g. rent split, visit timing)..."
                  className="flex-1 min-w-0 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-800"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 px-3.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 font-semibold text-xs"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
              <p className="text-sm font-medium">Select a conversation or reach out to a roommate listing</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
