# Component API Contract: Pattern Example Display

**Feature**: 001-nextjs-patterns-demo  
**Phase**: 1 (Design & Contracts)  
**Created**: 2025-12-19  
**Type**: React Component Interface

## Overview

Defines the props interface and behavior for shared React components used across Next.js 15 and 16 example apps.

---

## Component: CodeSnippet

Display syntax-highlighted code with optional before/after comparison.

### Props Interface

```typescript
interface CodeSnippetProps {
  /** Pre-highlighted HTML from Shiki (optional for 'before' snippet) */
  highlightedHTML?: string;

  /** Raw code string (fallback if highlighting fails) */
  rawCode: string;

  /** Programming language for aria-label */
  language: "typescript" | "tsx" | "javascript" | "jsx";

  /** Optional label for before/after context */
  label?: string;

  /** Show copy-to-clipboard button (progressive enhancement) */
  showCopyButton?: boolean;
}
```

### Behavior

- **Rendering**: If `highlightedHTML` exists, render it in a `<div dangerouslySetInnerHTML>`. Otherwise, render `rawCode` in plain `<code>` block.
- **Progressive Enhancement**: Copy button only renders if JavaScript is enabled (client component wrapper).
- **Accessibility**: `aria-label` describes code purpose and language.
- **Error Handling**: If `highlightedHTML` contains malformed HTML, fall back to `rawCode` display.

### Example Usage

```tsx
<CodeSnippet
  highlightedHTML={example.highlightedHTMLAfter}
  rawCode={example.codeSnippetAfter}
  language="tsx"
  label="Next.js 15 (After)"
  showCopyButton
/>
```

---

## Component: ExampleCard

Display a single pattern example with title, description, and code snippets.

### Props Interface

```typescript
interface ExampleCardProps {
  /** Pattern example data */
  example: PatternExample;

  /** Show "before" code snippet (if available) */
  showBefore?: boolean;

  /** Highlight version indicator */
  emphasizeVersion?: boolean;
}
```

### Behavior

- **Layout**: Vertical card with title, version badge, description, "Why It Matters", code snippets, and key changes list.
- **Conditional Rendering**: If `example.codeSnippetBefore` exists and `showBefore=true`, render both before/after snippets side-by-side (desktop) or stacked (mobile).
- **Cross-Version Link**: If `example.availableInOtherVersion=true`, render "See in Next.js {otherVersion}" link; otherwise, render "Not available in Next.js {otherVersion}" message.
- **Responsive Design**: Tailwind CSS responsive classes for mobile/tablet/desktop breakpoints.

### Example Usage

```tsx
<ExampleCard
  example={asyncRequestAPIsExample}
  showBefore={true}
  emphasizeVersion={true}
/>
```

---

## Component: CategoryNav

Navigation menu for pattern categories.

### Props Interface

```typescript
interface CategoryNavProps {
  /** All available categories */
  categories: ExampleCategory[];

  /** Currently active category ID */
  activeCategoryId?: string;

  /** Target Next.js version for links */
  version: 15 | 16;
}
```

### Behavior

- **Rendering**: Horizontal navigation menu (desktop) or dropdown (mobile).
- **Active State**: Highlight `activeCategoryId` with visual indicator (e.g., underline, bold text).
- **Links**: Generate links to `/examples/{categoryId}` for the specified version.
- **Progressive Enhancement**: Links are plain `<a>` tags wrapped in Next.js `<Link>` for client-side navigation.

### Example Usage

```tsx
<CategoryNav
  categories={categories}
  activeCategoryId="server-components"
  version={15}
/>
```

---

## Component: VersionSwitcher

Toggle between Next.js 15 and 16 example apps.

### Props Interface

```typescript
interface VersionSwitcherProps {
  /** Current version being displayed */
  currentVersion: 15 | 16;

  /** Current example ID (for maintaining context across versions) */
  currentExampleId?: string;
}
```

### Behavior

- **Link Generation**:
  - If `currentExampleId` exists and `availableInOtherVersion=true`, link to equivalent example in other version.
  - Otherwise, link to homepage of other version.
- **Visual Design**: Toggle switch or tab interface with clear version labels ("Next.js 15" / "Next.js 16").
- **Progressive Enhancement**: Server-rendered links; optional smooth transition animation with JavaScript.

### Example Usage

```tsx
<VersionSwitcher currentVersion={15} currentExampleId="async-request-apis" />
```

---

## Component: ExampleLayout

Shared layout wrapper for example pages.

### Props Interface

```typescript
interface ExampleLayoutProps {
  /** Next.js version for this example app */
  version: 15 | 16;

  /** Page title */
  title: string;

  /** Child content (examples) */
  children: React.ReactNode;
}
```

### Behavior

- **Structure**: Renders Header, main content area, and Footer.
- **SEO**: Sets page `<title>` and meta tags via Next.js Metadata API.
- **Accessibility**: Semantic HTML5 landmarks (`<header>`, `<main>`, `<footer>`).
- **Styling**: Applies Tailwind CSS container classes for consistent max-width and padding.

### Example Usage

```tsx
<ExampleLayout version={15} title="Server Components Examples">
  <CategoryNav categories={categories} version={15} />
  <ExampleCard example={example} />
</ExampleLayout>
```

---

## Component: Header

Global navigation header.

### Props Interface

```typescript
interface HeaderProps {
  /** Current Next.js version context */
  version: 15 | 16;
}
```

### Behavior

- **Branding**: Logo + site title ("Next.js 15/16 Pattern Examples").
- **Navigation**: Links to homepage, version switcher.
- **Responsive**: Mobile hamburger menu (progressive enhancement); desktop horizontal menu.
- **Accessibility**: Skip-to-content link, proper heading hierarchy.

---

## Component: Footer

Global page footer.

### Props Interface

```typescript
interface FooterProps {
  /** No required props */
}
```

### Behavior

- **Content**: Copyright notice, link to GitHub repo (if applicable), accessibility statement.
- **Styling**: Minimal design with Tailwind CSS; sticky footer on short pages.

---

## Non-Functional Requirements

1. **TypeScript Strict Mode**: All components use strict TypeScript; no implicit `any`.
2. **Server Components by Default**: All components are React Server Components unless client interactivity is required (e.g., copy button, mobile menu toggle).
3. **Accessibility**: All interactive elements have proper ARIA labels, keyboard navigation support, and semantic HTML.
4. **Responsive Design**: Mobile-first approach using Tailwind CSS breakpoints (sm, md, lg, xl).
5. **Error Boundaries**: Wrap all example rendering in error boundary to catch rendering failures (FR-012).
6. **Performance**: Components use `React.memo` where appropriate; avoid unnecessary re-renders.

---

## Shared Component Location

**Path**: `shared/components/`

**Exports**:

```typescript
// shared/components/index.ts
export { CodeSnippet } from "./CodeSnippet";
export { ExampleCard } from "./ExampleCard";
export { CategoryNav } from "./CategoryNav";
export { VersionSwitcher } from "./VersionSwitcher";
export { ExampleLayout } from "./ExampleLayout";
export { Header } from "./Header";
export { Footer } from "./Footer";
```

---

## Usage Example (Full Page)

```tsx
// apps/nextjs15-examples/app/examples/[category]/page.tsx
import {
  ExampleLayout,
  CategoryNav,
  ExampleCard,
  VersionSwitcher,
} from "@/shared/components";
import { getCategories, getExamplesByCategory } from "@/shared/lib/exampleData";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categories = getCategories();
  const examples = getExamplesByCategory(params.category);

  return (
    <ExampleLayout version={15} title={`${params.category} Examples`}>
      <VersionSwitcher currentVersion={15} />
      <CategoryNav
        categories={categories}
        activeCategoryId={params.category}
        version={15}
      />
      <div className="grid gap-6">
        {examples.map((ex) => (
          <ExampleCard key={ex.id} example={ex} showBefore />
        ))}
      </div>
    </ExampleLayout>
  );
}
```
