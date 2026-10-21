import React, { useState } from 'react';
import { SpecialOffer } from '../types';
import { SPECIAL_OFFERS, OFFER_FAQS, BUSINESS_INFO } from '../data/mockData';
import {
  Sparkles,
  CalendarCheck,
  MessageSquare,
  Clock,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Tag,
  ArrowRight,
  Info,
  X,
  Gift,
  Search,
} from 'lucide-react';

interface SpecialOffersSectionProps {
  onSelectOffer: (roomId: string, packageName: string) => void;
  className?: string;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onSelectOffer,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'weekend_couples' | 'business_extended' | 'family_seasonal'>('all');
  const [selectedOfferModal, setSelectedOfferModal] = useState<SpecialOffer | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick stay finder state
  const [finderNights, setFinderNights] = useState('2');
  const [finderGuests, setFinderGuests] = useState('2');

  const filterTabs = [
    { id: 'all', label: 'All Packages (6)' },
    { id: 'weekend_couples', label: 'Weekend & Romance' },
    { id: 'business_extended', label: 'Business & Extended' },
    { id: 'family_seasonal', label: 'Family & Seasonal' },
  ];

  const filteredOffers = SPECIAL_OFFERS.filter((offer) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'weekend_couples') {
      return offer.category === 'weekend' || offer.category === 'romantic';
    }
    if (activeCategory === 'business_extended') {
      return offer.category === 'business' || offer.category === 'extended';
    }
    if (activeCategory === 'family_seasonal') {
      return offer.category === 'family' || offer.category === 'seasonal';
    }
    return true;
  });

  return (
    <section id="offers" className={`py-20 lg:py-28 bg-[#faf9f5] border-b border-slate-200 scroll-mt-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Marquee Banner: Direct Booking Privileges */}
        <div className="bg-[#0c1829] text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                Direct Guest Privilege
              </p>
              <h3 className="text-sm sm:text-base font-serif-luxury font-medium text-white">
                Book direct for Complimentary Late Check-Out (12:00 PM) & Free 48-Hour Cancellation
              </h3>
            </div>
          </div>

          <a
            href={BUSINESS_INFO.whatsappUrl('Hello Scotland Beds, I would like to ask about direct booking benefits.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shrink-0 whitespace-nowrap"
          >
            Direct Perks WhatsApp
          </a>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Stays & Direct Savings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium text-slate-900 tracking-tight">
            Exclusive Offers & Packages
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            Discover exceptional stays and exclusive offers designed to make your experience unforgettable.
          </p>
        </div>

        {/* Filter Segmented Bar */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-xs overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-[#0c1829] text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Offer Cards Grid (6 packages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Category Pill / Tag */}
                  {offer.discountBadge && (
                    <div className="absolute top-3 left-3 bg-[#0c1829]/90 backdrop-blur-xs text-[#d4af37] text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#d4af37]/30">
                      {offer.discountBadge}
                    </div>
                  )}

                  {/* Min stay badge */}
                  {offer.minNights && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-medium px-2 py-1 rounded-md">
                      Min {offer.minNights} Night{offer.minNights > 1 ? 's' : ''}
                    </div>
                  )}

                  {/* Price overlay banner */}
                  <div className="absolute bottom-3 right-3 bg-[#0c1829]/90 text-white px-3 py-1.5 rounded-lg text-right backdrop-blur-xs">
                    {offer.originalPricePerNight && (
                      <span className="text-[10px] text-slate-400 line-through block font-mono">
                        £{offer.originalPricePerNight}
                      </span>
                    )}
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-xl font-serif-luxury font-bold text-[#d4af37] font-mono">
                        £{offer.offerPricePerNight}
                      </span>
                      <span className="text-[10px] text-slate-300"> / night</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c59b27]">
                      {offer.targetRoomName}
                    </span>
                    <h3 className="text-xl font-serif-luxury font-medium text-slate-900 group-hover:text-[#c59b27] transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Included benefits checklist */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-800 block">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {offer.includedBenefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Validity Info */}
                  <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                    <span className="truncate">{offer.validity}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectOffer(offer.targetRoomId, offer.title)}
                    className="flex-1 py-2.5 px-3 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{offer.ctaText}</span>
                  </button>

                  <button
                    onClick={() => setSelectedOfferModal(offer)}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    aria-label={`View details for ${offer.title}`}
                    title="View Package Details"
                  >
                    <Info className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                <a
                  href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, I am enquiring about the ${offer.title} (£${offer.offerPricePerNight}/night). Could you confirm availability?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 text-[11px] font-medium text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Find Your Perfect Stay Interactive Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c59b27]">
                Tailored Recommendation
              </span>
              <h3 className="text-2xl font-serif-luxury font-medium text-slate-900">
                Find Your Perfect Stay in Dundee
              </h3>
              <p className="text-xs text-slate-600">
                Planning a specific duration? Select your stay length and guests to view recommended room packages.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Duration
                </label>
                <select
                  value={finderNights}
                  onChange={(e) => setFinderNights(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                >
                  <option value="1">1 Night (Quick Stop)</option>
                  <option value="2">2 Nights (Weekend Break)</option>
                  <option value="4">4+ Nights (Extended Stay)</option>
                  <option value="7">7+ Nights (Weekly Relocation)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Guests
                </label>
                <select
                  value={finderGuests}
                  onChange={(e) => setFinderGuests(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                >
                  <option value="1">1 Guest (Solo / Business)</option>
                  <option value="2">2 Guests (Couple / Friends)</option>
                  <option value="3">3-4 Guests (Family Suite)</option>
                </select>
              </div>

              <div className="self-end pt-5 sm:pt-0">
                <button
                  onClick={() => {
                    if (Number(finderNights) >= 4) {
                      onSelectOffer('executive-double', 'Extended Stay Direct Saver');
                    } else if (Number(finderGuests) >= 3) {
                      onSelectOffer('studio-suite', 'Family Dundee Explorer Package');
                    } else {
                      onSelectOffer('deluxe-king', 'Weekend Dundee Getaway');
                    }
                  }}
                  className="py-2.5 px-5 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Search className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Recommend Offer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Small FAQ Accordion Area */}
        <div className="max-w-3xl mx-auto space-y-6 pt-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c59b27]">
              Offer Details & Policies
            </span>
            <h3 className="text-2xl font-serif-luxury font-medium text-slate-900">
              Frequently Asked Questions About Our Packages
            </h3>
          </div>

          <div className="space-y-3">
            {OFFER_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#c59b27] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Package Detail Inspection Modal */}
      {selectedOfferModal && (
        <div
          onClick={() => setSelectedOfferModal(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#faf9f5] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
          >
            <div className="bg-[#0c1829] text-white p-6 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  Scotland Beds Package Inclusions
                </span>
                <h3 className="text-2xl font-serif-luxury font-medium mt-1">
                  {selectedOfferModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={selectedOfferModal.image}
                  alt={selectedOfferModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Package Overview
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {selectedOfferModal.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  All Included Amenities & Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedOfferModal.includedBenefits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Target Room:</span>
                  <strong className="text-slate-900">{selectedOfferModal.targetRoomName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Sample Promotional Rate:</span>
                  <strong className="text-slate-900 font-mono">
                    £{selectedOfferModal.offerPricePerNight} / night
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Stay:</span>
                  <span>{selectedOfferModal.minNights || 1} Night(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Validity & Conditions:</span>
                  <span className="text-slate-500">{selectedOfferModal.validity}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    const room = selectedOfferModal.targetRoomId;
                    const pkg = selectedOfferModal.title;
                    setSelectedOfferModal(null);
                    onSelectOffer(room, pkg);
                  }}
                  className="flex-1 py-3 px-5 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <CalendarCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>Reserve This Package</span>
                </button>

                <a
                  href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, I want to book the ${selectedOfferModal.title} package.`)}
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
      )}
    </section>
  );
};
