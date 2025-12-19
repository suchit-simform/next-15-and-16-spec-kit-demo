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
  const baseHref =
    version === 15 ? "http://localhost:3015" : "http://localhost:3016";

  return (
    <nav className="bg-gray-100 border-b border-gray-200 px-6 py-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <Link
          href="/"
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            !activeCategory
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          All Categories
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/examples/${category.id}`}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeCategory === category.id
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {category.icon && <span>{category.icon}</span>}
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
