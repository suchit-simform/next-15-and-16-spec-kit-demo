import React from "react";

interface ExampleUnavailableProps {
  exampleId: string;
  reason?: string;
}

/**
 * Component for displaying missing/unavailable examples.
 *
 * @param props.exampleId - ID of the unavailable example
 * @param props.reason - Optional reason for unavailability
 */
export function ExampleUnavailable({
  exampleId,
  reason,
}: ExampleUnavailableProps) {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 className="text-xl font-semibold text-yellow-900 mb-2">
        Example Not Available
      </h2>
      <p className="text-yellow-700 mb-2">
        The example{" "}
        <code className="bg-yellow-100 px-2 py-1 rounded">{exampleId}</code> is
        not available.
      </p>
      {reason && <p className="text-yellow-700 text-sm">{reason}</p>}
    </div>
  );
}
