import React, { useState } from 'react';
import { Room } from '../types';
import { ROOMS, BUSINESS_INFO } from '../data/mockData';
import {
  Users,
  BedDouble,
  Maximize2,
  Check,
  CalendarCheck,
  MessageSquare,
  Sparkles,
  Info,
  SlidersHorizontal,
} from 'lucide-react';

interface RoomsPageProps {
  onOpenBooking: (roomId?: string) => void;
  onOpenRoomDetail: (room: Room) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  onOpenBooking,
  onOpenRoomDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [rateModifier, setRateModifier] = useState<'standard' | 'weekend'>('standard');

  const categories = [
    { id: 'all', label: 'All Rooms & Suites' },
    { id: 'king', label: 'Deluxe King' },
    { id: 'double', label: 'Executive Double' },
    { id: 'twin', label: 'Superior Twin' },
    { id: 'suite', label: 'Studio Suites' },
  ];

  const filteredRooms =
    selectedCategory === 'all'
      ? ROOMS
      : ROOMS.filter((r) => r.category === selectedCategory);

  const getPrice = (basePrice: number) => {
    return rateModifier === 'weekend' ? Math.round(basePrice * 1.15) : basePrice;
  };

  return (
    <div className="py-12 sm:py-16 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
            <span>Scotland Beds</span>
            <span aria-hidden="true">·</span>
            <span>Accommodations & Rates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-slate-900 tracking-tight">
            Rooms & Suites
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-light">
            Each room at Scotland Beds has been thoughtfully designed with deep comfort in mind. Enjoy premium orthopedic mattresses, Egyptian cotton linens, pristine en-suite rainfall bathrooms, and ultra-fast Wi-Fi.
          </p>
        </div>

        {/* Filter bar and rate simulator */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#0c1829] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Rate season toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sample Rate:</span>
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setRateModifier('standard')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  rateModifier === 'standard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weekday
              </button>
              <button
                onClick={() => setRateModifier('weekend')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  rateModifier === 'weekend'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weekend Peak (+15%)
              </button>
            </div>
          </div>
        </div>

        {/* Rooms Listing Cards */}
        <div className="space-y-8">
          {filteredRooms.map((room) => {
            const calculatedPrice = getPrice(room.pricePerNight);
            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-all grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Large Room Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[260px] bg-slate-900">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#0c1829]/90 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md font-medium">
                    {room.availabilityStatus}
                  </div>
                  <button
                    onClick={() => onOpenRoomDetail(room)}
                    className="absolute bottom-4 left-4 bg-white/90 hover:bg-white text-slate-900 text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Gallery & Specs</span>
                  </button>
                </div>

                {/* Room Info & Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-slate-900">
                          {room.name}
                        </h2>
                        {/* Unboxed metadata */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span>Max {room.capacity} Guests</span>
                          <span aria-hidden="true">·</span>
                          <span>{room.sizeSqM} m² / {Math.round(room.sizeSqM * 10.764)} sq ft</span>
                          <span aria-hidden="true">·</span>
                          <span>Private En-suite Shower</span>
                        </div>
                      </div>

                      {/* Nightly price */}
                      <div className="sm:text-right shrink-0">
                        <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                          Sample Rate
                        </span>
                        <div className="flex items-baseline sm:justify-end gap-1">
                          <span className="text-3xl font-serif-luxury font-bold text-[#0c1829] font-mono tabular-nums">
                            £{calculatedPrice}
                          </span>
                          <span className="text-xs text-slate-500"> / night</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 block mt-0.5">
                          Taxes included · Best direct rate
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Bed & Key amenities */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      {room.featuredAmenities.slice(0, 6).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenRoomDetail(room)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#0c1829] hover:text-[#c59b27] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Room Details & Full Specs</span>
                      <Info className="w-3.5 h-3.5 text-[#c59b27]" />
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, I would like to enquire about reserving ${room.name} at £${calculatedPrice}/night.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => onOpenBooking(room.id)}
                        className="py-2.5 px-5 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center gap-2"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#d4af37]" />
                        <span>Book Room</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom guarantee & notice */}
        <div className="p-6 bg-[#0c1829] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-serif-luxury font-medium text-[#d4af37]">
              Need multiple rooms or an extended stay in Dundee?
            </h3>
            <p className="text-xs text-slate-300">
              We offer bespoke arrangements for corporate relocations, wedding guests, and visiting academics.
            </p>
          </div>
          <a
            href="tel:+447956357357"
            className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors shrink-0"
          >
            Call Us +44 7956 357357
          </a>
        </div>
      </div>
    </div>
  );
};
