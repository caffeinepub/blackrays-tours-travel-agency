import { useGetAllInquiries, useUpdateInquiryStatus } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare, Car, Package } from 'lucide-react';
import { Status, InquiryCategory } from '../../backend';
import ProfileSetupDialog from '../../components/auth/ProfileSetupDialog';

export default function AdminInquiriesPage() {
  const { data: inquiries, isLoading, error } = useGetAllInquiries();
  const updateStatus = useUpdateInquiryStatus();

  const getStatusVariant = (status: Status): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case Status.new_:
        return 'default';
      case Status.inProgress:
        return 'secondary';
      case Status.resolved:
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Status): string => {
    switch (status) {
      case Status.new_:
        return 'New';
      case Status.inProgress:
        return 'In Progress';
      case Status.resolved:
        return 'Resolved';
      default:
        return 'Unknown';
    }
  };

  const getCategoryLabel = (category: InquiryCategory): string => {
    switch (category) {
      case InquiryCategory.tourInquiry:
        return 'Tour Inquiry';
      case InquiryCategory.carRental:
        return 'Car Rental';
      default:
        return 'Unknown';
    }
  };

  const getCategoryIcon = (category: InquiryCategory) => {
    switch (category) {
      case InquiryCategory.tourInquiry:
        return <Package className="h-4 w-4" />;
      case InquiryCategory.carRental:
        return <Car className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleStatusChange = async (inquiryId: bigint, newStatus: string) => {
    let status: Status;
    switch (newStatus) {
      case 'new':
        status = Status.new_;
        break;
      case 'inProgress':
        status = Status.inProgress;
        break;
      case 'resolved':
        status = Status.resolved;
        break;
      default:
        return;
    }

    try {
      await updateStatus.mutateAsync({ inquiryId, newStatus: status });
    } catch (error) {
      console.error('Failed to update inquiry status:', error);
    }
  };

  return (
    <>
      <ProfileSetupDialog />
      <div className="py-12">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">Manage Inquiries</h1>
            <p className="text-muted-foreground">View and respond to customer inquiries</p>
          </div>

          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load inquiries. Please try again.</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && inquiries && inquiries.length === 0 && (
            <Alert>
              <MessageSquare className="h-4 w-4" />
              <AlertTitle>No Inquiries</AlertTitle>
              <AlertDescription>
                You haven't received any customer inquiries yet.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && inquiries && inquiries.length > 0 && (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <Card key={Number(inquiry.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <CardTitle>{inquiry.name}</CardTitle>
                          <Badge variant={getStatusVariant(inquiry.status)}>
                            {getStatusLabel(inquiry.status)}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            {getCategoryIcon(inquiry.category)}
                            {getCategoryLabel(inquiry.category)}
                          </Badge>
                        </div>
                        <CardDescription className="space-y-1">
                          <div>{inquiry.email}</div>
                          <div className="font-medium">Phone: {inquiry.phoneNumber}</div>
                        </CardDescription>
                      </div>
                      <Select
                        value={inquiry.status}
                        onValueChange={(value) => handleStatusChange(inquiry.id, value)}
                        disabled={updateStatus.isPending}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="inProgress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {inquiry.category === InquiryCategory.carRental && inquiry.rentalDetails && (
                      <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          Car Rental Details
                        </h4>
                        <div className="grid gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Vehicle Type: </span>
                            <span className="font-medium">
                              {inquiry.rentalDetails.vehicleType === 'suv' ? 'SUV (₹5,000/day)' : 'Sedan (₹2,500/day)'}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Driver Required: </span>
                            <span className="font-medium">
                              {inquiry.rentalDetails.driverRequired ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-line">{inquiry.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
