import React from "react";
import Link from "next/link";
import type { ExampleCategory } from "../types";

interface CategoryNavProps {
  categories: ExampleCategory[];
  version: 15 | 16;
  activeCategory?: string;
}

/**
 * Horizontal navigation menu for categories.
 * WCAG 2.1 AA compliant with keyboard navigation and focus indicators.
 *
 * @param props.categories - List of categories to display
 * @param props.version - Next.js version for link generation
 * @param props.activeCategory - Currently active category ID
 */
export function CategoryNav({
  categories,
  version,
  activeCategory,
}: CategoryNavProps) {
  return (
    <nav
      className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-3 sm:py-4 overflow-x-auto sticky top-16 z-30"
      aria-label={`Next.js ${version} example categories`}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4">
        <Link
          href="/"
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
            !activeCategory
              ? "bg-black text-white"
              : "bg-white text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
          }`}
          aria-current={!activeCategory ? "page" : undefined}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/examples/${category.id}`}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap flex items-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
              activeCategory === category.id
                ? "bg-black text-white"
                : "bg-white text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
            aria-current={activeCategory === category.id ? "page" : undefined}
            title={category.description}
          >
            {category.icon && <span aria-hidden="true">{category.icon}</span>}
            <span className="hidden sm:inline">{category.name}</span>
            <span className="sm:hidden">{category.name.split(" ")[0]}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
