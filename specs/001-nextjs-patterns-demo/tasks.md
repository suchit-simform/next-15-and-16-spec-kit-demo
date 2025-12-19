# Tasks: Next.js 15 and 16 Pattern Examples

**Feature**: 001-nextjs-patterns-demo  
**Created**: 2025-12-19  
**Input**: Design documents from `/specs/001-nextjs-patterns-demo/`

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All paths are absolute from repository root

## Path Conventions

This is a pnpm monorepo with the following structure:

- `apps/nextjs15-examples/` - Next.js 15 example app
- `apps/nextjs16-examples/` - Next.js 16 example app
- `shared/` - Shared components, types, and utilities

---

## Phase 1: Setup (Monorepo Infrastructure)

**Purpose**: Initialize pnpm workspace with Next.js 15 and 16 apps

- [ ] T001 Create root package.json with workspace scripts (dev, dev:15, dev:16, build:15, build:16)
- [ ] T002 Create pnpm-workspace.yaml defining apps/\* and shared/ workspaces
- [ ] T003 [P] Create apps/nextjs15-examples/ directory structure
- [ ] T004 [P] Create apps/nextjs16-examples/ directory structure
- [ ] T005 [P] Create shared/ directory with components/, lib/, and types/ subdirectories
- [ ] T006 Initialize apps/nextjs15-examples/package.json with Next.js 15.x and React 19 dependencies
- [ ] T007 Initialize apps/nextjs16-examples/package.json with Next.js 16.x and React 19 dependencies
- [ ] T008 [P] Create shared/package.json for shared utilities and components
- [ ] T009 [P] Create apps/nextjs15-examples/tsconfig.json extending root config
- [ ] T010 [P] Create apps/nextjs16-examples/tsconfig.json extending root config
- [ ] T011 [P] Create shared/tsconfig.json for shared package
- [ ] T012 Configure TailwindCSS 3.x in apps/nextjs15-examples/tailwind.config.ts
- [ ] T013 Configure TailwindCSS 3.x in apps/nextjs16-examples/tailwind.config.ts
- [ ] T014 Create apps/nextjs15-examples/next.config.ts with port 3015
- [ ] T015 Create apps/nextjs16-examples/next.config.ts with port 3016
- [ ] T016 Run pnpm install to link workspace dependencies

**Constitution Check**: Workspace structure is minimal (Principle I - MVP first), configuration files are explicit and documented (Principles II & III), follows Next.js monorepo best practices (Principle IV).

**Checkpoint**: Monorepo structure initialized - foundational work can begin

---

## Phase 2: Foundational (Shared Types & Utilities)

**Purpose**: Core TypeScript types and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T017 [P] Create shared/types/PatternExample.ts with PatternExample interface (id, title, version, category, isBreakingChange, migrationImpact, blogPostLink, beforeAfterSummary, description, whyItMatters, codeSnippetBefore, codeSnippetAfter, highlightedHTMLBefore, highlightedHTMLAfter, keyChanges, availableInOtherVersion, relatedExampleId)
- [ ] T018 [P] Create shared/types/ExampleCategory.ts with ExampleCategory interface (id, name, description, icon, order)
- [ ] T019 [P] Create shared/types/NavigationRoute.ts with NavigationRoute interface (path, version, exampleIds)
- [ ] T020 [P] Create shared/types/index.ts to re-export all type definitions
- [ ] T021 Install Shiki dependency in shared/package.json for syntax highlighting
- [ ] T022 Create shared/lib/syntaxHighlight.ts with highlightCode() function using Shiki
- [ ] T023 Create shared/lib/exampleData.ts structure with empty categories and examples arrays (to be populated in user story phases)
- [ ] T024 Create shared/lib/dataAccess.ts with getCategories(), getExamplesByVersion(), getExamplesByCategory(), getExampleById() functions
- [ ] T025 [P] Create shared/components/ExampleLayout.tsx base layout component (header, footer, main content area)
- [ ] T026 [P] Create shared/components/Header.tsx with site branding and version indicator
- [ ] T027 [P] Create shared/components/Footer.tsx with copyright and links
- [ ] T027a [P] Create shared/components/ErrorFallback.tsx component for graceful error handling (FR-012) with props (error, reset) displaying user-friendly message
- [ ] T027b [P] Create shared/components/ExampleUnavailable.tsx component for missing/unavailable examples with props (exampleId, reason) displaying fallback message

**Constitution Check**: Foundation is minimal but complete (Principle I), types are explicitly defined with JSDoc (Principle II), data access layer is maintainable with clear separation (Principle III), Shiki choice aligns with progressive enhancement best practices (Principle IV).

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Next.js 15 Examples (Priority: P1) 🎯 MVP

**Goal**: Display Next.js 15 pattern examples with syntax-highlighted code snippets across 5 patterns in 4 categories

**Independent Test**: Visit http://localhost:3015, see 5 patterns across 4 categories (2 data-fetching-caching, 1 build-performance, 1 developer-experience, 1 routing-navigation), click each pattern, verify code snippets display with syntax highlighting, verify breaking change flags visible

**Constitution Compliance**: Deliverable must be functional and demoable (Principle I), code must be team-readable with clear component structure (Principle II), favor explicit over implicit patterns (Principle III), follow Next.js App Router best practices (Principle IV). Pattern data includes required quality criteria (isBreakingChange, migrationImpact, blogPostLink, beforeAfterSummary) per FR-004.

### Implementation for User Story 1

- [ ] T028 [P] [US1] Add Next.js 15 categories to shared/lib/exampleData.ts using canonical category IDs: "data-fetching-caching" (2 patterns), "build-performance" (1), "developer-experience" (1), "routing-navigation" (1)
- [ ] T029 [P] [US1] Add "Async Request APIs" example data (v15.0 breaking change) with isBreakingChange=true, migrationImpact="HIGH", blogPostLink to next-15, beforeAfterSummary, description, whyItMatters, codeSnippetBefore (sync headers()), codeSnippetAfter (async headers())
- [ ] T030 [P] [US1] Add "Caching Semantics Changed" example data (v15.0 breaking change) with isBreakingChange=true, migrationImpact="MEDIUM", blogPostLink, GET Route Handler no-cache default, Client Router Cache staleTime=0, codeSnippetBefore/After
- [ ] T031 [P] [US1] Add "Turbopack Dev (Stable)" example data (v15.0 stable) with isBreakingChange=false, migrationImpact="LOW", blogPostLink, performance metrics (76.7% faster startup, 96.3% HMR), codeSnippetBefore (webpack), codeSnippetAfter (--turbo flag)
- [ ] T031a [P] [US1] Add "React 19 Support + Hydration Error Improvements" example data (v15.0-15.1) with isBreakingChange=false, migrationImpact="MEDIUM", blogPostLink, improved error messages, codeSnippetBefore (React 18 hydration error), codeSnippetAfter (React 19 source display)
- [ ] T031b [P] [US1] Add "Form Component with Progressive Enhancement" example data (v15.0 new) with isBreakingChange=false, migrationImpact="LOW", blogPostLink, prefetching + client-side nav, codeSnippetBefore (HTML form), codeSnippetAfter (<Form> component)
- [ ] T032 [US1] Implement highlightCode() in shared/lib/syntaxHighlight.ts to pre-highlight all Next.js 15 examples at build time
- [ ] T033 [P] [US1] Create shared/components/CodeSnippet.tsx server component with highlightedHTML prop and rawCode fallback
- [ ] T034 [P] [US1] Create shared/components/ExampleCard.tsx to display single pattern with title, version badge, description, whyItMatters, code snippets, key changes
- [ ] T035 [P] [US1] Create shared/components/CategoryNav.tsx horizontal navigation menu for categories
- [ ] T036 [US1] Create apps/nextjs15-examples/app/page.tsx landing page listing all 5 categories with descriptions (2 data-fetching-caching, 1 build-performance, 1 developer-experience, 1 routing-navigation)
- [ ] T037 [US1] Create apps/nextjs15-examples/app/layout.tsx wrapping ExampleLayout with version indicator "Next.js 15"
- [ ] T038 [US1] Create apps/nextjs15-examples/app/globals.css importing TailwindCSS directives
- [ ] T039 [P] [US1] Create apps/nextjs15-examples/app/examples/async-request-apis/page.tsx displaying Async Request APIs example (category: data-fetching-caching)
- [ ] T040 [P] [US1] Create apps/nextjs15-examples/app/examples/caching-semantics-changed/page.tsx displaying Caching Semantics example (category: data-fetching-caching)
- [ ] T041 [P] [US1] Create apps/nextjs15-examples/app/examples/turbopack-dev-stable/page.tsx displaying Turbopack Dev example (category: build-performance)
- [ ] T041a [P] [US1] Create apps/nextjs15-examples/app/examples/react-19-support/page.tsx displaying React 19 Support example (category: developer-experience)
- [ ] T041b [P] [US1] Create apps/nextjs15-examples/app/examples/form-component/page.tsx displaying Form Component example (category: routing-navigation)
- [ ] T042 [US1] Add error boundary to apps/nextjs15-examples/app/error.tsx with user-friendly fallback (FR-012)
- [ ] T043 [US1] Add logging to console for failed syntax highlighting with fallback to rawCode display (FR-012)
- [ ] T044 [US1] Verify progressive enhancement: disable JavaScript and confirm navigation/code display still works (FR-011)

**Checkpoint**: At this point, User Story 1 (MVP) should be fully functional - Next.js 15 app displays 3 pattern examples independently

---

## Phase 4: User Story 2 - View Next.js 16 Examples (Priority: P2)

**Goal**: Display Next.js 16 pattern examples with syntax-highlighted code snippets across 6 patterns in 4 categories (mirroring Next.js 15 structure)

**Independent Test**: Visit http://localhost:3016, see 6 patterns across 4 categories (2 data-fetching-caching, 2 routing-navigation, 1 build-performance, 1 server-components), click each pattern, verify code snippets display with syntax highlighting, verify breaking change flags visible, verify Breaking Changes Summary pattern exists

### Implementation for User Story 2

- [ ] T045 [P] [US2] Add Next.js 16 categories to shared/lib/exampleData.ts using canonical category IDs: "data-fetching-caching" (2 patterns), "routing-navigation" (2), "build-performance" (1), "server-components" (1)
- [ ] T046 [P] [US2] Add "Cache Components + 'use cache' Directive" example data (v16.0 experimental) with isBreakingChange=true, migrationImpact="HIGH", blogPostLink to next-16, cacheComponents flag, "use cache" syntax, codeSnippetBefore (fetch caching v14), codeSnippetAfter ("use cache" directive)
- [ ] T047 [P] [US2] Add "proxy.ts Migration" example data (v16.0 breaking change) with isBreakingChange=true, migrationImpact="MEDIUM", blogPostLink, middleware.ts deprecation, codeSnippetBefore (middleware.ts), codeSnippetAfter (proxy.ts with Node.js runtime)
- [ ] T048 [P] [US2] Add "Enhanced Routing (Layout Deduplication)" example data (v16.0 automatic) with isBreakingChange=false, migrationImpact="LOW", blogPostLink, layout download optimization, incremental prefetch cancellation, codeSnippetBefore (per-link layout download), codeSnippetAfter (shared layout deduplication)
- [ ] T048a [P] [US2] Add "New Caching APIs (updateTag, refresh, revalidateTag signature)" example data (v16.0 breaking change) with isBreakingChange=true, migrationImpact="HIGH", blogPostLink, revalidateTag() requires cacheLife profile, new updateTag() for read-your-writes, new refresh(), codeSnippetBefore (revalidateTag('tag')), codeSnippetAfter (revalidateTag('tag', cacheLife))
- [ ] T048b [P] [US2] Add "Turbopack Builds (Stable)" example data (v16.0 default bundler) with isBreakingChange=false, migrationImpact="LOW", blogPostLink, 2-5x build speed, 10x Fast Refresh, file system caching (v16.1), codeSnippetBefore (webpack bundler), codeSnippetAfter (Turbopack default)
- [ ] T048c [P] [US2] Add "Breaking Changes Summary (Next.js 16)" example data (v16.0 breaking changes) with isBreakingChange=true, migrationImpact="HIGH", blogPostLink, covering: async params/searchParams sync access removal, revalidateTag signature, middleware.ts deprecation, image quality/localPatterns validation, codeSnippetBefore (sync params), codeSnippetAfter (async params)
- [ ] T049 [US2] Update highlightCode() in shared/lib/syntaxHighlight.ts to pre-highlight all Next.js 16 examples at build time
- [ ] T050 [US2] Create apps/nextjs16-examples/app/page.tsx landing page listing all 6 Next.js 16 patterns across 4 categories (2 data-fetching-caching, 2 routing-navigation, 1 build-performance, 1 server-components with breaking changes)
- [ ] T051 [US2] Create apps/nextjs16-examples/app/layout.tsx wrapping ExampleLayout with version indicator "Next.js 16"
- [ ] T052 [US2] Create apps/nextjs16-examples/app/globals.css importing TailwindCSS directives
- [ ] T053 [P] [US2] Create apps/nextjs16-examples/app/examples/cache-components-use-cache/page.tsx displaying Cache Components example (category: data-fetching-caching)
- [ ] T054 [P] [US2] Create apps/nextjs16-examples/app/examples/proxy-ts-migration/page.tsx displaying proxy.ts Migration example (category: routing-navigation)
- [ ] T055 [P] [US2] Create apps/nextjs16-examples/app/examples/enhanced-routing/page.tsx displaying Enhanced Routing example (category: routing-navigation)
- [ ] T055a [P] [US2] Create apps/nextjs16-examples/app/examples/new-caching-apis/page.tsx displaying New Caching APIs example (category: data-fetching-caching)
- [ ] T055b [P] [US2] Create apps/nextjs16-examples/app/examples/turbopack-builds-stable/page.tsx displaying Turbopack Builds example (category: build-performance)
- [ ] T055c [P] [US2] Create apps/nextjs16-examples/app/examples/breaking-changes-summary/page.tsx displaying Breaking Changes Summary example (category: server-components)
- [ ] T056 [US2] Add error boundary to apps/nextjs16-examples/app/error.tsx with user-friendly fallback (FR-012)
- [ ] T057 [US2] Verify progressive enhancement: disable JavaScript and confirm navigation/code display still works (FR-011)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - both Next.js 15 and 16 apps display their respective examples

---

## Phase 5: User Story 3 - Navigate Between Versions (Priority: P3)

**Goal**: Enable seamless navigation between Next.js 15 and 16 versions with "See in Next.js X" links and "Not available" messages

**Independent Test**: From any Next.js 15 example, click "See in Next.js 16" link (if available) and verify navigation to corresponding Next.js 16 example; verify "Not available in Next.js 16" message displays for patterns without equivalents

### Implementation for User Story 3

- [x] T058 [P] [US3] Create shared/components/VersionSwitcher.tsx client component with toggle between v15/v16
- [x] T059 [US3] Update ExampleCard.tsx to render "See in Next.js {otherVersion}" link when availableInOtherVersion=true, linking to relatedExampleId
- [x] T060 [US3] Update ExampleCard.tsx to render "Not available in Next.js {otherVersion}" message when availableInOtherVersion=false
- [x] T061 [US3] Set availableInOtherVersion and relatedExampleId fields in shared/lib/exampleData.ts for cross-version patterns
- [x] T062 [US3] Add VersionSwitcher component to Header.tsx for global version navigation
- [x] T063 [US3] Test cross-version navigation: click "See in Next.js 16" from Next.js 15 Async Request APIs → should navigate to Next.js 16 equivalent (if exists)
- [x] T064 [US3] Test "not available" message: verify patterns unique to one version display appropriate message
- [x] T065 [US3] Verify VersionSwitcher maintains current category context when switching versions (FR-008)

**Checkpoint**: All user stories should now be independently functional - cross-version navigation complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Styling, accessibility, and documentation improvements across all user stories

- [x] T066 [P] Apply TailwindCSS responsive design to all components (mobile, tablet, desktop breakpoints)
- [x] T067 [P] Add WCAG 2.1 AA compliant color contrast to code snippets and UI elements
- [x] T068 [P] Add aria-labels to CodeSnippet components describing code language and purpose
- [x] T069 [P] Add keyboard navigation support to CategoryNav and VersionSwitcher components
- [x] T070 Add focus indicators to all interactive elements (links, buttons)
- [x] T071 [P] Test and verify progressive enhancement across all pages (no-JS mode)
- [x] T072 [P] Add README.md to repository root with project overview and quickstart instructions
- [x] T073 Validate all examples render correctly with Shiki syntax highlighting (no fallback to rawCode)
- [x] T074 Run through quickstart.md workflow to verify developer onboarding experience
- [x] T075 Performance audit: verify code highlighting happens at build time (no runtime overhead)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Stories (Phase 3, 4, 5)**: All depend on Foundational (Phase 2) completion
  - User Story 1 (P1 - MVP): Can start after Phase 2 - No dependencies on other stories
  - User Story 2 (P2): Can start after Phase 2 - Independent of US1 (different app directory)
  - User Story 3 (P3): Depends on US1 and US2 data being populated (needs relatedExampleId references)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Completion Order

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKING PHASE
    ↓
    ├─→ Phase 3 (US1 - Next.js 15 Examples) [P1 - MVP] ←── Independently testable
    │
    ├─→ Phase 4 (US2 - Next.js 16 Examples) [P2] ←── Independently testable, can run parallel to US1
    │
    └─→ Phase 5 (US3 - Cross-Version Nav) [P3] ←── Depends on US1 + US2 data
             ↓
        Phase 6 (Polish)
```

### Within Each User Story

- **User Story 1 (Next.js 15)**:

  - T028-T031 (example data) can run in parallel [P]
  - T032 (syntax highlighting) depends on T028-T031 data
  - T033-T035 (shared components) can run in parallel [P]
  - T036-T038 (app structure) must run sequentially
  - T039-T041 (example pages) can run in parallel [P] after T033-T035 complete
  - T042-T044 (error handling & verification) run after all implementation

- **User Story 2 (Next.js 16)**:

  - T045-T048 (example data) can run in parallel [P]
  - T049 (syntax highlighting) depends on T045-T048 data
  - T050-T052 (app structure) must run sequentially (reuses components from US1)
  - T053-T055 (example pages) can run in parallel [P]
  - T056-T057 (error handling & verification) run after all implementation

- **User Story 3 (Cross-Version Nav)**:
  - T058 (VersionSwitcher component) can run in parallel with T059-T060 [P]
  - T061 (data updates) depends on US1 and US2 data existing
  - T062-T065 (integration & testing) run sequentially after T058-T061

### Parallel Opportunities

**Maximum parallelization strategy**:

1. **Phase 1 (Setup)**:

   - T003-T005 (directory creation) in parallel
   - T009-T011 (tsconfig files) in parallel
   - After package.json files created: all config files in parallel

2. **Phase 2 (Foundational)**:

   - T017-T020 (TypeScript types) in parallel
   - T025-T027 (layout components) in parallel
   - T022 (Shiki integration) independent task

3. **Phase 3 (US1) - 4 parallel streams**:

   - Stream A: T028-T031 (example data)
   - Stream B: T033-T035 (shared components)
   - Stream C: T036-T038 (app structure)
   - Stream D: T039-T041 (example pages) - wait for Stream B

4. **Phase 4 (US2) - Can run ENTIRELY PARALLEL to Phase 3 (different app directory)**:

   - Stream A: T045-T048 (example data)
   - Stream B: T050-T052 (app structure)
   - Stream C: T053-T055 (example pages)

5. **Phase 6 (Polish)**: Most tasks can run in parallel (different concerns)

**Team of 2 developers**:

- Dev A: Complete Phase 1 → Phase 2 → Phase 3 (US1 - MVP)
- Dev B: Join after Phase 2 → Phase 4 (US2) in parallel with Dev A
- Both: Collaborate on Phase 5 (US3) and Phase 6 (Polish)

---

## Implementation Strategy

### MVP-First Approach (Recommended)

**Sprint 1 - Functional MVP**:

- Phase 1: Setup (T001-T016)
- Phase 2: Foundational (T017-T027)
- Phase 3: User Story 1 (T028-T044) ← **Deliverable**: Next.js 15 examples working

**Sprint 2 - Version Parity**:

- Phase 4: User Story 2 (T045-T057) ← **Deliverable**: Next.js 16 examples working

**Sprint 3 - Enhanced Navigation**:

- Phase 5: User Story 3 (T058-T065) ← **Deliverable**: Cross-version navigation

**Sprint 4 - Production Ready**:

- Phase 6: Polish (T066-T075) ← **Deliverable**: Polished, accessible, documented

### Incremental Delivery

Each phase completion represents a potentially shippable increment:

- After Phase 3: Ship Next.js 15 examples only (MVP)
- After Phase 4: Ship both versions independently
- After Phase 5: Ship full cross-version comparison feature
- After Phase 6: Ship production-quality demo

---

## Task Summary

- **Total Tasks**: 75
- **Setup Phase**: 16 tasks
- **Foundational Phase**: 11 tasks
- **User Story 1 (P1 - MVP)**: 17 tasks
- **User Story 2 (P2)**: 13 tasks
- **User Story 3 (P3)**: 8 tasks
- **Polish Phase**: 10 tasks

**Parallel Opportunities**: 41 tasks marked [P] can run concurrently (54.7% of all tasks)

**MVP Scope**: Phases 1-3 (44 tasks) deliver functional Next.js 15 example viewer

**Constitution Validation**: All tasks align with principles:

- ✅ **Principle I (Functionality First)**: MVP-first strategy, incremental delivery
- ✅ **Principle II (Readable)**: Explicit file paths, clear task descriptions, JSDoc in types
- ✅ **Principle III (Maintainable)**: Shared components, type-safe data access, progressive enhancement
- ✅ **Principle IV (Best Practices)**: Next.js App Router, TypeScript strict mode, TailwindCSS, Shiki, WCAG 2.1 AA, pnpm workspaces
