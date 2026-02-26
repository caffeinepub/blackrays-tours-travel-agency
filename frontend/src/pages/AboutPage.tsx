import { Shield, Star, Users, Award, Phone, Mail } from 'lucide-react';

const values = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Trust & Integrity',
    description: 'We operate with complete transparency and honesty in every interaction with our clients.',
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Excellence',
    description: 'We strive for the highest standards in every service we provide, from booking to journey completion.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Customer First',
    description: 'Your satisfaction and comfort are our top priorities. We go above and beyond to exceed expectations.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Premium Quality',
    description: 'Only the best vehicles, routes, and experiences make it into our curated travel offerings.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* Hero */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: 'var(--deep-charcoal)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, var(--gold-accent) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Our Story
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            About Blackrays
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(250,247,242,0.75)' }}>
            A trusted name in premium travel services across India — from car rentals to curated tour packages,
            flight bookings to railway reservations.
          </p>
        </div>
      </section>

      {/* MD & Chairman */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
                Leadership
              </p>
              <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                Om H Patil
              </h2>
              <p className="text-base font-medium mb-6" style={{ color: 'var(--warm-grey)' }}>
                MD & Chairman, Blackrays Car Rentals & Tours and Travels
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--charcoal)' }}>
                With years of experience in the travel industry, Om H Patil founded Blackrays with a vision to
                provide premium, reliable, and affordable travel services to every Indian traveler.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
                Under his leadership, Blackrays has grown into a comprehensive travel agency offering car rentals,
                tour packages, flight bookings, and railway reservations — all with a commitment to excellence.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: 'var(--warm-sand)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--deep-charcoal)' }}
                >
                  <span className="font-display text-2xl font-bold text-white">OP</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--charcoal)' }}>Om H Patil</h3>
                <p className="text-sm font-medium mb-4" style={{ color: 'var(--warm-grey)' }}>MD & Chairman</p>
                <div className="space-y-2">
                  <a
                    href="tel:9373624669"
                    className="flex items-center justify-center gap-2 text-sm transition-colors hover:underline"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    <Phone className="w-4 h-4" style={{ color: 'var(--gold-accent)' }} />
                    +91 93736 24669
                  </a>
                  <a
                    href="mailto:blackraystravelagency@gmail.com"
                    className="flex items-center justify-center gap-2 text-sm transition-colors hover:underline"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    <Mail className="w-4 h-4" style={{ color: 'var(--gold-accent)' }} />
                    blackraystravelagency@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-beige)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
            Our Mission
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--charcoal)' }}>
            Making Travel Accessible & Premium
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
            At Blackrays, we believe that every journey should be comfortable, memorable, and stress-free.
            Our mission is to provide comprehensive travel solutions that combine premium quality with
            transparent pricing — making world-class travel accessible to everyone.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--warm-sand)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
              What Drives Us
            </p>
            <h2 className="font-display text-3xl font-bold" style={{ color: 'var(--charcoal)' }}>
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px -2px rgba(31,41,55,0.08)',
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: 'var(--warm-sand)', color: 'var(--charcoal)' }}
                >
                  {value.icon}
                </div>
                <h3 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--charcoal)' }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
              Our Journey
            </p>
            <h2 className="font-display text-3xl font-bold" style={{ color: 'var(--charcoal)' }}>
              The Blackrays Story
            </h2>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: 'var(--light-beige)', border: '1px solid var(--border)' }}
          >
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--charcoal)' }}>
              Blackrays Car Rentals & Tours and Travels was founded with a simple yet powerful vision:
              to make premium travel accessible to every Indian. Starting from Nagpur, Maharashtra,
              we have grown to serve travelers across the country.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--warm-grey)' }}>
              Our journey began with car rentals — providing clean, comfortable, and reliable vehicles
              with professional drivers. As our reputation grew, we expanded into tour packages,
              flight bookings, and railway reservations.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--warm-grey)' }}>
              Today, Blackrays is a one-stop travel solution trusted by thousands of travelers.
              We continue to grow, innovate, and improve — always keeping our customers' comfort
              and satisfaction at the heart of everything we do.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
