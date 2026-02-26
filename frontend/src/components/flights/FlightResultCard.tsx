import React from 'react';
import { Plane, Clock, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { FlightResult, formatFare } from '../../services/flightApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlightResultCardProps {
  flight: FlightResult;
  onBook?: (flight: FlightResult) => void;
}

function SegmentDisplay({ segment, label }: { segment: FlightResult['outbound']; label?: string }) {
  return (
    <div className="flex-1">
      {label && <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{label}</p>}
      <div className="flex items-center gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold font-display">{segment.departureTime}</p>
          <p className="text-xs font-semibold text-muted-foreground">{segment.departureAirport}</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs text-muted-foreground">{segment.duration}</p>
          <div className="w-full flex items-center gap-1">
            <div className="flex-1 h-px bg-border" />
            <Plane className="w-3 h-3 text-muted-foreground" />
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-xs text-muted-foreground">
            {segment.stops === 0 ? 'Non-stop' : `${segment.stops} stop`}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-display">{segment.arrivalTime}</p>
          <p className="text-xs font-semibold text-muted-foreground">{segment.arrivalAirport}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-foreground text-background flex items-center justify-center text-xs font-bold">
          {segment.airlineCode}
        </div>
        <span className="text-sm font-medium">{segment.airline}</span>
        <span className="text-xs text-muted-foreground">· {segment.flightNumber}</span>
      </div>
    </div>
  );
}

export default function FlightResultCard({ flight, onBook }: FlightResultCardProps) {
  const handleBook = () => {
    if (onBook) {
      onBook(flight);
    } else if (flight.bookingUrl) {
      window.open(flight.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300 overflow-hidden animate-slide-up">
      <div className="p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Flight segments */}
          <div className="flex-1 space-y-4">
            <SegmentDisplay segment={flight.outbound} label={flight.inbound ? 'Outbound' : undefined} />
            {flight.inbound && (
              <>
                <div className="border-t border-dashed border-border" />
                <SegmentDisplay segment={flight.inbound} label="Return" />
              </>
            )}
          </div>

          {/* Fare & CTA */}
          <div className="lg:w-48 flex flex-col items-end justify-between gap-3 lg:border-l lg:border-border lg:pl-4">
            <div className="text-right">
              <p className="text-2xl font-bold font-display">{formatFare(flight.fare)}</p>
              <p className="text-xs text-muted-foreground">
                {flight.inbound ? 'per person (round trip)' : 'per person'}
              </p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                {flight.refundable ? (
                  <><CheckCircle className="w-3 h-3 text-green-600" /><span className="text-xs text-green-600">Refundable</span></>
                ) : (
                  <><AlertCircle className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground">Non-refundable</span></>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <Badge variant="outline" className="text-xs justify-center">
                {flight.seatsAvailable} seats left
              </Badge>
              <Badge variant="secondary" className="text-xs justify-center capitalize">
                {flight.cabinClass.replace('_', ' ')}
              </Badge>
              <Button onClick={handleBook} className="w-full gap-1" size="sm">
                Book Now
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
