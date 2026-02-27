import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { airports, searchAirports, formatAirport, type Airport } from "@/data/airports";

interface FlightSearchFormProps {
  onSearch: (params: {
    origin: string;
    originCode: string;
    destination: string;
    destinationCode: string;
    departureDate: string;
    returnDate?: string;
    tripType: string;
    passengers: number;
    cabinClass: string;
  }) => void;
  isLoading?: boolean;
}

function AirportInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (airport: Airport) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length >= 2) {
      setResults(searchAirports(q));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  };

  const handleSelect = (airport: Airport) => {
    setQuery(`${airport.city} (${airport.iataCode})`);
    setOpen(false);
    onChange(airport);
  };

  return (
    <div className="relative" ref={ref}>
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
        {label}
      </Label>
      <div className="relative">
        <Input
          value={query}
          onChange={handleInput}
          placeholder={placeholder}
          className="pr-8 border-border focus:border-accent"
          onFocus={() => query.length >= 2 && setOpen(true)}
        />
        {query && (
          <button
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => { setQuery(""); setResults([]); setOpen(false); }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-card border border-border rounded-xl overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {results.map((airport) => (
              <button
                key={airport.iataCode}
                className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                onClick={() => handleSelect(airport)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm text-foreground">{airport.city}</span>
                    <span className="text-muted-foreground text-xs ml-2">{airport.country}</span>
                  </div>
                  <span className="font-bold text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {airport.iataCode}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{airport.airportName}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState("oneWay");
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate) return;
    onSearch({
      origin: origin.city,
      originCode: origin.iataCode,
      destination: destination.city,
      destinationCode: destination.iataCode,
      departureDate,
      returnDate: tripType === "roundTrip" ? returnDate : undefined,
      tripType,
      passengers,
      cabinClass,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Trip Type */}
      <div className="flex gap-3">
        {["oneWay", "roundTrip"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              tripType === type
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-accent"
            }`}
          >
            {type === "oneWay" ? "One Way" : "Round Trip"}
          </button>
        ))}
      </div>

      {/* Origin & Destination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AirportInput
          label="From"
          value={origin ? `${origin.city} (${origin.iataCode})` : ""}
          onChange={setOrigin}
          placeholder="City or airport code"
        />
        <AirportInput
          label="To"
          value={destination ? `${destination.city} (${destination.iataCode})` : ""}
          onChange={setDestination}
          placeholder="City or airport code"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Departure Date
          </Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="border-border focus:border-accent"
          />
        </div>
        {tripType === "roundTrip" && (
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Return Date
            </Label>
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departureDate || new Date().toISOString().split("T")[0]}
              className="border-border focus:border-accent"
            />
          </div>
        )}
      </div>

      {/* Passengers & Class */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Passengers
          </Label>
          <Input
            type="number"
            min={1}
            max={9}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="border-border focus:border-accent"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Cabin Class
          </Label>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="w-full border border-border bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full btn-premium py-3 text-base font-semibold"
        disabled={isLoading || !origin || !destination || !departureDate}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Searching Flights...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4" /> Search Flights
          </span>
        )}
      </Button>
    </form>
  );
}
