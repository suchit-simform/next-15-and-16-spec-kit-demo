import React from "react";

interface ExampleLayoutProps {
  children: React.ReactNode;
  version: 15 | 16;
}

/**
 * Base layout component for example pages.
 * Provides consistent structure with header, main content area, and footer.
 * Responsive design for mobile, tablet, and desktop breakpoints.
 *
 * @param props.children - Page content to render
 * @param props.version - Next.js version (15 or 16) for version indicator
 */
export function ExampleLayout({ children, version }: ExampleLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full" role="main">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
