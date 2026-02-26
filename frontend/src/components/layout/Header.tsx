import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

const mainNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Tour Packages', to: '/packages' },
  { label: 'Car Rentals', to: '/car-rentals' },
];

const bookingLinks = [
  { label: 'Custom Packages', to: '/custom-packages' },
  { label: 'Railway Bookings', to: '/railway-bookings' },
  { label: 'Flight Bookings', to: '/flight-bookings' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { identity } = useInternetIdentity();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm overflow-hidden flex-shrink-0">
              <img
                src="/assets/generated/blackrays-logo.dim_512x512.png"
                alt="Blackrays Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-800 text-sm leading-tight text-foreground block">
                Blackrays
              </span>
              <span className="text-xs text-muted-foreground leading-tight block">
                Car Rentals & Tours and Travels
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent"
                activeProps={{ className: 'px-3 py-2 text-sm font-medium text-foreground bg-accent rounded-sm' }}
                activeOptions={{ exact: link.to === '/' }}
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Bookings
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-sm shadow-premium-md py-1 z-50">
                  {bookingLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      activeProps={{ className: 'block px-4 py-2 text-sm text-foreground bg-accent' }}
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {identity && (
              <Link
                to="/admin"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent"
                activeProps={{ className: 'px-3 py-2 text-sm font-medium text-foreground bg-accent rounded-sm' }}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LoginButton />
            <button
              className="md:hidden p-2 rounded-sm hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent"
                activeProps={{ className: 'px-3 py-2.5 text-sm font-medium text-foreground bg-accent rounded-sm' }}
                activeOptions={{ exact: link.to === '/' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Bookings</p>
            </div>
            {bookingLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent pl-6"
                activeProps={{ className: 'px-3 py-2.5 text-sm font-medium text-foreground bg-accent rounded-sm pl-6' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {identity && (
              <Link
                to="/admin"
                className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
