import React from "react";
import type { PatternExample } from "../types";
import { CodeSnippet } from "./CodeSnippet";

interface ExampleCardProps {
  example: PatternExample;
}

/**
 * Displays a single pattern example with all details.
 * Shows title, version badge, breaking change indicator, description,
 * code snippets (before/after), and key changes.
 *
 * @param props.example - Pattern example to display
 */
export function ExampleCard({ example }: ExampleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{example.title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {example.beforeAfterSummary}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="bg-black text-white px-3 py-1 rounded text-sm font-semibold">
            v{example.version}
          </span>
          {example.isBreakingChange && (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-xs font-semibold">
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
          >
            {example.migrationImpact} IMPACT
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
          What Changed
        </h3>
        <p className="text-gray-700 leading-relaxed">{example.description}</p>
      </div>

      {/* Why It Matters */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
          Why It Matters
        </h3>
        <p className="text-gray-700 leading-relaxed">{example.whyItMatters}</p>
      </div>

      {/* Code Snippets */}
      {example.codeSnippetBefore && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
            Before (v{example.version === 15 ? "14" : "15"})
          </h3>
          <CodeSnippet
            highlightedHTML={example.highlightedHTMLBefore}
            rawCode={example.codeSnippetBefore}
          />
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
          {example.codeSnippetBefore
            ? `After (v${example.version})`
            : `Example (v${example.version})`}
        </h3>
        <CodeSnippet
          highlightedHTML={example.highlightedHTMLAfter}
          rawCode={example.codeSnippetAfter}
        />
      </div>

      {/* Key Changes */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">
          Key Changes
        </h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {example.keyChanges.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      </div>

      {/* Blog Post Link */}
      <div className="pt-4 border-t border-gray-200">
        <a
          href={example.blogPostLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          Read the official blog post →
        </a>
      </div>
    </article>
  );
}
