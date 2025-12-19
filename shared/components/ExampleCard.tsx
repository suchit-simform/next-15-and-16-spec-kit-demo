import React from "react";
import Link from "next/link";
import type { PatternExample } from "../types";
import { CodeSnippet } from "./CodeSnippet";
import { getCrossVersionLink } from "../lib/dataAccess";

interface ExampleCardProps {
  example: PatternExample;
}

/**
 * Displays a single pattern example with all details.
 * Shows title, version badge, breaking change indicator, description,
 * code snippets (before/after), key changes, and cross-version navigation links (FR-008).
 *
 * @param props.example - Pattern example to display
 */
export function ExampleCard({ example }: ExampleCardProps) {
  const crossVersionLink = getCrossVersionLink(example);
  const otherVersion = example.version === 15 ? 16 : 15;

  return (
    <article
      className="text-foreground rounded-lg shadow-md p-4 sm:p-6 mb-8 hover:shadow-lg transition-shadow duration-200"
      style={{
        color: "var(--foreground)",
        backgroundColor: "var(--background)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {example.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {example.beforeAfterSummary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-start sm:flex-col sm:items-end shrink-0">
          <span
            className="bg-black text-white px-3 py-1 rounded text-sm font-semibold"
            aria-label={`Next.js version ${example.version}`}
          >
            v{example.version}
          </span>
          {example.isBreakingChange && (
            <span
              className="bg-red-100 text-red-800 px-3 py-1 rounded text-xs font-semibold"
              aria-label="Breaking change in this version"
            >
              BREAKING CHANGE
            </span>
          )}
          <span
            className={`px-3 py-1 rounded text-xs font-semibold ${
              example.migrationImpact === "HIGH"
                ? "bg-orange-100 text-orange-800"
                : example.migrationImpact === "MEDIUM"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
            aria-label={`Migration impact: ${example.migrationImpact}`}
          >
            {example.migrationImpact} IMPACT
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase mb-2">
          What Changed
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {example.description}
        </p>
      </div>

      {/* Why It Matters */}
      <div className="mb-6">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase mb-2">
          Why It Matters
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {example.whyItMatters}
        </p>
      </div>

      {/* Code Snippets */}
      {example.codeSnippetBefore && (
        <div className="mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase mb-2">
            Before (v{example.version === 15 ? "14" : "15"})
          </h3>
          <CodeSnippet
            highlightedHTML={example.highlightedHTMLBefore}
            rawCode={example.codeSnippetBefore}
            language={example.version === 15 ? "typescript" : "typescript"}
          />
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase mb-2">
          {example.codeSnippetBefore
            ? `After (v${example.version})`
            : `Example (v${example.version})`}
        </h3>
        <CodeSnippet
          highlightedHTML={example.highlightedHTMLAfter}
          rawCode={example.codeSnippetAfter}
          language={example.version === 15 ? "typescript" : "typescript"}
        />
      </div>

      {/* Key Changes */}
      <div className="mb-6">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase mb-2">
          Key Changes
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700">
          {example.keyChanges.map((change, index) => (
            <li key={index} className="break-words">
              {change}
            </li>
          ))}
        </ul>
      </div>

      {/* Cross-Version Navigation & Blog Link */}
      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <a
          href={example.blogPostLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded px-2 py-1"
          aria-label={`Read the official blog post about ${example.title} (opens in new tab)`}
        >
          Read the official blog post →
        </a>

        {/* Cross-Version Link (FR-008) */}
        {crossVersionLink ? (
          <Link
            href={`/examples/${crossVersionLink.categoryId}`}
            className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded px-2 py-1"
            aria-label={`See this pattern in Next.js ${crossVersionLink.otherVersion}`}
          >
            See in Next.js {crossVersionLink.otherVersion} →
          </Link>
        ) : (
          <span className="text-gray-500 text-xs sm:text-sm font-medium italic">
            Not available in Next.js {otherVersion}
          </span>
        )}
      </div>
    </article>
  );
}
