import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitTourInquiry } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function ContactInquiryPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const submitInquiry = useSubmitTourInquiry();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    try {
      await submitInquiry.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        message: form.message,
      });
      toast.success('Inquiry submitted! We will contact you shortly.');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-foreground text-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Contact Us</h1>
          <p className="opacity-75 text-lg max-w-xl mx-auto">
            Have a question or ready to book? Reach out to us and we'll get back to you promptly.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone / WhatsApp</p>
                      <a href="tel:9373624669" className="text-muted-foreground hover:text-foreground transition-colors">
                        9373624669
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a
                        href="mailto:blackraystravelagency@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors break-all"
                      >
                        blackraystravelagency@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Leadership</p>
                      <p className="text-muted-foreground">MD & Chairman: Om H Patil</p>
                      <p className="text-muted-foreground text-sm">Blackrays Car Rentals & Tours and Travels</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Business Hours</p>
                      <p className="text-muted-foreground">Mon – Sat: 9:00 AM – 7:00 PM</p>
                      <p className="text-muted-foreground">Sunday: 10:00 AM – 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="border border-border rounded-sm p-8 bg-card">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send an Inquiry</h2>
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
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans, preferred dates, number of people, etc."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitInquiry.isPending}
                  >
                    {submitInquiry.isPending ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
