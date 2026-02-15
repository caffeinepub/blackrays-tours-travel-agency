import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;

  // Show loading while checking authentication
  if (loginStatus === 'initializing' || isCheckingAdmin) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Alert className="max-w-md">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription className="mt-2">
            You must be logged in to access the admin area.
          </AlertDescription>
          <Button onClick={login} className="mt-4 w-full">
            Login
          </Button>
        </Alert>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Alert variant="destructive" className="max-w-md">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription className="mt-2">
            You do not have permission to access the admin area.
          </AlertDescription>
          <Button onClick={() => navigate({ to: '/' })} variant="outline" className="mt-4 w-full">
            Return to Home
          </Button>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
