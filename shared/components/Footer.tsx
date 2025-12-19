import React from "react";

/**
 * Site footer with copyright and links.
 * WCAG 2.1 AA compliant with semantic HTML and proper contrast ratios.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-900 text-gray-100 border-t border-gray-800 py-6 sm:py-8 px-4 sm:px-6 mt-12"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 text-xs sm:text-sm">
          <div>
            <p className="font-semibold mb-2">About</p>
            <p className="text-gray-400">
              Educational examples comparing Next.js 15 and 16 features with
              detailed explanations and code samples.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Resources</p>
            <ul className="space-y-1 text-gray-400">
              <li>
                <a
                  href="https://nextjs.org/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 focus:outline-none focus:underline underline-offset-2"
                >
                  Next.js Blog
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 focus:outline-none focus:underline underline-offset-2"
                >
                  Official Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-400">
          <p>
            &copy; {currentYear} Next.js Pattern Examples. Educational resource.
          </p>
        </div>
      </div>
    </footer>
  );
}
