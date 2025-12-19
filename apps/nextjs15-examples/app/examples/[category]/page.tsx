import { notFound } from "next/navigation";
import {
  getCategories,
  getExamplesByCategoryAndVersion,
  getCategoryById,
} from "@shared/lib/dataAccess";
import { CategoryNav } from "@shared/components/CategoryNav";
import { ExampleCard } from "@shared/components/ExampleCard";
import { highlightCode } from "@shared/lib/syntaxHighlight";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    category: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const examples = getExamplesByCategoryAndVersion(categoryId, 15);

  if (examples.length === 0) {
    notFound();
  }

  // Pre-highlight all code snippets at build time
  const examplesWithHighlighting = await Promise.all(
    examples.map(async (example) => {
      const highlightedHTMLBefore = example.codeSnippetBefore
        ? await highlightCode(example.codeSnippetBefore, "typescript")
        : undefined;
      const highlightedHTMLAfter = await highlightCode(
        example.codeSnippetAfter,
        "typescript"
      );

      return {
        ...example,
        highlightedHTMLBefore,
        highlightedHTMLAfter,
      };
    })
  );

  const categories = getCategories();

  return (
    <>
      <CategoryNav
        categories={categories}
        version={15}
        activeCategory={categoryId}
      />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {category.icon && <span className="text-4xl">{category.icon}</span>}
            <h1 className="text-4xl font-bold text-gray-900">
              {category.name}
            </h1>
          </div>
          <p className="text-lg text-gray-600">{category.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {examples.length} {examples.length === 1 ? "example" : "examples"}{" "}
            in Next.js 15
          </p>
        </div>

        <div className="space-y-8">
          {examplesWithHighlighting.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      </main>
    </>
  );
}
