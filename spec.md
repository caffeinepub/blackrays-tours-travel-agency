# Specification

## Summary
**Goal:** Comprehensive premium UI overhaul, address correction, global airports/hotels data, and several content/UX fixes across the Blackrays Car Rentals & Tours and Travels frontend.

**Planned changes:**
- Fix all instances of "Nagpur" to "Dhule, Maharashtra 424001" across Footer, ContactInquiryPage, AboutPage, HomeContactBar, TermsPage, and any other user-facing text
- Reduce and simplify homepage hero section to a single concise headline and one brief sub-headline; make the contact bar compact and single-row on desktop
- Overhaul the homepage hero section, HeroSearchWidget, service cards, and contact bar with a premium cinematic design using the new hero-premium-jet-tarmac.png background, glassmorphism-style search widget, bold typography, and premium card hover treatments — no box shadows
- Move the "Most Popular" badge from the SUV card to the Sedan card on CarRentalsPage; display Sedan first with a highlighted border accent
- Remove all car emojis (🚗, 🚙, 🛻, 🚕, etc.) from CarRentalsPage and homepage service cards; replace with Lucide React icons (Car, Gauge, MapPin, Navigation, etc.)
- Create a `frontend/src/data/airports.ts` static data file with 500+ major worldwide airports (name, city, country, IATA code); update FlightBookingsPage and FlightSearchForm dropdowns to support type-to-filter search from this dataset
- Add a "Book Now" CTA to each FlightResultCard that links to an external airline booking URL or pre-populates the inquiry form with flight details; add placeholder comments in flightApi.ts for real API credentials; handle loading/empty/error states
- Upgrade HotelBookingsPage to support any global destination city search; display hotel result cards with property name, star rating, location, price per night, and a "Book Now" CTA linking to an external aggregator or pre-populating the inquiry form; add placeholder comments for real API credentials; handle loading/empty/error states
- Apply a premium UI refresh across all public pages (HomePage, CarRentalsPage, FlightBookingsPage, HotelBookingsPage, RailwayBookingsPage, PackagesPage, CustomPackagesPage, ContactInquiryPage, AboutPage, TermsPage) with refined typography, subtle background gradients, clean card borders with hover accent effects, no box shadows, and consistent warm-neutral/grey/charcoal palette

**User-visible outcome:** The website displays the correct Dhule address everywhere, features a dramatically cleaner and more premium homepage experience, allows users to search 500+ global airports with type-to-filter dropdowns and initiate flight bookings, search worldwide hotels with a Book Now flow, and benefits from an elevated premium visual design across all pages — with Sedan as the most popular car option and no car emojis anywhere.
