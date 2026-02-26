import { useState } from 'react';
import { Car, Users, Fuel, CheckCircle, Loader2, Phone } from 'lucide-react';
import { useSubmitCarRental } from '../hooks/useQueries';
import { CarType } from '../backend';

const SEDAN_RATE_PER_KM = 13;
const SUV_RATE_PER_KM = 21;

const vehicles = [
  {
    type: CarType.sedan,
    label: 'Sedan',
    icon: '🚗',
    description: 'Comfortable and fuel-efficient for city and highway travel.',
    capacity: '4 Passengers',
    pricePerKm: SEDAN_RATE_PER_KM,
    features: ['Air Conditioned', 'Professional Driver', 'GPS Navigation', 'Music System'],
  },
  {
    type: CarType.suv,
    label: 'SUV',
    icon: '🚙',
    description: 'Spacious and powerful for family trips and rough terrain.',
    capacity: '7 Passengers',
    pricePerKm: SUV_RATE_PER_KM,
    features: ['Air Conditioned', 'Professional Driver', 'GPS Navigation', 'Extra Luggage Space', 'Music System'],
  },
];

export default function CarRentalsPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<CarType>(CarType.sedan);
  const [driverRequired, setDriverRequired] = useState(true);
  const [distance, setDistance] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const submitCarRental = useSubmitCarRental();

  const selectedVehicleData = vehicles.find((v) => v.type === selectedVehicle)!;
  const estimatedFare = distance ? Math.round(parseInt(distance) * selectedVehicleData.pricePerKm) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitCarRental.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        vehicleType: selectedVehicle,
        driverRequired,
        estimatedDistance: distance ? BigInt(parseInt(distance)) : null,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* Hero */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: 'var(--deep-charcoal)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, var(--gold-accent) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Premium Fleet
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Car Rentals
          </h1>
          <p className="text-lg" style={{ color: 'rgba(250,247,242,0.75)' }}>
            Premium vehicles with professional drivers for every journey.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#E8D5A3' }}>
              <span>🚗</span> Sedan — ₹{SEDAN_RATE_PER_KM}/km
            </div>
            <div className="w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#E8D5A3' }}>
              <span>🚙</span> SUV — ₹{SUV_RATE_PER_KM}/km
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {submitted ? (
            <div
              className="rounded-2xl p-12 text-center"
              style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--warm-sand)' }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: 'var(--charcoal)' }} />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                Booking Request Sent!
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--warm-grey)' }}>
                We'll confirm your {selectedVehicleData.label} rental within 2 hours.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm mb-6" style={{ color: 'var(--warm-grey)' }}>
                <Phone className="w-4 h-4" />
                <span>Or call us directly: <a href="tel:9373624669" className="font-semibold hover:underline" style={{ color: 'var(--charcoal)' }}>+91 93736 24669</a></span>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Vehicle Selection */}
              <div className="lg:col-span-3 space-y-6">
                <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--charcoal)' }}>
                  Choose Your Vehicle
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicles.map((vehicle) => (
                    <button
                      key={vehicle.type}
                      onClick={() => setSelectedVehicle(vehicle.type)}
                      className="text-left rounded-2xl p-5 transition-all duration-200"
                      style={{
                        backgroundColor: selectedVehicle === vehicle.type ? 'var(--deep-charcoal)' : 'white',
                        color: selectedVehicle === vehicle.type ? 'var(--light-beige)' : 'var(--charcoal)',
                        border: selectedVehicle === vehicle.type ? '2px solid var(--deep-charcoal)' : '2px solid var(--border)',
                        boxShadow: selectedVehicle === vehicle.type ? '0 8px 24px -8px rgba(31,41,55,0.30)' : 'none',
                      }}
                    >
                      <div className="text-3xl mb-3">{vehicle.icon}</div>
                      <div className="font-display text-lg font-bold mb-1">{vehicle.label}</div>
                      <div className="text-sm opacity-75 mb-3">{vehicle.description}</div>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {vehicle.capacity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="w-3.5 h-3.5" />
                          ₹{vehicle.pricePerKm}/km
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Driver Option */}
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
                >
                  <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--charcoal)' }}>
                    Driver Option
                  </h3>
                  <div className="flex gap-3">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setDriverRequired(val)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          backgroundColor: driverRequired === val ? 'var(--deep-charcoal)' : 'var(--light-beige)',
                          color: driverRequired === val ? 'white' : 'var(--charcoal)',
                          border: driverRequired === val ? '2px solid var(--deep-charcoal)' : '2px solid var(--border)',
                        }}
                      >
                        {val ? 'With Driver' : 'Self Drive'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: 'var(--warm-sand)', border: '1px solid var(--border)' }}
                >
                  <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--charcoal)' }}>
                    Included Features
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

              {/* Booking Form */}
              <div className="lg:col-span-2">
                <div
                  className="rounded-2xl p-6 sticky top-24"
                  style={{ backgroundColor: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px -4px rgba(31,41,55,0.08)' }}
                >
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--charcoal)' }}>
                    Book {selectedVehicleData.label}
                  </h3>
                  <p className="text-xs mb-5" style={{ color: 'var(--warm-grey)' }}>
                    ₹{selectedVehicleData.pricePerKm}/km · {selectedVehicleData.capacity}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
                      { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                      { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                          {field.label} *
                        </label>
                        <input
                          type={field.type}
                          required
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                          style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                          onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                          onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                        Estimated Distance (km)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="Optional"
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                      />
                    </div>

                    {estimatedFare && (
                      <div
                        className="rounded-xl p-3 text-center"
                        style={{ backgroundColor: 'var(--warm-sand)' }}
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--warm-grey)' }}>
                          Estimated Fare
                        </div>
                        <div className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
                          ₹{estimatedFare.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--warm-grey)' }}>
                          {distance} km × ₹{selectedVehicleData.pricePerKm}/km
                        </div>
                      </div>
                    )}

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
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
