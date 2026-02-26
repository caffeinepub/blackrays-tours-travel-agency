import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Award, Users, MapPin, Heart } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, from vehicle maintenance to customer support.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Our customers are at the heart of everything we do. Your satisfaction is our top priority.',
  },
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Deep knowledge of local destinations and routes ensures you get the best travel experience.',
  },
  {
    icon: Heart,
    title: 'Passion for Travel',
    description: 'We are passionate about travel and committed to making every journey memorable.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-foreground text-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            About Blackrays Car Rentals &<br />Tours and Travels
          </h1>
          <p className="text-lg opacity-75 leading-relaxed max-w-2xl mx-auto">
            Your trusted partner for premium car rentals and curated tour experiences across India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Blackrays Car Rentals & Tours and Travels was founded with a simple vision: to provide
                  premium, reliable, and affordable travel solutions to every customer. We believe that
                  every journey should be comfortable, safe, and memorable.
                </p>
                <p>
                  From our humble beginnings as a small car rental service, we have grown into a
                  comprehensive travel agency offering both car rentals and expertly curated tour packages
                  across India's most beautiful destinations.
                </p>
                <p>
                  Under the leadership of our MD & Chairman, Om H Patil, we have built a reputation for
                  excellence, reliability, and customer satisfaction that sets us apart in the industry.
                </p>
              </div>
              <Button asChild className="mt-8">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="bg-secondary/30 rounded-sm p-8 border border-border">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-foreground rounded-sm flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-background">OP</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">Om H Patil</h3>
                <p className="text-muted-foreground text-sm mt-1">MD & Chairman</p>
                <p className="text-muted-foreground text-sm">Blackrays Car Rentals & Tours and Travels</p>
              </div>
              <blockquote className="text-center text-muted-foreground italic text-sm leading-relaxed border-t border-border pt-6">
                "Our mission is to make every journey extraordinary. We are committed to providing
                the highest quality travel services with a personal touch that makes our customers
                feel valued and cared for."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do at Blackrays.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-sm p-6 hover:shadow-premium transition-shadow"
              >
                <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-background" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '50+', label: 'Tour Packages' },
              { value: '20+', label: 'Vehicles in Fleet' },
              { value: '5+', label: 'Years of Service' },
            ].map((stat) => (
              <div key={stat.label} className="border border-border rounded-sm p-6">
                <p className="font-display text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Start Your Journey With Us</h2>
          <p className="opacity-70 mb-8">
            Whether you need a car rental or a complete tour package, we have you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/car-rentals">Book a Car</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/40 text-background hover:bg-background/10">
              <Link to="/packages">View Tour Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
