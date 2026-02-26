import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plane, Train, Car, Package, Hotel, Search, ArrowLeftRight } from 'lucide-react';

type TabType = 'flights' | 'railway' | 'car-rentals' | 'packages' | 'hotels';

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
  { id: 'railway', label: 'Trains', icon: <Train className="w-4 h-4" /> },
  { id: 'car-rentals', label: 'Car Rentals', icon: <Car className="w-4 h-4" /> },
  { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
  { id: 'packages', label: 'Packages', icon: <Package className="w-4 h-4" /> },
];

const inputStyle = {
  border: '1.5px solid var(--border)',
  backgroundColor: 'var(--light-beige)',
  color: 'var(--charcoal)',
};

export default function HeroSearchWidget() {
  const [activeTab, setActiveTab] = useState<TabType>('flights');
  const [hotelDestination, setHotelDestination] = useState('');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (activeTab === 'hotels') {
      const params = new URLSearchParams();
      if (hotelDestination) params.set('destination', hotelDestination);
      if (hotelCheckIn) params.set('checkIn', hotelCheckIn);
      if (hotelCheckOut) params.set('checkOut', hotelCheckOut);
      const query = params.toString();
      navigate({ to: `/hotels${query ? `?${query}` : ''}` });
    } else {
      navigate({ to: `/${activeTab}` });
    }
  };

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.8)',
        boxShadow: '0 20px 60px -12px rgba(0,0,0,0.35)',
      }}
    >
      {/* Tabs */}
      <div
        className="flex border-b overflow-x-auto"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--light-beige)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-shrink-0 flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all duration-200 min-w-[80px]"
            style={{
              color: activeTab === tab.id ? 'var(--deep-charcoal)' : 'var(--warm-grey)',
              backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
              borderBottom: activeTab === tab.id ? '2px solid var(--deep-charcoal)' : '2px solid transparent',
            }}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="p-5">
        {activeTab === 'flights' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                From
              </label>
              <input
                type="text"
                placeholder="Origin city or airport"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex items-end justify-center pb-1">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ backgroundColor: 'var(--warm-sand)', color: 'var(--charcoal)' }}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                To
              </label>
              <input
                type="text"
                placeholder="Destination city or airport"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        )}

        {activeTab === 'railway' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                From Station
              </label>
              <input
                type="text"
                placeholder="Origin station"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex items-end justify-center pb-1">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'var(--warm-sand)', color: 'var(--charcoal)' }}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                To Station
              </label>
              <input
                type="text"
                placeholder="Destination station"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Travel Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        )}

        {activeTab === 'car-rentals' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="City or address"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Vehicle Type
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              >
                <option value="">Select vehicle</option>
                <option value="sedan">Sedan — ₹13/km</option>
                <option value="suv">SUV — ₹21/km</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Pickup Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
              >
                <Search className="w-4 h-4" />
                Book
              </button>
            </div>
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Destination
              </label>
              <input
                type="text"
                placeholder="City, hotel or landmark"
                value={hotelDestination}
                onChange={(e) => setHotelDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Check-In
              </label>
              <input
                type="date"
                value={hotelCheckIn}
                onChange={(e) => setHotelCheckIn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Check-Out
              </label>
              <input
                type="date"
                value={hotelCheckOut}
                onChange={(e) => setHotelCheckOut(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Destination
              </label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Duration
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              >
                <option value="">Any duration</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
                <option value="10">10+ Days</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                Travelers
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
              >
                <option value="">Select</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4">3-4 People</option>
                <option value="5">5+ People</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
              >
                <Search className="w-4 h-4" />
                Explore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
