import { Link } from '@tanstack/react-router';
import { Package, MessageSquare, ArrowRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import ProfileSetupDialog from '../../components/auth/ProfileSetupDialog';

export default function AdminDashboardPage() {
  const { data: profile } = useGetCallerUserProfile();

  return (
    <div className="bg-background min-h-screen">
      <ProfileSetupDialog />

      {/* Header */}
      <section className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-6 h-6 opacity-70" />
            <span className="text-sm opacity-70 uppercase tracking-wider font-medium">Admin Dashboard</span>
          </div>
          <h1 className="font-display text-3xl font-bold">
            Welcome{profile?.name ? `, ${profile.name}` : ''}!
          </h1>
          <p className="opacity-70 mt-2">Manage your tour packages and customer inquiries.</p>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="border border-border rounded-sm p-6 bg-card hover:shadow-premium-md transition-shadow">
              <div className="w-12 h-12 bg-foreground rounded-sm flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-background" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Tour Packages</h2>
              <p className="text-muted-foreground text-sm mb-5">
                Create, edit, and manage all tour packages available to customers.
              </p>
              <Button asChild className="w-full">
                <Link to="/admin/packages">
                  Manage Packages <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="border border-border rounded-sm p-6 bg-card hover:shadow-premium-md transition-shadow">
              <div className="w-12 h-12 bg-foreground rounded-sm flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-background" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Customer Inquiries</h2>
              <p className="text-muted-foreground text-sm mb-5">
                View and manage all customer inquiries including tour and car rental bookings.
              </p>
              <Button asChild className="w-full">
                <Link to="/admin/inquiries">
                  View Inquiries <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
