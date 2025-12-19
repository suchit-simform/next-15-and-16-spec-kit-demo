import type { ExampleCategory, PatternExample } from "../types";
import { categories, examples } from "./exampleData";

/**
 * Get all categories.
 *
 * @returns Array of all example categories sorted by order
 */
export function getCategories(): ExampleCategory[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

/**
 * Get examples filtered by Next.js version.
 *
 * @param version - Next.js version (15 or 16)
 * @returns Array of pattern examples for the specified version
 */
export function getExamplesByVersion(version: 15 | 16): PatternExample[] {
  return examples.filter((ex) => ex.version === version);
}

/**
 * Get examples filtered by category ID.
 *
 * @param categoryId - Category identifier
 * @returns Array of pattern examples in the specified category
 */
export function getExamplesByCategory(categoryId: string): PatternExample[] {
  return examples.filter((ex) => ex.category === categoryId);
}

/**
 * Get a single example by ID.
 *
 * @param id - Example identifier
 * @returns Pattern example or undefined if not found
 */
export function getExampleById(id: string): PatternExample | undefined {
  return examples.find((ex) => ex.id === id);
}

/**
 * Get examples for a specific category and version.
 *
 * @param categoryId - Category identifier
 * @param version - Next.js version (15 or 16)
 * @returns Array of pattern examples matching both filters
 */
export function getExamplesByCategoryAndVersion(
  categoryId: string,
  version: 15 | 16
): PatternExample[] {
  return examples.filter(
    (ex) => ex.category === categoryId && ex.version === version
  );
}

/**
 * Get category by ID.
 *
 * @param id - Category identifier
 * @returns Example category or undefined if not found
 */
export function getCategoryById(id: string): ExampleCategory | undefined {
  return categories.find((cat) => cat.id === id);
}

/**
 * Get the cross-version example link and data.
 * Used for "See in Next.js X" cross-version navigation (FR-008).
 *
 * @param example - Current pattern example
 * @returns Object with otherVersion, otherVersionExample, and route path, or null if not available
 */
export function getCrossVersionLink(example: PatternExample): {
  otherVersion: 15 | 16;
  otherVersionExample: PatternExample;
  exampleId: string;
  categoryId: string;
} | null {
  if (!example.availableInOtherVersion || !example.relatedExampleId) {
    return null;
  }

  const otherVersionExample = getExampleById(example.relatedExampleId);
  if (!otherVersionExample) {
    return null;
  }

  const otherVersion = example.version === 15 ? 16 : 15;

  return {
    otherVersion,
    otherVersionExample,
    exampleId: otherVersionExample.id,
    categoryId: otherVersionExample.category,
  };
}
