import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = typeof window !== 'undefined' ? window.location.hostname : 'blackrays-tours-travels';

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm overflow-hidden flex-shrink-0 bg-background/10">
                <img
                  src="/assets/generated/blackrays-logo.dim_512x512.png"
                  alt="Blackrays Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display font-bold text-sm leading-tight">Blackrays</p>
                <p className="text-xs opacity-70 leading-tight">Car Rentals & Tours and Travels</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Premium travel experiences and reliable car rental services across India. Your journey, our commitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 opacity-90">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Tour Packages', to: '/packages' },
                { label: 'Car Rentals', to: '/car-rentals' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bookings */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 opacity-90">
              Bookings
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Custom Packages', to: '/custom-packages' },
                { label: 'Railway Bookings', to: '/railway-bookings' },
                { label: 'Flight Bookings', to: '/flight-bookings' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 opacity-90">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="text-sm font-medium">9373624669</p>
                  <p className="text-xs opacity-60">Call or WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="text-sm font-medium break-all">blackraystravelagency@gmail.com</p>
                  <p className="text-xs opacity-60">Email us anytime</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
                <div>
                  <p className="text-sm font-medium">MD & Chairman: Om H Patil</p>
                  <p className="text-xs opacity-60">Blackrays Car Rentals & Tours and Travels</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-50">
            © {year} Blackrays Car Rentals & Tours and Travels. All rights reserved.
          </p>
          <p className="text-xs opacity-50 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 fill-current text-red-400" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appId)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
