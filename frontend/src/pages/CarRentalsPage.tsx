import { useState } from 'react';
import { Car, CheckCircle, Users, Fuel, Shield, AlertTriangle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useSubmitCarRental } from '../hooks/useQueries';
import { VehicleType } from '../backend';
import { toast } from 'sonner';

const SEDAN_RATE_PER_KM = 13;
const SUV_RATE_PER_KM = 21;

const vehicles = [
  {
    type: 'Sedan' as const,
    value: VehicleType.sedan,
    priceDay: '₹2,500/day',
    priceKm: '₹13/km',
    ratePerKm: SEDAN_RATE_PER_KM,
    description: 'Perfect for city travel and highway trips. Comfortable and fuel-efficient.',
    features: ['4 Passengers', 'AC', 'GPS Navigation', 'Music System', 'Fuel Efficient'],
  },
  {
    type: 'SUV' as const,
    value: VehicleType.suv,
    priceDay: '₹5,000/day',
    priceKm: '₹21/km',
    ratePerKm: SUV_RATE_PER_KM,
    description: 'Ideal for family trips and long-distance travel. Spacious and powerful.',
    features: ['7 Passengers', 'AC', 'GPS Navigation', 'Music System', 'Luggage Space'],
  },
];

export default function CarRentalsPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(VehicleType.sedan);
  const [driverRequired, setDriverRequired] = useState(true);
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitCarRental = useSubmitCarRental();

  const selectedVehicleInfo = vehicles.find((v) => v.value === selectedVehicle)!;
  const distanceNum = parseFloat(estimatedDistance);
  const estimatedFare =
    estimatedDistance && !isNaN(distanceNum) && distanceNum > 0
      ? Math.round(distanceNum * selectedVehicleInfo.ratePerKm)
      : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (!driverRequired && !termsAccepted) {
      toast.error('Please accept the Terms & Conditions for self-drive rental.');
      return;
    }
    try {
      await submitCarRental.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        vehicleType: selectedVehicle,
        driverRequired,
        estimatedDistance: estimatedDistance && !isNaN(distanceNum) ? BigInt(Math.round(distanceNum)) : null,
        estimatedFare: estimatedFare !== null ? BigInt(estimatedFare) : null,
      });
      setSubmitted(true);
      toast.success('Booking request submitted! We will contact you shortly.');
    } catch {
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-premium-travel.dim_1600x800.png')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Car Rentals</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Premium vehicles with flexible pricing — per day or per kilometre.
          </p>
        </div>
      </section>

      {/* Vehicle Selection */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Choose Your Vehicle</h2>
            <p className="text-muted-foreground">Select the vehicle that best suits your journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.type}
                onClick={() => setSelectedVehicle(vehicle.value)}
                className={`text-left border-2 rounded-sm p-6 transition-all ${
                  selectedVehicle === vehicle.value
                    ? 'border-foreground bg-foreground text-background shadow-premium-md'
                    : 'border-border bg-card hover:border-foreground/40 hover:shadow-premium'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-display text-xl font-bold ${selectedVehicle === vehicle.value ? 'text-background' : 'text-foreground'}`}>
                      {vehicle.type}
                    </h3>
                    <p className={`text-sm mt-1 ${selectedVehicle === vehicle.value ? 'text-background/70' : 'text-muted-foreground'}`}>
                      {vehicle.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-3 text-right space-y-1">
                    <span className={`font-display text-sm font-bold px-2 py-1 rounded-sm block ${
                      selectedVehicle === vehicle.value ? 'bg-background/20 text-background' : 'bg-secondary text-foreground'
                    }`}>
                      {vehicle.priceDay}
                    </span>
                    <span className={`font-display text-sm font-bold px-2 py-1 rounded-sm block ${
                      selectedVehicle === vehicle.value ? 'bg-background/20 text-background' : 'bg-secondary text-foreground'
                    }`}>
                      {vehicle.priceKm}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {vehicle.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${selectedVehicle === vehicle.value ? 'text-background/80' : 'text-muted-foreground'}`}>
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* Booking Form */}
          <div className="max-w-2xl mx-auto">
            <div className="border border-border rounded-sm p-8 bg-card">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-foreground mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Booking Request Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your booking request. Our team will contact you at{' '}
                    <strong>{form.phone}</strong> shortly to confirm your reservation.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', phone: '', email: '' });
                      setEstimatedDistance('');
                      setTermsAccepted(false);
                    }}
                    variant="outline"
                  >
                    Make Another Booking
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Book Your {selectedVehicleInfo?.type}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    {/* Estimated Distance */}
                    <div className="space-y-1.5">
                      <Label htmlFor="distance">Estimated Distance (km)</Label>
                      <Input
                        id="distance"
                        type="number"
                        min="0"
                        step="1"
                        value={estimatedDistance}
                        onChange={(e) => setEstimatedDistance(e.target.value)}
                        placeholder="e.g. 150"
                      />
                      {estimatedFare !== null && (
                        <div className="flex items-center gap-2 mt-2 p-3 bg-foreground text-background rounded-sm">
                          <Car className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-semibold">
                            Estimated Fare: ₹{estimatedFare.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs opacity-70 ml-auto">
                            ({distanceNum} km × ₹{selectedVehicleInfo.ratePerKm}/km)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Driver Required */}
                    <div className="space-y-2">
                      <Label>Driver Required?</Label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => { setDriverRequired(true); setTermsAccepted(false); }}
                          className={`flex-1 py-2.5 px-4 rounded-sm border text-sm font-medium transition-all ${
                            driverRequired
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border bg-background text-muted-foreground hover:border-foreground/40'
                          }`}
                        >
                          Yes, with Driver
                        </button>
                        <button
                          type="button"
                          onClick={() => setDriverRequired(false)}
                          className={`flex-1 py-2.5 px-4 rounded-sm border text-sm font-medium transition-all ${
                            !driverRequired
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border bg-background text-muted-foreground hover:border-foreground/40'
                          }`}
                        >
                          No, Self Drive
                        </button>
                      </div>
                    </div>

                    {/* Self-drive warning */}
                    {!driverRequired && (
                      <div className="flex items-start gap-3 p-3 bg-secondary/40 border border-border rounded-sm">
                        <AlertTriangle className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">Self-Drive Notice:</strong> Without a driver, the renter is fully responsible for any damage, repair costs, or losses incurred to the vehicle during the rental period. Please read our{' '}
                          <Link to="/terms" className="underline text-foreground hover:opacity-70">
                            Terms & Conditions
                          </Link>{' '}
                          before proceeding.
                        </p>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="bg-secondary/30 rounded-sm p-4 border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Booking Summary</h4>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Vehicle</span>
                          <span className="font-medium text-foreground">{selectedVehicleInfo?.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daily Rate</span>
                          <span className="font-medium text-foreground">{selectedVehicleInfo?.priceDay}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Per KM Rate</span>
                          <span className="font-medium text-foreground">{selectedVehicleInfo?.priceKm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Driver</span>
                          <span className="font-medium text-foreground">{driverRequired ? 'Included' : 'Self Drive'}</span>
                        </div>
                        {estimatedFare !== null && (
                          <div className="flex justify-between border-t border-border pt-1.5 mt-1.5">
                            <span>Estimated Fare</span>
                            <span className="font-bold text-foreground">₹{estimatedFare.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* T&C Checkbox for self-drive */}
                    {!driverRequired && (
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={termsAccepted}
                          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                          className="mt-0.5"
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                          I have read and agree to the{' '}
                          <Link to="/terms" className="underline text-foreground hover:opacity-70" target="_blank">
                            Terms & Conditions
                          </Link>
                          , including the self-drive liability clause.
                        </label>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitCarRental.isPending || (!driverRequired && !termsAccepted)}
                    >
                      {submitCarRental.isPending ? 'Submitting...' : 'Submit Booking Request'}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Our team will call you to confirm dates, pickup location, and finalize the booking.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">
            Why Rent With Blackrays?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, title: 'Fully Insured', desc: 'All vehicles are comprehensively insured for your safety.' },
              { icon: Users, title: 'Expert Drivers', desc: 'Professional, licensed drivers with local route knowledge.' },
              { icon: Fuel, title: 'Well Maintained', desc: 'Regularly serviced vehicles for a smooth, reliable journey.' },
            ].map((item) => (
              <div key={item.title} className="text-center bg-card border border-border rounded-sm p-6">
                <div className="w-12 h-12 bg-foreground rounded-sm flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
