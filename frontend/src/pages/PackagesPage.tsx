import { Link } from '@tanstack/react-router';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PackageCard from '../components/packages/PackageCard';
import { useGetPublicPackages } from '../hooks/useQueries';

export default function PackagesPage() {
  const { data: packages, isLoading, isError } = useGetPublicPackages();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/blackrays-destinations-set.dim_1200x400.png')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Tour Packages
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Discover India's most beautiful destinations with our expertly curated tour packages.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="text-center py-24">
              <p className="text-destructive font-medium mb-2">Failed to load packages</p>
              <p className="text-muted-foreground text-sm">Please try again later.</p>
            </div>
          ) : packages && packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-border rounded-sm">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Packages Yet</h3>
              <p className="text-muted-foreground mb-6">
                We're preparing exciting tour packages. Check back soon!
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Us for Custom Tours</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6">
            We offer custom tour packages tailored to your preferences. Contact us to plan your perfect trip.
          </p>
          <Button asChild>
            <Link to="/contact">Request Custom Package</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
