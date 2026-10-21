import React, { useState } from 'react';
import { ROOMS, BUSINESS_INFO } from '../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Calendar,
  Send,
  CheckCircle,
  Train,
  Car,
  Compass,
  Printer,
  ShieldCheck,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = new Date(tomorrow);
  nextDay.setDate(nextDay.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(nextDay));
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState(ROOMS[0].id);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [voucherRef, setVoucherRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedRoom = ROOMS.find((r) => r.id === roomId) || ROOMS[0];

  // Calculate nights
  const dIn = new Date(checkIn);
  const dOut = new Date(checkOut);
  const timeDiff = dOut.getTime() - dIn.getTime();
  const nights = Math.max(1, Math.round(timeDiff / (1000 * 3600 * 24)));
  const estimatedTotal = nights * selectedRoom.pricePerNight;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your name';
    if (!phone.trim()) errs.phone = 'Please provide a contact phone number';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email';
    if (dOut <= dIn) errs.checkOut = 'Check-out date must be after check-in';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const ref = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    setVoucherRef(ref);
    setSubmitted(true);
  };

  const handleWhatsAppEnquiry = () => {
    if (!validate()) return;
    const msg = `*Booking Enquiry - Scotland Beds*\n\n` +
      `• Guest: ${fullName}\n` +
      `• Room: ${selectedRoom.name}\n` +
      `• Check-In: ${checkIn}\n` +
      `• Check-Out: ${checkOut} (${nights} night${nights > 1 ? 's' : ''})\n` +
      `• Guests: ${guests}\n` +
      `• Estimated Rate: £${estimatedTotal}\n` +
      `• Contact: ${phone} | ${email}\n` +
      (specialRequests ? `• Special Requests: ${specialRequests}\n` : '') +
      `\nPlease verify availability for our stay.`;

    window.open(BUSINESS_INFO.whatsappUrl(msg), '_blank');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#c59b27]">
            <span>Scotland Beds</span>
            <span aria-hidden="true">·</span>
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-slate-900 tracking-tight">
            Contact & Direct Booking
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-light">
            We are here to assist with your Dundee visit. Reach us directly by phone, WhatsApp, or submit your reservation enquiry below for guaranteed quick response.
          </p>
        </div>

        {/* Contact Cards 3-Zone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#0c1829] flex items-center justify-center text-[#d4af37]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Direct Telephone
              </span>
              <p className="text-lg font-mono font-bold text-slate-900 mt-1">
                {BUSINESS_INFO.phone}
              </p>
            </div>
            <p className="text-xs text-slate-600">
              Direct guest enquiries, booking assistance, and arrival coordination.
            </p>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-block text-xs font-semibold uppercase tracking-wider text-[#0c1829] hover:underline"
            >
              Call Us Directly →
            </a>
          </div>

          {/* WhatsApp */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                WhatsApp Booking
              </span>
              <p className="text-lg font-mono font-bold text-slate-900 mt-1">
                +44 7956 357357
              </p>
            </div>
            <p className="text-xs text-slate-600">
              Message us anytime for prompt room availability and instant booking links.
            </p>
            <a
              href={BUSINESS_INFO.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-700 hover:underline"
            >
              Start WhatsApp Chat →
            </a>
          </div>

          {/* Location */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#0c1829] flex items-center justify-center text-[#d4af37]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Property Address
              </span>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                {BUSINESS_INFO.address.line1}
              </p>
              <p className="text-xs text-slate-600">
                {BUSINESS_INFO.address.city} {BUSINESS_INFO.address.postcode}, {BUSINESS_INFO.address.country}
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Quiet second floor setting on Stirling Street, walking distance to V&A and Dundee Rail Station.
            </p>
          </div>
        </div>

        {/* Main Grid: Form + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Booking Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#c59b27]">
                Official Direct Enquiry
              </span>
              <h2 className="text-2xl font-serif-luxury font-medium text-slate-900 mt-1">
                {submitted ? 'Enquiry Reference Confirmation' : 'Complete Booking Enquiry'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your travel dates below. We will hold your room and confirm with check-in instructions.
              </p>
            </div>

            {submitted ? (
              <div className="space-y-6">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-emerald-900">
                      Booking Enquiry Submitted Successfully!
                    </h3>
                    <p className="text-xs text-emerald-700 mt-1">
                      Reference Code: <span className="font-mono font-bold">{voucherRef}</span>. A representative from Scotland Beds will contact you at {phone} and {email} to confirm your reservation.
                    </p>
                  </div>
                </div>

                {/* Printable receipt card */}
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-slate-500 block">Property</span>
                      <strong className="text-sm text-slate-900">Scotland Beds Dundee</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block">Status</span>
                      <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                        Pending Confirmation
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block">Room:</span>
                      <span className="font-medium text-slate-800">{selectedRoom.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Estimated Rate:</span>
                      <span className="font-mono font-bold text-slate-900">
                        £{estimatedTotal} ({nights} nights)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Check-in:</span>
                      <span className="font-medium text-slate-800">{checkIn} (from 3:00 PM)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Check-out:</span>
                      <span className="font-medium text-slate-800">{checkOut} (by 11:00 AM)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Guest Name:</span>
                      <span className="font-medium text-slate-800">{fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Telephone:</span>
                      <span className="font-mono text-slate-800">{phone}</span>
                    </div>
                  </div>

                  {specialRequests && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-500 block">Special Requests:</span>
                      <p className="text-slate-700 mt-0.5">{specialRequests}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Confirmation</span>
                  </button>
                  <a
                    href={BUSINESS_INFO.whatsappUrl(`Hello Scotland Beds, I just submitted booking enquiry #${voucherRef} for ${selectedRoom.name}. Can you confirm availability?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Confirm on WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-500 underline block text-center pt-2"
                >
                  Submit another booking enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Room choice */}
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Accommodation
                  </label>
                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                  >
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — £{r.pricePerNight}/night (Max {r.capacity} Guests)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={formatDate(today)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                        errors.checkOut ? 'border-red-400' : 'border-slate-300'
                      }`}
                      required
                    />
                    {errors.checkOut && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.checkOut}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fiona Macleod"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                        errors.fullName ? 'border-red-400' : 'border-slate-300'
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7956 357357"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                        errors.phone ? 'border-red-400' : 'border-slate-300'
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="fiona@example.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829] ${
                      errors.email ? 'border-red-400' : 'border-slate-300'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Special Requests or Arrival Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Estimated check-in time, twin bed preference, parking inquiries..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c1829]"
                  />
                </div>

                {/* Estimate box */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500">Duration & Room:</span>
                    <p className="font-semibold text-slate-800">
                      {nights} Night{nights > 1 ? 's' : ''} · {selectedRoom.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">Estimated Total:</span>
                    <p className="text-lg font-mono font-bold text-[#0c1829] tabular-nums">
                      £{estimatedTotal}
                    </p>
                  </div>
                </div>

                {/* Submission Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 bg-[#0c1829] hover:bg-[#1a2c47] text-white font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppEnquiry}
                    className="flex-1 py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Book via WhatsApp</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Free cancellation up to 48 hours prior to arrival date</span>
                </div>
              </form>
            )}
          </div>

          {/* Location Map & Travel Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Map Frame */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-72 w-full relative">
                <iframe
                  title="Scotland Beds Dundee Location"
                  src="https://maps.google.com/maps?q=6%20Stirling%20St,%20Dundee%20DD3%206PH,%20United%20Kingdom&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">Scotland Beds</p>
                    <p className="text-slate-600">{BUSINESS_INFO.address.full}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Clock className="w-4 h-4 text-[#c59b27] shrink-0" />
                  <span>Check-in: {BUSINESS_INFO.checkInTime}</span>
                </div>
              </div>
            </div>

            {/* Travel Directions Guide */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Getting to Scotland Beds
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">By Train (Dundee Station):</strong>
                    <span className="text-slate-600">
                      Approximately a 10 to 12-minute walk or 4-minute taxi ride from Dundee Railway Station directly to Stirling Street.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">By Car & Parking:</strong>
                    <span className="text-slate-600">
                      Convenient on-street pay-and-display parking and nearby multi-storey Dundee car parks available within short walking distance.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Property Access:</strong>
                    <span className="text-slate-600">
                      Located on the 2nd Floor of 6 Stirling Street. Contactless smart entrance codes sent to guests prior to check-in.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
