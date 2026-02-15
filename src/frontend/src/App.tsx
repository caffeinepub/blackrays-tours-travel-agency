import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailsPage from './pages/PackageDetailsPage';
import ContactInquiryPage from './pages/ContactInquiryPage';
import CarRentalsPage from './pages/CarRentalsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPackagesPage from './pages/admin/AdminPackagesPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminRouteGuard from './components/auth/AdminRouteGuard';

const rootRoute = createRootRoute({
  component: SiteLayout,
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
  path: '/packages/$packageId',
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
