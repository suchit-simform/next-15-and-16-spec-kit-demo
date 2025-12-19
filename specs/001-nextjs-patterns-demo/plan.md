# Implementation Plan: Next.js 15 and 16 Pattern Examples

**Branch**: `001-nextjs-patterns-demo` | **Date**: 2025-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-nextjs-patterns-demo/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Demonstrate Next.js 15 and 16 pattern changes through static code examples with syntax highlighting. Primary requirement: display at least 3 pattern examples per version organized by category, with clear explanations of what changed and why. Technical approach: modular Next.js app structure with hardcoded examples, TailwindCSS styling, progressive enhancement for accessibility.

## Technical Context

**Language/Version**: TypeScript (latest stable for Next.js 15/16 compatibility)  
**Primary Dependencies**: Next.js 15.x and Next.js 16.x (side-by-side), React 19, TailwindCSS 3.x, NEEDS CLARIFICATION: syntax highlighting library (e.g., Prism.js, Shiki, react-syntax-highlighter)  
**Storage**: N/A (examples hardcoded in source code per clarifications)  
**Testing**: None specified (user input: "Testing: nothing")  
**Target Platform**: Web (modern browsers with progressive enhancement for older browsers)  
**Project Type**: Web application (monorepo with separate Next.js 15 and Next.js 16 example apps)  
**Performance Goals**: Page load <2 seconds per SC-003; example access <30 seconds per SC-001/SC-002  
**Constraints**: Progressive enhancement required (FR-011); no JavaScript dependency for core content; static code displays only (no live sandboxes)  
**Scale/Scope**: Minimum 3 pattern examples per version (FR-002/FR-003); organized by category (FR-006); educational demo site, not production-scale traffic

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

✅ **Functionality-first MVP identified**: P1 user story (View Next.js 15 Pattern Examples) delivers minimum 3 working examples with explanations; demoable independently; no polish dependencies block delivery.

✅ **Readability plan**: TypeScript for type clarity; modular component structure separating version 15/16 examples; naming convention: `{Category}{VersionNumber}Example` (e.g., `ServerActionsV15Example`); inline comments for version-specific nuances only where non-obvious.

✅ **Maintainability posture**: Hardcoded examples in source favor explicitness over database abstraction; separate example modules per pattern prevent coupling; verbose error messages (FR-012) aid debugging; progressive enhancement strategy isolates JavaScript dependencies.

✅ **Best-practice alignment**:

- Accessibility: Progressive enhancement (FR-011) ensures content available without JS; WCAG 2.1 AA compliance for navigation and text contrast
- Performance: Static generation where possible; <2s load time target (SC-003); TailwindCSS purging for minimal CSS
- Security: No user input or data persistence eliminates injection risks; standard Next.js CSP headers
- TypeScript: Strict mode for type safety
- Testing: Deferred per user input; manual validation via acceptance scenarios sufficient for MVP

**Exceptions**: None—all standards align with constitution principles I-IV.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/
├── nextjs15-examples/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (homepage for Next.js 15)
│   │   ├── examples/
│   │   │   ├── server-actions/
│   │   │   ├── partial-prerendering/
│   │   │   ├── caching/
│   │   │   └── [category]/page.tsx (dynamic routes per pattern)
│   │   └── components/
│   │       ├── ExampleLayout.tsx
│   │       ├── CodeSnippet.tsx
│   │       └── CategoryNav.tsx
│   ├── public/
│   ├── package.json (Next.js 15.x dependencies)
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── nextjs16-examples/
│   ├── app/ (mirror structure of nextjs15-examples)
│   ├── public/
│   ├── package.json (Next.js 16.x dependencies)
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
└── shared/
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   └── VersionSwitcher.tsx
    ├── lib/
    │   ├── exampleData.ts (hardcoded example definitions)
    │   └── syntaxHighlight.ts (syntax highlighting utilities)
    └── types/
        └── Example.ts

package.json (root monorepo config for pnpm workspaces)
pnpm-workspace.yaml
```

**Structure Decision**: Monorepo with separate Next.js 15 and 16 apps allows side-by-side version demonstration without conflicts. Shared components (Header, Footer, VersionSwitcher) and example data definitions reduce duplication while maintaining version independence. Each app runs independently on different ports during development; examples hardcoded in `shared/lib/exampleData.ts` for maintainability and version control.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations—Constitution Check passed all gates.
