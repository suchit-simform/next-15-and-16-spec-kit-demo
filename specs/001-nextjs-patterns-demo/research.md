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

**Context**: Need to identify 3+ distinct, meaningful pattern examples per version (FR-002/FR-003) from checklist-file.md

### Decision

**Next.js 15 Patterns** (Priority based on impact and educational value):

1. **Async Request APIs** (`headers()`, `cookies()` becoming async)
   - Category: Server Components
   - Rationale: Breaking change affecting most applications; critical for migration
2. **Caching Behavior Changes**
   - Category: Performance / Data Fetching
   - Rationale: Fundamental shift in how Next.js handles caching; impacts app architecture
3. **`after()` API** (stable in 15.1)
   - Category: Server Actions
   - Rationale: New pattern for post-response work; novel concept for developers

**Next.js 16 Patterns** (Based on expected major changes):

1. **Deprecated API Removals**
   - Category: Breaking Changes / Migration
   - Rationale: Shows evolution from 15; critical for upgrade planning
2. **Turbopack Build Status**
   - Category: Performance / Build
   - Rationale: Major developer experience change if production-ready
3. **Server Components Updates**
   - Category: Rendering
   - Rationale: Core Next.js feature evolution; impacts component design patterns

### Rationale

- Covers major release themes from checklist: breaking changes, caching, async APIs, Server Components, build tooling
- Spans multiple categories: Server Components, Data Fetching, Performance, Migration
- Each pattern demonstrates clear before/after comparison opportunity
- Aligns with SC-004: developers can identify key changes without external docs

### Alternatives Considered

- **React 19 integration**: Too React-specific; overlaps with Next.js concerns
- **ESLint 9 support**: Tooling change; less architectural impact for learning
- **Middleware changes**: Important but narrower use case than selected patterns

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
