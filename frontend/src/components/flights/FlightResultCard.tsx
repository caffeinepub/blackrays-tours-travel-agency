import { Plane, Clock, Users, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FlightResult } from "@/services/flightApi";

interface FlightResultCardProps {
  flight: FlightResult;
  onBookNow: (flight: FlightResult) => void;
}

export default function FlightResultCard({ flight, onBookNow }: FlightResultCardProps) {
  return (
    <div className="home-card p-5 hover:border-accent/60 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Airline */}
        <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/5 border border-border flex items-center justify-center">
            <Plane className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{flight.airline}</p>
            <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Route & Time */}
        <div className="flex-1 flex items-center gap-3">
          <div className="text-center">
            <p className="font-bold text-xl text-foreground">{flight.departureTime}</p>
            <p className="text-xs text-muted-foreground font-medium">{flight.origin}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {flight.duration}
            </div>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-border" />
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-xs text-muted-foreground">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl text-foreground">{flight.arrivalTime}</p>
            <p className="text-xs text-muted-foreground font-medium">{flight.destination}</p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 sm:w-36 flex-shrink-0">
          <div className="text-right">
            <p className="font-black text-2xl text-foreground">
              ₹{flight.price.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground capitalize">{flight.cabinClass}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Users className="w-3 h-3" />
              {flight.seatsAvailable} seats left
            </div>
          </div>
          <Button
            onClick={() => onBookNow(flight)}
            className="btn-premium text-sm px-5 whitespace-nowrap"
            size="sm"
          >
            Book Now <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
