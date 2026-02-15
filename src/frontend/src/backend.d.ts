import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomerInquiry {
    id: bigint;
    status: Status;
    rentalDetails?: CarRentalDetails;
    name: string;
    email: string;
    message: string;
    category: InquiryCategory;
    phoneNumber: string;
}
export interface TourPackage {
    id: string;
    title: string;
    duration: bigint;
    description: string;
    price: bigint;
}
export interface CarRentalDetails {
    vehicleType: VehicleType;
    driverRequired: boolean;
}
export interface UserProfile {
    name: string;
}
export enum InquiryCategory {
    tourInquiry = "tourInquiry",
    carRental = "carRental"
}
export enum Status {
    new_ = "new",
    resolved = "resolved",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VehicleType {
    suv = "suv",
    sedan = "sedan"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPackage(id: string, title: string, description: string, price: bigint, duration: bigint): Promise<void>;
    deletePackage(id: string): Promise<void>;
    getAllInquiries(): Promise<Array<CustomerInquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPublicPackages(): Promise<Array<TourPackage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitCarRental(name: string, phoneNumber: string, email: string, vehicleType: VehicleType, driverRequired: boolean): Promise<void>;
    submitTourInquiry(name: string, phoneNumber: string, email: string, message: string): Promise<void>;
    updateInquiryStatus(inquiryId: bigint, newStatus: Status): Promise<void>;
    updatePackage(id: string, newPackage: TourPackage): Promise<void>;
}
