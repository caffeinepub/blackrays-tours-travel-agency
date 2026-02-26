import React from 'react';
import { Loader2, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  if (isInitializing || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <ShieldOff className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Authentication Required</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You need to log in to access the admin area.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <ShieldOff className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You don't have permission to access the admin area. Please contact the administrator.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
