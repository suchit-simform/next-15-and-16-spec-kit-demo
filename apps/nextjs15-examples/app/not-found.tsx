import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page or category you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
