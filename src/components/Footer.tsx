import React from 'react';
import { PageRoute } from '../types';
import { BUSINESS_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#08111e] text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Welcome */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif-luxury font-medium text-white tracking-tight">
              Scotland Beds
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium boutique accommodation situated in Dundee, Scotland. Offering restful luxury orthopedic beds, sparkling en-suite bathrooms, and warm Scottish hospitality.
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/60 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Instant Booking</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Explore Scotland Beds
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Home (6 Highlights)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('rooms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Rooms & Accommodation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('offers');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
                >
                  <span>Special Offers & Packages</span>
                  <span className="text-[10px] text-[#d4af37] font-semibold bg-[#d4af37]/15 px-1.5 py-0.5 rounded">
                    Direct Deals
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('reviews');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
                >
                  <span>Customer Reviews</span>
                  <span className="text-[11px] text-[#d4af37] font-mono">4.9 ★</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Location & Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-[#d4af37] hover:underline transition-colors"
                >
                  Book Stay Direct
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Address & Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address.line1}
                  <br />
                  {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.postcode}
                  <br />
                  {BUSINESS_INFO.address.country}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="hover:text-white transition-colors font-mono tabular-nums"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Stay Policies */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-200">
              Stay Policies
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Check-in: {BUSINESS_INFO.checkInTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Check-out: {BUSINESS_INFO.checkOutTime}</span>
              </div>
              <p className="pt-2 leading-relaxed text-slate-400">
                Contactless digital keypad access code provided prior to arrival. 24/7 guest support for inquiries and assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Scotland Beds. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Dundee, Scotland</span>
            <span aria-hidden="true">·</span>
            <span>2nd Floor, 6 Stirling St</span>
            <span aria-hidden="true">·</span>
            <a href="tel:+447956357357" className="hover:text-slate-300 transition-colors">
              +44 7956 357357
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
