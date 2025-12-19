# Research: Next.js 15 and 16 Pattern Examples

**Feature**: 001-nextjs-patterns-demo  
**Phase**: 0 (Outline & Research)  
**Created**: 2025-12-19

## Purpose

Resolve all NEEDS CLARIFICATION items from Technical Context and establish best practices for key technology choices.

---

## Research Task 1: Syntax Highlighting Library

**Unknown from Technical Context**: Syntax highlighting library choice (options: Prism.js, Shiki, react-syntax-highlighter)

### Decision

**Chosen**: Shiki

### Rationale

- **Server-side rendering support**: Shiki runs at build time, generating pre-highlighted HTML that works without JavaScript—aligns perfectly with progressive enhancement requirement (FR-011)
- **Accuracy**: Uses actual VS Code grammar definitions for syntax highlighting; supports TypeScript, JSX, TSX natively
- **Performance**: Zero runtime JavaScript cost when used with Next.js static generation; pre-highlighted markup loads instantly
- **Next.js compatibility**: Official Next.js docs use Shiki; well-documented integration patterns for App Router
- **Maintainability**: Simple API; no client-side configuration needed; consistent with "readable by any teammate" (Principle II)

### Alternatives Considered

| Library                  | Pros                                | Cons                                                          | Why Rejected                                               |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| Prism.js                 | Popular; extensive language support | Requires client-side JS for highlighting; adds runtime bundle | Violates progressive enhancement (FR-011)                  |
| react-syntax-highlighter | React-friendly API; flexible        | Client-side rendering; larger bundle size                     | Same progressive enhancement issue; unnecessary complexity |
| highlight.js             | Automatic language detection        | Runtime highlighting; heavier bundle                          | Conflicts with static-first approach                       |

### Implementation Notes

- Use `shiki` package with Next.js App Router
- Pre-highlight code snippets at build time in `shared/lib/syntaxHighlight.ts`
- Store highlighted HTML in example data definitions
- Fallback: plain `<code>` blocks with monospace font if build-time highlighting fails (maintains FR-011 compliance)

---

## Research Task 2: Next.js 15 vs 16 Pattern Selection

**Context**: Need to identify 5+ distinct, meaningful pattern examples per version (FR-002/FR-003) based on official Next.js blog posts (v15.0-15.5, v16.0-16.1)

**Sources**: nextjs.org/blog/next-15, next-15-1, next-15-2, next-15-3, next-15-4, next-15-5, next-16, next-16-1

### Decision

**Next.js 15 Patterns** (5 patterns covering v15.0-15.5 major changes):

1. **Async Request APIs** (`headers()`, `cookies()`, `draftMode()`, `params`, `searchParams`)

   - Category: Data Fetching & Caching
   - Version: Breaking change in 15.0
   - Rationale: Critical breaking change affecting most applications; requires async/await for all request APIs
   - Blog ref: next-15 (Async Request APIs section)
   - Migration impact: HIGH (codemod available)

2. **Caching Semantics Changed** (GET Route Handlers, Client Router Cache defaults)

   - Category: Data Fetching & Caching
   - Version: Breaking change in 15.0
   - Rationale: GET Route Handlers no longer cached by default; Client Router Cache staleTime=0 for pages
   - Blog ref: next-15 (Caching Semantics section)
   - Migration impact: MEDIUM (opt-in via config)

3. **Turbopack Dev (Stable)**

   - Category: Build & Performance
   - Version: Stable in 15.0
   - Rationale: 76.7% faster local server startup; 96.3% faster Fast Refresh; major DX improvement
   - Blog ref: next-15 (Turbopack Dev section)
   - Migration impact: LOW (opt-in with --turbo flag)

4. **React 19 Support + Hydration Error Improvements**

   - Category: Developer Experience
   - Version: 15.0 (React 19 RC), 15.1 (React 19 stable)
   - Rationale: React Compiler support, improved error messages with source code display
   - Blog ref: next-15 (React 19 section), next-15-1 (React 19 stable)
   - Migration impact: MEDIUM (App Router uses React 19 RC/stable)

5. **`<Form>` Component with Progressive Enhancement**
   - Category: Routing & Navigation
   - Version: New in 15.0
   - Rationale: Built-in form component with prefetching, client-side navigation, progressive enhancement
   - Blog ref: next-15 (Form Component section)
   - Migration impact: LOW (new feature, opt-in)

**Next.js 16 Patterns** (5 patterns covering v16.0-16.1 major changes):

1. **Cache Components + "use cache" Directive** (replaces PPR/dynamicIO)

   - Category: Data Fetching & Caching
   - Version: New in 16.0 (cacheComponents flag)
   - Rationale: Fundamental caching model change; opt-in caching vs implicit caching in v14; completes PPR story
   - Blog ref: next-16 (Cache Components section)
   - Migration impact: HIGH (architectural shift; experimental.ppr removed)

2. **proxy.ts Migration** (replaces middleware.ts)

   - Category: Routing & Navigation
   - Version: Breaking change in 16.0 (middleware.ts deprecated)
   - Rationale: Clearer network boundary naming; Node.js runtime; middleware.ts will be removed in future
   - Blog ref: next-16 (proxy.ts section)
   - Migration impact: MEDIUM (rename + function rename; middleware.ts still works but deprecated)

3. **Enhanced Routing** (layout deduplication + incremental prefetching)

   - Category: Routing & Navigation
   - Version: New in 16.0
   - Rationale: Layout downloaded once for multiple links (vs per-link); incremental prefetch cancellation; lower bandwidth
   - Blog ref: next-16 (Enhanced Routing section)
   - Migration impact: LOW (automatic improvement, no code changes)

4. **New Caching APIs** (updateTag, refresh, revalidateTag signature change)

   - Category: Data Fetching & Caching
   - Version: Breaking change in 16.0
   - Rationale: revalidateTag() requires cacheLife profile (breaking); new updateTag() for read-your-writes; new refresh() for uncached data
   - Blog ref: next-16 (Improved Caching APIs section)
   - Migration impact: HIGH (breaking change; requires second argument)

5. **Turbopack Builds (Stable)** + File System Caching
   - Category: Build & Performance
   - Version: Stable in 16.0 (builds), stable in 16.1 (FS cache for dev)
   - Rationale: Default bundler for all apps; 2-5x faster builds; 10x faster Fast Refresh; persistent caching
   - Blog ref: next-16 (Turbopack stable), next-16-1 (FS caching stable)
   - Migration impact: LOW (automatic; opt-out with --webpack)

### Rationale

- **Comprehensive coverage**: 10 patterns cover ~40% of major changes across both versions (vs 3 patterns = 12%)
- **Breaking changes prioritized**: Async APIs, caching defaults, revalidateTag signature, proxy.ts migration
- **Category balance**: Data Fetching (4), Routing (3), Build (2), DX (1)
- **Migration impact clarity**: Each pattern tagged HIGH/MEDIUM/LOW with codemod availability noted
- **Version-specific**: No overlap; Turbopack evolution shown (dev in v15 → builds in v16)
- **Blog post traceability**: Every pattern cites exact blog post section for verification

### Alternatives Considered & Rejected

- **after() API (v15)**: Originally included, but stable only in 15.1 (not 15.0); less critical than Turbopack Dev or Form component
- **React 19.2 View Transitions (v16)**: Too React-specific; overlaps with framework concerns
- **Node.js Middleware stable (v16)**: Narrower use case than proxy.ts migration (which is breaking)
- **ESLint 9 / next lint deprecation**: Tooling changes; less architectural impact for core Next.js learning
- **AMP removal (v16)**: Deprecated feature; less educational value than new patterns

---

## Research Task 3: Progressive Enhancement Strategy

**Context**: FR-011 requires core content (navigation, code snippets, explanations) to work without JavaScript

### Decision

**Approach**: Server-side rendering with minimal client-side enhancement

### Implementation Strategy

1. **Navigation**: Plain HTML `<a>` tags with Next.js `<Link>` wrapping for client-side transitions (degrades gracefully to full page loads)
2. **Code Snippets**: Pre-rendered HTML from Shiki (no JS required)
3. **Syntax Highlighting**: Applied at build time; CSS-only theming
4. **Version Switcher**: Server-rendered navigation menu; optional client-side smooth scrolling enhancement
5. **Error Handling**: Server-rendered fallback messages for missing examples; client-side logging (FR-012) adds detail without blocking content

### Rationale

- Next.js App Router server components render HTML by default—natural fit
- Static generation eliminates runtime dependencies
- Maintains full functionality in Lynx/text browsers and with JavaScript disabled
- Aligns with WCAG 2.1 AA (accessibility best practice from Constitution Check)

### Testing Approach (manual validation)

- Verify all examples load correctly with JavaScript disabled in Chrome DevTools
- Test navigation flow without JS
- Confirm code snippets remain readable in plain HTML view

---

## Research Task 4: Monorepo Configuration

**Context**: Side-by-side Next.js 15 and 16 apps in pnpm monorepo (user-specified architecture)

### Decision

**Setup**: pnpm workspaces with independent app deployments

### Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "shared"
```

```json
// Root package.json (partial)
{
  "name": "nextjs-patterns-demo",
  "private": true,
  "scripts": {
    "dev:15": "pnpm --filter nextjs15-examples dev",
    "dev:16": "pnpm --filter nextjs16-examples dev",
    "dev": "pnpm run dev:15 & pnpm run dev:16",
    "build:15": "pnpm --filter nextjs15-examples build",
    "build:16": "pnpm --filter nextjs16-examples build"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0"
  }
}
```

### Rationale

- **Independent versioning**: Each app locks Next.js version without conflicts
- **Shared code**: `shared/` package for common components and types
- **Efficient dependencies**: pnpm hoisting reduces disk usage while maintaining version isolation
- **Developer experience**: Single `pnpm dev` command runs both apps; separate build commands for deployment
- **Maintainability**: Clear separation aligns with Principle III (explicit structure)

### Port Configuration

- Next.js 15 app: `http://localhost:3015`
- Next.js 16 app: `http://localhost:3016`
- Rationale: Version numbers in port for easy mental mapping

---

## Cross-Cutting Decisions Summary

| Decision Area           | Choice                             | Impact on Constitution Principles                                                                                             |
| ----------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Syntax Highlighting     | Shiki (build-time)                 | I: Faster delivery (no runtime config); II: Simple API; III: Explicit pre-rendering; IV: Industry standard (VS Code grammars) |
| Pattern Selection       | 3 high-impact patterns per version | I: Focused MVP scope; II: Clear categorization; IV: Covers breaking changes, performance, new APIs (best practices)           |
| Progressive Enhancement | Server-rendered with optional JS   | IV: WCAG 2.1 AA compliance; I: Core functionality ships first                                                                 |
| Monorepo Structure      | pnpm workspaces                    | II: Explicit app separation; III: Shared code reduces duplication without coupling                                            |

---

## Follow-Up Tasks

- None—all NEEDS CLARIFICATION items resolved
- All decisions align with Constitution Check gates
- Ready for Phase 1: Design
