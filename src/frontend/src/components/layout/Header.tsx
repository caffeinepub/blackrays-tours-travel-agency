import { Link, useNavigate } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/packages', label: 'Tour Packages' },
    { to: '/car-rentals', label: 'Car Rentals' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (to: string) => {
    setIsOpen(false);
    navigate({ to });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/generated/blackrays-logo.dim_512x512.png"
            alt="Blackrays Car Rentals & Tours and Travels"
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-xl font-bold tracking-tight">
            Blackrays Car Rentals & Tours and Travels
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              Admin
            </Link>
          )}
          <LoginButton />
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className="text-left text-lg font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="text-left text-lg font-medium transition-colors hover:text-primary"
                >
                  Admin
                </button>
              )}
              <div className="mt-4 pt-4 border-t">
                <LoginButton />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
