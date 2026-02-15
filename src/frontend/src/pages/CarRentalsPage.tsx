import { useState } from 'react';
import { useSubmitCarRental } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, Loader2, Car, User, DollarSign } from 'lucide-react';
import { VehicleType } from '../backend';

export default function CarRentalsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv'>('sedan');
  const [driverRequired, setDriverRequired] = useState<'yes' | 'no'>('no');
  const [showSuccess, setShowSuccess] = useState(false);

  const submitCarRental = useSubmitCarRental();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      return;
    }

    try {
      await submitCarRental.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phone.trim(),
        vehicleType: vehicleType === 'sedan' ? VehicleType.sedan : VehicleType.suv,
        driverRequired: driverRequired === 'yes',
      });

      setName('');
      setEmail('');
      setPhone('');
      setVehicleType('sedan');
      setDriverRequired('no');
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit car rental inquiry:', error);
    }
  };

  return (
    <div className="py-12">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Premium Car Rentals
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book your premium car rental with flexible plans. Professional drivers available on request.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Book Your Car</CardTitle>
              <CardDescription>
                Fill out the form below to reserve your vehicle. We'll contact you to confirm your booking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showSuccess && (
                <Alert className="mb-6 border-primary bg-primary/5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertTitle>Booking Request Received!</AlertTitle>
                  <AlertDescription>
                    Your car rental inquiry has been submitted. We'll contact you shortly to confirm your booking.
                  </AlertDescription>
                </Alert>
              )}

              {submitCarRental.isError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to submit your booking request. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    disabled={submitCarRental.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={submitCarRental.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    required
                    disabled={submitCarRental.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select
                    value={vehicleType}
                    onValueChange={(value) => setVehicleType(value as 'sedan' | 'suv')}
                    disabled={submitCarRental.isPending}
                  >
                    <SelectTrigger id="vehicleType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan - ₹2,500/day</SelectItem>
                      <SelectItem value="suv">SUV - ₹5,000/day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverRequired">Driver Required *</Label>
                  <Select
                    value={driverRequired}
                    onValueChange={(value) => setDriverRequired(value as 'yes' | 'no')}
                    disabled={submitCarRental.isPending}
                  >
                    <SelectTrigger id="driverRequired">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No, I'll drive myself</SelectItem>
                      <SelectItem value="yes">Yes, I need a driver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!name.trim() || !email.trim() || !phone.trim() || submitCarRental.isPending}
                >
                  {submitCarRental.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Booking Request'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Pricing Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Car className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Sedan</p>
                    <p className="text-2xl font-bold text-primary">₹2,500</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Car className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">SUV</p>
                    <p className="text-2xl font-bold text-primary">₹5,000</p>
                    <p className="text-sm text-muted-foreground">per day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Professional Driver</p>
                    <p className="text-sm text-muted-foreground">Available on request</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold mb-3">
                  What's Included
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Flexible rental plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Short & long distance travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Well-maintained premium vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Customized travel plans</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
