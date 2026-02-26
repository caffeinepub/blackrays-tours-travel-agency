import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { useSubmitTourInquiry } from '../hooks/useQueries';

export default function ContactInquiryPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitTourInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitInquiry.mutateAsync({
        name: form.name,
        phoneNumber: form.phone,
        email: form.email,
        message: form.message,
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', message: '' });
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
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, var(--gold-accent) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Get In Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg" style={{ color: 'rgba(250,247,242,0.75)' }}>
            Have a question or ready to plan your trip? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                Reach Out
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
                Our team is available to assist you with bookings, inquiries, and custom travel planning.
              </p>
            </div>

            {/* Contact cards */}
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                label: 'Phone',
                value: '+91 93736 24669',
                href: 'tel:9373624669',
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: 'Email',
                value: 'blackraystravelagency@gmail.com',
                href: 'mailto:blackraystravelagency@gmail.com',
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: 'Office',
                value: 'Nagpur, Maharashtra, India',
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--warm-sand)', color: 'var(--charcoal)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--warm-grey)' }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium hover:underline"
                      style={{ color: 'var(--charcoal)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* MD Card */}
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: 'var(--warm-sand)', border: '1px solid var(--border)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--gold-accent)' }}>
                MD & Chairman
              </div>
              <div className="font-display text-lg font-bold" style={{ color: 'var(--charcoal)' }}>Om H Patil</div>
              <p className="text-xs mt-1" style={{ color: 'var(--warm-grey)' }}>
                Blackrays Car Rentals & Tours and Travels
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: 'white', border: '1px solid var(--border)', boxShadow: '0 4px 20px -4px rgba(31,41,55,0.08)' }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--warm-sand)' }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: 'var(--charcoal)' }} />
                  </div>
                  <h3 className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--warm-grey)' }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-xl font-bold mb-6" style={{ color: 'var(--charcoal)' }}>
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--warm-grey)' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your travel plans or inquiry..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ border: '1.5px solid var(--border)', backgroundColor: 'var(--light-beige)', color: 'var(--charcoal)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--charcoal)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitInquiry.isPending}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                    style={{ backgroundColor: 'var(--deep-charcoal)', color: 'white' }}
                  >
                    {submitInquiry.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
