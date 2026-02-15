import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TourPackage, CustomerInquiry, Status, UserProfile, UserRole, VehicleType } from '../backend';

// Query keys
export const QUERY_KEYS = {
  packages: ['packages'],
  inquiries: ['inquiries'],
  userProfile: ['userProfile'],
  userRole: ['userRole'],
  isAdmin: ['isAdmin'],
};

// Public Packages
export function useGetPublicPackages() {
  const { actor, isFetching } = useActor();

  return useQuery<TourPackage[]>({
    queryKey: QUERY_KEYS.packages,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicPackages();
    },
    enabled: !!actor && !isFetching,
  });
}

// Submit Tour Inquiry
export function useSubmitTourInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; phoneNumber: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitTourInquiry(data.name, data.phoneNumber, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.inquiries });
    },
  });
}

// Submit Car Rental
export function useSubmitCarRental() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phoneNumber: string;
      email: string;
      vehicleType: VehicleType;
      driverRequired: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitCarRental(
        data.name,
        data.phoneNumber,
        data.email,
        data.vehicleType,
        data.driverRequired
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.inquiries });
    },
  });
}

// Admin: Get All Inquiries
export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<CustomerInquiry[]>({
    queryKey: QUERY_KEYS.inquiries,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

// Admin: Update Inquiry Status
export function useUpdateInquiryStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { inquiryId: bigint; newStatus: Status }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateInquiryStatus(data.inquiryId, data.newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.inquiries });
    },
  });
}

// Admin: Create Package
export function useCreatePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      description: string;
      price: bigint;
      duration: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createPackage(data.id, data.title, data.description, data.price, data.duration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.packages });
    },
  });
}

// Admin: Update Package
export function useUpdatePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; newPackage: TourPackage }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updatePackage(data.id, data.newPackage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.packages });
    },
  });
}

// Admin: Delete Package
export function useDeletePackage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deletePackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.packages });
    },
  });
}

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: QUERY_KEYS.userProfile,
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
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userProfile });
    },
  });
}

// User Role
export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: QUERY_KEYS.userRole,
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: QUERY_KEYS.isAdmin,
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}
