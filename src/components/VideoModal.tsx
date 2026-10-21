import React, { useEffect, useRef } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { X, CalendarCheck, MessageSquare, Play, Volume2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  videoUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  videoUrl = BUSINESS_INFO.videoTourUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Attempt play with sound once user opens modal
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay was prevented; user can use native controls
        });
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Scotland Beds Video Tour"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0c1829] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
      >
        {/* Top Header */}
        <div className="p-4 sm:px-6 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block">
                Scotland Beds · Dundee
              </span>
              <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-white">
                Virtual Video Tour
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            aria-label="Close video tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support HTML5 video streaming.
          </video>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 sm:p-6 bg-[#08111e] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="text-xs text-slate-300 text-center sm:text-left">
            <p className="font-medium text-white">
              2nd Floor, 6 Stirling St, Dundee DD3 6PH, United Kingdom
            </p>
            <p className="text-slate-400 mt-0.5">
              Direct telephone: {BUSINESS_INFO.phone} · Best rates guaranteed when booking direct
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-none py-2.5 px-5 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>Book Your Stay</span>
            </button>

            <a
              href={BUSINESS_INFO.whatsappUrl('Hello Scotland Beds, I watched your video tour and would like to check room availability.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
