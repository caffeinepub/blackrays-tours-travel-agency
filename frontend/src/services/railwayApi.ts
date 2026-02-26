/**
 * Railway / Train Search & Booking API Service
 *
 * This service integrates with a train search API.
 * Currently uses mock data for demonstration. To connect to a real API:
 *
 * Option 1 - RapidAPI Indian Railways:
 *   - Sign up at https://rapidapi.com/
 *   - Search for "Indian Railways" or "IRCTC" APIs
 *   - Set VITE_RAPIDAPI_KEY in your .env
 *
 * Option 2 - RailConnect API:
 *   - Visit https://railconnect.in/ for API access
 *
 * Option 3 - erail.in API:
 *   - Visit https://erail.in/api for unofficial train data
 *
 * The UI gracefully falls back to the inquiry form if the API is unavailable.
 */

export interface RailwaySearchParams {
  originStation: string;
  destinationStation: string;
  travelDate: string;
  passengers: number;
  railClass: string;
}

export interface SeatClass {
  code: string;
  name: string;
  fare: number;
  available: boolean;
  availableSeats?: number;
}

export interface TrainResult {
  id: string;
  trainNumber: string;
  trainName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  originStation: string;
  destinationStation: string;
  originCode: string;
  destinationCode: string;
  classes: SeatClass[];
  runsOn: string[];
  bookingUrl?: string;
}

export interface RailwaySearchResponse {
  results: TrainResult[];
  searchId: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STATION_CODES: Record<string, string> = {
  mumbai: 'CSTM',
  'mumbai central': 'BCT',
  delhi: 'NDLS',
  'new delhi': 'NDLS',
  bangalore: 'SBC',
  bengaluru: 'SBC',
  chennai: 'MAS',
  kolkata: 'HWH',
  howrah: 'HWH',
  hyderabad: 'SC',
  pune: 'PUNE',
  ahmedabad: 'ADI',
  jaipur: 'JP',
  lucknow: 'LKO',
  nagpur: 'NGP',
  surat: 'ST',
  indore: 'INDB',
  bhopal: 'BPL',
  patna: 'PNBE',
  varanasi: 'BSB',
  amritsar: 'ASR',
  chandigarh: 'CDG',
  agra: 'AGC',
  goa: 'MAO',
  madgaon: 'MAO',
  kochi: 'ERS',
  ernakulam: 'ERS',
  coimbatore: 'CBE',
  visakhapatnam: 'VSKP',
};

const TRAIN_NAMES = [
  'Rajdhani Express',
  'Shatabdi Express',
  'Duronto Express',
  'Garib Rath Express',
  'Superfast Express',
  'Jan Shatabdi Express',
  'Vande Bharat Express',
  'Humsafar Express',
  'Tejas Express',
  'Gatimaan Express',
];

const CLASS_DEFINITIONS: Record<string, { name: string; baseFare: number }> = {
  SL: { name: 'Sleeper Class', baseFare: 350 },
  '3A': { name: 'AC 3 Tier', baseFare: 900 },
  '2A': { name: 'AC 2 Tier', baseFare: 1400 },
  '1A': { name: 'AC First Class', baseFare: 2800 },
  CC: { name: 'Chair Car', baseFare: 450 },
  EC: { name: 'Executive Chair Car', baseFare: 1200 },
};

function getStationCode(name: string): string {
  const key = name.toLowerCase().trim();
  return STATION_CODES[key] || name.toUpperCase().slice(0, 4);
}

function addMinutesToTime(timeStr: string, minutes: number): string {
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

function generateMockTrains(params: RailwaySearchParams): TrainResult[] {
  const results: TrainResult[] = [];
  const originCode = getStationCode(params.originStation);
  const destCode = getStationCode(params.destinationStation);

  const departureTimes = ['05:30', '07:00', '09:15', '12:30', '16:00', '21:45'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 6; i++) {
    const trainName = TRAIN_NAMES[i % TRAIN_NAMES.length];
    const trainNumber = `${12000 + i * 137}`;
    const durationMins = 180 + Math.floor(Math.random() * 480);
    const depTime = departureTimes[i];
    const arrTime = addMinutesToTime(depTime, durationMins);

    const availableClasses: SeatClass[] = Object.entries(CLASS_DEFINITIONS)
      .filter(() => Math.random() > 0.3)
      .map(([code, def]) => ({
        code,
        name: def.name,
        fare: Math.round((def.baseFare + (Math.random() - 0.3) * def.baseFare * 0.3) * params.passengers),
        available: Math.random() > 0.2,
        availableSeats: Math.floor(Math.random() * 50) + 1,
      }));

    const runsOnCount = 3 + Math.floor(Math.random() * 4);
    const runsOn = days.slice(0, runsOnCount);

    results.push({
      id: `TR-${Date.now()}-${i}`,
      trainNumber,
      trainName,
      departureTime: depTime,
      arrivalTime: arrTime,
      duration: formatDuration(durationMins),
      originStation: params.originStation,
      destinationStation: params.destinationStation,
      originCode,
      destinationCode: destCode,
      classes: availableClasses,
      runsOn,
      bookingUrl: `https://www.irctc.co.in/nget/train-search`,
    });
  }

  return results;
}

// ─── API Function ─────────────────────────────────────────────────────────────

export async function searchTrains(params: RailwaySearchParams): Promise<RailwaySearchResponse> {
  // TODO: Replace with real API call when credentials are available
  // Example RapidAPI call:
  // const response = await fetch('https://indian-railway-irctc.p.rapidapi.com/api/trains-between-stations', {
  //   headers: {
  //     'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
  //     'X-RapidAPI-Host': 'indian-railway-irctc.p.rapidapi.com'
  //   }
  // });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!params.originStation || !params.destinationStation) {
    throw new Error('Origin and destination stations are required');
  }

  if (params.originStation.toLowerCase() === params.destinationStation.toLowerCase()) {
    throw new Error('Origin and destination cannot be the same');
  }

  const results = generateMockTrains(params);

  return {
    results,
    searchId: `search-${Date.now()}`,
  };
}

export function formatFare(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
