import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Loader2, MessageSquare, Car, MapPin, Phone, Mail, Plane, Train, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllInquiries, useUpdateInquiryStatus } from '../../hooks/useQueries';
import { CustomerInquiry, Status, InquiryCategory, CarType } from '../../backend';
import { toast } from 'sonner';

function statusLabel(status: Status): string {
  switch (status) {
    case Status.new_: return 'New';
    case Status.inProgress: return 'In Progress';
    case Status.resolved: return 'Resolved';
    default: return 'Unknown';
  }
}

function statusVariant(status: Status): 'default' | 'secondary' | 'outline' {
  switch (status) {
    case Status.new_: return 'default';
    case Status.inProgress: return 'secondary';
    case Status.resolved: return 'outline';
    default: return 'outline';
  }
}

function vehicleLabel(type: CarType): string {
  return type === CarType.suv ? 'SUV' : 'Sedan';
}

function categoryLabel(category: InquiryCategory): string {
  switch (category) {
    case InquiryCategory.tourInquiry: return 'Tour';
    case InquiryCategory.carRental: return 'Car Rental';
    case InquiryCategory.customPackage: return 'Custom Package';
    case InquiryCategory.railwayBooking: return 'Railway';
    case InquiryCategory.flightBooking: return 'Flight';
    case InquiryCategory.hotelBooking: return 'Hotel';
    default: return 'Inquiry';
  }
}

function categoryIcon(category: InquiryCategory) {
  switch (category) {
    case InquiryCategory.carRental:
      return <Car className="w-4 h-4 text-background" />;
    case InquiryCategory.flightBooking:
      return <Plane className="w-4 h-4 text-background" />;
    case InquiryCategory.railwayBooking:
      return <Train className="w-4 h-4 text-background" />;
    case InquiryCategory.hotelBooking:
      return <Hotel className="w-4 h-4 text-background" />;
    default:
      return <MapPin className="w-4 h-4 text-foreground" />;
  }
}

interface InquiryCardProps {
  inquiry: CustomerInquiry;
}

function InquiryCard({ inquiry }: InquiryCardProps) {
  const updateStatus = useUpdateInquiryStatus();
  const isSpecialCategory =
    inquiry.category !== InquiryCategory.tourInquiry &&
    inquiry.category !== InquiryCategory.customPackage;

  const handleStatusChange = async (value: string) => {
    const statusMap: Record<string, Status> = {
      new: Status.new_,
      inProgress: Status.inProgress,
      resolved: Status.resolved,
    };
    const newStatus = statusMap[value];
    if (!newStatus) return;
    try {
      await updateStatus.mutateAsync({
        inquiryId: inquiry.id,
        newStatus,
      });
      toast.success('Status updated.');
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const currentStatusKey =
    inquiry.status === Status.new_
      ? 'new'
      : inquiry.status === Status.inProgress
      ? 'inProgress'
      : 'resolved';

  return (
    <div className="border border-border rounded-sm p-5 bg-card">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 ${
              isSpecialCategory ? 'bg-foreground' : 'bg-secondary'
            }`}
          >
            {categoryIcon(inquiry.category)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">{inquiry.name}</h3>
              <Badge variant={isSpecialCategory ? 'default' : 'secondary'} className="text-xs">
                {categoryLabel(inquiry.category)}
              </Badge>
              <Badge variant={statusVariant(inquiry.status)} className="text-xs">
                {statusLabel(inquiry.status)}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {inquiry.phoneNumber}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {inquiry.email}
              </span>
            </div>
          </div>
        </div>

        {/* Status Selector */}
        <div className="flex-shrink-0">
          <Select value={currentStatusKey} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      {inquiry.message && inquiry.message !== 'Car rental inquiry' &&
        inquiry.message !== 'Custom travel package inquiry' &&
        inquiry.message !== 'Railway booking inquiry' &&
        inquiry.message !== 'Flight booking inquiry' &&
        inquiry.message !== 'Hotel booking inquiry' && (
        <div className="mb-4 p-3 rounded-sm bg-muted text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{inquiry.message}</span>
          </div>
        </div>
      )}

      {/* Car Rental Details */}
      {inquiry.category === InquiryCategory.carRental && inquiry.rentalDetails && (
        <div className="mt-3 p-3 rounded-sm bg-muted text-sm space-y-1">
          <div className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" /> Car Rental Details
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
            <span>Vehicle: <span className="font-medium text-foreground">{vehicleLabel(inquiry.rentalDetails.vehicleType)}</span></span>
            <span>Driver: <span className="font-medium text-foreground">{inquiry.rentalDetails.driverRequired ? 'Yes' : 'No'}</span></span>
            {inquiry.rentalDetails.estimatedDistance != null && (
              <span>Distance: <span className="font-medium text-foreground">{inquiry.rentalDetails.estimatedDistance.toString()} km</span></span>
            )}
            {inquiry.rentalDetails.estimatedFare != null && (
              <span>Est. Fare: <span className="font-medium text-foreground">₹{inquiry.rentalDetails.estimatedFare.toLocaleString('en-IN')}</span></span>
            )}
          </div>
        </div>
      )}

      {/* Flight Booking Details */}
      {inquiry.category === InquiryCategory.flightBooking && inquiry.flightBookingDetails && (
        <div className="mt-3 p-3 rounded-sm bg-muted text-sm space-y-1">
          <div className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5" /> Flight Booking Details
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
            <span>From: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.originCity}</span></span>
            <span>To: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.destinationCity}</span></span>
            <span>Departure: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.departureDate}</span></span>
            {inquiry.flightBookingDetails.returnDate && (
              <span>Return: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.returnDate}</span></span>
            )}
            <span>Trip: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.tripType}</span></span>
            <span>Passengers: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.passengerCount.toString()}</span></span>
            <span>Class: <span className="font-medium text-foreground">{inquiry.flightBookingDetails.cabinClass}</span></span>
          </div>
        </div>
      )}

      {/* Railway Booking Details */}
      {inquiry.category === InquiryCategory.railwayBooking && inquiry.railwayBookingDetails && (
        <div className="mt-3 p-3 rounded-sm bg-muted text-sm space-y-1">
          <div className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Train className="w-3.5 h-3.5" /> Railway Booking Details
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
            <span>From: <span className="font-medium text-foreground">{inquiry.railwayBookingDetails.originStation}</span></span>
            <span>To: <span className="font-medium text-foreground">{inquiry.railwayBookingDetails.destinationStation}</span></span>
            <span>Date: <span className="font-medium text-foreground">{inquiry.railwayBookingDetails.travelDate}</span></span>
            <span>Passengers: <span className="font-medium text-foreground">{inquiry.railwayBookingDetails.passengerCount.toString()}</span></span>
            <span>Class: <span className="font-medium text-foreground">{inquiry.railwayBookingDetails.railClass}</span></span>
          </div>
        </div>
      )}

      {/* Hotel Booking Details */}
      {inquiry.category === InquiryCategory.hotelBooking && inquiry.hotelBookingDetails && (
        <div className="mt-3 p-3 rounded-sm bg-muted text-sm space-y-1">
          <div className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Hotel className="w-3.5 h-3.5" /> Hotel Booking Details
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
            <span>Destination: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.destination}</span></span>
            {inquiry.hotelBookingDetails.hotelName && (
              <span>Hotel: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.hotelName}</span></span>
            )}
            <span>Check-In: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.checkInDate}</span></span>
            <span>Check-Out: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.checkOutDate}</span></span>
            <span>Guests: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.numberOfGuests.toString()}</span></span>
            <span>Rooms: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.numberOfRooms.toString()}</span></span>
            <span>Room Type: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.roomTypePreference}</span></span>
            {inquiry.hotelBookingDetails.starRating != null && (
              <span>Stars: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.starRating.toString()} ★</span></span>
            )}
            {inquiry.hotelBookingDetails.location && (
              <span>Location: <span className="font-medium text-foreground">{inquiry.hotelBookingDetails.location}</span></span>
            )}
            {inquiry.hotelBookingDetails.pricePerNight != null && (
              <span>Price/Night: <span className="font-medium text-foreground">₹{inquiry.hotelBookingDetails.pricePerNight.toLocaleString('en-IN')}</span></span>
            )}
          </div>
        </div>
      )}

      {/* Custom Package Details */}
      {inquiry.category === InquiryCategory.customPackage && inquiry.customPackageDetails && (
        <div className="mt-3 p-3 rounded-sm bg-muted text-sm space-y-1">
          <div className="font-semibold text-foreground mb-2">Custom Package Details</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
            <span>Destination: <span className="font-medium text-foreground">{inquiry.customPackageDetails.destination}</span></span>
            <span>Type: <span className="font-medium text-foreground">{inquiry.customPackageDetails.destinationType}</span></span>
            <span>Travelers: <span className="font-medium text-foreground">{inquiry.customPackageDetails.numberOfTravelers.toString()}</span></span>
            <span>Duration: <span className="font-medium text-foreground">{inquiry.customPackageDetails.durationDays.toString()} days</span></span>
            {inquiry.customPackageDetails.preferredDates && (
              <span className="col-span-2">Dates: <span className="font-medium text-foreground">{inquiry.customPackageDetails.preferredDates}</span></span>
            )}
          </div>
        </div>
      )}

      {/* Inquiry ID */}
      <div className="mt-3 text-xs text-muted-foreground">
        Inquiry #{inquiry.id.toString()}
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  const { data: inquiries, isLoading, error } = useGetAllInquiries();
  const [filter, setFilter] = useState<string>('all');

  const filtered = inquiries?.filter((inq) => {
    if (filter === 'all') return true;
    return inq.category === filter;
  }) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin">
            <Button variant="ghost" size="icon" className="rounded-sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Customer Inquiries</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {inquiries?.length ?? 0} total inquiries
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {[
            { value: 'all', label: 'All' },
            { value: InquiryCategory.tourInquiry, label: 'Tour' },
            { value: InquiryCategory.carRental, label: 'Car Rental' },
            { value: InquiryCategory.flightBooking, label: 'Flight' },
            { value: InquiryCategory.railwayBooking, label: 'Railway' },
            { value: InquiryCategory.hotelBooking, label: 'Hotel' },
            { value: InquiryCategory.customPackage, label: 'Custom Package' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors border"
              style={{
                backgroundColor: filter === f.value ? 'var(--deep-charcoal)' : 'transparent',
                color: filter === f.value ? 'white' : 'var(--charcoal)',
                borderColor: filter === f.value ? 'var(--deep-charcoal)' : 'var(--border)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive text-sm">
            Failed to load inquiries. Please try again.
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No inquiries found.
          </div>
        )}

        {!isLoading && !error && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((inquiry) => (
              <InquiryCard key={inquiry.id.toString()} inquiry={inquiry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
