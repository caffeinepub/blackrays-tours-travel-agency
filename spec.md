# Specification

## Summary
**Goal:** Update car rental per-km pricing and add a full Hotel & Hospitality Booking feature including page, navigation, hero widget tab, service card, backend data model, and real-time hotel search API integration.

**Planned changes:**
- Update Car Rentals page and fare estimator to use Sedan ₹13/km and SUV ₹21/km; update all references including homepage pricing section
- Extend backend inquiry data model with a `hotel_booking` category and optional fields: hotelDestination, checkInDate, checkOutDate, numberOfGuests, numberOfRooms, roomTypePreference
- Add a new `/hotels` Hotel & Hospitality Bookings page with a search form (destination, check-in/out dates, guests, rooms, room type preference), real-time hotel search API results (property name, star rating, location, price per night, booking CTA), loading/empty/error states, and inquiry fallback storing `hotel_booking` category to backend
- Add a "Hotels" tab to the homepage hero search widget with destination, check-in, and check-out inputs that navigate to `/hotels` with pre-filled parameters
- Add a Hotel & Hospitality service card to the homepage services section with description and CTA linking to `/hotels`
- Link the `/hotels` page from the main navigation header
- Display hotel_booking inquiry fields in the admin inquiries page

**User-visible outcome:** Users can search and book hotels via a new Hotels page with live results and a quick-search widget on the homepage; car rental pricing now correctly shows ₹13/km for Sedan and ₹21/km for SUV throughout the site.
