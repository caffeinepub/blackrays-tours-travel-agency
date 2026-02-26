# Specification

## Summary
**Goal:** Upgrade the Car Rentals page with dual pricing modes (per-km and per-day), with/without driver options, a "Most Popular" badge on Sedan, a T&C acknowledgment checkbox, and a refreshed premium UI.

**Planned changes:**
- Add dual pricing to vehicle cards: Sedan (₹13/km / ₹2,500/day) and SUV (₹21/km / ₹5,000/day), with an interactive per-km vs per-day toggle on each card
- Add "With Driver" / "Without Driver" selection to both vehicle cards
- Mark the Sedan card with a "Most Popular" badge
- Update the fare estimator in the booking form to calculate dynamically based on selected pricing mode (distance for per-km, days for per-day) and selected vehicle
- Store selected pricing mode, distance/days input, and estimated fare in the car rental inquiry submitted to the backend
- Add a mandatory T&C acknowledgment checkbox to the booking form with the notice: "Without driver — if anything happens to the vehicle, the consumer is fully liable for all repair and associated costs," linked to the Terms & Conditions page; disable form submission if unchecked
- Refresh the Car Rentals page UI to a premium black/white/grey aesthetic: clean borders, background contrasts (no box shadows), clear typography hierarchy, fully responsive layout

**User-visible outcome:** Users on the Car Rentals page can select a vehicle, choose per-km or per-day pricing, choose with or without a driver, get a live fare estimate, and must acknowledge the T&C before submitting a booking inquiry.
