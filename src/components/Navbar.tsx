import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (roomId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Rooms & Accommodation', page: 'rooms' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact & Booking', page: 'contact' },
  ];

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c1829]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in luxury display serif) */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-2xl sm:text-3xl font-serif-luxury font-medium tracking-tight text-white hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          aria-label="Scotland Beds Home"
        >
          Scotland Beds
        </button>

        {/* Zone 2: 4 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-200">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37] ${
                  isActive
                    ? 'text-[#d4af37] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+447956357357"
            className="hidden lg:flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors py-2 px-3 rounded-lg border border-white/15"
            aria-label="Call Scotland Beds at +44 7956 357357"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-mono tabular-nums">+44 7956 357357</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-slate-950 bg-[#d4af37] hover:bg-[#e2bd47] active:bg-[#c59b27] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d4af37]"
          >
            <CalendarCheck className="w-4 h-4 text-slate-950" />
            <span>Book Your Stay</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-lg"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0c1829] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`block w-full text-left py-2.5 px-3 rounded-md text-base transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#d4af37] font-semibold'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:+447956357357"
              className="flex items-center gap-2 py-2 px-3 text-sm text-slate-300 hover:text-white"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span className="font-mono tabular-nums">+44 7956 357357</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 px-4 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-lg shadow-sm"
            >
              Book Your Stay Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
