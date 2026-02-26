import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FlightBookingDetails {
    cabinClass: string;
    tripType: string;
    departureDate: string;
    passengerCount: bigint;
    destinationCity: string;
    returnDate?: string;
    originCity: string;
}
export interface CustomerInquiry {
    id: bigint;
    status: Status;
    rentalDetails?: CarRentalDetails;
    name: string;
    railwayBookingDetails?: RailwayBookingDetails;
    flightBookingDetails?: FlightBookingDetails;
    email: string;
    message: string;
    customPackageDetails?: CustomPackageDetails;
    category: InquiryCategory;
    phoneNumber: string;
}
export interface CustomPackageDetails {
    durationDays: bigint;
    destination: string;
    destinationType: string;
    numberOfTravelers: bigint;
    preferredDates?: string;
}
export interface RailwayBookingDetails {
    passengerCount: bigint;
    travelDate: string;
    railClass: string;
    originStation: string;
    destinationStation: string;
}
export interface TourPackage {
    id: string;
    title: string;
    duration: bigint;
    description: string;
    price: bigint;
}
export interface CarRentalDetails {
    estimatedDistance?: bigint;
    vehicleType: VehicleType;
    estimatedFare?: bigint;
    driverRequired: boolean;
}
export interface UserProfile {
    name: string;
}
export enum InquiryCategory {
    railwayBooking = "railwayBooking",
    flightBooking = "flightBooking",
    tourInquiry = "tourInquiry",
    customPackage = "customPackage",
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
    submitCarRental(name: string, phoneNumber: string, email: string, vehicleType: VehicleType, driverRequired: boolean, estimatedDistance: bigint | null, estimatedFare: bigint | null): Promise<void>;
    submitCustomPackage(name: string, phoneNumber: string, email: string, destinationType: string, destination: string, numberOfTravelers: bigint, durationDays: bigint, preferredDates: string | null): Promise<void>;
    submitFlightBooking(name: string, phoneNumber: string, email: string, originCity: string, destinationCity: string, departureDate: string, returnDate: string | null, tripType: string, passengerCount: bigint, cabinClass: string): Promise<void>;
    submitRailwayBooking(name: string, phoneNumber: string, email: string, originStation: string, destinationStation: string, travelDate: string, passengerCount: bigint, railClass: string): Promise<void>;
    submitTourInquiry(name: string, phoneNumber: string, email: string, message: string): Promise<void>;
    updateInquiryStatus(inquiryId: bigint, newStatus: Status): Promise<void>;
    updatePackage(id: string, newPackage: TourPackage): Promise<void>;
}
