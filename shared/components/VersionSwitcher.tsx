"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface VersionSwitcherProps {
  currentVersion: 15 | 16;
}

/**
 * Client component for switching between Next.js 15 and 16 examples.
 * Maintains current category context when switching versions.
 * WCAG 2.1 AA compliant with keyboard navigation and focus indicators.
 *
 * @param props.currentVersion - Currently displayed version (15 or 16)
 */
export function VersionSwitcher({ currentVersion }: VersionSwitcherProps) {
  const pathname = usePathname();
  const otherVersion = currentVersion === 15 ? 16 : 15;

  /**
   * Extracts the category from the current pathname.
   * Format: /examples/[category] → category
   */
  const getTargetPath = useCallback(() => {
    // Extract category from pathname like "/examples/data-fetching-caching"
    const match = pathname.match(/\/examples\/([^/]+)/);
    const category = match?.[1];

    if (category) {
      return `/examples/${category}`;
    }
    return "/"; // Fallback to home if no category found
  }, [pathname]);

  const targetPath = getTargetPath();

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Next.js version selector"
    >
      <span className="text-xs sm:text-sm font-medium text-gray-400">
        Version:
      </span>
      <div
        className="flex gap-1 bg-gray-800 rounded-md p-1"
        role="tablist"
        aria-label="Choose Next.js version"
      >
        {/* Version 15 Button */}
        {currentVersion === 15 ? (
          <button
            disabled
            className="px-2 sm:px-3 py-1 rounded bg-white text-black font-semibold text-xs sm:text-sm cursor-default"
            aria-current="page"
            aria-label="Currently viewing Next.js 15 examples"
            role="tab"
            tabIndex={0}
          >
            15
          </button>
        ) : (
          <Link
            href={targetPath}
            className="px-2 sm:px-3 py-1 rounded hover:bg-gray-700 text-white font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 rounded"
            aria-label="Switch to Next.js 15 examples"
            role="tab"
            tabIndex={0}
          >
            15
          </Link>
        )}

        {/* Version 16 Button */}
        {currentVersion === 16 ? (
          <button
            disabled
            className="px-2 sm:px-3 py-1 rounded bg-white text-black font-semibold text-xs sm:text-sm cursor-default"
            aria-current="page"
            aria-label="Currently viewing Next.js 16 examples"
            role="tab"
            tabIndex={0}
          >
            16
          </button>
        ) : (
          <Link
            href={targetPath}
            className="px-2 sm:px-3 py-1 rounded hover:bg-gray-700 text-white font-semibold text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 rounded"
            aria-label="Switch to Next.js 16 examples"
            role="tab"
            tabIndex={0}
          >
            16
          </Link>
        )}
      </div>
    </div>
  );
}
