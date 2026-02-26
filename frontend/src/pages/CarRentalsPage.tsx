import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Car, Users, CheckCircle, Loader2, Phone, Star, AlertTriangle, ExternalLink } from 'lucide-react';
import { useSubmitCarRental } from '../hooks/useQueries';
import { CarType, CarRentalPricingMode } from '../backend';

// ─── Pricing constants ────────────────────────────────────────────────────────
const SEDAN_RATE_PER_KM = 13;
const SEDAN_RATE_PER_DAY = 2500;
const SUV_RATE_PER_KM = 21;
const SUV_RATE_PER_DAY = 5000;

// ─── Vehicle data ─────────────────────────────────────────────────────────────
const vehicles = [
  {
    type: CarType.sedan,
    label: 'Sedan',
    icon: '🚗',
    description: 'Comfortable and fuel-efficient for city and highway travel.',
    capacity: '4 Passengers',
    ratePerKm: SEDAN_RATE_PER_KM,
    ratePerDay: SEDAN_RATE_PER_DAY,
    mostPopular: true,
    features: ['Air Conditioned', 'GPS Navigation', 'Music System', 'Comfortable Seating'],
  },
  {
    type: CarType.suv,
    label: 'SUV',
    icon: '🚙',
    description: 'Spacious and powerful for family trips and rough terrain.',
    capacity: '7 Passengers',
    ratePerKm: SUV_RATE_PER_KM,
    ratePerDay: SUV_RATE_PER_DAY,
    mostPopular: false,
    features: ['Air Conditioned', 'GPS Navigation', 'Music System', 'Extra Luggage Space'],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type PricingMode = 'perKm' | 'perDay';

export default function CarRentalsPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<CarType>(CarType.sedan);
  const [driverRequired, setDriverRequired] = useState(true);
  const [pricingMode, setPricingMode] = useState<PricingMode>('perKm');
  const [distanceInput, setDistanceInput] = useState('');
  const [daysInput, setDaysInput] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [tcAccepted, setTcAccepted] = useState(false);
  const [tcError, setTcError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitCarRental = useSubmitCarRental();
  const selectedVehicleData = vehicles.find((v) => v.type === selectedVehicle)!;

  // ─── Live fare calculation ─────────────────────────────────────────────────
  const estimatedFare = (() => {
    if (pricingMode === 'perKm') {
      const dist = parseInt(distanceInput);
      if (!distanceInput || isNaN(dist) || dist <= 0) return null;
      return dist * selectedVehicleData.ratePerKm;
    } else {
      const days = parseInt(daysInput);
      if (!daysInput || isNaN(days) || days <= 0) return null;
      return days * selectedVehicleData.ratePerDay;
    }
  })();

  // ─── Form submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tcAccepted) {
      setTcError(true);
      return;
    }
    setTcError(false);
    try {
      const dist = pricingMode === 'perKm' && distanceInput ? BigInt(parseInt(distanceInput)) : null;
      const days = pricingMode === 'perDay' && daysInput ? BigInt(parseInt(daysInput)) : null;
      await submitCarRental.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        vehicleType: selectedVehicle,
        driverRequired,
        estimatedDistance: dist,
        pricingMode: pricingMode === 'perKm' ? CarRentalPricingMode.perKm : CarRentalPricingMode.perDay,
        estimatedDays: days,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  // ─── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'var(--warm-sand)', border: '2px solid var(--border)' }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: 'var(--charcoal)' }} />
          </div>
          <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--charcoal)' }}>
            Booking Request Sent!
          </h2>
          <p className="text-base mb-2" style={{ color: 'var(--warm-grey)' }}>
            We'll confirm your <strong>{selectedVehicleData.label}</strong> rental within 2 hours.
          </p>
          {estimatedFare && (
            <p className="text-sm mb-6" style={{ color: 'var(--warm-grey)' }}>
              Estimated fare: <strong style={{ color: 'var(--charcoal)' }}>₹{estimatedFare.toLocaleString('en-IN')}</strong>
            </p>
          )}
          <div
            className="flex items-center justify-center gap-2 text-sm mb-8 py-3 px-5 rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid var(--border)', color: 'var(--warm-grey)' }}
          >
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gold-accent)' }} />
            <span>
              Or call us directly:{' '}
              <a href="tel:9373624669" className="font-semibold hover:underline" style={{ color: 'var(--charcoal)' }}>
                +91 93736 24669
              </a>
            </span>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', phone: '', email: '' });
              setDistanceInput('');
              setDaysInput('');
              setTcAccepted(false);
            }}
            className="px-8 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* ── Hero ── */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: 'var(--deep-charcoal)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, var(--gold-accent) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
            Premium Fleet
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Car Rentals</h1>
          <p className="text-base mb-8" style={{ color: 'rgba(250,247,242,0.70)' }}>
            Premium vehicles with professional drivers — choose your pricing mode.
          </p>

          {/* Pricing summary pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#E8D5A3' }}
            >
              🚗 Sedan · ₹{SEDAN_RATE_PER_KM}/km · ₹{SEDAN_RATE_PER_DAY.toLocaleString('en-IN')}/day
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#E8D5A3' }}
            >
              🚙 SUV · ₹{SUV_RATE_PER_KM}/km · ₹{SUV_RATE_PER_DAY.toLocaleString('en-IN')}/day
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Left column: Vehicle + Options ── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Vehicle selection */}
              <div>
                <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--charcoal)' }}>
                  1. Choose Your Vehicle
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => {
                    const isSelected = selectedVehicle === vehicle.type;
                    return (
                      <button
                        key={vehicle.type}
                        onClick={() => setSelectedVehicle(vehicle.type)}
                        className="relative text-left rounded-2xl p-5 transition-all duration-200"
                        style={{
                          backgroundColor: isSelected ? 'var(--deep-charcoal)' : 'white',
                          color: isSelected ? 'var(--light-beige)' : 'var(--charcoal)',
                          border: isSelected ? '2px solid var(--deep-charcoal)' : '2px solid var(--border)',
                        }}
                      >
                        {/* Most Popular badge */}
                        {vehicle.mostPopular && (
                          <div
                            className="absolute -top-3 left-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: 'var(--gold-accent)',
                              color: 'var(--deep-charcoal)',
                            }}
                          >
                            <Star className="w-3 h-3 fill-current" />
                            Most Popular
                          </div>
                        )}

                        <div className="text-3xl mb-3 mt-1">{vehicle.icon}</div>
                        <div className="font-display text-lg font-bold mb-1">{vehicle.label}</div>
                        <div className="text-xs opacity-70 mb-4 leading-relaxed">{vehicle.description}</div>

                        {/* Pricing grid */}
                        <div
                          className="grid grid-cols-2 gap-2 mb-3 p-3 rounded-xl"
                          style={{
                            backgroundColor: isSelected ? 'rgba(255,255,255,0.10)' : 'var(--light-beige)',
                            border: isSelected ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border)',
                          }}
                        >
                          <div className="text-center">
                            <div className="text-xs opacity-60 mb-0.5">Per KM</div>
                            <div className="font-display text-base font-bold">₹{vehicle.ratePerKm}</div>
                          </div>
                          <div
                            className="text-center"
                            style={{ borderLeft: isSelected ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border)' }}
                          >
                            <div className="text-xs opacity-60 mb-0.5">Per Day</div>
                            <div className="font-display text-base font-bold">₹{vehicle.ratePerDay.toLocaleString('en-IN')}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs opacity-70">
                          <Users className="w-3.5 h-3.5" />
                          {vehicle.capacity}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pricing mode */}
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--charcoal)' }}>
                  2. Select Pricing Mode
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--warm-grey)' }}>
                  Choose how you'd like to be billed — per kilometre or per day.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'perKm', label: 'Per Kilometre', sub: `₹${selectedVehicleData.ratePerKm}/km` },
                    { value: 'perDay', label: 'Per Day', sub: `₹${selectedVehicleData.ratePerDay.toLocaleString('en-IN')}/day` },
                  ] as const).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPricingMode(opt.value)}
                      className="py-3 px-4 rounded-xl text-left transition-all"
                      style={{
                        backgroundColor: pricingMode === opt.value ? 'var(--deep-charcoal)' : 'var(--light-beige)',
                        color: pricingMode === opt.value ? 'white' : 'var(--charcoal)',
                        border: pricingMode === opt.value ? '2px solid var(--deep-charcoal)' : '2px solid var(--border)',
                      }}
                    >
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs mt-0.5 opacity-75">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Driver option */}
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--charcoal)' }}>
                  3. Driver Option
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--warm-grey)' }}>
                  Self-drive option requires a valid driving licence.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: true, label: 'With Driver', sub: 'Professional chauffeur included' },
                    { value: false, label: 'Without Driver', sub: 'Self-drive (licence required)' },
                  ] as const).map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => setDriverRequired(opt.value)}
                      className="py-3 px-4 rounded-xl text-left transition-all"
                      style={{
                        backgroundColor: driverRequired === opt.value ? 'var(--deep-charcoal)' : 'var(--light-beige)',
                        color: driverRequired === opt.value ? 'white' : 'var(--charcoal)',
                        border: driverRequired === opt.value ? '2px solid var(--deep-charcoal)' : '2px solid var(--border)',
                      }}
                    >
                      <div className="font-semibold text-sm">{opt.label}</div>
                      <div className="text-xs mt-0.5 opacity-75">{opt.sub}</div>
                    </button>
                  ))}
                </div>

                {/* Self-drive liability notice */}
                {!driverRequired && (
                  <div
                    className="mt-4 flex gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B45309' }} />
                    <p className="text-xs leading-relaxed" style={{ color: '#92400E' }}>
                      <strong>Liability Notice:</strong> Without a driver — if anything happens to the vehicle, the consumer is fully liable for all repair and associated costs.
                    </p>
                  </div>
                )}
              </div>

              {/* Included features */}
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: 'var(--warm-sand)', border: '1px solid var(--border)' }}
              >
                <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--charcoal)' }}>
                  Included Features — {selectedVehicleData.label}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedVehicleData.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--charcoal)' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--gold-accent)' }} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right column: Booking form ── */}
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                {/* Form header */}
                <div className="mb-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <h3 className="font-display text-lg font-bold" style={{ color: 'var(--charcoal)' }}>
                    Book {selectedVehicleData.label}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--warm-grey)' }}>
                    {pricingMode === 'perKm'
                      ? `₹${selectedVehicleData.ratePerKm}/km`
                      : `₹${selectedVehicleData.ratePerDay.toLocaleString('en-IN')}/day`}
                    {' · '}
                    {selectedVehicleData.capacity}
                    {' · '}
                    {driverRequired ? 'With Driver' : 'Self Drive'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Contact fields */}
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: 'var(--warm-grey)' }}
                      >
                        {field.label} *
                      </label>
                      <input
                        type={field.type}
                        required
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: '1.5px solid var(--border)',
                          backgroundColor: 'var(--light-beige)',
                          color: 'var(--charcoal)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                      />
                    </div>
                  ))}

                  {/* Dynamic fare estimator input */}
                  <div>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: 'var(--warm-grey)' }}
                    >
                      {pricingMode === 'perKm' ? 'Estimated Distance (km)' : 'Number of Days'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={pricingMode === 'perKm' ? distanceInput : daysInput}
                      onChange={(e) =>
                        pricingMode === 'perKm'
                          ? setDistanceInput(e.target.value)
                          : setDaysInput(e.target.value)
                      }
                      placeholder={pricingMode === 'perKm' ? 'e.g. 150' : 'e.g. 3'}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: '1.5px solid var(--border)',
                        backgroundColor: 'var(--light-beige)',
                        color: 'var(--charcoal)',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                    />
                  </div>

                  {/* Live fare estimate */}
                  {estimatedFare !== null && (
                    <div
                      className="rounded-xl p-4 text-center"
                      style={{ backgroundColor: 'var(--warm-sand)', border: '1px solid var(--border)' }}
                    >
                      <div
                        className="text-xs font-semibold uppercase tracking-wide mb-1"
                        style={{ color: 'var(--warm-grey)' }}
                      >
                        Estimated Fare
                      </div>
                      <div className="font-display text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>
                        ₹{estimatedFare.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--warm-grey)' }}>
                        {pricingMode === 'perKm'
                          ? `${distanceInput} km × ₹${selectedVehicleData.ratePerKm}/km`
                          : `${daysInput} day${parseInt(daysInput) !== 1 ? 's' : ''} × ₹${selectedVehicleData.ratePerDay.toLocaleString('en-IN')}/day`}
                      </div>
                    </div>
                  )}

                  {/* T&C checkbox */}
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: tcError ? '#FEF2F2' : 'var(--light-beige)',
                      border: tcError ? '1.5px solid #EF4444' : '1.5px solid var(--border)',
                    }}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tcAccepted}
                        onChange={(e) => {
                          setTcAccepted(e.target.checked);
                          if (e.target.checked) setTcError(false);
                        }}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-charcoal cursor-pointer"
                        style={{ accentColor: 'var(--deep-charcoal)' }}
                      />
                      <span className="text-xs leading-relaxed" style={{ color: 'var(--charcoal)' }}>
                        I have read and agree to the{' '}
                        <Link
                          to="/terms"
                          className="font-semibold underline underline-offset-2 inline-flex items-center gap-0.5"
                          style={{ color: 'var(--charcoal)' }}
                          target="_blank"
                        >
                          Terms & Conditions
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        .{' '}
                        <span className="font-medium" style={{ color: '#92400E' }}>
                          Without driver — if anything happens to the vehicle, the consumer is fully liable for all repair and associated costs.
                        </span>
                      </span>
                    </label>
                    {tcError && (
                      <p className="text-xs mt-2 font-medium" style={{ color: '#EF4444' }}>
                        Please accept the Terms & Conditions to proceed.
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitCarRental.isPending}
                    className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                    style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
                  >
                    {submitCarRental.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Car className="w-4 h-4" />
                        Request Booking
                      </>
                    )}
                  </button>

                  {submitCarRental.isError && (
                    <p className="text-xs text-center" style={{ color: '#EF4444' }}>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
