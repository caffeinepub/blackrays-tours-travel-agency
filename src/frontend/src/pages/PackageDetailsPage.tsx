import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetPublicPackages } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Calendar, DollarSign, ArrowLeft, MessageSquare } from 'lucide-react';

export default function PackageDetailsPage() {
  const { packageId } = useParams({ from: '/packages/$packageId' });
  const navigate = useNavigate();
  const { data: packages, isLoading, error } = useGetPublicPackages();

  const selectedPackage = packages?.find((pkg) => pkg.id === packageId);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load package details. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Package Not Found</AlertTitle>
            <AlertDescription>
              The package you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate({ to: '/packages' })} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Packages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/packages' })}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Packages
        </Button>

        <Card className="overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-b">
            <div className="text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                {selectedPackage.title}
              </h1>
            </div>
          </div>

          <CardContent className="p-8">
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-xl font-semibold">
                    {Number(selectedPackage.duration)} {Number(selectedPackage.duration) === 1 ? 'Day' : 'Days'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-xl font-semibold">
                    ${Number(selectedPackage.price).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedPackage.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => navigate({ to: '/contact' })}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Inquire About This Package
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/contact' })}
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
