import React, { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Plane, ChevronDown, ChevronUp, Info } from 'lucide-react';
import FlightSearchForm from '../components/flights/FlightSearchForm';
import FlightResultsList from '../components/flights/FlightResultsList';
import { useFlightSearch } from '../hooks/useFlightSearch';
import { FlightSearchParams } from '../services/flightApi';
import { useSubmitFlightBooking } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function FlightBookingsPage() {
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const { search, results, isLoading, isError, error, hasSearched } = useFlightSearch();
  const submitFlightBooking = useSubmitFlightBooking();

  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    origin: searchParams?.origin || '',
    destination: searchParams?.destination || '',
    departureDate: searchParams?.date || '',
    returnDate: '',
    tripType: 'one_way',
    passengers: '1',
    cabinClass: 'economy',
  });
  const [submitted, setSubmitted] = useState(false);

  const initialParams: Partial<FlightSearchParams> = {
    origin: searchParams?.origin || '',
    destination: searchParams?.destination || '',
    departureDate: searchParams?.date || '',
    passengers: Number(searchParams?.passengers) || 1,
    cabinClass: (searchParams?.class as FlightSearchParams['cabinClass']) || 'economy',
  };

  // Auto-search if params are provided from homepage widget
  useEffect(() => {
    if (searchParams?.origin && searchParams?.destination && searchParams?.date) {
      search({
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureDate: searchParams.date,
        passengers: Number(searchParams.passengers) || 1,
        cabinClass: (searchParams.class as FlightSearchParams['cabinClass']) || 'economy',
        tripType: 'one_way',
      });
    }
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFlightBooking.mutateAsync({
        name: inquiryForm.name,
        phoneNumber: inquiryForm.phone,
        email: inquiryForm.email,
        originCity: inquiryForm.origin,
        destinationCity: inquiryForm.destination,
        departureDate: inquiryForm.departureDate,
        returnDate: inquiryForm.returnDate || null,
        tripType: inquiryForm.tripType,
        passengerCount: BigInt(inquiryForm.passengers),
        cabinClass: inquiryForm.cabinClass,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Inquiry submission failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-foreground text-background py-16">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <img src="/assets/generated/hero-premium-travel.dim_1600x800.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Plane className="w-4 h-4" />
            Live Flight Search
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            Book Your Flight
          </h1>
          <p className="text-background/70 text-lg max-w-xl mx-auto">
            Search across all major airlines and find the best fares for your journey
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl shadow-premium-lg p-6">
            <FlightSearchForm
              onSearch={search}
              isLoading={isLoading}
              initialParams={initialParams}
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlightResultsList
            results={results}
            isLoading={isLoading}
            isError={isError}
            error={error}
            hasSearched={hasSearched}
          />

          {/* API Notice */}
          {!hasSearched && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Plane className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-bold font-display text-xl mb-2">Search for Flights</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter your origin, destination, and travel date above to find available flights.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-muted rounded-lg px-4 py-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4" />
                Currently showing demo results. Live API integration available with credentials.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Fallback */}
      <section className="py-8 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Collapsible open={showInquiry} onOpenChange={setShowInquiry}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-accent transition-colors">
                <div className="text-left">
                  <p className="font-semibold">Prefer a manual inquiry?</p>
                  <p className="text-sm text-muted-foreground">Submit your details and our team will assist you</p>
                </div>
                {showInquiry ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4 bg-card border border-border rounded-xl p-6">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                      <Plane className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold font-display text-xl mb-2">Inquiry Submitted!</h3>
                    <p className="text-muted-foreground">Our team will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <h3 className="font-bold font-display text-lg mb-4">Flight Booking Inquiry</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input required value={inquiryForm.name} onChange={(e) => setInquiryForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input required value={inquiryForm.phone} onChange={(e) => setInquiryForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input required type="email" value={inquiryForm.email} onChange={(e) => setInquiryForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label>Trip Type</Label>
                        <Select value={inquiryForm.tripType} onValueChange={(v) => setInquiryForm(p => ({ ...p, tripType: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one_way">One Way</SelectItem>
                            <SelectItem value="round_trip">Round Trip</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>From City *</Label>
                        <Input required value={inquiryForm.origin} onChange={(e) => setInquiryForm(p => ({ ...p, origin: e.target.value }))} placeholder="Origin city" />
                      </div>
                      <div>
                        <Label>To City *</Label>
                        <Input required value={inquiryForm.destination} onChange={(e) => setInquiryForm(p => ({ ...p, destination: e.target.value }))} placeholder="Destination city" />
                      </div>
                      <div>
                        <Label>Departure Date *</Label>
                        <Input required type="date" value={inquiryForm.departureDate} onChange={(e) => setInquiryForm(p => ({ ...p, departureDate: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Return Date</Label>
                        <Input type="date" value={inquiryForm.returnDate} onChange={(e) => setInquiryForm(p => ({ ...p, returnDate: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Passengers</Label>
                        <Input type="number" min={1} max={9} value={inquiryForm.passengers} onChange={(e) => setInquiryForm(p => ({ ...p, passengers: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Cabin Class</Label>
                        <Select value={inquiryForm.cabinClass} onValueChange={(v) => setInquiryForm(p => ({ ...p, cabinClass: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premium_economy">Premium Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="first">First Class</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" disabled={submitFlightBooking.isPending} className="w-full">
                      {submitFlightBooking.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : 'Submit Inquiry'}
                    </Button>
                  </form>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    </div>
  );
}
