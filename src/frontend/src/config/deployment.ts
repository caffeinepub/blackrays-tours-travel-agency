/**
 * Deployment configuration for the Blackrays Car Rentals & Tours and Travels application.
 * 
 * This file defines the deployment slug used for platform-managed hosting.
 * The slug must:
 * - Contain only lowercase letters, numbers, and hyphens
 * - Be between 5 and 50 characters
 * - Include "blackrays" as required
 */

export const DEPLOYMENT_SLUG = 'blackrays-car-rentals-tours';

/**
 * Invalid slugs that must never be used.
 * These are documented here to prevent accidental usage.
 */
const INVALID_SLUGS = [
  'blackrays-car-rentals-&-tours-and-travels', // Contains invalid character '&'
];

/**
 * Validates that a deployment slug meets platform requirements.
 * Pattern: ^[a-z0-9-]{5,50}$
 */
export function validateDeploymentSlug(slug: string): boolean {
  const pattern = /^[a-z0-9-]{5,50}$/;
  return pattern.test(slug);
}

// Validate the configured slug at module load time
if (!validateDeploymentSlug(DEPLOYMENT_SLUG)) {
  console.error(
    `Invalid deployment slug: "${DEPLOYMENT_SLUG}". ` +
    `Must be 5-50 characters and contain only lowercase letters, numbers, and hyphens.`
  );
}

// Ensure "blackrays" is included
if (!DEPLOYMENT_SLUG.includes('blackrays')) {
  console.error(
    `Deployment slug must contain "blackrays". Current slug: "${DEPLOYMENT_SLUG}"`
  );
}

// Defensive check: Ensure we're not using any known invalid slugs
if (INVALID_SLUGS.includes(DEPLOYMENT_SLUG)) {
  console.error(
    `CRITICAL: Deployment slug "${DEPLOYMENT_SLUG}" is in the invalid slugs list. ` +
    `This slug cannot be used for deployment.`
  );
}
