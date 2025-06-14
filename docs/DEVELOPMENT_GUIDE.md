# Development Guide

## Getting Started

This guide will help you set up your development environment and understand the development workflow for Quiz Wiz Worksheet Genie.

## Prerequisites

### Required Software
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **Git**
- **VS Code** (recommended) or your preferred IDE

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- GitLens
- Error Lens

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/flexpertsdev/quiz-wiz-worksheet-genie.git
cd quiz-wiz-worksheet-genie
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
# Supabase (when implemented)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services (when implemented)
VITE_OPENAI_API_KEY=your_openai_key

# Feature Flags
VITE_ENABLE_AUTH=true
VITE_ENABLE_AI=false
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development Workflow

### Branch Strategy

We follow GitHub Flow:
1. `main` - Production-ready code
2. Feature branches - `feature/your-feature-name`
3. Bugfix branches - `bugfix/issue-description`

### Creating a New Feature

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/worksheet-templates
   ```

2. **Follow Atomic Design Principles**
   - Start with atoms in `src/components/ui`
   - Build molecules in `src/components/compound`
   - Create organisms in `src/components/blocks`
   - Assemble in pages

3. **Write Tests** (when test suite is implemented)
   ```bash
   npm run test:watch
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add worksheet template selection"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/worksheet-templates
   ```

### Commit Message Convention

We follow Conventional Commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```bash
feat: add PDF export functionality
fix: resolve mobile navigation overlap
docs: update API documentation
style: format code with prettier
refactor: extract worksheet service
test: add unit tests for quiz generator
chore: update dependencies
```

## Code Style Guide

### TypeScript Best Practices

1. **Always Define Types**
   ```typescript
   // ✅ Good
   interface UserProps {
     name: string
     age: number
     email?: string
   }
   
   // ❌ Bad
   const user: any = { name: 'John', age: 30 }
   ```

2. **Use Enums for Constants**
   ```typescript
   enum QuestionType {
     MULTIPLE_CHOICE = 'multiple_choice',
     SHORT_ANSWER = 'short_answer',
     ESSAY = 'essay'
   }
   ```

3. **Prefer Interface over Type**
   ```typescript
   // ✅ Preferred
   interface User {
     id: string
     name: string
   }
   
   // Use type for unions/intersections
   type Status = 'active' | 'inactive'
   ```

### React Best Practices

1. **Functional Components Only**
   ```typescript
   // ✅ Good
   const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
     return <button onClick={onClick}>{children}</button>
   }
   
   // ❌ Avoid class components
   ```

2. **Custom Hooks for Logic**
   ```typescript
   // Extract complex logic into custom hooks
   const useWorksheet = (id: string) => {
     const [worksheet, setWorksheet] = useState<Worksheet>()
     const [loading, setLoading] = useState(true)
     
     useEffect(() => {
       // Fetch logic
     }, [id])
     
     return { worksheet, loading }
   }
   ```

3. **Memoization When Needed**
   ```typescript
   const ExpensiveComponent = memo(({ data }: Props) => {
     const processedData = useMemo(() => 
       expensiveOperation(data), [data]
     )
     
     return <div>{processedData}</div>
   })
   ```

### CSS/Tailwind Guidelines

1. **Mobile-First Approach**
   ```jsx
   // Start with mobile styles, add breakpoints for larger screens
   <div className="p-4 md:p-6 lg:p-8">
     <h1 className="text-xl md:text-2xl lg:text-3xl">
       Responsive Heading
     </h1>
   </div>
   ```

2. **Component-Specific Styles**
   ```jsx
   // Group related styles
   const cardStyles = "bg-white rounded-lg shadow-md p-6"
   const buttonStyles = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
   ```

3. **Avoid Arbitrary Values**
   ```jsx
   // ✅ Good - Use Tailwind's scale
   <div className="mt-4 p-6 text-base">
   
   // ❌ Avoid - Arbitrary values
   <div className="mt-[17px] p-[23px] text-[15px]">
   ```

## Component Development

### Creating a New Component

1. **Use the Component Template**
   ```typescript
   // src/components/ui/Button.tsx
   import { FC, ButtonHTMLAttributes } from 'react'
   import { cn } from '@/lib/utils'
   
   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'outline'
     size?: 'sm' | 'md' | 'lg'
   }
   
   export const Button: FC<ButtonProps> = ({
     className,
     variant = 'primary',
     size = 'md',
     children,
     ...props
   }) => {
     return (
       <button
         className={cn(
           'rounded-lg font-medium transition-colors',
           {
             'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
             'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
             'border-2 border-gray-300 hover:border-gray-400': variant === 'outline',
           },
           {
             'px-3 py-1 text-sm': size === 'sm',
             'px-4 py-2': size === 'md',
             'px-6 py-3 text-lg': size === 'lg',
           },
           className
         )}
         {...props}
       >
         {children}
       </button>
     )
   }
   ```

2. **Add Storybook Story** (when implemented)
   ```typescript
   // src/components/ui/Button.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react'
   import { Button } from './Button'
   
   const meta: Meta<typeof Button> = {
     title: 'UI/Button',
     component: Button,
   }
   
   export default meta
   
   export const Primary: StoryObj<typeof Button> = {
     args: {
       children: 'Click me',
       variant: 'primary',
     },
   }
   ```

### Service Layer Development

1. **Define the Interface**
   ```typescript
   // src/services/interfaces/IQuizService.ts
   export interface IQuizService {
     generateQuiz(params: QuizParams): Promise<Quiz>
     saveQuiz(quiz: Quiz): Promise<Quiz>
     getQuizById(id: string): Promise<Quiz>
   }
   ```

2. **Create Mock Implementation**
   ```typescript
   // src/services/mock/MockQuizService.ts
   export class MockQuizService implements IQuizService {
     async generateQuiz(params: QuizParams): Promise<Quiz> {
       // Return mock data
       return {
         id: 'mock-id',
         title: params.title,
         questions: generateMockQuestions(params),
       }
     }
   }
   ```

## Testing

### Unit Testing
```typescript
// src/components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration Testing
```typescript
// src/pages/Dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { mockWorksheetService } from '@/test/mocks'

describe('Dashboard', () => {
  it('loads and displays worksheets', async () => {
    render(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('My Worksheets')).toBeInTheDocument()
      expect(screen.getAllByTestId('worksheet-card')).toHaveLength(3)
    })
  })
})
```

## Debugging

### Chrome DevTools
1. Use React Developer Tools extension
2. Check Network tab for API calls
3. Use Console for debugging logs

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## Performance Optimization

### Bundle Analysis
```bash
npm run build
npm run analyze
```

### Performance Checklist
- [ ] Lazy load routes
- [ ] Optimize images (WebP, proper sizing)
- [ ] Implement virtual scrolling for long lists
- [ ] Use React.memo for expensive components
- [ ] Minimize bundle size
- [ ] Enable gzip compression

## Deployment

### Local Build Test
```bash
npm run build
npm run preview
```

### Deployment Process
1. Push to feature branch
2. Create Pull Request
3. Automated tests run
4. Review and merge
5. Auto-deploy to Netlify

## Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript errors**
   ```bash
   npm run typecheck
   ```

3. **Tailwind not working**
   - Check `tailwind.config.js` content paths
   - Ensure PostCSS is configured
   - Restart dev server

4. **Build failures**
   - Check for console errors
   - Run `npm run lint`
   - Verify environment variables

## Resources

### Internal Documentation
- [Architecture Guide](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Component Library](./COMPONENTS.md)

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

*For additional help, please create an issue on GitHub or contact the development team.*