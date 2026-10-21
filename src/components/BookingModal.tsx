import React, { useState, useEffect } from 'react';
import { ROOMS, BUSINESS_INFO } from '../data/mockData';
import { X, Calendar, Users, Phone, Mail, User, CheckCircle, MessageSquare, ShieldCheck, Printer } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
  packageName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
  packageName,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(preSelectedRoomId || ROOMS[0].id);

  // Default dates: tomorrow to +2 days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkOutDefault = new Date(tomorrow);
  checkOutDefault.setDate(checkOutDefault.getDate() + 2);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDateString(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDateString(checkOutDefault));
  const [guests, setGuests] = useState<number>(2);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preSelectedRoomId) {
      setSelectedRoomId(preSelectedRoomId);
    }
    if (packageName) {
      setSpecialRequests(`Enquiry for Special Package: ${packageName}`);
    }
  }, [preSelectedRoomId, packageName]);

  if (!isOpen) return null;

  const currentRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Calculate nights
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const timeDiff = dOut.getTime() - dIn.getTime();
  const calculatedNights = Math.max(1, Math.round(timeDiff / (1000 * 3600 * 24)));
  const estimatedTotal = calculatedNights * currentRoom.pricePerNight;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please enter a valid email address';
    if (!phone.trim()) errs.phone = 'Please enter your telephone number';
    if (dOut <= dIn) errs.checkOut = 'Check-out date must be after check-in date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomRef = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(randomRef);
    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    if (!validate()) return;
    const msg = `*New Stay Enquiry - Scotland Beds*\n\n` +
      `• Guest: ${fullName}\n` +
      `• Room: ${currentRoom.name}\n` +
      `• Check-in: ${checkIn}\n` +
      `• Check-out: ${checkOut} (${calculatedNights} night${calculatedNights > 1 ? 's' : ''})\n` +
      `• Guests: ${guests}\n` +
      `• Estimated Rate: £${estimatedTotal} (£${currentRoom.pricePerNight}/night)\n` +
      `• Phone: ${phone}\n` +
      `• Email: ${email}\n` +
      (specialRequests ? `• Special Requests: ${specialRequests}\n` : '') +
      `\nPlease let me know your availability to confirm this booking.`;

    window.open(BUSINESS_INFO.whatsappUrl(msg), '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookingRef('');
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#faf9f5] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0c1829] text-white p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
              Scotland Beds · Direct Booking
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-medium mt-1">
              {isSubmitted ? 'Booking Enquiry Confirmed' : 'Reserve Your Stay in Dundee'}
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-900 text-sm">
                    Thank you, {fullName}! Your enquiry has been received.
                  </h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your reference code is <span className="font-mono font-bold">{bookingRef}</span>. Our team at Scotland Beds will review availability and confirm your reservation within 2 hours.
                  </p>
                </div>
              </div>

              {/* Summary Voucher */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs text-slate-500">Accommodation</span>
                    <p className="font-semibold text-slate-900">{currentRoom.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Booking Ref</span>
                    <p className="font-mono font-semibold text-[#0c1829]">{bookingRef}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">Check-in:</span>
                    <p className="font-medium text-slate-800">{checkIn} (From 3:00 PM)</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Check-out:</span>
                    <p className="font-medium text-slate-800">{checkOut} (By 11:00 AM)</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Guests & Duration:</span>
                    <p className="font-medium text-slate-800">
                      {guests} Guest{guests > 1 ? 's' : ''} · {calculatedNights} Night{calculatedNights > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Estimated Total:</span>
                    <p className="font-bold text-base text-[#0c1829] font-mono tabular-nums">
                      £{estimatedTotal}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <p><strong>Property:</strong> 2nd Floor, 6 Stirling St, Dundee DD3 6PH, UK</p>
                  <p><strong>Guest Contact:</strong> {phone} · {email}</p>
                  {specialRequests && (
                    <p><strong>Note:</strong> {specialRequests}</p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <a
                  href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, I submitted booking ref ${bookingRef} for ${currentRoom.name} (${checkIn} to ${checkOut}). Could you please confirm?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmitEnquiry} className="space-y-5">
              {/* Room selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Room
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                >
                  {ROOMS.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — £{room.pricePerNight}/night (Max {room.capacity} guests)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Check-In Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkIn}
                      min={formatDateString(today)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Check-Out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                        errors.checkOut ? 'border-red-400' : 'border-slate-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.checkOut && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.checkOut}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                  </select>
                </div>
              </div>

              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Campbell"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                        errors.fullName ? 'border-red-400' : 'border-slate-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                        errors.phone ? 'border-red-400' : 'border-slate-300'
                      }`}
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                      errors.email ? 'border-red-400' : 'border-slate-300'
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Estimated arrival time, bedding preferences, parking questions..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                />
              </div>

              {/* Price tally calculation */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Stay Estimate</span>
                  <p className="text-slate-800 font-medium">
                    {calculatedNights} night{calculatedNights > 1 ? 's' : ''} × £{currentRoom.pricePerNight}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Estimated Total</span>
                  <p className="text-lg font-bold text-[#0c1829] font-mono tabular-nums">
                    £{estimatedTotal}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 bg-[#0c1829] hover:bg-[#1a2c47] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0c1829]"
                >
                  Send Booking Enquiry
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="flex-1 py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>No upfront charge · Free cancellation up to 48 hours before check-in</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
