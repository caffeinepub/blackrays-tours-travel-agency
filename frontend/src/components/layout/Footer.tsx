import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Plane, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'blackrays-travel');

  return (
    <footer style={{ backgroundColor: 'var(--deep-charcoal)', color: 'var(--light-beige)' }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--gold-accent)' }}
              >
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-base font-bold text-white">Blackrays</div>
                <div className="text-xs" style={{ color: 'rgba(250,247,242,0.55)' }}>Car Rentals & Tours</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(250,247,242,0.65)' }}>
              Your trusted travel partner for premium car rentals, curated tour packages, flight and railway bookings across India.
            </p>
            <div className="space-y-2.5">
              <a
                href="tel:9373624669"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(250,247,242,0.70)' }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gold-accent)' }} />
                +91 93736 24669
              </a>
              <a
                href="mailto:blackraystravelagency@gmail.com"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(250,247,242,0.70)' }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--gold-accent)' }} />
                blackraystravelagency@gmail.com
              </a>
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(250,247,242,0.70)' }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--gold-accent)' }} />
                <span>Nagpur, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-5 text-white">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Tour Packages', to: '/packages' },
                { label: 'Car Rentals', to: '/car-rentals' },
                { label: 'Flight Bookings', to: '/flights' },
                { label: 'Railway Bookings', to: '/railway' },
                { label: 'Custom Packages', to: '/custom-packages' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(250,247,242,0.65)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-5 text-white">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Terms & Conditions', to: '/terms' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(250,247,242,0.65)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MD & Chairman */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-5 text-white">Leadership</h4>
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: 'var(--gold-accent)' }}>
                MD & Chairman
              </div>
              <div className="font-display text-base font-bold text-white mb-1">Om H Patil</div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(250,247,242,0.55)' }}>
                Committed to delivering world-class travel experiences across India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(250,247,242,0.45)' }}>
            © {year} Blackrays Car Rentals & Tours and Travels. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(250,247,242,0.45)' }}>
            Built with <Heart className="w-3 h-3 fill-current" style={{ color: 'var(--gold-accent)' }} /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: 'rgba(250,247,242,0.55)' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
