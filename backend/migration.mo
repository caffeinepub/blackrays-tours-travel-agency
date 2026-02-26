import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldStatus = {
    #new;
    #inProgress;
    #resolved;
  };

  type OldTourPackage = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    duration : Nat;
  };

  type OldVehicleType = {
    #suv;
    #sedan;
  };

  type OldInquiryCategory = {
    #tourInquiry;
    #carRental;
    #customPackage;
    #railwayBooking;
    #flightBooking;
  };

  type OldCarRentalDetails = {
    vehicleType : OldVehicleType;
    driverRequired : Bool;
    estimatedDistance : ?Nat;
    estimatedFare : ?Nat;
  };

  type OldCustomPackageDetails = {
    destinationType : Text;
    destination : Text;
    numberOfTravelers : Nat;
    durationDays : Nat;
    preferredDates : ?Text;
  };

  type OldRailwayBookingDetails = {
    originStation : Text;
    destinationStation : Text;
    travelDate : Text;
    passengerCount : Nat;
    railClass : Text;
  };

  type OldFlightBookingDetails = {
    originCity : Text;
    destinationCity : Text;
    departureDate : Text;
    returnDate : ?Text;
    tripType : Text;
    passengerCount : Nat;
    cabinClass : Text;
  };

  type OldCustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : OldStatus;
    category : OldInquiryCategory;
    rentalDetails : ?OldCarRentalDetails;
    customPackageDetails : ?OldCustomPackageDetails;
    railwayBookingDetails : ?OldRailwayBookingDetails;
    flightBookingDetails : ?OldFlightBookingDetails;
  };

  type OldActor = {
    packages : Map.Map<Text, OldTourPackage>;
    inquiries : Map.Map<Nat, OldCustomerInquiry>;
    nextInquiryId : Nat;
  };

  // New types for hotel booking details and inquiries
  type NewVehicleType = {
    #suv;
    #sedan;
  };

  type NewInquiryCategory = {
    #tourInquiry;
    #carRental;
    #customPackage;
    #railwayBooking;
    #flightBooking;
    #hotelBooking;
  };

  type NewStatus = {
    #new;
    #inProgress;
    #resolved;
  };

  type NewCarRentalDetails = {
    vehicleType : NewVehicleType;
    driverRequired : Bool;
    estimatedDistance : ?Nat;
    estimatedFare : ?Nat;
  };

  type NewCustomPackageDetails = {
    destinationType : Text;
    destination : Text;
    numberOfTravelers : Nat;
    durationDays : Nat;
    preferredDates : ?Text;
  };

  type NewRailwayBookingDetails = {
    originStation : Text;
    destinationStation : Text;
    travelDate : Text;
    passengerCount : Nat;
    railClass : Text;
  };

  type NewFlightBookingDetails = {
    originCity : Text;
    destinationCity : Text;
    departureDate : Text;
    returnDate : ?Text;
    tripType : Text;
    passengerCount : Nat;
    cabinClass : Text;
  };

  type HotelBookingDetails = {
    destination : Text;
    checkInDate : Text;
    checkOutDate : Text;
    numberOfGuests : Nat;
    numberOfRooms : Nat;
    roomTypePreference : Text;
    hotelName : ?Text;
    starRating : ?Nat;
    location : ?Text;
    pricePerNight : ?Nat;
  };

  type NewCustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : NewStatus;
    category : NewInquiryCategory;
    rentalDetails : ?NewCarRentalDetails;
    customPackageDetails : ?NewCustomPackageDetails;
    railwayBookingDetails : ?NewRailwayBookingDetails;
    flightBookingDetails : ?NewFlightBookingDetails;
    hotelBookingDetails : ?HotelBookingDetails; // New field for hotel booking details
  };

  type NewActor = {
    packages : Map.Map<Text, OldTourPackage>;
    inquiries : Map.Map<Nat, NewCustomerInquiry>;
    nextInquiryId : Nat;
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
          category = oldInquiry.category;
          rentalDetails =
            oldInquiry.rentalDetails;
          customPackageDetails =
            oldInquiry.customPackageDetails;
          railwayBookingDetails =
            oldInquiry.railwayBookingDetails;
          flightBookingDetails =
            oldInquiry.flightBookingDetails;
          hotelBookingDetails = null; // No existing hotel booking details
        };
      }
    );
    {
      packages = old.packages;
      inquiries = newInquiries;
      nextInquiryId = old.nextInquiryId;
    };
  };
};
