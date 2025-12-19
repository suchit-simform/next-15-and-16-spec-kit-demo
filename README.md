# Next.js 15 and 16 Pattern Examples

A comprehensive educational resource comparing Next.js 15 and 16 features, breaking changes, and best practices with interactive code examples and syntax highlighting.

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers (both versions simultaneously)
pnpm dev

# Or start individual versions
pnpm dev:15  # Next.js 15 on http://localhost:3015
pnpm dev:16  # Next.js 16 on http://localhost:3016
```

### Build for Production

```bash
# Build both apps
pnpm build

# Or build individual versions
pnpm build:15
pnpm build:16
```

## What's Included

This monorepo demonstrates how to adapt your Next.js codebase between versions 15 and 16:

- **11 Pattern Examples**: 5 for Next.js 15, 6 for Next.js 16
- **Build-Time Syntax Highlighting**: Shiki integration for zero runtime overhead
- **Cross-Version Navigation**: Easy switching between equivalent features
- **Progressive Enhancement**: Works without JavaScript
- **WCAG 2.1 AA Compliant**: Full accessibility support

## Project Structure

```
├── apps/
│   ├── nextjs15-examples/        # Next.js 15 app (webpack)
│   └── nextjs16-examples/        # Next.js 16 app (Turbopack)
├── shared/                        # Shared types, utilities, and components
└── README.md                      # This file
```

## Features

✅ **Syntax Highlighting** - Build-time highlighting with Shiki  
✅ **Static Generation** - All pages pre-rendered at build time  
✅ **Cross-Version Navigation** - Link between v15 and v16 patterns  
✅ **Responsive Design** - Mobile, tablet, and desktop optimized  
✅ **Accessibility** - WCAG 2.1 AA compliant with keyboard support  

## Technology Stack

- **Next.js 15.5.9** (webpack) and **16.1.0** (Turbopack)
- **React 19**, **TypeScript 5**, **TailwindCSS 4**
- **Shiki** for syntax highlighting
- **pnpm** workspaces

## Performance

- **Build Time**: 2-3s per app (~6s total)
- **First Load JS**: ~106 kB
- **Static Pages**: Instant delivery

## Next.js 15 Patterns

1. **Async Request APIs** - Breaking change for headers, cookies, params
2. **Caching Semantics Changed** - New default caching behavior
3. **Turbopack Dev (Stable)** - 76.7% faster startup
4. **React 19 Support** - New error message improvements
5. **Form Component** - Progressive enhancement support

## Next.js 16 Patterns

1. **Cache Components + 'use cache'** - New caching directive
2. **proxy.ts Migration** - Replacement for middleware.ts
3. **Enhanced Routing** - Layout deduplication
4. **New Caching APIs** - updateTag, refresh, revalidateTag changes
5. **Turbopack Builds (Stable)** - 2-5x faster production builds
6. **Breaking Changes Summary** - Migration guide and checklist

## Development

```bash
# Install dependencies
pnpm install

# Start both dev servers
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Learn More

- [Next.js 15 Release Notes](https://nextjs.org/blog/next-15)
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shiki Documentation](https://shiki.style/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React 19 Docs](https://react.dev/)

## License

MIT
