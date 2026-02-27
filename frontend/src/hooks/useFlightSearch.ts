import { useState } from 'react';
import { searchFlights, FlightSearchParams, FlightResult } from '../services/flightApi';

export function useFlightSearch() {
  const [results, setResults] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);

  const search = async (params: FlightSearchParams) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setHasSearched(true);
    setSearchParams(params);
    try {
      const data = await searchFlights(params);
      setResults(data);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Search failed'));
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResults([]);
    setIsLoading(false);
    setIsError(false);
    setError(null);
    setHasSearched(false);
    setSearchParams(null);
  };

  return {
    search,
    reset,
    searchParams,
    results,
    isLoading,
    isError,
    error,
    hasSearched,
  };
}
