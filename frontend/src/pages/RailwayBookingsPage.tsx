import { useState } from 'react';
import { Train, CheckCircle, Loader2, Clock, Shield, Users } from 'lucide-react';
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
import { useSubmitRailwayBooking } from '../hooks/useQueries';
import { toast } from 'sonner';

const railClasses = [
  { value: 'Sleeper', label: 'Sleeper (SL)' },
  { value: '3AC', label: '3 Tier AC (3A)' },
  { value: '2AC', label: '2 Tier AC (2A)' },
  { value: '1AC', label: 'First Class AC (1A)' },
  { value: 'General', label: 'General (GN)' },
];

const features = [
  { icon: Clock, title: 'Quick Assistance', desc: 'Fast booking assistance for all major trains across India.' },
  { icon: Shield, title: 'Reliable Service', desc: 'Trusted booking support with confirmation follow-up.' },
  { icon: Users, title: 'All Classes', desc: 'Sleeper, 3AC, 2AC, 1AC, and General class bookings.' },
];

export default function RailwayBookingsPage() {
  const [railClass, setRailClass] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    originStation: '',
    destinationStation: '',
    travelDate: '',
    passengerCount: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitRailwayBooking = useSubmitRailwayBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.originStation || !form.destinationStation || !form.travelDate || !form.passengerCount || !railClass) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const count = parseInt(form.passengerCount);
    if (isNaN(count) || count < 1) {
      toast.error('Please enter a valid number of passengers.');
      return;
    }
    try {
      await submitRailwayBooking.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        originStation: form.originStation,
        destinationStation: form.destinationStation,
        travelDate: form.travelDate,
        passengerCount: BigInt(count),
        railClass,
      });
      setSubmitted(true);
      toast.success('Railway booking request submitted! We will contact you shortly.');
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
          style={{ backgroundImage: "url('/assets/generated/blackrays-destinations-set.dim_1200x400.png')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white/60 mb-4 border border-white/20 px-3 py-1 rounded-sm">
            Train Travel
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Railway Ticket Bookings
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Hassle-free railway ticket booking assistance for all classes across India's extensive rail network.
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
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Book Railway Tickets</h2>
            <p className="text-muted-foreground">
              Submit your booking request and our team will assist you with the reservation.
            </p>
          </div>

          <div className="border border-border rounded-sm p-8 bg-card">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Booking Request Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you, <strong>{form.name}</strong>! We will contact you at{' '}
                  <strong>{form.phone}</strong> to confirm your railway booking from{' '}
                  <strong>{form.originStation}</strong> to <strong>{form.destinationStation}</strong>.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', originStation: '', destinationStation: '', travelDate: '', passengerCount: '' });
                    setRailClass('');
                  }}
                  variant="outline"
                >
                  Make Another Booking
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Journey Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="originStation">Origin Station *</Label>
                    <Input
                      id="originStation"
                      name="originStation"
                      value={form.originStation}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai CST"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="destinationStation">Destination Station *</Label>
                    <Input
                      id="destinationStation"
                      name="destinationStation"
                      value={form.destinationStation}
                      onChange={handleChange}
                      placeholder="e.g. New Delhi"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="travelDate">Travel Date *</Label>
                    <Input
                      id="travelDate"
                      name="travelDate"
                      type="date"
                      value={form.travelDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                </div>

                <div className="space-y-1.5">
                  <Label>Travel Class *</Label>
                  <Select value={railClass} onValueChange={setRailClass} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {railClasses.map((cls) => (
                        <SelectItem key={cls.value} value={cls.value}>
                          {cls.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  disabled={submitRailwayBooking.isPending}
                >
                  {submitRailwayBooking.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Train className="w-4 h-4 mr-2" />
                      Submit Booking Request
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Our team will contact you within a few hours to confirm availability and complete the booking.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
