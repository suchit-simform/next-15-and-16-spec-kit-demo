import React from "react";

interface CodeSnippetProps {
  /** Pre-rendered highlighted HTML from Shiki */
  highlightedHTML?: string;
  /** Raw code for fallback */
  rawCode: string;
  /** Programming language */
  language?: string;
}

/**
 * Server component for displaying syntax-highlighted code snippets.
 * Uses pre-rendered HTML from Shiki with fallback to plain code.
 * WCAG 2.1 AA compliant with proper contrast ratios and semantics.
 *
 * @param props.highlightedHTML - Pre-highlighted HTML (generated at build time)
 * @param props.rawCode - Raw code string for fallback
 * @param props.language - Programming language for fallback styling
 */
export function CodeSnippet({
  highlightedHTML,
  rawCode,
  language = "typescript",
}: CodeSnippetProps) {
  if (highlightedHTML) {
    return (
      <div
        className="rounded-lg overflow-x-auto my-3 sm:my-4 bg-gray-900 p-3 sm:p-4 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
        role="region"
        aria-label={`Code snippet in ${language}`}
        style={{
          backgroundColor: "oklch(21% 0.034 264.665)",
        }}
      />
    );
  }

  // Fallback to plain code with WCAG AA compliant colors
  return (
    <pre
      className="bg-gray-900 text-gray-100 rounded-lg p-3 sm:p-4 overflow-x-auto my-3 sm:my-4 text-xs sm:text-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none rounded"
      role="region"
      aria-label={`Code snippet in ${language} (plain text)`}
      tabIndex={0}
      style={{
        backgroundColor: "oklch(21% 0.034 264.665)",
      }}
    >
      <code className={`language-${language}`}>{rawCode}</code>
    </pre>
  );
}
