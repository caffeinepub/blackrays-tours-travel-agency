import React, { useState } from 'react';
import { Train, ArrowLeftRight, Users } from 'lucide-react';
import { RailwaySearchParams } from '../../services/railwayApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RailwaySearchFormProps {
  onSearch: (params: RailwaySearchParams) => void;
  isLoading?: boolean;
  initialParams?: Partial<RailwaySearchParams>;
  compact?: boolean;
}

const RAIL_CLASSES = [
  { value: 'SL', label: 'Sleeper (SL)' },
  { value: '3A', label: 'AC 3 Tier (3A)' },
  { value: '2A', label: 'AC 2 Tier (2A)' },
  { value: '1A', label: 'AC First Class (1A)' },
  { value: 'CC', label: 'Chair Car (CC)' },
  { value: 'EC', label: 'Executive Chair Car (EC)' },
];

export default function RailwaySearchForm({ onSearch, isLoading, initialParams, compact }: RailwaySearchFormProps) {
  const [origin, setOrigin] = useState(initialParams?.originStation || '');
  const [destination, setDestination] = useState(initialParams?.destinationStation || '');
  const [travelDate, setTravelDate] = useState(initialParams?.travelDate || '');
  const [passengers, setPassengers] = useState(initialParams?.passengers || 1);
  const [railClass, setRailClass] = useState(initialParams?.railClass || 'SL');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const swapStations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!origin.trim()) newErrors.origin = 'Enter origin station';
    if (!destination.trim()) newErrors.destination = 'Enter destination station';
    if (!travelDate) newErrors.travelDate = 'Select travel date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSearch({
      originStation: origin.trim(),
      destinationStation: destination.trim(),
      travelDate,
      passengers,
      railClass,
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
        {/* Origin */}
        <div className="relative">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">From Station</Label>
          <div className="relative">
            <Train className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="City or Station"
              className={`pl-9 ${errors.origin ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.origin && <p className="text-destructive text-xs mt-1">{errors.origin}</p>}
          <button
            type="button"
            onClick={swapStations}
            className="absolute right-0 top-6 translate-x-1/2 z-10 bg-background border border-border rounded-full p-1 shadow-premium hover:bg-accent transition-colors hidden md:flex"
            title="Swap stations"
          >
            <ArrowLeftRight className="w-3 h-3" />
          </button>
        </div>

        {/* Destination */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">To Station</Label>
          <div className="relative">
            <Train className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="City or Station"
              className={`pl-9 ${errors.destination ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.destination && <p className="text-destructive text-xs mt-1">{errors.destination}</p>}
        </div>

        {/* Date */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Travel Date</Label>
          <Input
            type="date"
            value={travelDate}
            min={today}
            onChange={(e) => setTravelDate(e.target.value)}
            className={errors.travelDate ? 'border-destructive' : ''}
          />
          {errors.travelDate && <p className="text-destructive text-xs mt-1">{errors.travelDate}</p>}
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
                max={6}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="pl-9"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Class</Label>
            <Select value={railClass} onValueChange={setRailClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RAIL_CLASSES.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                ))}
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
            <Train className="w-4 h-4" />
            Search Trains
          </span>
        )}
      </Button>
    </form>
  );
}
