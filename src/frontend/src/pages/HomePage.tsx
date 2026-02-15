import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, MapPin, Users, Award, Car } from 'lucide-react';
import HomeContactBar from '../components/home/HomeContactBar';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/generated/blackrays-hero.dim_1920x800.png"
          alt="Travel destinations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 container text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Premium Car Rentals & Travel
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            Experience luxury and comfort with Blackrays. Premium cars, customized plans, and unforgettable journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/car-rentals">
              <Button size="lg" className="text-lg px-8 shadow-premium">
                Book a Car
              </Button>
            </Link>
            <Link to="/packages">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                Explore Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <HomeContactBar />

      {/* Car Rental Quick Info */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Premium Car Rentals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our fleet of premium vehicles with flexible rental plans and professional drivers available.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Car className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Sedan</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">
                  ₹2,500<span className="text-sm font-normal text-muted-foreground">/day</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comfortable and efficient sedans perfect for city travel and short trips.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Car className="h-12 w-12 text-primary mb-4" />
                <CardTitle>SUV</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">
                  ₹5,000<span className="text-sm font-normal text-muted-foreground">/day</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Spacious SUVs ideal for family trips and long-distance travel with extra comfort.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link to="/car-rentals">
              <Button size="lg" className="shadow-premium">
                Book Your Car Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Blackrays?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide exceptional travel experiences with personalized service and attention to detail.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Plane className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert Planning</CardTitle>
                <CardDescription>
                  Carefully curated itineraries designed by travel experts
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Global Destinations</CardTitle>
                <CardDescription>
                  Access to stunning locations around the world
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Personalized Service</CardTitle>
                <CardDescription>
                  Tailored experiences to match your preferences
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Premium Quality</CardTitle>
                <CardDescription>
                  Excellence in every aspect of our service
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to book your premium car rental or plan your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Contact Us
              </Button>
            </Link>
            <Link to="/packages">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                View Tour Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
