# Specification

## Summary
**Goal:** Move the 'Most Popular' badge to the SUV card, add a business address, redesign the homepage hero/search/service section, and rebuild the Flight, Railway, and Hotel booking pages with live search UIs and mock API placeholders.

**Planned changes:**
- Move the 'Most Popular' badge from the Sedan vehicle card to the SUV vehicle card on the Car Rentals page; Sedan card shows no badge
- Add 'Dhule, Maharashtra 424001' as the business address in the site footer and on the Contact/Inquiry page contact info section
- Overhaul the homepage starting interface: redesign the hero section with premium typography and layout, update the HeroSearchWidget to include tabs for Flights, Trains, Hotels, Car Rentals, and Tour Packages, refresh service cards with descriptions and CTA buttons, remove all box shadows from the initial viewport, and keep the black/white/grey/beige palette
- Rebuild FlightBookingsPage with a search form (origin, destination, date, passengers, cabin class), flight result cards (airline, departure/arrival times, duration, stops, price, Book Now CTA), loading/empty/error states, and Amadeus API credential placeholders in flightApi.ts
- Rebuild RailwayBookingsPage with a search form (origin, destination, date, class, passengers), train result cards (train name/number, times, duration, classes, fares, Book Now CTA), loading/empty/error states, and RapidAPI/IRCTC credential placeholders in railwayApi.ts
- Rebuild HotelBookingsPage with a search form (destination, check-in/out dates, guests, rooms, room type), hotel result cards (property name, star rating, location, price per night, Book Now CTA), inquiry fallback form submitting to backend with category 'hotel_booking', loading/empty/error states, and RapidAPI Hotels credential placeholders

**User-visible outcome:** Users see the SUV marked as most popular, the business address displayed site-wide, a premium redesigned homepage with full-service search tabs, and can search and view results for flights, trains, and hotels directly on their respective booking pages with clear booking CTAs.
