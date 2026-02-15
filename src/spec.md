# Specification

## Summary
**Goal:** Publish/deploy the existing website using the correct platform deployment configuration.

**Planned changes:**
- Ensure the platform-managed deployment slug remains exactly `blackrays-car-rentals-tours` as configured in `frontend/src/config/deployment.ts`.
- Verify the invalid slug `blackrays-car-rentals-&-tours-and-travels` is not used anywhere in deployment configuration.
- Keep SPA routing fallback intact by maintaining `frontend/public/_redirects` routing all paths to `/index.html`.

**User-visible outcome:** The website is deployed/published and accessible online with working SPA navigation across direct URL visits and refreshes.
