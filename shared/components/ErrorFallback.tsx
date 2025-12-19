import React from "react";

interface ErrorFallbackProps {
  error: Error;
  reset?: () => void;
}

/**
 * Error fallback component for graceful error handling (FR-012).
 * Displays user-friendly message when examples fail to render.
 *
 * @param props.error - Error object
 * @param props.reset - Optional reset function to retry
 */
export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  console.error("Example rendering error:", error);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-semibold text-red-900 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-red-700 mb-4">
        This example is temporarily unavailable. We've logged the error for
        investigation.
      </p>
      {reset && (
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      )}
      <details className="mt-4 text-sm text-red-800">
        <summary className="cursor-pointer font-medium">
          Technical details
        </summary>
        <pre className="mt-2 p-3 bg-white rounded border border-red-300 overflow-auto">
          {error.message}
        </pre>
      </details>
    </div>
  );
}
