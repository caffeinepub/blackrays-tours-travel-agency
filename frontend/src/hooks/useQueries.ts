import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
  TourPackage,
  CustomerInquiry,
  Status,
  CarType,
  CarRentalPricingMode,
  UserProfile,
} from '../backend';

// ─── User Profile ────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ─── Admin Check ─────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// ─── Public Packages ─────────────────────────────────────────────────────────

export function useGetPublicPackages() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TourPackage[]>({
    queryKey: ['publicPackages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicPackages();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ─── Tour Inquiry ─────────────────────────────────────────────────────────────

export function useSubmitTourInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      phoneNumber: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitTourInquiry(params.name, params.phoneNumber, params.email, params.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Car Rental ───────────────────────────────────────────────────────────────

export function useSubmitCarRental() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      phoneNumber: string;
      email: string;
      vehicleType: CarType;
      driverRequired: boolean;
      estimatedDistance: bigint | null;
      pricingMode: CarRentalPricingMode;
      estimatedDays: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitCarRental(
        params.name,
        params.phoneNumber,
        params.email,
        params.vehicleType,
        params.driverRequired,
        params.estimatedDistance,
        params.pricingMode,
        params.estimatedDays,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Custom Package ───────────────────────────────────────────────────────────

export function useSubmitCustomPackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      phoneNumber: string;
      email: string;
      destinationType: string;
      destination: string;
      numberOfTravelers: bigint;
      durationDays: bigint;
      preferredDates: string | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitCustomPackage(
        params.name,
        params.phoneNumber,
        params.email,
        params.destinationType,
        params.destination,
        params.numberOfTravelers,
        params.durationDays,
        params.preferredDates,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Railway Booking ──────────────────────────────────────────────────────────

export function useSubmitRailwayBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      phoneNumber: string;
      email: string;
      originStation: string;
      destinationStation: string;
      travelDate: string;
      passengerCount: bigint;
      railClass: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitRailwayBooking(
        params.name,
        params.phoneNumber,
        params.email,
        params.originStation,
        params.destinationStation,
        params.travelDate,
        params.passengerCount,
        params.railClass,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Flight Booking ───────────────────────────────────────────────────────────

export function useSubmitFlightBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      phoneNumber: string;
      email: string;
      originCity: string;
      destinationCity: string;
      departureDate: string;
      returnDate: string | null;
      tripType: string;
      passengerCount: bigint;
      cabinClass: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitFlightBooking(
        params.name,
        params.phoneNumber,
        params.email,
        params.originCity,
        params.destinationCity,
        params.departureDate,
        params.returnDate,
        params.tripType,
        params.passengerCount,
        params.cabinClass,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Hotel Booking ────────────────────────────────────────────────────────────

export function useSubmitHotelBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      phoneNumber: string;
      email: string;
      destination: string;
      checkInDate: string;
      checkOutDate: string;
      numberOfGuests: bigint;
      numberOfRooms: bigint;
      roomTypePreference: string;
      hotelName: string | null;
      starRating: bigint | null;
      location: string | null;
      pricePerNight: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitHotelBooking(
        params.name,
        params.phoneNumber,
        params.email,
        params.destination,
        params.checkInDate,
        params.checkOutDate,
        params.numberOfGuests,
        params.numberOfRooms,
        params.roomTypePreference,
        params.hotelName,
        params.starRating,
        params.location,
        params.pricePerNight,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Admin: All Inquiries ─────────────────────────────────────────────────────

export function useGetAllInquiries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CustomerInquiry[]>({
    queryKey: ['allInquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ─── Admin: Update Inquiry Status ─────────────────────────────────────────────

export function useUpdateInquiryStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { inquiryId: bigint; newStatus: Status }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateInquiryStatus(params.inquiryId, params.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allInquiries'] });
    },
  });
}

// ─── Admin: Packages ──────────────────────────────────────────────────────────

export function useCreatePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      title: string;
      description: string;
      price: bigint;
      duration: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createPackage(params.id, params.title, params.description, params.price, params.duration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicPackages'] });
    },
  });
}

export function useUpdatePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      newPackage: TourPackage;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updatePackage(params.id, params.newPackage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicPackages'] });
    },
  });
}

export function useDeletePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicPackages'] });
    },
  });
}
