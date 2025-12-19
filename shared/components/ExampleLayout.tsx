import React from "react";

interface ExampleLayoutProps {
  children: React.ReactNode;
  version: 15 | 16;
}

/**
 * Base layout component for example pages.
 * Provides consistent structure with header, main content area, and footer.
 *
 * @param props.children - Page content to render
 * @param props.version - Next.js version (15 or 16) for version indicator
 */
export function ExampleLayout({ children, version }: ExampleLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
    </div>
  );
}
