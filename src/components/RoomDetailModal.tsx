import React, { useState } from 'react';
import { Room } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { X, Users, BedDouble, Maximize2, Check, CalendarCheck, MessageSquare } from 'lucide-react';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (roomId: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const currentImg = room.galleryImages[activeImageIndex] || room.image;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#faf9f5] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
      >
        {/* Top close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Showcase */}
        <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
          <img
            src={currentImg}
            alt={room.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Room name & rate overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-medium">
                Scotland Beds · Room Details
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium mt-0.5">
                {room.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-300 block">Nightly Sample Rate</span>
              <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#d4af37]">
                £{room.pricePerNight}
              </span>
              <span className="text-xs text-slate-300"> / night</span>
            </div>
          </div>
        </div>

        {/* Thumbnail selector if multiple gallery images */}
        {room.galleryImages.length > 1 && (
          <div className="flex gap-2 p-3 bg-[#0c1829] overflow-x-auto">
            {room.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx ? 'border-[#d4af37] opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Details body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key metrics strip */}
          <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-white rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Up to {room.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <BedDouble className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span className="truncate">{room.bedType}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Maximize2 className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>{room.sizeSqM} m² / {Math.round(room.sizeSqM * 10.764)} sq ft</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
              Overview
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Amenities checklist */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Room Amenities & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {room.featuredAmenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBookRoom(room.id);
              }}
              className="flex-1 py-3 px-5 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Book This Room</span>
            </button>
            <a
              href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, I am interested in reserving the ${room.name} (£${room.pricePerNight}/night). Is it available for upcoming dates?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
