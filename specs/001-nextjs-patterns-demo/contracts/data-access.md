# API Contract: Pattern Example Data Access

**Feature**: 001-nextjs-patterns-demo  
**Phase**: 1 (Design & Contracts)  
**Created**: 2025-12-19  
**Type**: Internal TypeScript Module Interface

## Overview

This contract defines the TypeScript interfaces and utility functions for accessing hardcoded pattern example data. No external API or network requests—all data access is build-time and type-safe.

---

## Type Definitions

### PatternExample Interface

```typescript
interface PatternExample {
  id: string;
  title: string;
  version: 15 | 16;
  category: string; // References ExampleCategory.id
  description: string;
  whyItMatters: string;
  codeSnippetBefore?: string;
  codeSnippetAfter: string;
  highlightedHTMLBefore?: string;
  highlightedHTMLAfter: string;
  keyChanges: string[];
  availableInOtherVersion: boolean;
  relatedExampleId?: string;
}
```

### ExampleCategory Interface

```typescript
interface ExampleCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  order: number;
}
```

### NavigationRoute Interface

```typescript
interface NavigationRoute {
  path: string;
  version: 15 | 16;
  exampleIds: string[];
}
```

---

## Data Access Functions

### getCategories

Retrieve all example categories, sorted by display order.

**Signature**:

```typescript
function getCategories(): ExampleCategory[];
```

**Returns**: Array of ExampleCategory objects, sorted ascending by `order` field

**Example**:

```typescript
const categories = getCategories();
// [
//   { id: "server-components", name: "Server Components", order: 1, ... },
//   { id: "data-fetching", name: "Data Fetching", order: 2, ... }
// ]
```

**Error Handling**: No errors possible (hardcoded data)

---

### getExamplesByVersion

Retrieve all pattern examples for a specific Next.js version.

**Signature**:

```typescript
function getExamplesByVersion(version: 15 | 16): PatternExample[];
```

**Parameters**:

- `version`: Target Next.js version (15 or 16)

**Returns**: Array of PatternExample objects matching the specified version

**Example**:

```typescript
const v15Examples = getExamplesByVersion(15);
// Returns all examples where version === 15
```

**Error Handling**: Returns empty array if no examples exist for version

---

### getExamplesByCategory

Retrieve all pattern examples in a specific category.

**Signature**:

```typescript
function getExamplesByCategory(categoryId: string): PatternExample[];
```

**Parameters**:

- `categoryId`: Unique identifier of the category

**Returns**: Array of PatternExample objects matching the category

**Example**:

```typescript
const serverComponentExamples = getExamplesByCategory("server-components");
// Returns examples where category === "server-components"
```

**Error Handling**: Returns empty array if category doesn't exist or has no examples

---

### getExampleById

Retrieve a single pattern example by its unique ID.

**Signature**:

```typescript
function getExampleById(id: string): PatternExample | null;
```

**Parameters**:

- `id`: Unique identifier of the example

**Returns**: PatternExample object if found, `null` otherwise

**Example**:

```typescript
const example = getExampleById("async-request-apis");
if (example) {
  console.log(example.title); // "Async Request APIs"
}
```

**Error Handling**: Returns `null` if ID doesn't exist

---

### getCategoryById

Retrieve a single category by its unique ID.

**Signature**:

```typescript
function getCategoryById(id: string): ExampleCategory | null;
```

**Parameters**:

- `id`: Unique identifier of the category

**Returns**: ExampleCategory object if found, `null` otherwise

**Example**:

```typescript
const category = getCategoryById("server-components");
if (category) {
  console.log(category.name); // "Server Components"
}
```

**Error Handling**: Returns `null` if ID doesn't exist

---

### getRelatedExample

Retrieve the related example in the alternate version (if available).

**Signature**:

```typescript
function getRelatedExample(example: PatternExample): PatternExample | null;
```

**Parameters**:

- `example`: Source PatternExample object

**Returns**: Related PatternExample in alternate version if `availableInOtherVersion` is true and `relatedExampleId` is set, `null` otherwise

**Example**:

```typescript
const v15Example = getExampleById("caching-behavior");
const v16Equivalent = getRelatedExample(v15Example);
// Returns Next.js 16 version of the same pattern (if exists)
```

**Error Handling**: Returns `null` if no related example exists or `availableInOtherVersion` is false

---

## Build-Time Functions

### highlightCode

Generate syntax-highlighted HTML from code snippet using Shiki.

**Signature**:

```typescript
async function highlightCode(
  code: string,
  lang: "typescript" | "tsx" | "javascript" | "jsx"
): Promise<string>;
```

**Parameters**:

- `code`: Source code string
- `lang`: Programming language for syntax highlighting

**Returns**: Promise resolving to HTML string with syntax highlighting applied

**Example**:

```typescript
const html = await highlightCode(`const x = 42;`, "typescript");
// Returns: '<pre class="shiki"><code>...</code></pre>'
```

**Error Handling**: If Shiki fails, returns plain `<pre><code>{code}</code></pre>` (graceful degradation per FR-012)

---

### buildExampleData

Validate and build complete example dataset at build time.

**Signature**:

```typescript
function buildExampleData(): {
  categories: ExampleCategory[];
  examples: PatternExample[];
  errors: string[];
};
```

**Returns**: Object containing validated categories, examples, and any validation errors

**Validation Checks**:

1. All `PatternExample.category` values reference valid `ExampleCategory.id`
2. All `PatternExample.id` values are unique
3. All `ExampleCategory.id` values are unique
4. If `availableInOtherVersion=true`, `relatedExampleId` must exist and point to opposite version
5. Code snippets are non-empty strings

**Example**:

```typescript
const { categories, examples, errors } = buildExampleData();
if (errors.length > 0) {
  throw new Error(`Data validation failed: ${errors.join(", ")}`);
}
```

**Error Handling**: Returns errors array instead of throwing; caller decides whether to fail build

---

## Usage Patterns

### Server Component Data Fetching

```typescript
// app/examples/[category]/page.tsx
import { getExamplesByCategory } from "@/shared/lib/exampleData";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const examples = getExamplesByCategory(params.category);

  return (
    <div>
      {examples.map((ex) => (
        <ExampleCard key={ex.id} example={ex} />
      ))}
    </div>
  );
}
```

### Build-Time Static Generation

```typescript
// app/examples/[category]/page.tsx
import { getCategories } from "@/shared/lib/exampleData";

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ category: cat.id }));
}
```

---

## Non-Functional Requirements

1. **Type Safety**: All functions use TypeScript strict mode; no `any` types
2. **Immutability**: Data arrays are frozen (`Object.freeze`) to prevent runtime mutations
3. **Performance**: All functions execute in O(n) or better; no database queries
4. **Build-Time Validation**: `buildExampleData()` runs during build; fails fast on schema violations
5. **Progressive Enhancement**: If syntax highlighting fails, raw code still displays (graceful degradation)

---

## Migration Notes

If future versions require dynamic data (e.g., CMS, API):

1. Replace function implementations to fetch from external source
2. Keep interface signatures unchanged
3. Add caching layer (React Server Components cache or SWR)
4. Add error boundaries for network failures
