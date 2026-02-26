import { Link } from '@tanstack/react-router';
import { Clock, IndianRupee, ArrowRight } from 'lucide-react';
import type { TourPackage } from '../../backend';

interface PackageCardProps {
  package: TourPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Link
      to="/packages/$id"
      params={{ id: pkg.id }}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 12px -2px rgba(31,41,55,0.08)',
      }}
    >
      {/* Card Header accent bar */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: 'var(--gold-accent)' }}
      />

      <div className="p-6">
        <h3
          className="font-display text-lg font-bold mb-2 group-hover:underline transition-all line-clamp-2"
          style={{ color: 'var(--charcoal)' }}
        >
          {pkg.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5 line-clamp-3"
          style={{ color: 'var(--warm-grey)' }}
        >
          {pkg.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
              <IndianRupee className="w-4 h-4" style={{ color: 'var(--gold-accent)' }} />
              {Number(pkg.price).toLocaleString('en-IN')}
            </div>
            <div
              className="w-px h-4"
              style={{ backgroundColor: 'var(--border)' }}
            />
            <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--warm-grey)' }}>
              <Clock className="w-3.5 h-3.5" />
              {Number(pkg.duration)} days
            </div>
          </div>
          <div
            className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
            style={{ color: 'var(--charcoal)' }}
          >
            View <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
