import { Link } from '@tanstack/react-router';
import { Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { TourPackage } from '../../backend';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  package: TourPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <div className="border border-border rounded-sm bg-card hover:shadow-premium-md transition-shadow flex flex-col">
      <div className="p-6 flex-1">
        <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">
          {pkg.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {pkg.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{pkg.duration.toString()} days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold text-foreground">₹{pkg.price.toString()}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button asChild variant="outline" className="w-full">
          <Link to="/packages/$id" params={{ id: pkg.id }}>
            View Details <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
