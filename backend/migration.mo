import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldCarRentalDetails = {
    vehicleType : {
      #suv;
      #sedan;
    };
    driverRequired : Bool;
    estimatedDistance : ?Nat;
    estimatedFare : ?Nat;
  };

  type OldCustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : {
      #new;
      #inProgress;
      #resolved;
    };
    category : {
      #tourInquiry;
      #carRental;
      #customPackage;
      #railwayBooking;
      #flightBooking;
      #hotelBooking;
    };
    rentalDetails : ?OldCarRentalDetails;
    customPackageDetails : ?{
      destinationType : Text;
      destination : Text;
      numberOfTravelers : Nat;
      durationDays : Nat;
      preferredDates : ?Text;
    };
    railwayBookingDetails : ?{
      originStation : Text;
      destinationStation : Text;
      travelDate : Text;
      passengerCount : Nat;
      railClass : Text;
    };
    flightBookingDetails : ?{
      originCity : Text;
      destinationCity : Text;
      departureDate : Text;
      returnDate : ?Text;
      tripType : Text;
      passengerCount : Nat;
      cabinClass : Text;
    };
    hotelBookingDetails : ?{
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
  };

  type OldActor = {
    inquiries : Map.Map<Nat, OldCustomerInquiry>;
  };

  type NewCarRentalDetails = {
    vehicleType : {
      #suv;
      #sedan;
    };
    driverRequired : Bool;
    estimatedDistance : ?Nat;
    estimatedFare : ?Nat;
    pricingMode : ?{
      #perKm;
      #perDay;
    };
    estimatedDays : ?Nat;
  };

  type NewCustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : {
      #new;
      #inProgress;
      #resolved;
    };
    category : {
      #tourInquiry;
      #carRental;
      #customPackage;
      #railwayBooking;
      #flightBooking;
      #hotelBooking;
    };
    rentalDetails : ?NewCarRentalDetails;
    customPackageDetails : ?{
      destinationType : Text;
      destination : Text;
      numberOfTravelers : Nat;
      durationDays : Nat;
      preferredDates : ?Text;
    };
    railwayBookingDetails : ?{
      originStation : Text;
      destinationStation : Text;
      travelDate : Text;
      passengerCount : Nat;
      railClass : Text;
    };
    flightBookingDetails : ?{
      originCity : Text;
      destinationCity : Text;
      departureDate : Text;
      returnDate : ?Text;
      tripType : Text;
      passengerCount : Nat;
      cabinClass : Text;
    };
    hotelBookingDetails : ?{
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
  };

  // Type for new actor (Map values are now new inquiry type)
  type NewActor = { inquiries : Map.Map<Nat, NewCustomerInquiry> };

  // The migration
  public func run(old : OldActor) : NewActor {
    let newInquiries = old.inquiries.map<Nat, OldCustomerInquiry, NewCustomerInquiry>(
      func(_id, oldInquiry) {
        {
          oldInquiry with
          rentalDetails = switch (oldInquiry.rentalDetails) {
            case (?oldDetails) {
              ?{
                oldDetails with
                pricingMode = null;
                estimatedDays = null;
              };
            };
            case (null) { null };
          };
        };
      }
    );
    { inquiries = newInquiries };
  };
};
