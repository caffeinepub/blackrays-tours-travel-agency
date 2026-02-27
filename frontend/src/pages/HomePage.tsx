import { Link } from "@tanstack/react-router";
import { Plane, Car, Train, Hotel, Package, ArrowRight, MapPin, Phone, Mail, Star, Shield, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeContactBar from "@/components/home/HomeContactBar";
import HeroSearchWidget from "@/components/home/HeroSearchWidget";

const services = [
  {
    icon: Car,
    title: "Car Rentals",
    description: "Premium sedans & SUVs with professional drivers",
    href: "/car-rentals",
    badge: "Most Popular",
  },
  {
    icon: Plane,
    title: "Flight Bookings",
    description: "Global flights at competitive fares",
    href: "/flights",
  },
  {
    icon: Hotel,
    title: "Hotel Bookings",
    description: "Curated stays worldwide",
    href: "/hotels",
  },
  {
    icon: Train,
    title: "Railway Bookings",
    description: "Seamless train reservations across India",
    href: "/railway",
  },
  {
    icon: Package,
    title: "Tour Packages",
    description: "Handcrafted itineraries for every traveller",
    href: "/packages",
  },
  {
    icon: MapPin,
    title: "Custom Packages",
    description: "Bespoke travel experiences, your way",
    href: "/custom-packages",
  },
];

const features = [
  { icon: Shield, title: "Trusted & Verified", desc: "Licensed operators, verified vehicles" },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance" },
  { icon: Star, title: "Premium Quality", desc: "Curated premium experiences" },
  { icon: Users, title: "10,000+ Clients", desc: "Trusted by thousands" },
];

const destinations = [
  { name: "Mumbai", tag: "City Break" },
  { name: "Goa", tag: "Beach" },
  { name: "Rajasthan", tag: "Heritage" },
  { name: "Kerala", tag: "Nature" },
  { name: "Himachal", tag: "Adventure" },
  { name: "Andaman", tag: "Island" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Contact Bar */}
      <HomeContactBar />

      {/* Hero Section */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-premium-jet-tarmac.dim_1920x1080.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          {/* Hero Text */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-xs font-medium tracking-widest uppercase">Premium Travel Experience</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4">
              Travel Premium.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, oklch(0.82 0.1 80), oklch(0.92 0.06 75))" }}>
                Arrive in Style.
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl font-light max-w-xl">
              Blackrays — your gateway to world-class travel across India and beyond.
            </p>
          </div>

          {/* Search Widget */}
          <div className="max-w-4xl">
            <HeroSearchWidget />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Everything You Need to Travel
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              One platform for all your travel needs — cars, flights, hotels, trains, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} to={service.href}>
                  <div className="home-card group p-6 cursor-pointer relative overflow-hidden">
                    {service.badge && (
                      <span className="absolute top-4 right-4 badge-popular text-[10px]">
                        {service.badge}
                      </span>
                    )}
                    <div className="w-11 h-11 rounded-xl bg-primary/5 border border-border flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-14 section-warm border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 border border-border flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-foreground">{f.title}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Car Rental Pricing */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Transparent Car Rental Pricing
            </h2>
            <p className="text-muted-foreground text-sm">No hidden charges. No surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Sedan — Most Popular */}
            <div className="sedan-card-highlight p-6 bg-card relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge-popular text-[10px]">Most Popular</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/5 border border-border flex items-center justify-center mb-4">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">Sedan</h3>
              <p className="text-muted-foreground text-xs mb-4">Swift Dzire, Honda Amaze & similar</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Per Kilometre</span>
                  <span className="font-bold text-foreground">₹13/km</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Per Day</span>
                  <span className="font-bold text-foreground">₹2,500/day</span>
                </div>
              </div>
              <Link to="/car-rentals">
                <Button className="w-full mt-5 btn-premium" size="sm">
                  Book Sedan
                </Button>
              </Link>
            </div>

            {/* SUV */}
            <div className="home-card p-6 bg-card">
              <div className="w-10 h-10 rounded-xl bg-primary/5 border border-border flex items-center justify-center mb-4">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">SUV</h3>
              <p className="text-muted-foreground text-xs mb-4">Innova, Ertiga & similar</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Per Kilometre</span>
                  <span className="font-bold text-foreground">₹21/km</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Per Day</span>
                  <span className="font-bold text-foreground">₹5,000/day</span>
                </div>
              </div>
              <Link to="/car-rentals">
                <Button variant="outline" className="w-full mt-5" size="sm">
                  Book SUV
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 section-warm border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Popular Destinations
              </h2>
              <p className="text-muted-foreground text-sm">Handpicked for the discerning traveller</p>
            </div>
            <Link to="/packages" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {destinations.map((dest) => (
              <Link key={dest.name} to="/packages">
                <div className="home-card group p-4 text-center cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/5 border border-border flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-display font-semibold text-sm text-foreground">{dest.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{dest.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Travel in Style?
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-md mx-auto">
            Contact our travel experts and let us craft your perfect journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                Get in Touch
              </Button>
            </Link>
            <Link to="/packages">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Browse Packages
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm">
            <a href="tel:9373624669" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="w-4 h-4" /> 9373624669
            </a>
            <a href="mailto:blackraystravelagency@gmail.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="w-4 h-4" /> blackraystravelagency@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
