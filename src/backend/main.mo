import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let packages = Map.empty<Text, TourPackage>();
  let inquiries = Map.empty<Nat, CustomerInquiry>();
  var nextInquiryId : Nat = 0;

  public type Status = {
    #new;
    #inProgress;
    #resolved;
  };

  public type TourPackage = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    duration : Nat; // Duration in days
  };

  public type VehicleType = {
    #suv;
    #sedan;
  };

  public type InquiryCategory = {
    #tourInquiry;
    #carRental;
  };

  public type CarRentalDetails = {
    vehicleType : VehicleType;
    driverRequired : Bool;
  };

  public type CustomerInquiry = {
    id : Nat;
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
    status : Status;
    category : InquiryCategory;
    rentalDetails : ?CarRentalDetails;
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Customer-facing APIs (public, no authentication required)
  public query func getPublicPackages() : async [TourPackage] {
    packages.values().toArray();
  };

  public shared func submitTourInquiry(name : Text, phoneNumber : Text, email : Text, message : Text) : async () {
    let inquiry : CustomerInquiry = {
      id = nextInquiryId;
      name;
      phoneNumber;
      email;
      message;
      status = #new;
      category = #tourInquiry;
      rentalDetails = null;
    };
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  public shared func submitCarRental(
    name : Text,
    phoneNumber : Text,
    email : Text,
    vehicleType : VehicleType,
    driverRequired : Bool,
  ) : async () {
    let rentalDetails : CarRentalDetails = {
      vehicleType;
      driverRequired;
    };
    let inquiry : CustomerInquiry = {
      id = nextInquiryId;
      name;
      phoneNumber;
      email;
      message = "Car rental inquiry";
      status = #new;
      category = #carRental;
      rentalDetails = ?rentalDetails;
    };
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  // Authenticated admin area
  public shared ({ caller }) func createPackage(id : Text, title : Text, description : Text, price : Nat, duration : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create packages");
    };
    let tourPackage : TourPackage = { id; title; description; price; duration };
    packages.add(id, tourPackage);
  };

  public shared ({ caller }) func updatePackage(id : Text, newPackage : TourPackage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update packages");
    };
    if (not packages.containsKey(id)) {
      Runtime.trap("Package not found");
    };
    packages.add(id, newPackage);
  };

  public shared ({ caller }) func deletePackage(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete packages");
    };
    if (not packages.containsKey(id)) {
      Runtime.trap("Package not found");
    };
    packages.remove(id);
  };

  public query ({ caller }) func getAllInquiries() : async [CustomerInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiries");
    };
    inquiries.values().toArray();
  };

  public shared ({ caller }) func updateInquiryStatus(inquiryId : Nat, newStatus : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update inquiry status");
    };
    switch (inquiries.get(inquiryId)) {
      case (null) {
        Runtime.trap("Inquiry not found");
      };
      case (?inquiry) {
        let updatedInquiry : CustomerInquiry = {
          id = inquiry.id;
          name = inquiry.name;
          phoneNumber = inquiry.phoneNumber;
          email = inquiry.email;
          message = inquiry.message;
          status = newStatus;
          category = inquiry.category;
          rentalDetails = inquiry.rentalDetails;
        };
        inquiries.add(inquiryId, updatedInquiry);
      };
    };
  };
};
