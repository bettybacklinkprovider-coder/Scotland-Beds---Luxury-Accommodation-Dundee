import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { BUSINESS_INFO, REVIEWS } from '../data/mockData';
import QRCode from 'qrcode';
import {
  Star,
  CheckCircle,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  MessageSquarePlus,
  X,
  Send,
  ThumbsUp,
  ShieldCheck,
} from 'lucide-react';

interface CustomerReviewsSectionProps {
  className?: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ className = '' }) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<'all' | 'google' | 'trustpilot' | 'direct'>('all');
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [writeReviewModalOpen, setWriteReviewModalOpen] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newRoom, setNewRoom] = useState('Deluxe King Room');
  const [newText, setNewText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Generate real scannable QR Code on mount
  useEffect(() => {
    QRCode.toDataURL(BUSINESS_INFO.googleReviewUrl, {
      width: 220,
      margin: 1,
      color: {
        dark: '#0c1829',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code', err));
  }, []);

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.googleReviewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'United Kingdom',
      rating: newRating,
      stayDate: 'Recently',
      reviewText: newText,
      roomStayed: newRoom,
      verified: true,
      platform: 'direct',
    };

    setReviewsList([newRev, ...reviewsList]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setWriteReviewModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewText('');
    }, 1800);
  };

  const filteredReviews =
    activePlatformFilter === 'all'
      ? reviewsList
      : reviewsList.filter((r) => r.platform === activePlatformFilter);

  const stats = BUSINESS_INFO.ratingStats;

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
            <span>Scotland Beds</span>
            <span aria-hidden="true">·</span>
            <span>Customer Reviews & Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-slate-900 tracking-tight">
            Loved by Travelers Visiting Dundee
          </h2>
          <p className="text-sm text-slate-600 font-light">
            Genuine verified feedback from guests across Google Reviews, Trustpilot, and direct guest stays at Stirling Street.
          </p>
        </div>

        <button
          onClick={() => setWriteReviewModalOpen(true)}
          className="px-5 py-2.5 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#d4af37]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Row 1: Overall Rating Scorecard + Breakdown + Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Overall Rating & Progress Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Overall Guest Rating
            </span>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl font-serif-luxury font-bold text-slate-900 font-mono">
                {stats.average}
              </span>
              <div>
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  Based on <strong>{stats.totalCount} verified reviews</strong>
                </span>
              </div>
            </div>

            {/* 5 Star to 1 Star Progress Bars */}
            <div className="mt-6 space-y-2.5">
              {stats.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <div className="w-12 text-slate-600 flex items-center gap-1 shrink-0 font-medium">
                    <span>{item.stars}</span>
                    <Star className="w-3 h-3 text-[#d4af37] fill-current" />
                  </div>

                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#d4af37] rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <div className="w-14 text-right font-mono tabular-nums text-slate-500 text-[11px] shrink-0">
                    {item.percentage}% ({item.count})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-ratings */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            {stats.categories.map((cat, i) => (
              <div key={i} className="flex justify-between items-center text-slate-600">
                <span className="text-[11px] text-slate-500">{cat.label}</span>
                <span className="font-mono font-semibold text-slate-900">{cat.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Google Reviews & Trustpilot Cards (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Google Reviews Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex-1 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {/* Google Logo */}
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span className="font-semibold text-slate-800 text-sm">Google Reviews</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  Verified Local
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif-luxury font-bold text-slate-900">4.9</span>
                  <div className="flex text-[#FBBC05]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {stats.googleCount} authentic customer reviews on Google Maps
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={BUSINESS_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c1829] hover:text-[#c59b27] transition-colors"
              >
                <span>See Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BUSINESS_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-800 underline"
              >
                Write Review
              </a>
            </div>
          </div>

          {/* Trustpilot Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex-1 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {/* Trustpilot Badge */}
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-xs text-white">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">Trustpilot</span>
                </div>
                <span className="text-[10px] text-emerald-800 bg-[#00b67a]/15 px-2 py-0.5 rounded font-medium">
                  TrustScore 4.9
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif-luxury font-bold text-slate-900">Excellent</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-[#00b67a] text-white flex items-center justify-center rounded-xs">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on {stats.trustpilotCount} verified Trustpilot traveler ratings
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={BUSINESS_INFO.trustpilotReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b67a] hover:text-[#008f60] transition-colors"
              >
                <span>See Trustpilot Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-[11px] text-slate-400">Independent</span>
            </div>
          </div>
        </div>

        {/* Right: Stylish “Review Us!” QR Code Card (3 cols) */}
        <div className="lg:col-span-3 bg-[#0c1829] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden border border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
              <QrCode className="w-4 h-4" />
              <span>Review Us!</span>
            </div>
            <h3 className="text-xl font-serif-luxury font-medium text-white">
              Scan with Phone Camera
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Open your smartphone camera, point it at the code below, and leave a quick rating for Scotland Beds.
            </p>
          </div>

          {/* QR Code Frame with Luxury Accents */}
          <div className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl shadow-lg self-center border border-slate-100">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Scan QR code to review Scotland Beds on Google"
                className="w-40 h-40 object-contain rounded"
              />
            ) : (
              <div className="w-40 h-40 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                Generating QR...
              </div>
            )}
            <span className="text-[10px] text-slate-600 font-medium mt-1.5 uppercase tracking-wider">
              Google Maps Review Link
            </span>
          </div>

          {/* Actions on QR Card */}
          <div className="space-y-2">
            <button
              onClick={handleCopyReviewLink}
              className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-lg text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Review Link</span>
                </>
              )}
            </button>

            <a
              href={BUSINESS_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#d4af37] hover:bg-[#e2bd47] text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Open Review Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Row 2: Customer Reviews Filter Tabs & Cards Grid */}
      <div className="space-y-6 pt-4">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActivePlatformFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activePlatformFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Reviews ({reviewsList.length})
            </button>
            <button
              onClick={() => setActivePlatformFilter('google')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activePlatformFilter === 'google'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Google Reviews</span>
            </button>
            <button
              onClick={() => setActivePlatformFilter('trustpilot')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activePlatformFilter === 'trustpilot'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Trustpilot</span>
            </button>
            <button
              onClick={() => setActivePlatformFilter('direct')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activePlatformFilter === 'direct'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direct Guest Stays
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>100% Genuine, Unedited Guest Feedback</span>
          </div>
        </div>

        {/* Reviews Cards Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                {/* Platform Indicator + Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {rev.platform === 'google' && (
                    <span className="text-[10px] font-medium text-slate-600 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                      <span className="text-[#4285F4] font-bold">G</span>oogle
                    </span>
                  )}
                  {rev.platform === 'trustpilot' && (
                    <span className="text-[10px] font-medium text-[#00b67a] flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                      ★ Trustpilot
                    </span>
                  )}
                  {rev.platform === 'direct' && (
                    <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Verified Guest
                    </span>
                  )}
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{rev.author}</span>
                  <span className="text-slate-400 text-[11px]">{rev.stayDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>{rev.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-600">{rev.roomStayed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {writeReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#faf9f5] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-[#0c1829] text-white p-6 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                  Scotland Beds Feedback
                </span>
                <h3 className="text-xl font-serif-luxury font-medium mt-0.5">
                  Leave a Guest Review
                </h3>
              </div>
              <button
                onClick={() => setWriteReviewModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-semibold text-emerald-900 text-sm">
                    Thank you for your review!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Your rating and feedback have been added to Scotland Beds.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'text-[#d4af37] fill-[#d4af37]'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-slate-800 ml-2">
                        {newRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Margaret Fraser"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        City / Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Perth, Scotland"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Room You Stayed In
                    </label>
                    <select
                      value={newRoom}
                      onChange={(e) => setNewRoom(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                    >
                      <option value="Deluxe King Room">Deluxe King Room</option>
                      <option value="Executive Double Room">Executive Double Room</option>
                      <option value="Superior Twin Room">Superior Twin Room</option>
                      <option value="Premier Studio Suite">Premier Studio Suite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Your Review *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your experience about bed comfort, cleanliness, location on Stirling Street..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                      required
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setWriteReviewModalOpen(false)}
                      className="flex-1 py-2.5 px-4 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 bg-[#0c1829] hover:bg-[#1a2c47] text-white font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Review</span>
                    </button>
                  </div>

                  <div className="pt-2 text-center">
                    <a
                      href={BUSINESS_INFO.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#c59b27] hover:underline"
                    >
                      Or submit directly on our Google Maps profile →
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
