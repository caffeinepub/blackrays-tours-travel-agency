import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFlights, FlightSearchParams, FlightSearchResponse } from '../services/flightApi';

export function useFlightSearch() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);

  const query = useQuery<FlightSearchResponse, Error>({
    queryKey: ['flightSearch', searchParams],
    queryFn: async () => {
      if (!searchParams) throw new Error('No search params');
      return searchFlights(searchParams);
    },
    enabled: !!searchParams,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const search = (params: FlightSearchParams) => {
    setSearchParams(params);
  };

  const reset = () => {
    setSearchParams(null);
  };

  return {
    search,
    reset,
    searchParams,
    results: query.data?.results ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    hasSearched: !!searchParams,
  };
}
