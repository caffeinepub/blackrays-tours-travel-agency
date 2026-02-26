import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Plane, ChevronDown } from 'lucide-react';
import LoginButton from '../auth/LoginButton';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Packages', to: '/packages' },
  { label: 'Car Rentals', to: '/car-rentals' },
  {
    label: 'Bookings',
    children: [
      { label: 'Flight Bookings', to: '/flights' },
      { label: 'Railway Bookings', to: '/railway' },
      { label: 'Hotel & Hospitality', to: '/hotels' },
      { label: 'Custom Packages', to: '/custom-packages' },
    ],
  },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 12px -2px rgba(31,41,55,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--deep-charcoal)' }}
            >
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-base font-bold leading-tight" style={{ color: 'var(--charcoal)' }}>
                Blackrays
              </div>
              <div className="text-xs leading-tight" style={{ color: 'var(--warm-grey)' }}>
                Car Rentals & Tours
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: 'var(--charcoal)' }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-52 rounded-xl py-1.5 z-50"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--border)',
                        boxShadow: '0 8px 32px -8px rgba(31,41,55,0.18)',
                      }}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-lightBeige"
                          style={{ color: 'var(--charcoal)' }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to!}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-lightBeige"
                  style={{ color: 'var(--charcoal)' }}
                  activeProps={{ style: { color: 'var(--deep-charcoal)', fontWeight: '700', backgroundColor: 'var(--warm-sand)' } }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LoginButton />
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--charcoal)' }}
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
        <div
          className="lg:hidden border-t"
          style={{ backgroundColor: 'var(--light-beige)', borderColor: 'var(--border)' }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div
                    className="px-3 py-2 text-xs font-bold tracking-widest uppercase"
                    style={{ color: 'var(--warm-grey)' }}
                  >
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                      style={{ color: 'var(--charcoal)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to!}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: 'var(--charcoal)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
