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
        className="rounded-lg overflow-hidden my-4"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
      />
    );
  }

  // Fallback to plain code
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-auto my-4">
      <code className={`language-${language}`}>{rawCode}</code>
    </pre>
  );
}
