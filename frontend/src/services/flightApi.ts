/**
 * Flight Search & Booking API Service
 *
 * This service integrates with a flight search API.
 * Currently uses mock data for demonstration. To connect to a real API:
 *
 * Option 1 - Amadeus API:
 *   - Sign up at https://developers.amadeus.com/
 *   - Set VITE_AMADEUS_API_KEY and VITE_AMADEUS_API_SECRET in your .env
 *   - Replace the mock implementation below with real Amadeus REST calls
 *
 * Option 2 - RapidAPI Flight Search:
 *   - Sign up at https://rapidapi.com/
 *   - Set VITE_RAPIDAPI_KEY in your .env
 *   - Use the Sky Scrapper or similar flight API
 *
 * The UI gracefully falls back to the inquiry form if the API is unavailable.
 */

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  tripType: 'one_way' | 'round_trip';
}

export interface FlightSegment {
  flightNumber: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  duration: string;
  stops: number;
  stopDetails?: string[];
}

export interface FlightResult {
  id: string;
  outbound: FlightSegment;
  inbound?: FlightSegment;
  fare: number;
  currency: string;
  cabinClass: string;
  seatsAvailable: number;
  bookingUrl?: string;
  refundable: boolean;
}

export interface FlightSearchResponse {
  results: FlightResult[];
  searchId: string;
  currency: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
// Replace this section with real API calls when credentials are available.

const AIRLINES = [
  { name: 'IndiGo', code: '6E' },
  { name: 'Air India', code: 'AI' },
  { name: 'SpiceJet', code: 'SG' },
  { name: 'Vistara', code: 'UK' },
  { name: 'Go First', code: 'G8' },
  { name: 'AirAsia India', code: 'I5' },
];

const AIRPORT_CODES: Record<string, string> = {
  mumbai: 'BOM',
  delhi: 'DEL',
  bangalore: 'BLR',
  chennai: 'MAA',
  kolkata: 'CCU',
  hyderabad: 'HYD',
  pune: 'PNQ',
  ahmedabad: 'AMD',
  goa: 'GOI',
  jaipur: 'JAI',
  kochi: 'COK',
  lucknow: 'LKO',
  nagpur: 'NAG',
  surat: 'STV',
  indore: 'IDR',
  bhopal: 'BHO',
  patna: 'PAT',
  varanasi: 'VNS',
  amritsar: 'ATQ',
  chandigarh: 'IXC',
};

function getAirportCode(city: string): string {
  const key = city.toLowerCase().trim();
  return AIRPORT_CODES[key] || city.toUpperCase().slice(0, 3);
}

function addMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function generateMockFlights(params: FlightSearchParams): FlightResult[] {
  const results: FlightResult[] = [];
  const originCode = getAirportCode(params.origin);
  const destCode = getAirportCode(params.destination);

  const baseFares: Record<string, number> = {
    economy: 3500,
    premium_economy: 7000,
    business: 18000,
    first: 45000,
  };

  const baseFare = baseFares[params.cabinClass] || 3500;

  const departureTimes = ['06:00', '08:30', '11:15', '14:00', '17:45', '20:30'];

  for (let i = 0; i < Math.min(6, departureTimes.length); i++) {
    const airline = AIRLINES[i % AIRLINES.length];
    const durationMins = 90 + Math.floor(Math.random() * 120);
    const stops = i % 3 === 2 ? 1 : 0;
    const depTime = departureTimes[i];
    const arrTime = addMinutes(depTime, durationMins + (stops ? 60 : 0));
    const fare = Math.round((baseFare + (Math.random() - 0.5) * baseFare * 0.4) * params.passengers);

    const outbound: FlightSegment = {
      flightNumber: `${airline.code}-${100 + i * 37}`,
      airline: airline.name,
      airlineCode: airline.code,
      departureTime: depTime,
      arrivalTime: arrTime,
      departureAirport: originCode,
      arrivalAirport: destCode,
      duration: formatDuration(durationMins + (stops ? 60 : 0)),
      stops,
      stopDetails: stops ? ['1 stop via DEL'] : [],
    };

    let inbound: FlightSegment | undefined;
    if (params.tripType === 'round_trip' && params.returnDate) {
      const retAirline = AIRLINES[(i + 2) % AIRLINES.length];
      const retDepTime = departureTimes[(i + 1) % departureTimes.length];
      const retDurMins = 90 + Math.floor(Math.random() * 120);
      const retArrTime = addMinutes(retDepTime, retDurMins);
      inbound = {
        flightNumber: `${retAirline.code}-${200 + i * 41}`,
        airline: retAirline.name,
        airlineCode: retAirline.code,
        departureTime: retDepTime,
        arrivalTime: retArrTime,
        departureAirport: destCode,
        arrivalAirport: originCode,
        duration: formatDuration(retDurMins),
        stops: 0,
      };
    }

    results.push({
      id: `FL-${Date.now()}-${i}`,
      outbound,
      inbound,
      fare,
      currency: 'INR',
      cabinClass: params.cabinClass,
      seatsAvailable: 2 + Math.floor(Math.random() * 8),
      refundable: i % 2 === 0,
      bookingUrl: `https://www.makemytrip.com/flights/`,
    });
  }

  return results.sort((a, b) => a.fare - b.fare);
}

// ─── API Function ─────────────────────────────────────────────────────────────

export async function searchFlights(params: FlightSearchParams): Promise<FlightSearchResponse> {
  // TODO: Replace with real API call when credentials are available
  // Example Amadeus call:
  // const token = await getAmadeusToken();
  // const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?...`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!params.origin || !params.destination) {
    throw new Error('Origin and destination are required');
  }

  if (params.origin.toLowerCase() === params.destination.toLowerCase()) {
    throw new Error('Origin and destination cannot be the same');
  }

  const results = generateMockFlights(params);

  return {
    results,
    searchId: `search-${Date.now()}`,
    currency: 'INR',
  };
}

export function formatFare(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
