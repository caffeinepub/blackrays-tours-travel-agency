import { Phone, Mail, User } from 'lucide-react';

export default function HomeContactBar() {
  return (
    <div
      className="w-full py-4 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* MD & Chairman */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--warm-sand)' }}
            >
              <User className="w-4 h-4" style={{ color: 'var(--charcoal)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--warm-grey)' }}>
                MD & Chairman
              </div>
              <div className="text-sm font-bold" style={{ color: 'var(--charcoal)' }}>Om H Patil</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8" style={{ backgroundColor: 'var(--border)' }} />

          {/* Phone */}
          <a
            href="tel:9373624669"
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ backgroundColor: 'var(--warm-sand)' }}
            >
              <Phone className="w-4 h-4" style={{ color: 'var(--charcoal)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--warm-grey)' }}>
                Call Us
              </div>
              <div className="text-sm font-bold group-hover:underline" style={{ color: 'var(--charcoal)' }}>
                +91 93736 24669
              </div>
            </div>
          </a>

          <div className="hidden sm:block w-px h-8" style={{ backgroundColor: 'var(--border)' }} />

          {/* Email */}
          <a
            href="mailto:blackraystravelagency@gmail.com"
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--warm-sand)' }}
            >
              <Mail className="w-4 h-4" style={{ color: 'var(--charcoal)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--warm-grey)' }}>
                Email Us
              </div>
              <div className="text-sm font-bold group-hover:underline" style={{ color: 'var(--charcoal)' }}>
                blackraystravelagency@gmail.com
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
