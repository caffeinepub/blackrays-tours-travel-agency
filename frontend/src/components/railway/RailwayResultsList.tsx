import React from 'react';
import { Train, AlertCircle, SearchX } from 'lucide-react';
import { TrainResult } from '../../services/railwayApi';
import RailwayResultCard from './RailwayResultCard';

interface RailwayResultsListProps {
  results: TrainResult[];
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  hasSearched: boolean;
}

export default function RailwayResultsList({
  results,
  isLoading,
  isError,
  error,
  hasSearched,
}: RailwayResultsListProps) {
  if (!hasSearched) return null;

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 border-3 border-border border-t-foreground rounded-full animate-spin" />
        <div className="text-center">
          <p className="font-semibold text-lg">Searching for trains...</p>
          <p className="text-muted-foreground text-sm mt-1">Checking availability across all classes</p>
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
            {error?.message || 'Unable to fetch trains. Please try again.'}
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
          <p className="font-semibold text-lg">No Trains Found</p>
          <p className="text-muted-foreground text-sm mt-1">
            Try different dates or nearby stations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Train className="w-5 h-5" />
          <h3 className="font-semibold text-lg font-display">
            {results.length} Train{results.length !== 1 ? 's' : ''} Found
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Sorted by departure time</p>
      </div>
      <div className="space-y-3">
        {results.map((train) => (
          <RailwayResultCard key={train.id} train={train} />
        ))}
      </div>
    </div>
  );
}
