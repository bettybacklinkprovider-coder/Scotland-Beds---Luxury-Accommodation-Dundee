import React, { useState, useEffect } from 'react';
import { PageRoute, Room } from './types';
import { GALLERY_ITEMS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { LightboxModal } from './components/LightboxModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Sync page state with URL hash for distinctive URLs for each page
  const getInitialPage = (): PageRoute => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'rooms') return 'rooms';
    if (hash === 'gallery') return 'gallery';
    if (hash === 'contact') return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);

  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>(undefined);
  const [bookingPackageName, setBookingPackageName] = useState<string | undefined>(undefined);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [roomDetailModalOpen, setRoomDetailModalOpen] = useState(false);
  const [selectedRoomDetail, setSelectedRoomDetail] = useState<Room | null>(null);

  // Sync hash changes (browser back/forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'rooms', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (roomId?: string, packageName?: string) => {
    setBookingRoomId(roomId);
    setBookingPackageName(packageName);
    setBookingModalOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOpenRoomDetail = (room: Room) => {
    setSelectedRoomDetail(room);
    setRoomDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-slate-800 font-sans-clean antialiased">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* 4 Distinct Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenLightbox={handleOpenLightbox}
            onOpenRoomDetail={handleOpenRoomDetail}
          />
        )}

        {currentPage === 'rooms' && (
          <RoomsPage
            onOpenBooking={handleOpenBooking}
            onOpenRoomDetail={handleOpenRoomDetail}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage onOpenLightbox={handleOpenLightbox} />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

      {/* Interactive Booking Enquiry Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedRoomId={bookingRoomId}
        packageName={bookingPackageName}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={GALLERY_ITEMS}
        currentIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
      />

      {/* Room Detail Specs Modal */}
      <RoomDetailModal
        room={selectedRoomDetail}
        onClose={() => setRoomDetailModalOpen(false)}
        onBookRoom={(roomId) => handleOpenBooking(roomId)}
      />
    </div>
  );
}
