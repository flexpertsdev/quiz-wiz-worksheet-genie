# CLAUDE.md - Quiz Wiz Worksheet Genie Project Guide

## Project Overview

**Quiz Wiz Worksheet Genie** is an AI-powered educational worksheet generator designed to help teachers and educators create custom quizzes, worksheets, and study materials efficiently. The project follows modern web development best practices with a focus on mobile-first design, atomic architecture, and clean code principles.

## Deployment Information

- **GitHub Repository**: https://github.com/flexpertsdev/quiz-wiz-worksheet-genie
- **Live Application**: https://quiz-wiz-worksheet-genie.netlify.app (pending deployment)
- **Branch**: main
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Technology Stack

### Core Framework
- **React 18.3** with functional components and hooks
- **TypeScript** for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent component library

### Architecture Patterns
- **Atomic Design**: Component organization from atoms to pages
- **Service Layer**: Clean separation between UI and data
- **Mobile-First**: Responsive design starting from mobile
- **PWA Ready**: Progressive Web App capabilities

## AI Development Guidelines

### Component Creation
1. **Check Existing Components First**
   - Look in `src/components/ui` for atoms
   - Check `src/components/compound` for molecules
   - Review `src/components/blocks` for organisms

2. **Follow Atomic Design Hierarchy**
   ```
   ui/ → atoms (buttons, inputs, cards)
   compound/ → molecules (search bars, card groups)
   blocks/ → organisms (headers, feature sections)
   layout/ → templates (page layouts)
   pages/ → complete page components
   ```

3. **Use TypeScript Interfaces**
   ```typescript
   interface ComponentProps {
     // Define all props with proper types
   }
   ```

### Mobile-First Development
- **Always use `min-h-dvh`** instead of `min-h-screen`
- **Touch targets minimum 44px** for mobile
- **Test on mobile viewport first** (375px width)
- **Progressive enhancement** for larger screens

### State Management
- **Local state** for UI-only concerns
- **Zustand stores** for global application state
- **React Query** for server state (when implemented)
- **Context API** for cross-cutting concerns

### Service Layer Pattern
```typescript
// Define interface first
interface WorksheetService {
  getAll(): Promise<Worksheet[]>
  getById(id: string): Promise<Worksheet>
  create(data: CreateWorksheetDto): Promise<Worksheet>
  update(id: string, data: UpdateWorksheetDto): Promise<Worksheet>
  delete(id: string): Promise<void>
}

// Mock implementation for development
class MockWorksheetService implements WorksheetService {
  // Implementation with mock data
}

// Future Supabase implementation
class SupabaseWorksheetService implements WorksheetService {
  // Implementation with Supabase
}
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Atoms: buttons, inputs, cards
│   ├── compound/     # Molecules: combinations of atoms
│   ├── blocks/       # Organisms: feature sections
│   ├── layout/       # Templates: page layouts
│   └── pages/        # Pages: complete views
├── services/         # Data layer interfaces and implementations
├── stores/           # Zustand state management
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── lib/              # Utility functions
└── styles/           # Global styles and themes
```

## Development Workflow

### Adding New Features
1. Create types/interfaces in `src/types`
2. Build atoms in `src/components/ui`
3. Compose molecules in `src/components/compound`
4. Assemble organisms in `src/components/blocks`
5. Create page layout in `src/components/layout`
6. Implement full page in `src/components/pages`
7. Add service layer in `src/services`
8. Connect with state in `src/stores`

### Code Quality Checklist
- [ ] Components use TypeScript props interfaces
- [ ] Mobile-first responsive design
- [ ] Accessibility attributes (ARIA labels)
- [ ] Loading and error states handled
- [ ] Service layer abstraction maintained
- [ ] No hardcoded values (use constants)
- [ ] Components are reusable and composable

## Current Implementation Status

### Completed ✅
- Project initialization with React + TypeScript + Vite
- Tailwind CSS and shadcn/ui configuration
- Basic landing page with educational theme
- GitHub repository setup
- Netlify deployment configuration
- AI guides imported for development reference

### In Progress 🚧
- Comprehensive documentation (README, CLAUDE.md)
- Project audit against AI best practices

### Pending 📋
- Atomic design folder structure
- Service layer architecture
- State management with Zustand
- React Router implementation
- Authentication system
- CRUD operations for educational content
- Mobile navigation
- PWA support

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
git add .
git commit -m "feat: description"
git push origin main
# Auto-deploys to Netlify

# Component Generation (when configured)
npm run generate:component [name] [type]
```

## Important Notes

### Mobile Viewport Fix
Always implement dynamic viewport height:
```typescript
useEffect(() => {
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  
  return () => window.removeEventListener('resize', setViewportHeight);
}, []);
```

### Performance Considerations
- Lazy load routes with React.lazy()
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Optimize images with proper formats
- Code split at route level

### Security Best Practices
- Never commit API keys or secrets
- Use environment variables for configuration
- Implement proper CORS policies
- Validate all user inputs
- Use HTTPS for all external requests

## AI Assistant Instructions

When working on this project:

1. **Follow Atomic Design** - Build from atoms up to pages
2. **Mobile-First Always** - Start with mobile, enhance for desktop
3. **Use Existing Patterns** - Check existing components before creating new
4. **Maintain Type Safety** - TypeScript for all components and functions
5. **Service Layer Abstraction** - Keep UI and data concerns separate
6. **Test on Multiple Viewports** - Mobile (375px), Tablet (768px), Desktop (1280px)
7. **Accessibility First** - ARIA labels, keyboard navigation, proper contrast
8. **Performance Matters** - Lazy loading, code splitting, optimized assets

## Resources

- [Atomic Design Guide](.ai-guides/atomic-design-components-guide.md)
- [Responsive Layout Patterns](.ai-guides/responsive-layout-patterns-guide.md)
- [Supabase Migration Guide](.ai-guides/supabase-migration-guide.md)
- [Design System Guide](.ai-guides/design-system-prompt-guide-v2-generic.md)
- [Project Structure Guide](.ai-guides/project-llms-prompt-improvements.md)

---

*This document is maintained by AI assistants and should be updated with each significant project change.*