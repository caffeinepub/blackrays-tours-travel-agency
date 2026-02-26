import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchTrains, RailwaySearchParams, RailwaySearchResponse } from '../services/railwayApi';

export function useRailwaySearch() {
  const [searchParams, setSearchParams] = useState<RailwaySearchParams | null>(null);

  const query = useQuery<RailwaySearchResponse, Error>({
    queryKey: ['railwaySearch', searchParams],
    queryFn: async () => {
      if (!searchParams) throw new Error('No search params');
      return searchTrains(searchParams);
    },
    enabled: !!searchParams,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const search = (params: RailwaySearchParams) => {
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
