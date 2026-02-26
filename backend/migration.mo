import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  public type Status = {
    #new;
    #inProgress;
    #resolved;
  };

  public type VehicleType = {
    #suv;
    #sedan;
  };

  public type OldInquiryCategory = {
    #tourInquiry;
    #carRental;
  };

  public type NewInquiryCategory = {
    #tourInquiry;
    #carRental;
    #customPackage;
    #railwayBooking;
    #flightBooking;
  };

  public type OldCarRentalDetails = {
    vehicleType : VehicleType;
    driverRequired : Bool;
  };

  public type CarRentalDetails = {
    vehicleType : VehicleType;
    driverRequired : Bool;
    estimatedDistance : ?Nat;
    estimatedFare : ?Nat;
  };

  public type CustomPackageDetails = {
    destinationType : Text;
    destination : Text;
    numberOfTravelers : Nat;
    durationDays : Nat;
    preferredDates : ?Text;
  };

  public type RailwayBookingDetails = {
    originStation : Text;
    destinationStation : Text;
    travelDate : Text;
    passengerCount : Nat;
    railClass : Text;
  };

  public type FlightBookingDetails = {
    originCity : Text;
    destinationCity : Text;
    departureDate : Text;
    returnDate : ?Text;
    tripType : Text;
    passengerCount : Nat;
    cabinClass : Text;
  };

  public type OldCustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : Status;
    category : OldInquiryCategory;
    rentalDetails : ?OldCarRentalDetails;
  };

  public type NewCustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : Status;
    category : NewInquiryCategory;
    rentalDetails : ?CarRentalDetails;
    customPackageDetails : ?CustomPackageDetails;
    railwayBookingDetails : ?RailwayBookingDetails;
    flightBookingDetails : ?FlightBookingDetails;
  };

  public type TourPackage = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    duration : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  public type OldActor = {
    packages : Map.Map<Text, TourPackage>;
    inquiries : Map.Map<Nat, OldCustomerInquiry>;
    nextInquiryId : Nat;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public type NewActor = {
    packages : Map.Map<Text, TourPackage>;
    inquiries : Map.Map<Nat, NewCustomerInquiry>;
    nextInquiryId : Nat;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  func convertCarRentalDetails(oldDetails : ?OldCarRentalDetails) : ?CarRentalDetails {
    switch (oldDetails) {
      case (null) { null };
      case (?details) {
        ?{
          vehicleType = details.vehicleType;
          driverRequired = details.driverRequired;
          estimatedDistance = null;
          estimatedFare = null;
        };
      };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newInquiries = old.inquiries.map<Nat, OldCustomerInquiry, NewCustomerInquiry>(
      func(_id, oldInquiry) {
        {
          id = oldInquiry.id;
          name = oldInquiry.name;
          phoneNumber = oldInquiry.phoneNumber;
          email = oldInquiry.email;
          message = oldInquiry.message;
          status = oldInquiry.status;
          category = switch (oldInquiry.category) {
            case (#tourInquiry) { #tourInquiry };
            case (#carRental) { #carRental };
          };
          rentalDetails = convertCarRentalDetails(oldInquiry.rentalDetails);
          customPackageDetails = null;
          railwayBookingDetails = null;
          flightBookingDetails = null;
        };
      }
    );
    {
      packages = old.packages;
      inquiries = newInquiries;
      nextInquiryId = old.nextInquiryId;
      userProfiles = old.userProfiles;
    };
  };
};
