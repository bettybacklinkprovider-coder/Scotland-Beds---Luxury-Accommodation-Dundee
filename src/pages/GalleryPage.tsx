import React, { useState } from 'react';
import { GALLERY_ITEMS, BUSINESS_INFO } from '../data/mockData';
import { Maximize2, Camera, Play } from 'lucide-react';

interface GalleryPageProps {
  onOpenLightbox: (index: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenLightbox }) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'bedrooms' | 'bathrooms' | 'lounge'>('all');

  const filterTabs = [
    { id: 'all', label: 'All Showcase (7)' },
    { id: 'video', label: '▶ Virtual Video Tour' },
    { id: 'bedrooms', label: 'Bedrooms & Suites' },
    { id: 'bathrooms', label: 'En-Suite Bathrooms' },
    { id: 'lounge', label: 'Living & Lounge' },
  ];

  const filteredItems =
    filter === 'all' || filter === 'video'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="py-12 sm:py-16 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
            <span>Scotland Beds</span>
            <span aria-hidden="true">·</span>
            <span>Visual Showcase & Video Tour</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-slate-900 tracking-tight">
            Photo & Video Gallery
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-light">
            Take a visual tour through Scotland Beds on Stirling Street in Dundee. Watch our live video walkthrough and explore our plush orthopedic beds, sparkling en-suite rainfall showers, and welcoming Scottish interiors.
          </p>
        </div>

        {/* Featured Video Tour Card Banner (Shown when 'all' or 'video' selected) */}
        {(filter === 'all' || filter === 'video') && (
          <div className="bg-[#0c1829] text-white rounded-2xl overflow-hidden border border-white/15 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Video Player */}
            <div className="lg:col-span-7 relative aspect-video bg-black">
              <video
                src={BUSINESS_INFO.videoTourUrl}
                poster="/images/hero.jpg"
                controls
                playsInline
                className="w-full h-full object-cover"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Video description */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Featured Property Tour</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white">
                Experience Scotland Beds in Motion
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Take an immersive video walkthrough through our stylish Dundee guest rooms. See the comfort of our orthopedic beds, sparkling clean en-suite walk-in rainfall showers, and welcoming boutique atmosphere firsthand.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-white/10">
                <span>Location: Stirling St, Dundee</span>
                <span aria-hidden="true">·</span>
                <span>Full HD Quality</span>
              </div>
            </div>
          </div>
        )}

        {/* Filter controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === tab.id
                  ? 'bg-[#0c1829] text-white shadow-xs font-semibold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            // Find overall index in GALLERY_ITEMS for accurate lightbox index
            const overallIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(overallIndex !== -1 ? overallIndex : index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#d4af37] font-semibold">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="text-base font-serif-luxury font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 font-light">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery note */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-[#c59b27] shrink-0" />
            <span>
              All photography represents genuine interior design, fixtures, and spaces at Scotland Beds, 2nd Floor, 6 Stirling St, Dundee.
            </span>
          </div>
          <a
            href="tel:+447956357357"
            className="text-[#0c1829] hover:underline font-semibold hidden md:inline-block shrink-0"
          >
            Direct Inquiries: +44 7956 357357
          </a>
        </div>
      </div>
    </div>
  );
};
