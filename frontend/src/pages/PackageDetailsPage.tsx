import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Clock, IndianRupee, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetPublicPackages } from '../hooks/useQueries';

export default function PackageDetailsPage() {
  const { id } = useParams({ from: '/packages/$id' });
  const { data: packages, isLoading, isError } = useGetPublicPackages();

  const pkg = packages?.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-destructive font-medium mb-4">Failed to load package details.</p>
        <Button asChild variant="outline">
          <Link to="/packages">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Link>
        </Button>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">Package Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The tour package you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="outline">
          <Link to="/packages">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-foreground text-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Packages
          </Link>
          <h1 className="font-display text-4xl font-bold mb-4">{pkg.title}</h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 opacity-80">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{pkg.duration.toString()} days</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <IndianRupee className="w-4 h-4" />
              <span className="text-sm font-semibold">₹{pkg.price.toString()} per person</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">About This Package</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{pkg.description}</p>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-sm p-6 bg-card sticky top-24">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Book This Package</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium text-foreground">{pkg.duration.toString()} days</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-sm font-bold text-foreground">₹{pkg.price.toString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Per Person</span>
                    <span className="text-sm text-foreground">Yes</span>
                  </div>
                </div>
                <Button asChild className="w-full mb-3">
                  <Link to="/contact">Inquire Now</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="tel:9373624669">Call Us: 9373624669</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
