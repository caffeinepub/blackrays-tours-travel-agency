import { Link } from '@tanstack/react-router';
import { Phone, Star, Shield, Clock, Users, Plane, Train, Car, Package, Hotel, ChevronRight, ArrowRight } from 'lucide-react';
import HeroSearchWidget from '../components/home/HeroSearchWidget';
import HomeContactBar from '../components/home/HomeContactBar';

const destinations = [
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', tag: 'Beach Paradise' },
  { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop', tag: 'Royal Heritage' },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop', tag: 'God\'s Own Country' },
  { name: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop', tag: 'Mountain Escape' },
  { name: 'Andaman', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', tag: 'Island Bliss' },
  { name: 'Ladakh', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', tag: 'High Altitude' },
];

const services = [
  {
    icon: <Package className="w-7 h-7" />,
    title: 'Tour Packages',
    description: 'Curated travel experiences across India\'s most breathtaking destinations.',
    link: '/packages',
    color: 'bg-deepCharcoal text-lightBeige',
  },
  {
    icon: <Car className="w-7 h-7" />,
    title: 'Car Rentals',
    description: 'Premium vehicles with professional drivers. Sedan ₹13/km · SUV ₹21/km.',
    link: '/car-rentals',
    color: 'bg-charcoal text-lightBeige',
  },
  {
    icon: <Plane className="w-7 h-7" />,
    title: 'Flight Bookings',
    description: 'Best fares on domestic and international flights, booked with ease.',
    link: '/flights',
    color: 'bg-warmBrown text-lightBeige',
  },
  {
    icon: <Train className="w-7 h-7" />,
    title: 'Railway Bookings',
    description: 'Hassle-free train ticket reservations across all classes and routes.',
    link: '/railway',
    color: 'bg-stone-600 text-lightBeige',
  },
  {
    icon: <Hotel className="w-7 h-7" />,
    title: 'Hotel & Hospitality',
    description: 'Find and book premium hotels across India and internationally.',
    link: '/hotels',
    color: 'bg-stone-800 text-lightBeige',
  },
];

const features = [
  { icon: <Shield className="w-6 h-6" />, title: 'Trusted & Secure', desc: 'Your bookings are safe with our verified partners and secure payment systems.' },
  { icon: <Clock className="w-6 h-6" />, title: '24/7 Support', desc: 'Round-the-clock assistance for all your travel needs and emergencies.' },
  { icon: <Star className="w-6 h-6" />, title: 'Premium Experience', desc: 'Handpicked services ensuring the highest quality travel experiences.' },
  { icon: <Users className="w-6 h-6" />, title: 'Expert Guidance', desc: 'Seasoned travel experts to help plan your perfect itinerary.' },
];

const carPricing = [
  { type: 'Sedan', icon: '🚗', price: '₹13/km', features: ['AC Comfort', 'Up to 4 Passengers', 'Professional Driver'], popular: false },
  { type: 'SUV', icon: '🚙', price: '₹21/km', features: ['Spacious Cabin', 'Up to 7 Passengers', 'Luggage Space', 'Professional Driver'], popular: true },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-beige)' }}>
      {/* Hero Section */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-flight-premium.dim_1920x1080.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient overlay for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(15,20,30,0.72) 0%, rgba(31,41,55,0.55) 45%, rgba(20,28,40,0.40) 100%)',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-16 pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium"
            style={{ backgroundColor: 'rgba(184,151,90,0.25)', color: '#E8D5A3', border: '1px solid rgba(184,151,90,0.4)' }}>
            <Star className="w-3.5 h-3.5 fill-current" />
            India's Premium Travel Partner
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            Discover the World
            <span className="block" style={{ color: '#E8D5A3' }}>in Luxury & Comfort</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/85 max-w-2xl mb-10 leading-relaxed"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            From mountain peaks to coastal shores — Blackrays crafts unforgettable journeys
            with premium cars, curated packages, flights, rail & hotel bookings.
          </p>

          {/* Search Widget */}
          <div className="w-full max-w-4xl">
            <HeroSearchWidget />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60">
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Contact Bar */}
      <HomeContactBar />

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-beige)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
              What We Offer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--charcoal)' }}>
              Complete Travel Solutions
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--warm-grey)' }}>
              Everything you need for a seamless travel experience, all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 4px 20px -4px rgba(31,41,55,0.12)' }}
              >
                <div className={`${service.color} p-6 h-full flex flex-col`}>
                  <div className="mb-4 opacity-90">{service.icon}</div>
                  <h3 className="font-display text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed flex-1">{service.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-90 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Car Rental Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--warm-sand)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
              Car Rentals
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--charcoal)' }}>
              Transparent Pricing
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--warm-grey)' }}>
              No hidden charges. Premium vehicles with professional drivers at honest rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {carPricing.map((car) => (
              <div
                key={car.type}
                className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: car.popular ? 'var(--deep-charcoal)' : 'white',
                  color: car.popular ? 'var(--light-beige)' : 'var(--charcoal)',
                  boxShadow: car.popular ? '0 8px 32px -8px rgba(31,41,55,0.30)' : '0 4px 20px -4px rgba(31,41,55,0.10)',
                  border: car.popular ? 'none' : '1px solid var(--border)',
                }}
              >
                {car.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide"
                    style={{ backgroundColor: 'var(--gold-accent)', color: 'white' }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="text-4xl mb-4">{car.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-1">{car.type}</h3>
                <div className="text-3xl font-bold mb-1" style={{ color: car.popular ? '#E8D5A3' : 'var(--gold-accent)' }}>
                  {car.price}
                </div>
                <p className="text-sm mb-6 opacity-70">Per kilometre rate</p>
                <ul className="space-y-2 mb-8">
                  {car.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: car.popular ? '#E8D5A3' : 'var(--gold-accent)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/car-rentals"
                  className="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    backgroundColor: car.popular ? 'var(--gold-accent)' : 'var(--deep-charcoal)',
                    color: 'white',
                  }}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-beige)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
              Why Blackrays
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--charcoal)' }}>
              Travel with Confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px -2px rgba(31,41,55,0.08)',
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: 'var(--warm-sand)', color: 'var(--charcoal)' }}>
                  {f.icon}
                </div>
                <h3 className="font-display text-base font-bold mb-2" style={{ color: 'var(--charcoal)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-grey)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--warm-sand)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--gold-accent)' }}>
                Destinations
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--charcoal)' }}>
                Popular Getaways
              </h2>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: 'var(--charcoal)' }}
            >
              View All Packages <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to="/packages"
                className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 4px 20px -4px rgba(31,41,55,0.12)' }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-1"
                      style={{ backgroundColor: 'rgba(184,151,90,0.85)', color: 'white' }}>
                      {dest.tag}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{dest.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--deep-charcoal)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--gold-accent)' }}>
            Ready to Travel?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Plan Your Dream Journey Today
          </h2>
          <p className="text-base mb-10" style={{ color: 'rgba(250,247,242,0.75)' }}>
            Let our travel experts craft the perfect itinerary for you. Get in touch and we'll handle everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--gold-accent)', color: 'white' }}
            >
              <Phone className="w-4 h-4" />
              Contact Us Now
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Browse Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
