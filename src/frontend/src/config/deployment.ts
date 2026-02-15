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
