import Link from "next/link";
import { getCategories, getExamplesByVersion } from "@shared/lib/dataAccess";
import { CategoryNav } from "@shared/components/CategoryNav";

export default function HomePage() {
  const categories = getCategories();
  const examples = getExamplesByVersion(16);

  return (
    <>
      <CategoryNav categories={categories} version={16} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js 16 Pattern Examples
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore {examples.length} major pattern changes in Next.js 16
            including Cache Components, proxy.ts migration, enhanced routing,
            new caching APIs, Turbopack builds, and critical breaking changes.
            Each example includes detailed migration guides and working code
            samples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryExamples = examples.filter(
              (ex) => ex.category === category.id
            );

            if (categoryExamples.length === 0) return null;

            return (
              <Link
                key={category.id}
                href={`/examples/${category.id}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  {category.icon && (
                    <span className="text-3xl">{category.icon}</span>
                  )}
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500">
                  {categoryExamples.length}{" "}
                  {categoryExamples.length === 1 ? "example" : "examples"}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Comparing with Next.js 15?
          </h3>
          <p className="text-blue-700 mb-4">
            View Next.js 15 examples to understand the evolution from version 15
            including async APIs, caching changes, Turbopack dev, React 19, and
            the Form component.
          </p>
          <a
            href="http://localhost:3015"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Next.js 15 Examples →
          </a>
        </div>
      </main>
    </>
  );
}
