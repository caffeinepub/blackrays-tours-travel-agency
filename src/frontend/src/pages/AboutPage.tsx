import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Heart, Shield, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Blackrays Car Rentals & Tours and Travels
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in premium car rentals and creating unforgettable travel experiences.
          </p>
          <div className="mt-6 inline-block px-6 py-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">MD & Chairman</p>
            <p className="text-xl font-bold">Om H Patil</p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                At Blackrays Car Rentals & Tours and Travels, we believe that travel is more than just visiting new places—it's about creating memories, discovering cultures, and experiencing the world in ways that transform you. Our mission is to make every journey extraordinary by providing premium car rentals, personalized service, expert guidance, and carefully curated travel experiences.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Global Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deep knowledge of destinations worldwide, ensuring authentic and enriching experiences.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Passionate Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We love what we do, and it shows in every detail of your travel experience.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your safety and peace of mind are our top priorities on every journey.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for excellence in every aspect of our service and your experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section>
          <Card className="bg-muted/30">
            <CardContent className="p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
                <p className="mb-4">
                  Blackrays Car Rentals & Tours and Travels was founded with a simple vision: to provide premium transportation and help people explore the world with confidence and joy. What started as a commitment to quality service has grown into a trusted agency serving travelers, families, and explorers from all walks of life.
                </p>
                <p className="mb-4">
                  Over the years, we've built relationships with local guides, hotels, and service providers around the globe, ensuring that our clients receive authentic experiences and exceptional value. We take pride in our attention to detail, our commitment to quality, and our ability to turn travel dreams into reality.
                </p>
                <p>
                  Whether you need a premium car rental for business or leisure, or you're seeking a relaxing beach getaway, an adventurous mountain trek, or a cultural city tour, we're here to make it happen. Let us be your guide to the world's most incredible destinations.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
