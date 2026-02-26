import { useState } from 'react';
import { Plane, CheckCircle, Loader2, Globe, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSubmitFlightBooking } from '../hooks/useQueries';
import { toast } from 'sonner';

const cabinClasses = [
  { value: 'Economy', label: 'Economy' },
  { value: 'Business', label: 'Business' },
  { value: 'First', label: 'First Class' },
];

const tripTypes = [
  { value: 'one-way', label: 'One Way' },
  { value: 'round-trip', label: 'Round Trip' },
];

const features = [
  { icon: Globe, title: 'Domestic & International', desc: 'Flights to destinations across India and worldwide.' },
  { icon: Clock, title: 'Fast Assistance', desc: 'Quick booking support with best fare options.' },
  { icon: Shield, title: 'All Cabin Classes', desc: 'Economy, Business, and First Class bookings.' },
];

export default function FlightBookingsPage() {
  const [tripType, setTripType] = useState('one-way');
  const [cabinClass, setCabinClass] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    originCity: '',
    destinationCity: '',
    departureDate: '',
    returnDate: '',
    passengerCount: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitFlightBooking = useSubmitFlightBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.originCity || !form.destinationCity || !form.departureDate || !form.passengerCount || !cabinClass) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (tripType === 'round-trip' && !form.returnDate) {
      toast.error('Please enter a return date for round-trip bookings.');
      return;
    }
    const count = parseInt(form.passengerCount);
    if (isNaN(count) || count < 1) {
      toast.error('Please enter a valid number of passengers.');
      return;
    }
    try {
      await submitFlightBooking.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        originCity: form.originCity,
        destinationCity: form.destinationCity,
        departureDate: form.departureDate,
        returnDate: tripType === 'round-trip' && form.returnDate ? form.returnDate : null,
        tripType,
        passengerCount: BigInt(count),
        cabinClass,
      });
      setSubmitted(true);
      toast.success('Flight booking request submitted! We will contact you shortly.');
    } catch {
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-premium-travel.dim_1600x800.png')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/60 mb-4 border border-white/20 px-3 py-1 rounded-sm">
            Air Travel
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Flight Ticket Bookings
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Domestic and international flight booking assistance for Economy, Business, and First Class travel.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-background/15 rounded-sm flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs opacity-60 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Book Flight Tickets</h2>
            <p className="text-muted-foreground">
              Submit your booking request and our team will find the best options for you.
            </p>
          </div>

          <div className="border border-border rounded-sm p-8 bg-card">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Booking Request Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you, <strong>{form.name}</strong>! We will contact you at{' '}
                  <strong>{form.phone}</strong> with flight options from{' '}
                  <strong>{form.originCity}</strong> to <strong>{form.destinationCity}</strong>.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', originCity: '', destinationCity: '', departureDate: '', returnDate: '', passengerCount: '' });
                    setTripType('one-way');
                    setCabinClass('');
                  }}
                  variant="outline"
                >
                  Make Another Booking
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Trip Type */}
                <div className="space-y-2">
                  <Label>Trip Type *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {tripTypes.map((tt) => (
                      <button
                        key={tt.value}
                        type="button"
                        onClick={() => setTripType(tt.value)}
                        className={`py-2.5 px-4 rounded-sm border text-sm font-medium transition-all ${
                          tripType === tt.value
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-muted-foreground hover:border-foreground/40'
                        }`}
                      >
                        {tt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="originCity">From (City/Airport) *</Label>
                    <Input
                      id="originCity"
                      name="originCity"
                      value={form.originCity}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai (BOM)"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="destinationCity">To (City/Airport) *</Label>
                    <Input
                      id="destinationCity"
                      name="destinationCity"
                      value={form.destinationCity}
                      onChange={handleChange}
                      placeholder="e.g. Delhi (DEL)"
                      required
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="departureDate">Departure Date *</Label>
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      value={form.departureDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {tripType === 'round-trip' && (
                    <div className="space-y-1.5">
                      <Label htmlFor="returnDate">Return Date *</Label>
                      <Input
                        id="returnDate"
                        name="returnDate"
                        type="date"
                        value={form.returnDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Passengers & Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="passengerCount">Number of Passengers *</Label>
                    <Input
                      id="passengerCount"
                      name="passengerCount"
                      type="number"
                      min="1"
                      value={form.passengerCount}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Cabin Class *</Label>
                    <Select value={cabinClass} onValueChange={setCabinClass} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {cabinClasses.map((cls) => (
                          <SelectItem key={cls.value} value={cls.value}>
                            {cls.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contact Details</p>
                  <div className="space-y-4">
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
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitFlightBooking.isPending}
                >
                  {submitFlightBooking.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Plane className="w-4 h-4 mr-2" />
                      Submit Booking Request
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Our team will contact you within a few hours with the best available flight options.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
