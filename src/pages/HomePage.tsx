import React, { useState } from 'react';
import { PageRoute, Room } from '../types';
import { ROOMS, FACILITIES, REVIEWS, GALLERY_ITEMS, BUSINESS_INFO, DUNDEE_HIGHLIGHTS } from '../data/mockData';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { SpecialOffersSection } from '../components/SpecialOffersSection';
import { VideoModal } from '../components/VideoModal';
import {
  CalendarCheck,
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Phone,
  MessageSquare,
  Bed,
  Bath,
  Wifi,
  Flame,
  Coffee,
  Key,
  Tv,
  Shield,
  Star,
  Users,
  Maximize2,
  Check,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Send,
  CheckCircle,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (roomId?: string, packageName?: string) => void;
  onOpenLightbox: (index: number) => void;
  onOpenRoomDetail: (room: Room) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenLightbox,
  onOpenRoomDetail,
}) => {
  // Quick Enquiry state for Section 6
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickRoom, setQuickRoom] = useState(ROOMS[0].id);
  const [quickDates, setQuickDates] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const heroVideoRef = React.useRef<HTMLVideoElement>(null);
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState(true);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(true);

  const toggleHeroMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
      setIsHeroVideoMuted(heroVideoRef.current.muted);
    }
  };

  const toggleHeroPlay = () => {
    if (heroVideoRef.current) {
      if (heroVideoRef.current.paused) {
        heroVideoRef.current.play().catch(() => {});
        setIsHeroVideoPlaying(true);
      } else {
        heroVideoRef.current.pause();
        setIsHeroVideoPlaying(false);
      }
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setQuickSubmitted(true);
  };

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'bed':
        return <Bed className="w-5 h-5 text-[#d4af37]" />;
      case 'bath':
        return <Bath className="w-5 h-5 text-[#d4af37]" />;
      case 'wifi':
        return <Wifi className="w-5 h-5 text-[#d4af37]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#d4af37]" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#d4af37]" />;
      case 'key':
        return <Key className="w-5 h-5 text-[#d4af37]" />;
      case 'tv':
        return <Tv className="w-5 h-5 text-[#d4af37]" />;
      default:
        return <Shield className="w-5 h-5 text-[#d4af37]" />;
    }
  };

  return (
    <div className="w-full space-y-0">
      {/* =========================================================================
          SECTION 1: LUXURY HERO SECTION WITH FULL VIDEO BACKGROUND
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center bg-[#0c1829] text-white overflow-hidden">
        {/* Full Cinematic Video Background with Crystal-Clear Transparency */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted={isHeroVideoMuted}
            playsInline
            poster="/images/hero.jpg"
            onLoadedData={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src={BUSINESS_INFO.videoTourUrl} type="video/mp4" />
            <img
              src="/images/hero.jpg"
              alt="Luxury Scottish boutique bedroom at Scotland Beds Dundee"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Subtle balanced scrim so the video is vividly visible while text is 100% legible */}
          <div className="absolute inset-0 bg-slate-950/40 backdrop-brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1829]/75 via-[#0c1829]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1829] via-transparent to-black/20" />
        </div>

        {/* Hero Interactive Video Controls (Bottom-Right) */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {/* Mute/Unmute audio button */}
          <button
            onClick={toggleHeroMute}
            className="flex items-center gap-2 px-3.5 py-2 bg-black/60 hover:bg-black/85 backdrop-blur-md rounded-full border border-white/20 text-xs text-white transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            aria-label={isHeroVideoMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isHeroVideoMuted ? 'Unmute background video' : 'Mute background video'}
          >
            {isHeroVideoMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-300" />
                <span className="hidden sm:inline">Audio Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#d4af37]" />
                <span className="hidden sm:inline text-[#d4af37] font-medium">Audio On</span>
              </>
            )}
          </button>

          {/* Pause/Play button */}
          <button
            onClick={toggleHeroPlay}
            className="p-2 bg-black/60 hover:bg-black/85 backdrop-blur-md rounded-full border border-white/20 text-white transition-all shadow-lg"
            aria-label={isHeroVideoPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isHeroVideoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
            )}
          </button>

          {/* Full Screen Tour Modal */}
          <button
            onClick={() => setVideoModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-lg"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Full Tour</span>
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#d4af37] drop-shadow-sm">
              <span>2nd Floor, 6 Stirling St</span>
              <span aria-hidden="true">·</span>
              <span>Dundee DD3 6PH</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium tracking-tight text-white leading-[1.1] text-balance drop-shadow-md">
              Restful Luxury & Genuine Scottish Hospitality
            </h1>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-light drop-shadow-sm">
              Welcome to <strong>Scotland Beds</strong>, your peaceful retreat in central Dundee. Discover custom orthopedic luxury bedding, sparkling private en-suite rainfall bathrooms, and effortless self check-in just moments from the waterfront.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3.5 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                <CalendarCheck className="w-4 h-4 text-slate-950" />
                <span>Book Your Stay</span>
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Play className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                <span>Watch Video Tour</span>
              </button>

              <button
                onClick={() => onNavigate('rooms')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Compass className="w-4 h-4 text-[#d4af37]" />
                <span>Explore Rooms</span>
              </button>

              <a
                href={BUSINESS_INFO.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600/90 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/15 text-xs text-slate-300">
              <div>
                <p className="font-serif-luxury text-2xl text-white font-medium">400 TC</p>
                <span className="text-slate-400">Egyptian Linens</span>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl text-white font-medium">100%</p>
                <span className="text-slate-400">En-Suite Showers</span>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl text-white font-medium">10 Min</p>
                <span className="text-slate-400">Walk to Waterfront</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT SCOTLAND BEDS
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#faf9f5] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-900 border border-slate-200 group">
                <img
                  src="/images/dundee_lounge.jpg"
                  alt="Interior ambiance and guest lounge at Scotland Beds Dundee"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Video Play Overlay */}
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors cursor-pointer"
                  aria-label="Play virtual video tour"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0c1829]/90 border border-white/25 text-[#d4af37] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-slate-950 transition-all shadow-2xl">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <span className="absolute bottom-4 left-4 bg-[#0c1829]/90 text-white text-[11px] font-medium py-1 px-3 rounded-md backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
                    <Play className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                    <span>Watch Video Tour (Sound On)</span>
                  </span>
                </button>
              </div>

              {/* Inset highlight card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-xl shadow-lg border border-slate-200 max-w-xs text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Prime Dundee Central</span>
                </div>
                <p className="text-slate-600">
                  Conveniently situated on Stirling Street within walking reach of Dundee rail station, V&A Museum, and city restaurants.
                </p>
              </div>
            </div>

            {/* Prose Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
                  About Our Accommodation
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-slate-900 tracking-tight leading-snug">
                  Designed for Deep Rest, Comfort & Effortless Convenience
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                At <strong>Scotland Beds</strong>, we believe every trip to Dundee deserves a restful sleep, an immaculate room, and attentive Scottish hospitality. Located on the 2nd floor of 6 Stirling Street, our property provides a quiet sanctuary away from street noise while keeping you right in the heart of Dundee.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you are exploring the vibrant cultural quarter, visiting family, or traveling on business, each room is carefully equipped with bespoke orthopedic mattresses, pristine en-suite rainfall showers, ultra-fast fibre Wi-Fi, and personalized tea and coffee stations.
              </p>

              {/* Dundee local highlights */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-3">
                  Nearby Landmarks & Walking Times
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {DUNDEE_HIGHLIGHTS.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <span className="text-[#c59b27] font-medium">{item.distance}</span>
                      <p className="text-slate-500 text-[11px] mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('rooms')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0c1829] hover:text-[#c59b27] transition-colors"
                >
                  <span>View All Accommodation Options</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED ROOMS & PRICES
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#f4f1ea] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
                Featured Rooms & Prices
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-slate-900 tracking-tight">
                Refined Accommodations in Dundee
              </h2>
              <p className="text-sm text-slate-600">
                Transparent sample rates with clean en-suite facilities and luxury bedding. Direct reservations include best rate guarantee.
              </p>
            </div>

            <button
              onClick={() => onNavigate('rooms')}
              className="px-5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm self-start md:self-auto flex items-center gap-2"
            >
              <span>Browse All Rooms</span>
              <ChevronRight className="w-4 h-4 text-[#c59b27]" />
            </button>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Status label (clean unboxed metadata) */}
                  <div className="absolute top-3 left-3 bg-[#0c1829]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {room.availabilityStatus}
                  </div>

                  {/* Nightly rate banner */}
                  <div className="absolute bottom-3 right-3 bg-[#0c1829]/90 text-white px-3 py-1.5 rounded-lg text-right backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 block">Sample Rate</span>
                    <span className="text-lg font-serif-luxury font-bold text-[#d4af37]">
                      £{room.pricePerNight}
                    </span>
                    <span className="text-[10px] text-slate-300"> / night</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif-luxury font-semibold text-slate-900 group-hover:text-[#c59b27] transition-colors">
                      {room.name}
                    </h3>

                    {/* Unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Max {room.capacity} Guests</span>
                      <span aria-hidden="true">·</span>
                      <span>{room.sizeSqM} m²</span>
                      <span aria-hidden="true">·</span>
                      <span>En-suite</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {room.tagline}
                    </p>
                  </div>

                  {/* Top Amenities */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Walk-in Rainfall Shower</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onOpenRoomDetail(room)}
                      className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="flex-1 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#0c1829] hover:bg-[#1a2c47] rounded-lg transition-colors text-center shadow-xs"
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/70 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span>
              <strong>Note on Rates:</strong> Displayed prices are editable sample rates only until actual seasonal rates are finalized. Direct booking avoids third-party commission fees.
            </span>
            <a
              href={BUSINESS_INFO.whatsappUrl('Hello Scotland Beds, could you please confirm current nightly room rates for upcoming dates?')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0c1829] hover:underline font-semibold shrink-0"
            >
              Enquire Current Rates on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SPECIAL OFFERS & PACKAGES SECTION
          ========================================================================= */}
      <SpecialOffersSection
        onSelectOffer={(roomId, packageName) => onOpenBooking(roomId, packageName)}
      />

      {/* =========================================================================
          SECTION 4: FACILITIES & AMENITIES
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#faf9f5] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
              Facilities & Amenities
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-slate-900 tracking-tight">
              Essential Comforts Confirmed for Every Guest
            </h2>
            <p className="text-sm text-slate-600">
              We focus on providing pristine, functional amenities that make your Dundee stay effortless and deeply comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col group"
              >
                {/* Facility Real Image */}
                {facility.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-[#0c1829]/90 backdrop-blur-xs flex items-center justify-center border border-white/10 shadow-sm">
                      {getFacilityIcon(facility.iconName)}
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-serif-luxury font-semibold text-slate-900 group-hover:text-[#c59b27] transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {facility.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-[#c59b27] font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Included with all reservations</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#0c1829] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-serif-luxury font-medium text-[#d4af37]">
                Need something special for your arrival?
              </h3>
              <p className="text-xs text-slate-300">
                Traveling with early train arrival, requiring baby cot, or extra towels? Reach our guest support team instantly.
              </p>
            </div>
            <a
              href="tel:+447956357357"
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Call +44 7956 357357</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: GUEST REVIEWS & PHOTO GALLERY
          ========================================================================= */}
      <section id="reviews" className="py-20 lg:py-28 bg-[#f4f1ea] border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Gallery Preview Subset */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
                  Photo Gallery Preview
                </span>
                <h2 className="text-3xl font-serif-luxury font-medium text-slate-900 tracking-tight">
                  A Glimpse Inside Scotland Beds
                </h2>
              </div>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-xs font-semibold uppercase tracking-wider text-[#0c1829] hover:text-[#c59b27] flex items-center gap-1.5 transition-colors self-start md:self-auto"
              >
                <span>View Full Photo Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Image Preview Grid with Lightbox Trigger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_ITEMS.slice(0, 4).map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(index)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 cursor-pointer shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium truncate">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews & Ratings Section */}
          <div className="pt-8 border-t border-slate-300/60">
            <CustomerReviewsSection />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LOCATION & BOOKING
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#faf9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
              Location & Booking
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-slate-900 tracking-tight">
              Find Us on Stirling Street, Dundee
            </h2>
            <p className="text-sm text-slate-600">
              Centrally placed for exploring Tayside, visiting universities, or relaxing by the waterfront. Send an instant enquiry or chat on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Embedded Google Map + Location Details */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              {/* Map embed */}
              <div className="w-full h-80 sm:h-96 relative bg-slate-100">
                <iframe
                  title="Scotland Beds Location Map"
                  src="https://maps.google.com/maps?q=6%20Stirling%20St,%20Dundee%20DD3%206PH,%20United%20Kingdom&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Location info bar */}
              <div className="p-6 bg-white border-t border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Scotland Beds Address
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {BUSINESS_INFO.address.full}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-2.5 text-slate-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#c59b27]" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">Telephone</span>
                      <span className="font-mono font-medium">{BUSINESS_INFO.phone}</span>
                    </div>
                  </a>

                  <a
                    href={BUSINESS_INFO.whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center gap-2.5 text-emerald-900 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-emerald-700 block">WhatsApp Chat</span>
                      <span className="font-mono font-medium">+44 7956 357357</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Booking Enquiry Form & WhatsApp CTA */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-xl font-serif-luxury font-semibold text-slate-900">
                    Quick Booking Enquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out this form or message us directly on WhatsApp for immediate confirmation.
                  </p>
                </div>

                {quickSubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                      <div>
                        <h4 className="font-semibold text-emerald-900 text-sm">
                          Enquiry Received, {quickName}!
                        </h4>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          We will verify room availability and contact you at {quickPhone} shortly.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setQuickSubmitted(false)}
                      className="text-xs text-emerald-800 underline font-medium"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Liam Anderson"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+44 7956 357357"
                          value={quickPhone}
                          onChange={(e) => setQuickPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="liam@example.co.uk"
                          value={quickEmail}
                          onChange={(e) => setQuickEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Preferred Room
                        </label>
                        <select
                          value={quickRoom}
                          onChange={(e) => setQuickRoom(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                        >
                          {ROOMS.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name} (£{r.pricePerNight}/night)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Target Dates / Duration
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 nights next weekend"
                          value={quickDates}
                          onChange={(e) => setQuickDates(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-4 bg-[#0c1829] hover:bg-[#1a2c47] text-white font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Booking Enquiry</span>
                      </button>

                      <a
                        href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, my name is ${quickName || 'Guest'}. I would like to book a room for ${quickDates || 'upcoming dates'}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 text-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Book on WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>

              {/* Trust footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Check-in: {BUSINESS_INFO.checkInTime}</span>
                <button
                  onClick={() => onOpenBooking()}
                  className="text-[#c59b27] font-semibold hover:underline"
                >
                  Full Booking Engine →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Property Video Tour Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenBooking={() => onOpenBooking()}
      />
    </div>
  );
};
