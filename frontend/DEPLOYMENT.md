# Deployment Configuration

## Deployment Slug

The application is configured to deploy with the following slug:

**`blackrays-car-rentals-tours`**

This slug:
- ✅ Contains "blackrays" as required
- ✅ Uses only lowercase letters, numbers, and hyphens
- ✅ Is between 5 and 50 characters (29 characters)
- ✅ Meets all platform requirements

## Invalid Slugs (Do Not Use)

The following slugs are **NOT valid** and must not be used:

- ❌ `blackrays-car-rentals-&-tours-and-travels` (contains `&` character)
- ❌ Any slug with special characters other than hyphens
- ❌ Any slug shorter than 5 or longer than 50 characters

## Platform-Managed Deployment

This application uses platform-managed deployment. The slug is configured in:

**`frontend/src/config/deployment.ts`**

This file contains:
- The `DEPLOYMENT_SLUG` constant with the valid slug
- Validation logic that runs at module load time
- Defensive checks to prevent usage of invalid slugs

## SPA Routing Support

The application uses TanStack Router for client-side routing. To support deep links and direct navigation to any route on static hosting platforms, the following files are configured:

### `frontend/public/_redirects`
Contains a single rule that serves the app shell (`/index.html`) for all paths with a 200 status code:
