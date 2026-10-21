import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      {/* Tooltip badge */}
      {showTooltip && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-[#0c1829] text-white text-xs py-2 px-3.5 rounded-xl shadow-xl border border-white/10 animate-fade-in">
          <span>Enquire or Book on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={BUSINESS_INFO.whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-2xl transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 group"
        aria-label="Chat with Scotland Beds on WhatsApp (+44 7956 357357)"
      >
        <MessageSquare className="w-7 h-7 text-white fill-current group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
