import { useState } from 'react';
import { CheckCircle, Globe, MapPin, Users, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSubmitCustomPackage } from '../hooks/useQueries';
import { toast } from 'sonner';

const destinationTypes = [
  { value: 'India', label: 'India', icon: MapPin, desc: 'Domestic travel within India' },
  { value: 'Abroad', label: 'Abroad', icon: Globe, desc: 'International destinations' },
];

const highlights = [
  { icon: Users, title: 'Group Friendly', desc: 'Packages for solo travellers, couples, families, and large groups.' },
  { icon: MapPin, title: 'India & Abroad', desc: 'Curated experiences across India and international destinations.' },
  { icon: Calendar, title: 'Flexible Duration', desc: 'Short getaways to extended holidays — you choose the duration.' },
  { icon: Globe, title: 'Fully Customized', desc: 'Every itinerary is built around your preferences and budget.' },
];

export default function CustomPackagesPage() {
  const [destinationType, setDestinationType] = useState('India');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    numberOfTravelers: '',
    durationDays: '',
    preferredDates: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitCustomPackage = useSubmitCustomPackage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.destination || !form.numberOfTravelers || !form.durationDays) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const travelers = parseInt(form.numberOfTravelers);
    const days = parseInt(form.durationDays);
    if (isNaN(travelers) || travelers < 1) {
      toast.error('Please enter a valid number of travellers.');
      return;
    }
    if (isNaN(days) || days < 1) {
      toast.error('Please enter a valid duration in days.');
      return;
    }
    try {
      await submitCustomPackage.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        destinationType,
        destination: form.destination,
        numberOfTravelers: BigInt(travelers),
        durationDays: BigInt(days),
        preferredDates: form.preferredDates.trim() || null,
      });
      setSubmitted(true);
      toast.success('Your custom package request has been submitted! We will contact you shortly.');
    } catch {
      toast.error('Failed to submit request. Please try again.');
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
            Personalized Travel
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Custom Travel Packages
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Tell us where you want to go, how many are travelling, and for how long — we'll craft the perfect itinerary for you.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-background/15 rounded-sm flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm mb-1">{h.title}</h3>
                  <p className="text-xs opacity-60 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Plan My Trip</h2>
            <p className="text-muted-foreground">
              Fill in the details below and our travel experts will get back to you with a personalized itinerary and quote.
            </p>
          </div>

          <div className="border border-border rounded-sm p-8 bg-card">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Request Submitted!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you, <strong>{form.name}</strong>! Our travel experts will contact you at{' '}
                  <strong>{form.phone}</strong> with a personalized itinerary for your{' '}
                  <strong>{destinationType}</strong> trip to <strong>{form.destination}</strong>.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', destination: '', numberOfTravelers: '', durationDays: '', preferredDates: '' });
                    setDestinationType('India');
                  }}
                  variant="outline"
                >
                  Plan Another Trip
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Destination Type */}
                <div className="space-y-2">
                  <Label>Destination Type *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {destinationTypes.map((dt) => (
                      <button
                        key={dt.value}
                        type="button"
                        onClick={() => setDestinationType(dt.value)}
                        className={`flex items-center gap-3 p-4 rounded-sm border-2 text-left transition-all ${
                          destinationType === dt.value
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-foreground hover:border-foreground/40'
                        }`}
                      >
                        <dt.icon className={`w-5 h-5 flex-shrink-0 ${destinationType === dt.value ? 'text-background' : 'text-muted-foreground'}`} />
                        <div>
                          <p className={`font-semibold text-sm ${destinationType === dt.value ? 'text-background' : 'text-foreground'}`}>
                            {dt.label}
                          </p>
                          <p className={`text-xs ${destinationType === dt.value ? 'text-background/70' : 'text-muted-foreground'}`}>
                            {dt.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-1.5">
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder={destinationType === 'India' ? 'e.g. Goa, Kerala, Rajasthan' : 'e.g. Dubai, Thailand, Europe'}
                    required
                  />
                </div>

                {/* Travelers & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="numberOfTravelers">Number of Travellers *</Label>
                    <Input
                      id="numberOfTravelers"
                      name="numberOfTravelers"
                      type="number"
                      min="1"
                      value={form.numberOfTravelers}
                      onChange={handleChange}
                      placeholder="e.g. 4"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="durationDays">Duration (Days) *</Label>
                    <Input
                      id="durationDays"
                      name="durationDays"
                      type="number"
                      min="1"
                      value={form.durationDays}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                      required
                    />
                  </div>
                </div>

                {/* Preferred Dates */}
                <div className="space-y-1.5">
                  <Label htmlFor="preferredDates">Preferred Travel Dates (Optional)</Label>
                  <Input
                    id="preferredDates"
                    name="preferredDates"
                    value={form.preferredDates}
                    onChange={handleChange}
                    placeholder="e.g. March 15–22, 2026 or flexible"
                  />
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your Contact Details</p>
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
                  disabled={submitCustomPackage.isPending}
                >
                  {submitCustomPackage.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Package Request'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Our travel experts will contact you within 24 hours with a personalized itinerary and quote.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
