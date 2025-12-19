import React from "react";

/**
 * Site footer with copyright and links.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 px-6 mt-12">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
        <p>&copy; {currentYear} Next.js Pattern Examples</p>
        <p className="mt-2">
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Official Next.js Documentation
          </a>
        </p>
      </div>
    </footer>
  );
}
