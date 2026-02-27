// TODO: Replace with real Amadeus API key and endpoint
// Amadeus API: https://developers.amadeus.com/
// RapidAPI Skyscanner: https://rapidapi.com/skyscanner/api/skyscanner-flight-search
// Integration path:
//   1. Sign up for Amadeus or Skyscanner API
//   2. Replace AMADEUS_API_KEY and AMADEUS_API_SECRET below
//   3. Replace the mock data generation with real API calls
//   4. Handle authentication (OAuth2 for Amadeus, API key header for RapidAPI)

// const AMADEUS_API_KEY = 'YOUR_AMADEUS_API_KEY';
// const AMADEUS_API_SECRET = 'YOUR_AMADEUS_API_SECRET';
// const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY';

export interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  cabinClass: string;
  seatsAvailable: number;
  bookingUrl: string;
}

const airlines = [
  { name: "Air India", code: "AI" },
  { name: "IndiGo", code: "6E" },
  { name: "SpiceJet", code: "SG" },
  { name: "Vistara", code: "UK" },
  { name: "Emirates", code: "EK" },
  { name: "Qatar Airways", code: "QR" },
  { name: "Lufthansa", code: "LH" },
  { name: "British Airways", code: "BA" },
  { name: "Singapore Airlines", code: "SQ" },
  { name: "Etihad Airways", code: "EY" },
  { name: "Air France", code: "AF" },
  { name: "KLM", code: "KL" },
  { name: "Turkish Airlines", code: "TK" },
  { name: "Cathay Pacific", code: "CX" },
  { name: "Japan Airlines", code: "JL" },
];

function generateBookingUrl(origin: string, destination: string, date: string, passengers: number): string {
  const formattedDate = date.replace(/-/g, '');
  return `https://www.google.com/travel/flights?q=Flights+from+${encodeURIComponent(origin)}+to+${encodeURIComponent(destination)}+on+${formattedDate}&passengers=${passengers}`;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}

export async function searchFlights(params: FlightSearchParams): Promise<FlightResult[]> {
  // TODO: Replace this mock implementation with real API call
  // Example Amadeus call:
  // const token = await getAmadeusToken(AMADEUS_API_KEY, AMADEUS_API_SECRET);
  // const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${params.origin}&destinationLocationCode=${params.destination}&departureDate=${params.departureDate}&adults=${params.passengers}&travelClass=${params.cabinClass.toUpperCase()}`, {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  // return response.json();

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const results: FlightResult[] = [];
  const count = randomBetween(4, 8);

  for (let i = 0; i < count; i++) {
    const airline = airlines[randomBetween(0, airlines.length - 1)];
    const depHour = randomBetween(5, 22);
    const depMin = [0, 15, 30, 45][randomBetween(0, 3)];
    const depTime = `${String(depHour).padStart(2, '0')}:${String(depMin).padStart(2, '0')}`;
    const durationMins = randomBetween(60, 900);
    const arrTime = addMinutes(depTime, durationMins);
    const hours = Math.floor(durationMins / 60);
    const mins = durationMins % 60;
    const stops = randomBetween(0, 2);

    const basePrice = params.cabinClass === 'economy' ? randomBetween(3500, 25000)
      : params.cabinClass === 'business' ? randomBetween(25000, 120000)
      : randomBetween(80000, 300000);

    results.push({
      id: `FL-${i}-${Date.now()}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: `${airline.code}${randomBetween(100, 999)}`,
      origin: params.origin,
      destination: params.destination,
      departureTime: depTime,
      arrivalTime: arrTime,
      duration: `${hours}h ${mins}m`,
      stops,
      price: basePrice,
      currency: "INR",
      cabinClass: params.cabinClass,
      seatsAvailable: randomBetween(2, 20),
      bookingUrl: generateBookingUrl(params.origin, params.destination, params.departureDate, params.passengers),
    });
  }

  return results.sort((a, b) => a.price - b.price);
}
