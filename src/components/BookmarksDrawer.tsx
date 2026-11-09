'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { RoomListing } from '../types';
import { formatINR } from '../lib/utils';
import { X, Heart, Trash2, ExternalLink, MapPin } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedListings: RoomListing[];
  onRemoveBookmark: (id: string) => void;
  onSelectListing: (listing: RoomListing) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedListings,
  onRemoveBookmark,
  onSelectListing,
}) => {
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full sm:w-[420px] max-w-full bg-white h-full shadow-2xl flex flex-col overflow-hidden min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-bold text-slate-900 text-sm">
              Saved Rooms ({savedListings.length})
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
            title="Close saved rooms"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
          {savedListings.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Heart className="w-12 h-12 text-slate-200 mx-auto mb-2" />
              <p className="font-medium text-sm text-slate-600">No rooms saved yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Click the heart icon on any room listing to shortlist it for easy comparison!
              </p>
            </div>
          ) : (
            savedListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border border-slate-200 rounded-2xl p-3 flex gap-3 hover:border-orange-300 transition-all shadow-2xs min-w-0"
              >
                <div 
                  onClick={() => {
                    onClose();
                    onSelectListing(listing);
                  }}
                  className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
                >
                  <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectListing(listing);
                      }}
                      className="font-bold text-xs text-slate-900 truncate hover:text-orange-600 cursor-pointer"
                    >
                      {listing.title}
                    </h4>
                    <button
                      onClick={() => onRemoveBookmark(listing.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors shrink-0 ml-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                    <span className="truncate">{listing.locality}, {listing.city}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-extrabold text-orange-600 text-xs">
                      {formatINR(listing.rentPerMonth)}/mo
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectListing(listing);
                      }}
                      className="text-[11px] font-semibold text-slate-700 hover:text-orange-600 flex items-center gap-0.5 shrink-0"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
