# Architecture Documentation

## System Architecture Overview

Quiz Wiz Worksheet Genie follows a modern, scalable architecture designed for maintainability and performance.

## Frontend Architecture

### Component Architecture (Atomic Design)

```
┌─────────────────────────────────────────────────────────┐
│                         PAGES                           │
│  Complete views composed of templates                   │
│  Examples: HomePage, Dashboard, WorksheetEditor         │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                      TEMPLATES                          │
│  Page layouts with placeholder content                  │
│  Examples: AuthLayout, DashboardLayout, PublicLayout   │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                      ORGANISMS                          │
│  Complex UI components forming sections                 │
│  Examples: Navigation, WorksheetForm, QuizBuilder      │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                      MOLECULES                          │
│  Simple components built from atoms                     │
│  Examples: SearchBar, FormField, FeatureCard           │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                        ATOMS                            │
│  Basic UI building blocks                               │
│  Examples: Button, Input, Label, Icon                  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Components    │────▶│     Stores      │────▶│    Services     │
│   (React UI)    │◀────│    (Zustand)    │◀────│  (Interfaces)   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
                                              ┌─────────────────────┐
                                              │   Implementations   │
                                              │  - MockService      │
                                              │  - SupabaseService  │
                                              └─────────────────────┘
```

### Service Layer Pattern

The service layer provides abstraction between the UI and data sources:

```typescript
// 1. Interface Definition
interface IWorksheetService {
  getAll(filters?: WorksheetFilters): Promise<Worksheet[]>
  getById(id: string): Promise<Worksheet>
  create(data: CreateWorksheetDto): Promise<Worksheet>
  update(id: string, data: UpdateWorksheetDto): Promise<Worksheet>
  delete(id: string): Promise<void>
}

// 2. Mock Implementation (Development)
class MockWorksheetService implements IWorksheetService {
  private mockData: Worksheet[] = [...]
  
  async getAll(filters?: WorksheetFilters): Promise<Worksheet[]> {
    // Return filtered mock data
  }
  // ... other methods
}

// 3. Supabase Implementation (Production)
class SupabaseWorksheetService implements IWorksheetService {
  async getAll(filters?: WorksheetFilters): Promise<Worksheet[]> {
    const { data, error } = await supabase
      .from('worksheets')
      .select('*')
      .match(filters || {})
    
    if (error) throw error
    return data
  }
  // ... other methods
}

// 4. Service Factory
export const worksheetService = import.meta.env.PROD
  ? new SupabaseWorksheetService()
  : new MockWorksheetService()
```

### State Management Architecture

Using Zustand for predictable state management:

```typescript
// Store Structure
interface AppState {
  // Auth State
  user: User | null
  isAuthenticated: boolean
  
  // UI State
  isSidebarOpen: boolean
  theme: 'light' | 'dark'
  
  // Data State
  worksheets: Worksheet[]
  currentWorksheet: Worksheet | null
  
  // Actions
  setUser: (user: User | null) => void
  toggleSidebar: () => void
  loadWorksheets: () => Promise<void>
}

// Store Implementation
const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  worksheets: [],
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  loadWorksheets: async () => {
    const worksheets = await worksheetService.getAll()
    set({ worksheets })
  }
}))
```

## Backend Architecture (Future)

### Supabase Schema Design

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'teacher',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Worksheets table
CREATE TABLE worksheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level TEXT,
  content JSONB NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions bank
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worksheet_id UUID REFERENCES worksheets(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'multiple_choice', 'short_answer', 'essay'
  question TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER
);

-- Row Level Security
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own worksheets" ON worksheets
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public worksheets are viewable" ON worksheets
  FOR SELECT USING (is_public = true);
```

### API Routes Structure

```
/api/
├── auth/
│   ├── login
│   ├── register
│   ├── logout
│   └── refresh
├── worksheets/
│   ├── GET    /           # List worksheets
│   ├── POST   /           # Create worksheet
│   ├── GET    /:id        # Get worksheet
│   ├── PUT    /:id        # Update worksheet
│   ├── DELETE /:id        # Delete worksheet
│   └── POST   /:id/clone  # Clone worksheet
├── questions/
│   ├── GET    /bank       # Question bank
│   └── POST   /generate   # AI generation
└── export/
    ├── POST   /pdf        # Export as PDF
    └── POST   /docx       # Export as DOCX
```

## Security Architecture

### Authentication Flow

```
┌─────────┐      ┌─────────┐      ┌──────────┐      ┌──────────┐
│ Client  │─────▶│  Login  │─────▶│ Supabase │─────▶│ Database │
│  (SPA)  │◀─────│  Form   │◀─────│   Auth   │◀─────│ (RLS)    │
└─────────┘ JWT  └─────────┘      └──────────┘      └──────────┘
```

### Security Measures

1. **Row Level Security (RLS)**: Database-level access control
2. **JWT Tokens**: Secure, stateless authentication
3. **HTTPS Only**: All communications encrypted
4. **Input Validation**: Client and server-side validation
5. **Rate Limiting**: Prevent abuse and DDoS
6. **CORS Policy**: Restrict cross-origin requests

## Performance Architecture

### Optimization Strategies

1. **Code Splitting**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'))
   const WorksheetEditor = lazy(() => import('./pages/WorksheetEditor'))
   ```

2. **Image Optimization**
   - WebP format with fallbacks
   - Lazy loading with Intersection Observer
   - Responsive images with srcset

3. **Caching Strategy**
   - Service Worker for offline functionality
   - React Query for server state caching
   - Browser caching headers

4. **Bundle Optimization**
   - Tree shaking with Vite
   - Minification and compression
   - Dynamic imports for large libraries

## Deployment Architecture

### CI/CD Pipeline

```
GitHub Push → GitHub Actions → Build & Test → Deploy to Netlify
     │                │                           │
     └── Trigger ─────┴── Lint, Type Check ──────┘
```

### Environment Management

```
Development:
- Local development with Vite
- Mock services
- Hot module replacement

Staging:
- Netlify preview deployments
- Feature branch testing
- Integration testing

Production:
- Netlify production deployment
- Supabase production database
- Monitoring and analytics
```

## Monitoring & Analytics

### Application Monitoring

1. **Error Tracking**: Sentry integration
2. **Performance Monitoring**: Web Vitals tracking
3. **User Analytics**: Privacy-focused analytics
4. **Uptime Monitoring**: StatusPage integration

### Logging Strategy

```typescript
// Structured logging
logger.info('Worksheet created', {
  userId: user.id,
  worksheetId: worksheet.id,
  timestamp: new Date().toISOString()
})
```

## Scalability Considerations

### Horizontal Scaling
- Stateless application design
- CDN for static assets
- Database connection pooling

### Vertical Scaling
- Efficient database queries
- Optimized bundle sizes
- Lazy loading strategies

### Future Scaling Options
- Microservices for AI generation
- Redis for caching
- WebSocket for real-time collaboration

---

*This architecture document should be updated as the system evolves and new patterns are adopted.*