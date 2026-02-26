import { Link } from '@tanstack/react-router';
import { ArrowRight, Car, MapPin, Shield, Clock, Star, Phone, Train, Plane, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HomeContactBar from '../components/home/HomeContactBar';
import { useGetPublicPackages } from '../hooks/useQueries';
import PackageCard from '../components/packages/PackageCard';

const features = [
  {
    icon: Car,
    title: 'Premium Fleet',
    description: 'Choose from our well-maintained Sedans and SUVs for a comfortable journey.',
  },
  {
    icon: Shield,
    title: 'Safe & Reliable',
    description: 'All vehicles are regularly serviced and insured for your peace of mind.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our team is available round the clock to assist you with any queries.',
  },
  {
    icon: Star,
    title: 'Expert Guides',
    description: 'Experienced local guides who know every corner of the destination.',
  },
];

const services = [
  {
    icon: Package,
    title: 'Custom Travel Packages',
    description: 'Personalized travel experiences tailored to your destination (India & Abroad), group size, and duration.',
    cta: 'Plan My Trip',
    to: '/custom-packages',
    highlight: true,
  },
  {
    icon: Car,
    title: 'Car Rentals',
    description: 'Sedan at ₹13/km or ₹2,500/day · SUV at ₹21/km or ₹5,000/day. With or without driver.',
    cta: 'Book a Car',
    to: '/car-rentals',
    highlight: false,
  },
  {
    icon: Train,
    title: 'Railway Ticket Bookings',
    description: 'Hassle-free railway ticket booking assistance for Sleeper, 3AC, 2AC, 1AC, and General classes.',
    cta: 'Book Train Tickets',
    to: '/railway-bookings',
    highlight: false,
  },
  {
    icon: Plane,
    title: 'Flight Ticket Bookings',
    description: 'Domestic and international flight booking assistance for Economy, Business, and First class.',
    cta: 'Book Flights',
    to: '/flight-bookings',
    highlight: false,
  },
];

const vehicles = [
  {
    type: 'Sedan',
    priceDay: '₹2,500/day',
    priceKm: '₹13/km',
    description: 'Comfortable and fuel-efficient for city and highway travel.',
    features: ['AC', 'GPS Navigation', 'Music System', 'Comfortable Seating'],
  },
  {
    type: 'SUV',
    priceDay: '₹5,000/day',
    priceKm: '₹21/km',
    description: 'Spacious and powerful for long-distance and off-road adventures.',
    features: ['AC', 'GPS Navigation', 'Music System', '7-Seater Capacity'],
  },
];

export default function HomePage() {
  const { data: packages, isLoading } = useGetPublicPackages();

  return (
    <div>
      {/* Contact Bar */}
      <HomeContactBar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-premium-travel.dim_1600x800.png')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Blackrays Car Rentals &<br />
            <span className="text-white/90">Tours and Travels</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience premium travel across India with our reliable car rental services, expertly curated tour packages, and seamless ticket bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold px-8">
              <Link to="/car-rentals">
                <Car className="w-5 h-5 mr-2" />
                Book a Car
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
              <Link to="/custom-packages">
                <Package className="w-5 h-5 mr-2" />
                Plan My Trip
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3">Our Services</h2>
            <p className="opacity-70 max-w-xl mx-auto">
              Everything you need for a seamless travel experience — from custom packages to ticket bookings.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-sm p-6 flex flex-col border transition-all hover:scale-[1.02] ${
                  service.highlight
                    ? 'bg-background text-foreground border-background/20'
                    : 'bg-background/10 text-background border-background/10 hover:bg-background/15'
                }`}
              >
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${
                  service.highlight ? 'bg-foreground' : 'bg-background/20'
                }`}>
                  <service.icon className={`w-6 h-6 ${service.highlight ? 'text-background' : 'text-background'}`} />
                </div>
                <h3 className={`font-display font-bold text-lg mb-2 ${service.highlight ? 'text-foreground' : 'text-background'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 flex-1 ${service.highlight ? 'text-muted-foreground' : 'opacity-70'}`}>
                  {service.description}
                </p>
                <Button
                  asChild
                  size="sm"
                  variant={service.highlight ? 'default' : 'outline'}
                  className={service.highlight ? '' : 'border-background/40 text-background hover:bg-background/10'}
                >
                  <Link to={service.to}>
                    {service.cta} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Pricing */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Our Fleet & Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Flexible pricing — pay per day or per kilometre. All vehicles available with or without driver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.type}
                className="border border-border rounded-sm p-6 hover:shadow-premium-md transition-shadow bg-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{vehicle.type}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{vehicle.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="font-display text-base font-bold text-foreground bg-secondary px-3 py-1 rounded-sm block mb-1">
                      {vehicle.priceDay}
                    </span>
                    <span className="font-display text-base font-bold text-foreground bg-secondary px-3 py-1 rounded-sm block">
                      {vehicle.priceKm}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-5" variant="outline">
                  <Link to="/car-rentals">Book {vehicle.type}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are committed to providing the best travel experience with safety, comfort, and reliability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-sm p-6 text-center hover:shadow-premium transition-shadow"
              >
                <div className="w-12 h-12 bg-foreground rounded-sm flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages Preview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">Featured Tour Packages</h2>
              <p className="text-muted-foreground">Handpicked destinations for unforgettable experiences.</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/packages">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-secondary/50 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border rounded-sm">
              <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Tour packages coming soon. Check back later!</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/custom-packages">Request a Custom Package</Link>
              </Button>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/packages">
                View All Packages <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="opacity-70 mb-8 text-lg">
            Contact us today to book your car rental, plan a custom tour, or get assistance with train and flight tickets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 font-semibold">
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Get in Touch
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/40 text-background hover:bg-background/10">
              <Link to="/custom-packages">Plan My Trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
