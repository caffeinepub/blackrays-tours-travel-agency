import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import ContactInquiryPage from './pages/ContactInquiryPage';
import CarRentalsPage from './pages/CarRentalsPage';
import CustomPackagesPage from './pages/CustomPackagesPage';
import RailwayBookingsPage from './pages/RailwayBookingsPage';
import FlightBookingsPage from './pages/FlightBookingsPage';
import TermsPage from './pages/TermsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPackagesPage from './pages/admin/AdminPackagesPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminRouteGuard from './components/auth/AdminRouteGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/packages',
  component: PackagesPage,
});

const packageDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/packages/$id',
  component: PackageDetailsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactInquiryPage,
});

const carRentalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/car-rentals',
  component: CarRentalsPage,
});

const customPackagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/custom-packages',
  component: CustomPackagesPage,
});

const railwayBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/railway-bookings',
  component: RailwayBookingsPage,
});

const flightBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/flight-bookings',
  component: FlightBookingsPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminRouteGuard>
      <AdminDashboardPage />
    </AdminRouteGuard>
  ),
});

const adminPackagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/packages',
  component: () => (
    <AdminRouteGuard>
      <AdminPackagesPage />
    </AdminRouteGuard>
  ),
});

const adminInquiriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/inquiries',
  component: () => (
    <AdminRouteGuard>
      <AdminInquiriesPage />
    </AdminRouteGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  packagesRoute,
  packageDetailsRoute,
  contactRoute,
  carRentalsRoute,
  customPackagesRoute,
  railwayBookingsRoute,
  flightBookingsRoute,
  termsRoute,
  adminRoute,
  adminPackagesRoute,
  adminInquiriesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
