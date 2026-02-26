# Specification

## Summary
**Goal:** Expand Blackrays Car Rentals & Tours with custom travel packages, per-km car rental pricing, Terms & Conditions, railway and flight booking sections, and a new premium hero image.

**Planned changes:**
- Add a "Custom Packages / Plan My Trip" public page with a form (destination type India/Abroad, destination, number of travelers, duration, preferred dates, contact details); store submissions as `custom_package` inquiries in the backend.
- Update the Car Rentals page to show per-km pricing (Sedan ₹13/km, SUV ₹21/km), add a distance input with real-time fare estimate, and store distance and estimated fare in car rental inquiries.
- Add a Terms & Conditions page at `/terms` with a self-drive liability clause; add a mandatory T&C acknowledgment checkbox to the car rental booking form; link T&C from the footer.
- Add a Railway Bookings page at `/railway-bookings` with a booking inquiry form (origin/destination station, travel date, passengers, class, contact); store submissions as `railway_booking` inquiries.
- Add a Flight Bookings page at `/flight-bookings` with a booking inquiry form (origin/destination city, departure/return date, trip type, passengers, cabin class, contact); store submissions as `flight_booking` inquiries.
- Extend the backend inquiry model to support `custom_package`, `railway_booking`, and `flight_booking` categories with their respective fields, without affecting existing categories.
- Replace the existing hot air balloon hero image with a new premium cinematic hero image (luxury car, dark/cinematic tone).
- Update the homepage to include a services section with cards for all four services (Custom Packages, Car Rentals, Railway Bookings, Flight Bookings) each with a description and CTA; remove hot air balloon imagery.
- Link all new pages from the main navigation and homepage CTAs.
- Admin inquiries panel displays all new inquiry categories with their specific fields.

**User-visible outcome:** Visitors can inquire about customized travel packages, book car rentals with per-km pricing and fare estimates, submit railway and flight ticket booking requests, and review Terms & Conditions — all from a refreshed premium homepage with a new hero image.
