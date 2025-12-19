/**
 * Groups related pattern examples by domain (e.g., Server Components, Data Fetching).
 *
 * @example
 * {
 *   id: "data-fetching-caching",
 *   name: "Data Fetching & Caching",
 *   description: "Patterns for fetching data, caching behavior, revalidation APIs",
 *   icon: "🔄",
 *   order: 1
 * }
 */
export interface ExampleCategory {
  /** Unique identifier in kebab-case */
  id: string;

  /** Display name (max 30 chars, title case) */
  name: string;

  /** Category description (max 150 chars) */
  description: string;

  /** Icon identifier - emoji or Tailwind icon class */
  icon?: string;

  /** Display order (lower = higher priority) */
  order: number;

  /** Supported Next.js versions */
  versions?: number[];
}
