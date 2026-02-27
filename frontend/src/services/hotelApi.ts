// TODO: Replace with real RapidAPI Hotels or Booking.com API credentials
// RapidAPI Hotels: https://rapidapi.com/apidojo/api/hotels4
// Booking.com API: https://developers.booking.com/
// Integration path:
//   1. Sign up for RapidAPI and subscribe to Hotels4 or Booking.com API
//   2. Replace RAPIDAPI_KEY below with your actual key
//   3. Replace the mock data generation with real API calls
//   4. Handle pagination and rate limiting

// const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY';
// const RAPIDAPI_HOST = 'hotels4.p.rapidapi.com';

export interface HotelResult {
  id: string;
  name: string;
  starRating: number;
  location: string;
  city: string;
  country: string;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
  roomType: string;
  bookingUrl: string;
}

const hotelPrefixes = [
  "The Grand", "Royal", "Imperial", "Luxury", "Premier", "Elite",
  "Prestige", "Heritage", "Signature", "Boutique", "Majestic", "Regal",
  "Opulent", "Splendid", "Exquisite", "Refined", "Classic", "Modern",
];

const hotelSuffixes = [
  "Hotel & Spa", "Resort", "Palace", "Suites", "Inn", "Lodge",
  "Residences", "Collection", "Retreat", "Towers", "Plaza", "Court",
];

const amenitiesList = [
  "Free WiFi", "Swimming Pool", "Gym", "Spa", "Restaurant", "Bar",
  "Room Service", "Concierge", "Valet Parking", "Airport Shuttle",
  "Business Center", "Conference Rooms", "Kids Club", "Beach Access",
];

function generateBookingUrl(destination: string, checkIn: string, checkOut: string, guests: number): string {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${guests}`;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[randomBetween(0, arr.length - 1)];
}

export interface HotelSearchParams {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfRooms: number;
  roomTypePreference: string;
}

export async function searchHotels(params: HotelSearchParams): Promise<HotelResult[]> {
  // TODO: Replace this mock implementation with real API call
  // Example RapidAPI Hotels call:
  // const locationResponse = await fetch(`https://hotels4.p.rapidapi.com/locations/v3/search?q=${encodeURIComponent(params.destination)}&locale=en_US`, {
  //   headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY, 'X-RapidAPI-Host': RAPIDAPI_HOST }
  // });
  // const locationData = await locationResponse.json();
  // const destinationId = locationData.sr[0].gaiaId;
  // const hotelsResponse = await fetch(`https://hotels4.p.rapidapi.com/properties/v2/list`, { ... });
  // return hotelsResponse.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const results: HotelResult[] = [];
  const count = randomBetween(6, 12);

  for (let i = 0; i < count; i++) {
    const stars = randomBetween(2, 5);
    const basePrice = stars === 5 ? randomBetween(8000, 35000)
      : stars === 4 ? randomBetween(3500, 12000)
      : stars === 3 ? randomBetween(1500, 5000)
      : randomBetween(800, 2500);

    const amenityCount = randomBetween(3, 7);
    const shuffled = [...amenitiesList].sort(() => Math.random() - 0.5);
    const selectedAmenities = shuffled.slice(0, amenityCount);

    const name = `${pickRandom(hotelPrefixes)} ${params.destination} ${pickRandom(hotelSuffixes)}`;

    results.push({
      id: `HTL-${i}-${Date.now()}`,
      name,
      starRating: stars,
      location: `${params.destination} City Centre`,
      city: params.destination,
      country: "",
      pricePerNight: basePrice,
      currency: "INR",
      amenities: selectedAmenities,
      imageUrl: `/assets/generated/hotel-hero-premium.dim_1200x600.png`,
      rating: parseFloat((randomBetween(35, 50) / 10).toFixed(1)),
      reviewCount: randomBetween(50, 2000),
      roomType: params.roomTypePreference || "Standard",
      bookingUrl: generateBookingUrl(params.destination, params.checkInDate, params.checkOutDate, params.numberOfGuests),
    });
  }

  return results.sort((a, b) => b.starRating - a.starRating || b.rating - a.rating);
}
