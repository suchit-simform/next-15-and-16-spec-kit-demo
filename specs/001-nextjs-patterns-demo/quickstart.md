# Quickstart: Next.js 15 and 16 Pattern Examples

**Feature**: 001-nextjs-patterns-demo  
**Phase**: 1 (Design & Contracts)  
**Created**: 2025-12-19

## Prerequisites

- Node.js 18.17 or later
- pnpm 8.x or later
- Git (for version control)

---

## Installation

### 1. Clone Repository (or navigate to project root)

```bash
cd /path/to/nextjs-15-and-16-adapting-usage-example
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all workspace packages:

- Root monorepo config
- Next.js 15 example app (`apps/nextjs15-examples`)
- Next.js 16 example app (`apps/nextjs16-examples`)
- Shared components and utilities (`shared/`)

---

## Development

### Run Both Apps Simultaneously

```bash
pnpm dev
```

This starts:

- **Next.js 15 examples**: http://localhost:3015
- **Next.js 16 examples**: http://localhost:3016

### Run Individual Apps

**Next.js 15 only**:

```bash
pnpm dev:15
```

**Next.js 16 only**:

```bash
pnpm dev:16
```

---

## Project Structure Overview

```
.
├── apps/
│   ├── nextjs15-examples/  # Next.js 15 example app
│   └── nextjs16-examples/  # Next.js 16 example app
├── shared/                 # Shared components, types, utilities
│   ├── components/         # Reusable React components
│   ├── lib/                # Data access and utilities
│   └── types/              # TypeScript type definitions
├── specs/                  # Feature specifications and planning
├── package.json            # Root workspace config
└── pnpm-workspace.yaml     # pnpm workspace definition
```

---

## Viewing Examples

### Next.js 15 Examples

1. Open http://localhost:3015 in your browser
2. Click on a category (e.g., "Server Components", "Data Fetching")
3. Browse pattern examples with before/after code snippets
4. Use "See in Next.js 16" links to compare across versions (if available)

### Next.js 16 Examples

1. Open http://localhost:3016 in your browser
2. Follow same navigation as Next.js 15
3. Use "Compare with Next.js 15" links to see version differences

---

## Adding New Examples

### 1. Define Example Data

Edit `shared/lib/exampleData.ts`:

```typescript
// Add to categories array (if new category needed)
export const categories: ExampleCategory[] = [
  // ... existing categories
  {
    id: "new-category",
    name: "New Category",
    description: "Description of new category",
    icon: "🆕",
    order: 10,
  },
];

// Add to examples array
export const examples: PatternExample[] = [
  // ... existing examples
  {
    id: "new-pattern",
    title: "New Pattern Name",
    version: 15,
    category: "new-category",
    description: "Brief description of the pattern change",
    whyItMatters: "Explanation of why this pattern matters",
    codeSnippetBefore: `// Old pattern code`,
    codeSnippetAfter: `// New pattern code`,
    highlightedHTMLBefore: "", // Will be generated at build time
    highlightedHTMLAfter: "", // Will be generated at build time
    keyChanges: ["Change #1", "Change #2", "Change #3"],
    availableInOtherVersion: false,
    relatedExampleId: null,
  },
];
```

### 2. Generate Syntax Highlighting

Run build process to pre-highlight code snippets:

```bash
pnpm build:15  # For Next.js 15 examples
pnpm build:16  # For Next.js 16 examples
```

Shiki will automatically process `codeSnippetBefore` and `codeSnippetAfter` fields and populate `highlightedHTMLBefore` and `highlightedHTMLAfter`.

### 3. Verify Example

1. Restart development server: `pnpm dev`
2. Navigate to the new category page
3. Verify example displays correctly with syntax highlighting
4. Test cross-version navigation (if `availableInOtherVersion=true`)

---

## Building for Production

### Build Both Apps

```bash
pnpm build
```

### Build Individual Apps

```bash
pnpm build:15  # Next.js 15 app
pnpm build:16  # Next.js 16 app
```

### Serve Production Build Locally

```bash
# Next.js 15
cd apps/nextjs15-examples
pnpm start

# Next.js 16 (in separate terminal)
cd apps/nextjs16-examples
pnpm start
```

---

## Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly for both versions
- [ ] All category pages display examples
- [ ] Code snippets render with syntax highlighting
- [ ] Before/after code comparison displays correctly
- [ ] Cross-version navigation links work (or show "not available" message)
- [ ] Page loads in <2 seconds (measure with DevTools Network tab)
- [ ] Core content (navigation, code, explanations) works with JavaScript disabled
- [ ] Mobile responsive design works correctly (test at 375px, 768px, 1024px widths)
- [ ] Keyboard navigation functions properly (Tab, Enter keys)
- [ ] Screen reader announces content correctly (test with VoiceOver/NVDA)

### Accessibility Testing

```bash
# Install Lighthouse CI (optional)
npm install -g @lhci/cli

# Run Lighthouse accessibility audit
lhci autorun --collect.url=http://localhost:3015
```

Target score: **90+** for Accessibility

---

## Troubleshooting

### Port Already in Use

If ports 3015 or 3016 are occupied:

1. Find process using port:

   ```bash
   lsof -i :3015  # or :3016
   ```

2. Kill process:

   ```bash
   kill -9 <PID>
   ```

3. Or change ports in app-specific `package.json`:
   ```json
   "dev": "next dev -p 3017"
   ```

### Syntax Highlighting Not Working

If code snippets display as plain text:

1. Check Shiki installation:

   ```bash
   pnpm list shiki
   ```

2. Rebuild with verbose logging:

   ```bash
   pnpm build:15 --debug
   ```

3. Verify `highlightedHTML*` fields are populated in `exampleData.ts`

### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf apps/nextjs15-examples/.next apps/nextjs16-examples/.next

# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules
pnpm install

# Restart TypeScript server in VS Code
CMD+Shift+P → "TypeScript: Restart TS Server"
```

---

## Development Workflow

### Typical Session

1. Start development servers: `pnpm dev`
2. Edit example data in `shared/lib/exampleData.ts`
3. Update components in `shared/components/`
4. Check changes in browser (http://localhost:3015 or :3016)
5. Commit changes: `git add . && git commit -m "feat: add new example"`

### Before Committing

1. Run build to validate syntax highlighting: `pnpm build`
2. Check for TypeScript errors: `pnpm type-check` (if script exists)
3. Manually test key user flows (P1 user story at minimum)

---

## Next Steps

- **Add More Examples**: Follow "Adding New Examples" section above
- **Customize Styling**: Edit Tailwind config in `apps/*/tailwind.config.ts`
- **Add Testing**: Set up Jest + React Testing Library (currently deferred per user input)
- **Deploy**: Configure Vercel/Netlify for static hosting (currently "Hosting: nothing" per user input)

---

## Support

- **Specification**: See `specs/001-nextjs-patterns-demo/spec.md`
- **Implementation Plan**: See `specs/001-nextjs-patterns-demo/plan.md`
- **Data Model**: See `specs/001-nextjs-patterns-demo/data-model.md`
- **Component Contracts**: See `specs/001-nextjs-patterns-demo/contracts/components.md`

For questions or issues, refer to acceptance scenarios in `spec.md` to verify expected behavior.
