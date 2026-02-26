import React, { useState } from 'react';
import { Plane, ArrowLeftRight, Users, ChevronDown } from 'lucide-react';
import { FlightSearchParams } from '../../services/flightApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FlightSearchFormProps {
  onSearch: (params: FlightSearchParams) => void;
  isLoading?: boolean;
  initialParams?: Partial<FlightSearchParams>;
  compact?: boolean;
}

export default function FlightSearchForm({ onSearch, isLoading, initialParams, compact }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState<'one_way' | 'round_trip'>(
    (initialParams?.tripType as 'one_way' | 'round_trip') || 'one_way'
  );
  const [origin, setOrigin] = useState(initialParams?.origin || '');
  const [destination, setDestination] = useState(initialParams?.destination || '');
  const [departureDate, setDepartureDate] = useState(initialParams?.departureDate || '');
  const [returnDate, setReturnDate] = useState(initialParams?.returnDate || '');
  const [passengers, setPassengers] = useState(initialParams?.passengers || 1);
  const [cabinClass, setCabinClass] = useState<FlightSearchParams['cabinClass']>(
    initialParams?.cabinClass || 'economy'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const swapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!origin.trim()) newErrors.origin = 'Enter origin city';
    if (!destination.trim()) newErrors.destination = 'Enter destination city';
    if (!departureDate) newErrors.departureDate = 'Select departure date';
    if (tripType === 'round_trip' && !returnDate) newErrors.returnDate = 'Select return date';
    if (tripType === 'round_trip' && returnDate && returnDate < departureDate) {
      newErrors.returnDate = 'Return date must be after departure';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSearch({
      origin: origin.trim(),
      destination: destination.trim(),
      departureDate,
      returnDate: tripType === 'round_trip' ? returnDate : undefined,
      passengers,
      cabinClass,
      tripType,
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Trip Type Toggle */}
      <div className="flex gap-2 mb-4">
        {(['one_way', 'round_trip'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              tripType === type
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {type === 'one_way' ? 'One Way' : 'Round Trip'}
          </button>
        ))}
      </div>

      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
        {/* Origin */}
        <div className="relative">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">From</Label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="City or Airport"
              className={`pl-9 ${errors.origin ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.origin && <p className="text-destructive text-xs mt-1">{errors.origin}</p>}
          {/* Swap button */}
          <button
            type="button"
            onClick={swapCities}
            className="absolute right-0 top-6 translate-x-1/2 z-10 bg-background border border-border rounded-full p-1 shadow-premium hover:bg-accent transition-colors hidden md:flex"
            title="Swap cities"
          >
            <ArrowLeftRight className="w-3 h-3" />
          </button>
        </div>

        {/* Destination */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">To</Label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90" />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or Airport"
              className={`pl-9 ${errors.destination ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.destination && <p className="text-destructive text-xs mt-1">{errors.destination}</p>}
        </div>

        {/* Dates */}
        <div className={`grid gap-3 ${tripType === 'round_trip' ? 'grid-cols-2' : 'grid-cols-1'} ${compact ? '' : 'lg:col-span-1'}`}>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Departure</Label>
            <Input
              type="date"
              value={departureDate}
              min={today}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={errors.departureDate ? 'border-destructive' : ''}
            />
            {errors.departureDate && <p className="text-destructive text-xs mt-1">{errors.departureDate}</p>}
          </div>
          {tripType === 'round_trip' && (
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Return</Label>
              <Input
                type="date"
                value={returnDate}
                min={departureDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
                className={errors.returnDate ? 'border-destructive' : ''}
              />
              {errors.returnDate && <p className="text-destructive text-xs mt-1">{errors.returnDate}</p>}
            </div>
          )}
        </div>

        {/* Passengers & Class */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Passengers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                min={1}
                max={9}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Class</Label>
            <Select value={cabinClass} onValueChange={(v) => setCabinClass(v as FlightSearchParams['cabinClass'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium_economy">Prem. Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full md:w-auto px-10 py-3 font-semibold text-base"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Searching...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Search Flights
          </span>
        )}
      </Button>
    </form>
  );
}
