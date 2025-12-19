import type { ExampleCategory, PatternExample } from "../types";

/**
 * Canonical category taxonomy for all pattern examples.
 * All pattern examples MUST be assigned to one of these categories.
 */
export const categories: ExampleCategory[] = [
  {
    id: "data-fetching-caching",
    name: "Data Fetching & Caching",
    description:
      "Patterns for fetching data, caching behavior, revalidation APIs",
    icon: "🔄",
    order: 1,
    versions: [15, 16],
  },
  {
    id: "routing-navigation",
    name: "Routing & Navigation",
    description: "Patterns for routing, navigation, middleware, forms",
    icon: "🧭",
    order: 2,
    versions: [15, 16],
  },
  {
    id: "build-performance",
    name: "Build & Performance",
    description: "Build tooling, bundlers, performance optimizations",
    icon: "⚡",
    order: 3,
    versions: [15, 16],
  },
  {
    id: "server-components",
    name: "Server Components",
    description: "Server/Client component patterns, rendering strategies",
    icon: "🧩",
    order: 4,
    versions: [16],
  },
  {
    id: "developer-experience",
    name: "Developer Experience",
    description: "DX improvements, error messages, debugging tools",
    icon: "🛠️",
    order: 5,
    versions: [15],
  },
];

/**
 * All pattern examples (populated in user story phases).
 * Structure: examples array will be populated with Next.js 15 and 16 pattern data.
 */
export const examples: PatternExample[] = [
  // Next.js 15 Pattern 1: Async Request APIs
  {
    id: "async-request-apis-v15",
    title: "Async Request APIs",
    version: 15,
    category: "data-fetching-caching",
    isBreakingChange: true,
    migrationImpact: "HIGH",
    blogPostLink: "https://nextjs.org/blog/next-15#async-request-apis",
    beforeAfterSummary:
      "Before: headers() returns immediately. After: await headers() required.",
    description:
      "In Next.js 15, request APIs like headers(), cookies(), draftMode(), params, and searchParams became async to better align with React's async rendering model. This breaking change requires adding await keywords throughout your codebase where these APIs are used.",
    whyItMatters:
      "This change affects most Next.js applications and represents a fundamental shift in how request context is accessed. While it's a breaking change, it enables better performance optimizations and prepares the framework for React Server Components' async nature. A codemod is available to automate migration.",
    codeSnippetBefore: `// Next.js 14 (synchronous)
import { headers } from 'next/headers';

export default function Page() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  return <div>User Agent: {userAgent}</div>;
}`,
    codeSnippetAfter: `// Next.js 15 (asynchronous)
import { headers } from 'next/headers';

export default async function Page() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  return <div>User Agent: {userAgent}</div>;
}`,
    keyChanges: [
      "headers(), cookies(), draftMode() now return promises",
      "params and searchParams props are now promises",
      "Component must be async or use React.use()",
      "Codemod available: npx @next/codemod@canary next-async-request-api",
    ],
    availableInOtherVersion: true,
    relatedExampleId: "async-params-v16",
  },

  // Next.js 15 Pattern 2: Caching Semantics Changed
  {
    id: "caching-semantics-v15",
    title: "Caching Semantics Changed",
    version: 15,
    category: "data-fetching-caching",
    isBreakingChange: true,
    migrationImpact: "MEDIUM",
    blogPostLink: "https://nextjs.org/blog/next-15#caching-updates",
    beforeAfterSummary:
      "Before: GET routes cached by default. After: No caching by default, opt-in required.",
    description:
      "Next.js 15 changed caching defaults for GET Route Handlers (no longer cached by default) and Client Router Cache (staleTime now 0 seconds for pages). These changes provide more predictable behavior but may impact performance for apps relying on implicit caching.",
    whyItMatters:
      "The previous caching behavior was often unexpected and led to stale data issues. Making caching opt-in gives developers explicit control over what gets cached and for how long. This aligns with modern expectations where fresh data is the default, and caching is a performance optimization you consciously choose.",
    codeSnippetBefore: `// Next.js 14 - GET routes cached by default
export async function GET() {
  const data = await fetch('https://api.example.com/data');
  return Response.json(data);
  // ⚠️ Automatically cached indefinitely
}`,
    codeSnippetAfter: `// Next.js 15 - Explicit caching required
export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  return Response.json(data);
}

// Or mark the entire route as dynamic
export const dynamic = 'force-dynamic';`,
    keyChanges: [
      "GET Route Handlers no longer cached by default",
      "Client Router Cache staleTime changed to 0 (pages)",
      "Use { next: { revalidate } } to opt into caching",
      "Set staleTimes config to restore v14 behavior if needed",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 15 Pattern 3: Turbopack Dev (Stable)
  {
    id: "turbopack-dev-v15",
    title: "Turbopack Dev (Stable)",
    version: 15,
    category: "build-performance",
    isBreakingChange: false,
    migrationImpact: "LOW",
    blogPostLink: "https://nextjs.org/blog/next-15#turbopack-dev",
    beforeAfterSummary:
      "Before: webpack dev server. After: Turbopack with 76.7% faster startup.",
    description:
      "Turbopack, Next.js's Rust-powered bundler, is now stable for local development. It delivers 76.7% faster local server startup and 96.3% faster Fast Refresh compared to webpack, dramatically improving developer experience for large applications.",
    whyItMatters:
      "Faster dev server startup and Hot Module Replacement (HMR) means less waiting and more coding. For large applications with hundreds of components, Turbopack can reduce startup time from 10+ seconds to under 3 seconds. This compounds over a workday, saving hours of developer time and improving focus.",
    codeSnippetBefore: `# Next.js 14 - webpack (default)
npm run dev

# Starts dev server with webpack
# Larger projects: 10-15s startup time`,
    codeSnippetAfter: `# Next.js 15 - Enable Turbopack
npm run dev --turbo

# Or update package.json:
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}

# Same project: 2-3s startup time
# 96.3% faster Fast Refresh`,
    keyChanges: [
      "76.7% faster local server startup vs webpack",
      "96.3% faster Fast Refresh (HMR)",
      "Opt-in with --turbo flag",
      "Passes 100% of Next.js integration tests",
      "Turbopack builds (production) coming in Next.js 16",
    ],
    availableInOtherVersion: true,
    relatedExampleId: "turbopack-builds-v16",
  },

  // Next.js 15 Pattern 4: React 19 Support + Hydration Error Improvements
  {
    id: "react-19-support-v15",
    title: "React 19 Support + Hydration Errors",
    version: 15,
    category: "developer-experience",
    isBreakingChange: false,
    migrationImpact: "MEDIUM",
    blogPostLink: "https://nextjs.org/blog/next-15#react-19",
    beforeAfterSummary:
      "Before: Generic hydration errors. After: Improved error messages with source code display.",
    description:
      "Next.js 15 supports React 19 (released as stable in v15.1), bringing React Compiler support and dramatically improved hydration error messages. Errors now show the source code diff highlighting the mismatch between server and client rendering.",
    whyItMatters:
      "Hydration errors were historically difficult to debug, often requiring hours of detective work. React 19's improved error messages show exactly what mismatched and where in your source code, reducing debugging time from hours to minutes. The React Compiler also enables automatic performance optimizations previously requiring manual memoization.",
    codeSnippetBefore: `// React 18 hydration error (cryptic)
Error: Hydration failed because the initial UI does not match what was rendered on the server.

// You'd have to manually find the mismatch`,
    codeSnippetAfter: `// React 19 hydration error (helpful)
Error: Hydration failed because the server rendered HTML didn't match the client.

Expected: <div class="container">
Received: <div class="wrapper">

Source: app/page.tsx:15
  <div className="container">
  ~~~~~~~~~~~~~~~~~ ❌ Should be "wrapper"`,
    keyChanges: [
      "React 19 stable in Next.js 15.1+",
      "Improved hydration error messages with source diffs",
      "React Compiler support (experimental)",
      "Better stack traces in development",
      "App Router uses React 19 by default",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 15 Pattern 5: Form Component with Progressive Enhancement
  {
    id: "form-component-v15",
    title: "Form Component",
    version: 15,
    category: "routing-navigation",
    isBreakingChange: false,
    migrationImpact: "LOW",
    blogPostLink: "https://nextjs.org/blog/next-15#form-component",
    beforeAfterSummary:
      "Before: Manual form handling. After: Built-in <Form> with prefetching and client-side navigation.",
    description:
      "Next.js 15 introduces a new <Form> component that extends the HTML <form> element with client-side navigation, prefetching, and progressive enhancement. Forms work without JavaScript and enhance when JS is available.",
    whyItMatters:
      "Forms are fundamental to web apps, but implementing them with good UX (prefetching destinations, client-side navigation, loading states) required boilerplate. The <Form> component handles this automatically while maintaining progressive enhancement - forms submit normally without JS and get enhanced routing when available.",
    codeSnippetBefore: `// Before: Manual form handling
'use client';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get('q');
      router.push(\`/search?q=\${query}\`);
    }}>
      <input name="q" />
      <button>Search</button>
    </form>
  );
}`,
    codeSnippetAfter: `// Next.js 15: Built-in Form component
import Form from 'next/form';

export default function SearchForm() {
  return (
    <Form action="/search">
      <input name="q" />
      <button>Search</button>
    </Form>
  );
}

// Automatically handles:
// - Prefetching /search route on hover
// - Client-side navigation (no full page reload)
// - Falls back to native submission without JS`,
    keyChanges: [
      "Built-in <Form> component for enhanced forms",
      "Automatic prefetching of form destination",
      "Client-side navigation on submission",
      "Progressive enhancement (works without JS)",
      "Reduces boilerplate for common form patterns",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 16 Pattern 1: Cache Components + "use cache"
  {
    id: "cache-components-v16",
    title: "Cache Components + 'use cache' Directive",
    version: 16,
    category: "data-fetching-caching",
    isBreakingChange: true,
    migrationImpact: "HIGH",
    blogPostLink: "https://nextjs.org/blog/next-16#cache-components",
    beforeAfterSummary:
      "Before: PPR/dynamicIO experimental. After: Opt-in 'use cache' with Cache Components.",
    description:
      "Next.js 16 introduces Cache Components and the 'use cache' directive, replacing Partial Pre-Rendering (PPR) and dynamic I/O experiments. This is an architectural change that enables fine-grained control over which portions of a page are cached.",
    whyItMatters:
      "This represents the completion of Next.js's caching story. Instead of whole-page caching or dynamic rendering, you can now mark individual components as cached, enabling hybrid rendering with minimal markup. This is more powerful than PPR and simpler than the previous experiments.",
    codeSnippetBefore: `// Next.js 14 - PPR experimental (removed)
import { experimental_ppr } from 'next/experimental';
export const experimental_ppr = true;

export default function Page() {
  return (
    <div>
      {/* Dynamically rendered at request time */}
      <UserGreeting />
    </div>
  );
}`,
    codeSnippetAfter: `// Next.js 16 - Cache Components + 'use cache'
'use cache';

import { getUserData } from '@/lib/db';

async function UserGreeting() {
  const user = await getUserData();
  return <div>Hello, {user.name}!</div>;
}

export default function Page() {
  return <UserGreeting />;
}`,
    keyChanges: [
      "'use cache' directive marks components/functions as cached",
      "Caching scope can be per-component or per-function",
      "PPR and dynamicIO experiments removed",
      "experimental.ppr config removed",
      "Works at both component and route handler levels",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 16 Pattern 2: proxy.ts Migration
  {
    id: "proxy-ts-migration-v16",
    title: "proxy.ts Migration",
    version: 16,
    category: "routing-navigation",
    isBreakingChange: true,
    migrationImpact: "MEDIUM",
    blogPostLink: "https://nextjs.org/blog/next-16#proxy-ts",
    beforeAfterSummary:
      "Before: middleware.ts file. After: proxy.ts replaces middleware (Node.js only).",
    description:
      "Next.js 16 introduces proxy.ts to replace middleware.ts. The proxy.ts file runs with the Node.js runtime (not edge) and provides a clearer name for network-level request interception. middleware.ts is deprecated but still supported for now.",
    whyItMatters:
      "The name 'proxy' better reflects what the file does - it acts as a proxy for requests at the network boundary. Requiring Node.js runtime (instead of edge) enables more use cases like database access and file I/O. This is a smoother evolution of the middleware pattern.",
    codeSnippetBefore: `// middleware.ts (deprecated in v16)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};`,
    codeSnippetAfter: `// proxy.ts (v16+)
import { type ProxyHandler } from 'next/proxy';

export const handle: ProxyHandler = async (request) => {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return new Response(null, { status: 307, headers: { location: '/login' } });
  }
};

export const config = {
  matcher: ['/admin/:path*'],
};`,
    keyChanges: [
      "middleware.ts deprecated; use proxy.ts instead",
      "proxy.ts runs with Node.js runtime (can access DB, files, etc.)",
      "Clearer naming: 'proxy' instead of 'middleware'",
      "middleware.ts still works but will be removed in future version",
      "Configuration remains similar with matcher pattern",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 16 Pattern 3: Enhanced Routing
  {
    id: "enhanced-routing-v16",
    title: "Enhanced Routing",
    version: 16,
    category: "routing-navigation",
    isBreakingChange: false,
    migrationImpact: "LOW",
    blogPostLink: "https://nextjs.org/blog/next-16#enhanced-routing",
    beforeAfterSummary:
      "Before: Each link prefetches full layout. After: Shared layout downloaded once.",
    description:
      "Next.js 16 introduces layout deduplication and incremental prefetch cancellation. When multiple links share the same layout, the layout is now downloaded only once. Additionally, prefetch requests can be canceled if the user navigates away, reducing unnecessary bandwidth.",
    whyItMatters:
      "This automatic optimization reduces bandwidth usage and improves perceived performance, especially for users on slow connections. It's a zero-code improvement that Just Works for all applications.",
    codeSnippetBefore: `// Next.js 15 - Each link prefetches layout separately
<div>
  <Link href="/blog/post-1">Post 1</Link>
  <Link href="/blog/post-2">Post 2</Link>
  <Link href="/blog/post-3">Post 3</Link>
</div>

// ❌ Layout is prefetched 3 times`,
    codeSnippetAfter: `// Next.js 16 - Shared layout prefetched once
<div>
  <Link href="/blog/post-1">Post 1</Link>
  <Link href="/blog/post-2">Post 2</Link>
  <Link href="/blog/post-3">Post 3</Link>
</div>

// ✓ Layout prefetched once, reused for all links
// ✓ Prefetch canceled if user navigates away`,
    keyChanges: [
      "Layout deduplication reduces redundant prefetches",
      "Incremental prefetch cancellation saves bandwidth",
      "Automatic - no code changes required",
      "Works transparently with existing code",
      "Especially beneficial for users on slow connections",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 16 Pattern 4: New Caching APIs
  {
    id: "new-caching-apis-v16",
    title: "New Caching APIs",
    version: 16,
    category: "data-fetching-caching",
    isBreakingChange: true,
    migrationImpact: "HIGH",
    blogPostLink: "https://nextjs.org/blog/next-16#improved-caching-apis",
    beforeAfterSummary:
      "Before: revalidateTag('tag'). After: revalidateTag('tag', profile) with cacheLife.",
    description:
      "Next.js 16 changes the revalidateTag API to require a second parameter specifying the cache lifetime profile. New updateTag() and refresh() APIs are introduced for more granular cache control.",
    whyItMatters:
      "These breaking changes make caching behavior explicit and consistent. The cacheLife profile ensures you're intentional about how long data stays cached. updateTag() enables read-your-writes patterns without full revalidation.",
    codeSnippetBefore: `// Next.js 15 - revalidateTag only needs tag name
import { revalidateTag } from 'next/cache';

export async function updatePost(id: string) {
  await db.posts.update(id, data);
  revalidateTag(\`post-\${id}\`); // ✓ Works
}`,
    codeSnippetAfter: `// Next.js 16 - revalidateTag requires cacheLife profile
import { revalidateTag } from 'next/cache';

export async function updatePost(id: string) {
  await db.posts.update(id, data);
  // ❌ This now requires second parameter
  revalidateTag(\`post-\${id}\`, 'minutes');
  
  // Or use new updateTag for read-your-writes
  updateTag(\`post-\${id}\`, updatedData);
}`,
    keyChanges: [
      "revalidateTag() requires cacheLife profile parameter (BREAKING)",
      "New updateTag() for read-your-writes without full refresh",
      "New refresh() for refreshing uncached routes",
      "Migration: Specify 'seconds', 'minutes', or 'hours' as profile",
      "Clearer intent: explicit cache lifetime management",
    ],
    availableInOtherVersion: false,
  },

  // Next.js 16 Pattern 5: Turbopack Builds Stable
  {
    id: "turbopack-builds-v16",
    title: "Turbopack Builds (Stable)",
    version: 16,
    category: "build-performance",
    isBreakingChange: false,
    migrationImpact: "LOW",
    blogPostLink: "https://nextjs.org/blog/next-16#turbopack-builds",
    beforeAfterSummary:
      "Before: Webpack production builds. After: Turbopack is now the default production bundler.",
    description:
      "Turbopack is now stable for production builds in Next.js 16, becoming the default bundler. Production builds are 2-5x faster, and combined with dev-time improvements, Turbopack cuts build times dramatically. File system caching (v16.1) makes subsequent builds even faster.",
    whyItMatters:
      "Faster builds mean faster deployments and quicker feedback during development. For CI/CD pipelines, build time is often a bottleneck. 2-5x speedup translates to minutes saved per deployment cycle, improving developer productivity and enabling faster iteration.",
    codeSnippetBefore: `// Next.js 15 - webpack (default)
npm run build
# Webpack build: 30-60s for large app

next.config.js
// No Turbopack config needed`,
    codeSnippetAfter: `// Next.js 16 - Turbopack (default)
npm run build
# Turbopack build: 6-15s for same app

next.config.js
// Turbopack is default; opt out if needed:
module.exports = {
  bundler: 'webpack' // Revert to webpack if necessary
}`,
    keyChanges: [
      "Turbopack default bundler for production builds (v16.0+)",
      "2-5x faster production builds vs webpack",
      "10x faster Fast Refresh (dev time)",
      "File system caching stable (v16.1)",
      "Opt-out available if issues: bundler: 'webpack' in config",
    ],
    availableInOtherVersion: true,
    relatedExampleId: "turbopack-dev-v15",
  },

  // Next.js 16 Pattern 6: Breaking Changes Summary
  {
    id: "breaking-changes-v16",
    title: "Breaking Changes Summary",
    version: 16,
    category: "server-components",
    isBreakingChange: true,
    migrationImpact: "HIGH",
    blogPostLink: "https://nextjs.org/blog/next-16#breaking-changes",
    beforeAfterSummary:
      "Critical migrations: async params, revalidateTag signature, middleware.ts, image config, AMP removal.",
    description:
      "Next.js 16 introduces several breaking changes beyond the API updates: params and searchParams are now promises (must be awaited), revalidateTag signature changed (requires profile), middleware.ts deprecated (use proxy.ts), image quality validation stricter, and AMP support removed entirely.",
    whyItMatters:
      "These breaking changes align Next.js with modern async patterns and remove legacy features. While they require migration work, they set the foundation for better performance, clearer async handling, and a leaner framework. Most apps can migrate in hours using the provided codemods.",
    codeSnippetBefore: `// Before: params/searchParams were sync
export default function Page({ params, searchParams }) {
  const id = params.id; // ✓ Sync access
  const sort = searchParams.sort; // ✓ Sync access
  return <div>ID: {id}, Sort: {sort}</div>;
}`,
    codeSnippetAfter: `// After: params/searchParams are promises
export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort: string }>;
}) {
  const params = await props.params; // ❌ Must await
  const searchParams = await props.searchParams;
  const id = params.id;
  const sort = searchParams.sort;
  return <div>ID: {id}, Sort: {sort}</div>;
}`,
    keyChanges: [
      "params/searchParams must be awaited (breaking)",
      "revalidateTag() requires cacheLife profile (breaking)",
      "middleware.ts deprecated → use proxy.ts (breaking)",
      "Image config: stricter quality validation",
      "AMP support completely removed",
      "Run npx @next/codemod@canary next-async-request-api for migration",
    ],
    availableInOtherVersion: false,
  },
];
