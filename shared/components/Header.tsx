import React from "react";
import { VersionSwitcher } from "./VersionSwitcher";

interface HeaderProps {
  version: 15 | 16;
}

/**
 * Site header with branding and version indicator.
 * Includes VersionSwitcher for navigating between Next.js versions
 * while maintaining current category context (FR-008).
 * WCAG 2.1 AA compliant with semantic HTML and proper contrast ratios.
 *
 * @param props.version - Next.js version (15 or 16)
 */
export function Header({ version }: HeaderProps) {
  return (
    <header
      className="bg-black text-white py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-800 sticky top-0 z-40"
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-lg sm:text-2xl font-bold leading-tight">
            Next.js Pattern Examples
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Explore version {version} features and changes
          </p>
        </div>
        <div className="flex items-center justify-between sm:gap-4 shrink-0">
          <VersionSwitcher currentVersion={version} />
        </div>
      </div>
    </header>
  );
}
