/**
 * Represents routes for version-specific example pages.
 *
 * @example
 * {
 *   path: "/examples/async-request-apis",
 *   version: 15,
 *   exampleIds: ["async-request-apis"]
 * }
 */
export interface NavigationRoute {
  /** URL path in Next.js App Router format */
  path: string;

  /** Target Next.js version (15 or 16) */
  version: 15 | 16;

  /** List of example IDs for this route (min 1, max 20) */
  exampleIds: string[];
}
