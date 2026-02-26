import { useState, useEffect } from 'react';
import { Hotel, MapPin, Calendar, Users, Star, Phone, CheckCircle, Loader2, Search, BedDouble, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useSubmitHotelBooking } from '../hooks/useQueries';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HotelSearchParams {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfRooms: number;
  roomTypePreference: string;
}

interface HotelResult {
  id: string;
  hotelName: string;
  starRating: number;
  location: string;
  pricePerNight: number;
  description: string;
  amenities: string[];
  bookingUrl?: string;
}

// ─── Mock hotel data generator ────────────────────────────────────────────────

function generateMockHotels(destination: string, roomType: string): HotelResult[] {
  const dest = destination.trim() || 'Your Destination';
  const premiumMultiplier = roomType === 'Suite' ? 3 : roomType === 'Deluxe' ? 1.8 : 1;

  const hotelTemplates = [
    {
      id: '1',
      hotelName: `The Grand ${dest} Palace`,
      starRating: 5,
      location: `Central ${dest}`,
      pricePerNight: Math.round(8500 * premiumMultiplier),
      description: 'Iconic luxury hotel with world-class amenities and breathtaking views.',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Concierge'],
    },
    {
      id: '2',
      hotelName: `${dest} Marriott Hotel`,
      starRating: 5,
      location: `Business District, ${dest}`,
      pricePerNight: Math.round(7200 * premiumMultiplier),
      description: 'Premium business hotel with exceptional service and modern facilities.',
      amenities: ['Free WiFi', 'Pool', 'Business Center', 'Restaurant', 'Bar'],
    },
    {
      id: '3',
      hotelName: `Taj ${dest}`,
      starRating: 5,
      location: `Heritage Zone, ${dest}`,
      pricePerNight: Math.round(9800 * premiumMultiplier),
      description: 'Legendary Taj hospitality with heritage architecture and royal service.',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Multiple Restaurants', 'Butler Service'],
    },
    {
      id: '4',
      hotelName: `${dest} Hyatt Regency`,
      starRating: 4,
      location: `Airport Road, ${dest}`,
      pricePerNight: Math.round(5500 * premiumMultiplier),
      description: 'Contemporary hotel with excellent connectivity and modern comforts.',
      amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant', 'Airport Shuttle'],
    },
    {
      id: '5',
      hotelName: `Lemon Tree ${dest}`,
      starRating: 4,
      location: `City Center, ${dest}`,
      pricePerNight: Math.round(3800 * premiumMultiplier),
      description: 'Vibrant mid-scale hotel with cheerful ambiance and great value.',
      amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Business Center'],
    },
    {
      id: '6',
      hotelName: `OYO Townhouse ${dest}`,
      starRating: 3,
      location: `Old Town, ${dest}`,
      pricePerNight: Math.round(1800 * premiumMultiplier),
      description: 'Smart budget hotel with standardized quality and easy booking.',
      amenities: ['Free WiFi', 'AC', 'TV', '24/7 Check-in'],
    },
  ];

  return hotelTemplates;
}

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3.5 h-3.5"
          style={{
            fill: i < rating ? 'var(--gold-accent)' : 'transparent',
            color: i < rating ? 'var(--gold-accent)' : 'var(--border)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Hotel Result Card ────────────────────────────────────────────────────────

interface HotelResultCardProps {
  hotel: HotelResult;
  onBook: (hotel: HotelResult) => void;
}

function HotelResultCard({ hotel, onBook }: HotelResultCardProps) {
  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 12px -2px rgba(31,41,55,0.08)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Hotel Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--warm-sand)' }}
        >
          <Hotel className="w-7 h-7" style={{ color: 'var(--charcoal)' }} />
        </div>

        {/* Hotel Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-display text-base font-bold mb-1" style={{ color: 'var(--charcoal)' }}>
                {hotel.hotelName}
              </h3>
              <StarRating rating={hotel.starRating} />
              <div className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: 'var(--warm-grey)' }}>
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>{hotel.location}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
                ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              </div>
              <div className="text-xs" style={{ color: 'var(--warm-grey)' }}>per night</div>
            </div>
          </div>

          <p className="text-sm mt-2 mb-3 leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)', border: '1px solid var(--border)' }}
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: 'var(--light-beige)', color: 'var(--warm-grey)', border: '1px solid var(--border)' }}
              >
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onBook(hotel)}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
            >
              Book This Hotel
            </button>
            {hotel.bookingUrl && (
              <a
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-1 transition-all duration-200"
                style={{ backgroundColor: 'var(--warm-sand)', color: 'var(--charcoal)', border: '1px solid var(--border)' }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HotelBookingsPage() {
  // Search form state
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [roomTypePreference, setRoomTypePreference] = useState('Standard');

  // Search results state
  const [searchResults, setSearchResults] = useState<HotelResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Inquiry form state
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelResult | null>(null);
  const [inquiryForm, setInquiryForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const submitHotelBooking = useSubmitHotelBooking();

  // Read URL params on mount for pre-fill from hero widget
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get('destination');
    const checkIn = params.get('checkIn');
    const checkOut = params.get('checkOut');
    if (dest) setDestination(dest);
    if (checkIn) setCheckInDate(checkIn);
    if (checkOut) setCheckOutDate(checkOut);
    if (dest) {
      // Auto-trigger search if destination is provided
      setTimeout(() => {
        const results = generateMockHotels(dest, 'Standard');
        setSearchResults(results);
        setHasSearched(true);
      }, 300);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.error('Please enter a destination.');
      return;
    }
    setIsSearching(true);
    setHasSearched(false);
    // Simulate API search with mock data
    setTimeout(() => {
      const results = generateMockHotels(destination, roomTypePreference);
      setSearchResults(results);
      setHasSearched(true);
      setIsSearching(false);
    }, 1200);
  };

  const handleBookHotel = (hotel: HotelResult) => {
    setSelectedHotel(hotel);
    setShowInquiryForm(true);
    setTimeout(() => {
      document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitHotelBooking.mutateAsync({
        name: inquiryForm.name,
        phoneNumber: inquiryForm.phone,
        email: inquiryForm.email,
        destination,
        checkInDate,
        checkOutDate,
        numberOfGuests: BigInt(numberOfGuests),
        numberOfRooms: BigInt(numberOfRooms),
        roomTypePreference,
        hotelName: selectedHotel?.hotelName ?? null,
        starRating: selectedHotel ? BigInt(selectedHotel.starRating) : null,
        location: selectedHotel?.location ?? null,
        pricePerNight: selectedHotel ? BigInt(selectedHotel.pricePerNight) : null,
      });
      setSubmitted(true);
      toast.success('Hotel booking inquiry submitted!');
    } catch (err) {
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  const inputStyle = {
    border: '1.5px solid var(--border)',
    backgroundColor: 'var(--light-beige)',
    color: 'var(--charcoal)',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* Hero */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hotel-hero-premium.dim_1200x600.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(15,20,30,0.80) 0%, rgba(31,41,55,0.65) 100%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Hotel & Hospitality
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg mb-2" style={{ color: 'rgba(250,247,242,0.80)' }}>
            Premium hotels across India and internationally — curated for comfort and luxury.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
            {['5-Star Luxury', 'Business Hotels', 'Budget Stays', 'Resorts & Spas'].map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(184,151,90,0.25)', color: '#E8D5A3', border: '1px solid rgba(184,151,90,0.4)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--warm-sand)' }}>
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Destination */}
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                  Destination *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--warm-grey)' }} />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="City, hotel or landmark"
                    className="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                </div>
              </div>

              {/* Check-In */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                  Check-In Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--warm-grey)' }} />
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                </div>
              </div>

              {/* Check-Out */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                  Check-Out Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--warm-grey)' }} />
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate}
                    className="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--warm-grey)' }} />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                </div>
              </div>

              {/* Rooms */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                  Rooms
                </label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--warm-grey)' }} />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(parseInt(e.target.value) || 1)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                  Room Type
                </label>
                <select
                  value={roomTypePreference}
                  onChange={(e) => setRoomTypePreference(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60"
              style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching Hotels...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search Hotels
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--charcoal)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--warm-grey)' }}>
                Searching hotels in {destination}...
              </p>
            </div>
          )}

          {!isSearching && hasSearched && searchResults.length === 0 && (
            <div className="text-center py-20">
              <Hotel className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--border)' }} />
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                No Hotels Found
              </h3>
              <p className="text-sm" style={{ color: 'var(--warm-grey)' }}>
                Try a different destination or adjust your search criteria.
              </p>
            </div>
          )}

          {!isSearching && hasSearched && searchResults.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>
                    Hotels in {destination}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--warm-grey)' }}>
                    {searchResults.length} properties found · {roomTypePreference} rooms
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {searchResults.map((hotel) => (
                  <HotelResultCard key={hotel.id} hotel={hotel} onBook={handleBookHotel} />
                ))}
              </div>
            </div>
          )}

          {!isSearching && !hasSearched && (
            <div className="text-center py-16">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'var(--warm-sand)' }}
              >
                <Hotel className="w-10 h-10" style={{ color: 'var(--charcoal)' }} />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--charcoal)' }}>
                Discover Premium Hotels
              </h2>
              <p className="text-base max-w-md mx-auto" style={{ color: 'var(--warm-grey)' }}>
                Enter your destination above to find the best hotels across India and internationally.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
                {['Mumbai', 'Delhi', 'Goa', 'Dubai'].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setDestination(city);
                      setIsSearching(true);
                      setTimeout(() => {
                        setSearchResults(generateMockHotels(city, roomTypePreference));
                        setHasSearched(true);
                        setIsSearching(false);
                      }, 800);
                    }}
                    className="py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: 'white', color: 'var(--charcoal)', border: '1px solid var(--border)' }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--warm-sand)' }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setShowInquiryForm(!showInquiryForm)}
            className="w-full flex items-center justify-between p-5 rounded-2xl font-semibold text-sm transition-all"
            style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
          >
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>Request a Custom Hotel Booking via Our Team</span>
            </div>
            {showInquiryForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showInquiryForm && (
            <div
              className="mt-4 rounded-2xl p-6"
              style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--warm-sand)' }}
                  >
                    <CheckCircle className="w-7 h-7" style={{ color: 'var(--charcoal)' }} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                    Inquiry Submitted!
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--warm-grey)' }}>
                    Our team will contact you within 2 hours with the best hotel options.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--warm-grey)' }}>
                    <Phone className="w-4 h-4" />
                    <span>Or call: <a href="tel:9373624669" className="font-semibold hover:underline" style={{ color: 'var(--charcoal)' }}>+91 93736 24669</a></span>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setSelectedHotel(null); }}
                    className="mt-5 px-6 py-2.5 rounded-xl font-semibold text-sm"
                    style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--charcoal)' }}>
                    Hotel Booking Inquiry
                  </h3>
                  {selectedHotel && (
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl mb-4 mt-2"
                      style={{ backgroundColor: 'var(--light-beige)', border: '1px solid var(--border)' }}
                    >
                      <Hotel className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--charcoal)' }} />
                      <div>
                        <div className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>{selectedHotel.hotelName}</div>
                        <div className="text-xs" style={{ color: 'var(--warm-grey)' }}>₹{selectedHotel.pricePerNight.toLocaleString('en-IN')}/night · {selectedHotel.location}</div>
                      </div>
                    </div>
                  )}
                  <p className="text-xs mb-5" style={{ color: 'var(--warm-grey)' }}>
                    Fill in your details and our team will confirm the booking with the best available rates.
                  </p>
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
                        { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                            {field.label} *
                          </label>
                          <input
                            type={field.type}
                            required
                            value={inquiryForm[field.key as keyof typeof inquiryForm]}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                            style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                      />
                    </div>

                    {/* Summary */}
                    {(destination || checkInDate || checkOutDate) && (
                      <div
                        className="rounded-xl p-3 text-xs space-y-1"
                        style={{ backgroundColor: 'var(--light-beige)', border: '1px solid var(--border)' }}
                      >
                        <div className="font-semibold mb-1" style={{ color: 'var(--charcoal)' }}>Booking Summary</div>
                        {destination && <div style={{ color: 'var(--warm-grey)' }}>📍 {destination}</div>}
                        {checkInDate && <div style={{ color: 'var(--warm-grey)' }}>📅 Check-in: {checkInDate}</div>}
                        {checkOutDate && <div style={{ color: 'var(--warm-grey)' }}>📅 Check-out: {checkOutDate}</div>}
                        <div style={{ color: 'var(--warm-grey)' }}>👥 {numberOfGuests} guests · {numberOfRooms} room(s) · {roomTypePreference}</div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitHotelBooking.isPending}
                      className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                      style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
                    >
                      {submitHotelBooking.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Hotel className="w-4 h-4" />
                          Submit Booking Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
