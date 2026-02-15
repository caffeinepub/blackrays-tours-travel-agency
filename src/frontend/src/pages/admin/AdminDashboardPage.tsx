import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, MessageSquare, User } from 'lucide-react';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import ProfileSetupDialog from '../../components/auth/ProfileSetupDialog';

export default function AdminDashboardPage() {
  const { data: userProfile } = useGetCallerUserProfile();

  return (
    <>
      <ProfileSetupDialog />
      <div className="py-12">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">Admin Dashboard</h1>
            {userProfile && (
              <p className="text-muted-foreground">Welcome back, {userProfile.name}!</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/admin/packages">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Package className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Manage Packages</CardTitle>
                  <CardDescription>
                    Create, edit, and delete tour packages
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/admin/inquiries">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Manage Inquiries</CardTitle>
                  <CardDescription>
                    View and respond to customer inquiries
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
