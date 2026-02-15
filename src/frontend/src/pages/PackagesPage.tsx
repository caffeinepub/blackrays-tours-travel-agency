import { useGetPublicPackages } from '../hooks/useQueries';
import PackageCard from '../components/packages/PackageCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Package } from 'lucide-react';

export default function PackagesPage() {
  const { data: packages, isLoading, error } = useGetPublicPackages();

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Tour Packages
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated travel experiences designed to create unforgettable memories.
          </p>
        </div>

        {/* Destinations Banner */}
        <div className="mb-12 rounded-lg overflow-hidden">
          <img
            src="/assets/generated/blackrays-destinations-set.dim_1200x400.png"
            alt="Featured destinations"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load tour packages. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !error && packages && packages.length === 0 && (
          <Alert>
            <Package className="h-4 w-4" />
            <AlertTitle>No Packages Available</AlertTitle>
            <AlertDescription>
              We're currently updating our tour packages. Please check back soon!
            </AlertDescription>
          </Alert>
        )}

        {/* Packages Grid */}
        {!isLoading && !error && packages && packages.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
