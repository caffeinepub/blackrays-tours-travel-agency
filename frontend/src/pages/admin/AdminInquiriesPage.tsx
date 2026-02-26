import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Loader2, MessageSquare, Car, MapPin, Phone, Mail } from 'lucide-react';
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
import { CustomerInquiry, Status, InquiryCategory, VehicleType } from '../../backend';
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

function vehicleLabel(type: VehicleType): string {
  return type === VehicleType.suv ? 'SUV' : 'Sedan';
}

interface InquiryCardProps {
  inquiry: CustomerInquiry;
}

function InquiryCard({ inquiry }: InquiryCardProps) {
  const updateStatus = useUpdateInquiryStatus();
  const isCarRental = inquiry.category === InquiryCategory.carRental;

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

  const currentStatusKey = inquiry.status === Status.new_ ? 'new' : inquiry.status === Status.inProgress ? 'inProgress' : 'resolved';

  return (
    <div className="border border-border rounded-sm p-5 bg-card">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 ${isCarRental ? 'bg-foreground' : 'bg-secondary'}`}>
            {isCarRental ? (
              <Car className="w-4 h-4 text-background" />
            ) : (
              <MapPin className="w-4 h-4 text-foreground" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{inquiry.name}</h3>
              <Badge variant={isCarRental ? 'default' : 'secondary'} className="text-xs">
                {isCarRental ? 'Car Rental' : 'Tour Inquiry'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">ID: {inquiry.id.toString()}</p>
          </div>
        </div>
        <Badge variant={statusVariant(inquiry.status)}>
          {statusLabel(inquiry.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          <a href={`tel:${inquiry.phoneNumber}`} className="hover:text-foreground transition-colors">
            {inquiry.phoneNumber}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
          <a href={`mailto:${inquiry.email}`} className="hover:text-foreground transition-colors truncate">
            {inquiry.email}
          </a>
        </div>
      </div>

      {isCarRental && inquiry.rentalDetails && (
        <div className="bg-secondary/30 rounded-sm p-3 mb-4 border border-border">
          <p className="text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Car Rental Details</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Vehicle: <strong className="text-foreground">{vehicleLabel(inquiry.rentalDetails.vehicleType)}</strong></span>
            <span>Driver: <strong className="text-foreground">{inquiry.rentalDetails.driverRequired ? 'Required' : 'Not Required'}</strong></span>
          </div>
        </div>
      )}

      {!isCarRental && inquiry.message && (
        <div className="bg-secondary/30 rounded-sm p-3 mb-4 border border-border">
          <p className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">Message</p>
          <p className="text-sm text-muted-foreground">{inquiry.message}</p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Update Status:</span>
        <Select
          value={currentStatusKey}
          onValueChange={handleStatusChange}
          disabled={updateStatus.isPending}
        >
          <SelectTrigger className="w-40 h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="inProgress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        {updateStatus.isPending && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  const { data: inquiries, isLoading, isError } = useGetAllInquiries();
  const [filter, setFilter] = useState<'all' | 'tour' | 'car'>('all');

  const filtered = inquiries?.filter((inq) => {
    if (filter === 'tour') return inq.category === InquiryCategory.tourInquiry;
    if (filter === 'car') return inq.category === InquiryCategory.carRental;
    return true;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold">Customer Inquiries</h1>
          <p className="opacity-70 mt-1">
            {inquiries ? `${inquiries.length} total inquiries` : 'Loading...'}
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3">
            {[
              { key: 'all', label: 'All' },
              { key: 'tour', label: 'Tour Inquiries' },
              { key: 'car', label: 'Car Rentals' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as typeof filter)}
                className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                  filter === tab.key
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="text-center py-24">
              <p className="text-destructive font-medium mb-2">Failed to load inquiries</p>
              <p className="text-muted-foreground text-sm">Please try again later.</p>
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((inquiry) => (
                <InquiryCard key={inquiry.id.toString()} inquiry={inquiry} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-border rounded-sm">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Inquiries Yet</h3>
              <p className="text-muted-foreground">
                {filter === 'all'
                  ? 'Customer inquiries will appear here once submitted.'
                  : `No ${filter === 'tour' ? 'tour' : 'car rental'} inquiries found.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
