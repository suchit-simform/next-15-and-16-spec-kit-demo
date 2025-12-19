import React from "react";

interface HeaderProps {
  version: 15 | 16;
}

/**
 * Site header with branding and version indicator.
 *
 * @param props.version - Next.js version (15 or 16)
 */
export function Header({ version }: HeaderProps) {
  return (
    <header className="bg-black text-white py-4 px-6 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Next.js Pattern Examples</h1>
          <p className="text-sm text-gray-400">
            Explore version {version} features and changes
          </p>
        </div>
        <div className="bg-white text-black px-4 py-2 rounded-md font-semibold">
          v{version}
        </div>
      </div>
    </header>
  );
}
