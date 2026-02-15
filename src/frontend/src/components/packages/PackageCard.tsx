import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign } from 'lucide-react';
import type { TourPackage } from '../../backend';

interface PackageCardProps {
  package: TourPackage;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-warm transition-shadow">
      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <h3 className="font-display text-2xl font-bold text-center px-4">
          {pkg.title}
        </h3>
      </div>
      <CardHeader>
        <CardDescription className="line-clamp-3">
          {pkg.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{Number(pkg.duration)} {Number(pkg.duration) === 1 ? 'Day' : 'Days'}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">${Number(pkg.price).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/packages/$packageId" params={{ packageId: pkg.id }} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
