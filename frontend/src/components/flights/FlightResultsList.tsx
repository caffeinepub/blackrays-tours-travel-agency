import React from 'react';
import { Plane, AlertCircle, SearchX } from 'lucide-react';
import { FlightResult } from '../../services/flightApi';
import FlightResultCard from './FlightResultCard';

interface FlightResultsListProps {
  results: FlightResult[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  hasSearched: boolean;
}

export default function FlightResultsList({
  results,
  isLoading,
  isError,
  error,
  hasSearched,
}: FlightResultsListProps) {
  if (!hasSearched) return null;

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 border-3 border-border border-t-foreground rounded-full animate-spin" />
        <div className="text-center">
          <p className="font-semibold text-lg">Searching for flights...</p>
          <p className="text-muted-foreground text-sm mt-1">Finding the best fares for you</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 flex flex-col items-center gap-3 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-destructive" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Search Failed</p>
          <p className="text-muted-foreground text-sm mt-1">
            {error?.message || 'Unable to fetch flights. Please try again.'}
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center gap-3 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <SearchX className="w-7 h-7 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">No Flights Found</p>
          <p className="text-muted-foreground text-sm mt-1">
            Try different dates or nearby airports
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5" />
          <h3 className="font-semibold text-lg font-display">
            {results.length} Flight{results.length !== 1 ? 's' : ''} Found
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Sorted by price</p>
      </div>
      <div className="space-y-3">
        {results.map((flight) => (
          <FlightResultCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
}
