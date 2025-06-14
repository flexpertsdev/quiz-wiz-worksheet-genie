# API Documentation

## Overview

This document outlines the API structure for Quiz Wiz Worksheet Genie. Currently, the application uses a service layer pattern with mock implementations. Future versions will integrate with Supabase for backend services.

## Service Layer Architecture

### Base Service Interface

All services implement a common pattern for CRUD operations:

```typescript
interface BaseService<T, CreateDTO, UpdateDTO> {
  getAll(filters?: any): Promise<T[]>
  getById(id: string): Promise<T>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<void>
}
```

## Worksheet Service

### Interface: `IWorksheetService`

```typescript
interface IWorksheetService {
  getAll(filters?: WorksheetFilters): Promise<Worksheet[]>
  getById(id: string): Promise<Worksheet>
  create(data: CreateWorksheetDto): Promise<Worksheet>
  update(id: string, data: UpdateWorksheetDto): Promise<Worksheet>
  delete(id: string): Promise<void>
  clone(id: string): Promise<Worksheet>
  publish(id: string): Promise<Worksheet>
  unpublish(id: string): Promise<Worksheet>
}
```

### Types

```typescript
interface Worksheet {
  id: string
  userId: string
  title: string
  description?: string
  subject: Subject
  gradeLevel: GradeLevel
  difficulty: Difficulty
  questions: Question[]
  tags: string[]
  isPublic: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  metadata?: {
    timeEstimate?: number
    pointsTotal?: number
    version?: number
  }
}

interface CreateWorksheetDto {
  title: string
  description?: string
  subject: Subject
  gradeLevel: GradeLevel
  difficulty: Difficulty
  questions?: Question[]
  tags?: string[]
  isPublic?: boolean
}

interface UpdateWorksheetDto extends Partial<CreateWorksheetDto> {}

interface WorksheetFilters {
  userId?: string
  subject?: Subject
  gradeLevel?: GradeLevel
  difficulty?: Difficulty
  isPublic?: boolean
  isPublished?: boolean
  tags?: string[]
  search?: string
}
```

### Enums

```typescript
enum Subject {
  MATH = 'math',
  SCIENCE = 'science',
  ENGLISH = 'english',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
  COMPUTER_SCIENCE = 'computer_science',
  ART = 'art',
  MUSIC = 'music',
  PHYSICAL_EDUCATION = 'physical_education',
  OTHER = 'other'
}

enum GradeLevel {
  KINDERGARTEN = 'kindergarten',
  GRADE_1 = 'grade_1',
  GRADE_2 = 'grade_2',
  GRADE_3 = 'grade_3',
  GRADE_4 = 'grade_4',
  GRADE_5 = 'grade_5',
  GRADE_6 = 'grade_6',
  GRADE_7 = 'grade_7',
  GRADE_8 = 'grade_8',
  GRADE_9 = 'grade_9',
  GRADE_10 = 'grade_10',
  GRADE_11 = 'grade_11',
  GRADE_12 = 'grade_12',
  COLLEGE = 'college'
}

enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}
```

### Methods

#### `getAll(filters?: WorksheetFilters): Promise<Worksheet[]>`
Retrieves all worksheets matching the provided filters.

**Example:**
```typescript
const mathWorksheets = await worksheetService.getAll({
  subject: Subject.MATH,
  gradeLevel: GradeLevel.GRADE_5,
  isPublic: true
})
```

#### `getById(id: string): Promise<Worksheet>`
Retrieves a specific worksheet by ID.

**Example:**
```typescript
const worksheet = await worksheetService.getById('worksheet-123')
```

#### `create(data: CreateWorksheetDto): Promise<Worksheet>`
Creates a new worksheet.

**Example:**
```typescript
const newWorksheet = await worksheetService.create({
  title: 'Addition Practice',
  subject: Subject.MATH,
  gradeLevel: GradeLevel.GRADE_2,
  difficulty: Difficulty.EASY,
  questions: [...]
})
```

## Question Service

### Interface: `IQuestionService`

```typescript
interface IQuestionService {
  generateQuestions(params: GenerateQuestionsParams): Promise<Question[]>
  validateAnswer(questionId: string, answer: any): Promise<ValidationResult>
  getQuestionBank(filters?: QuestionFilters): Promise<Question[]>
  saveToBank(questions: Question[]): Promise<void>
}
```

### Types

```typescript
interface Question {
  id: string
  type: QuestionType
  question: string
  instructions?: string
  options?: string[] // For multiple choice
  correctAnswer?: any
  points: number
  explanation?: string
  hints?: string[]
  media?: {
    type: 'image' | 'video' | 'audio'
    url: string
    alt?: string
  }
  metadata?: {
    difficulty: Difficulty
    subject: Subject
    topic?: string
    subtopic?: string
    standards?: string[] // Educational standards alignment
  }
}

enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  FILL_IN_BLANK = 'fill_in_blank',
  MATCHING = 'matching',
  ORDERING = 'ordering',
  DRAG_DROP = 'drag_drop'
}

interface GenerateQuestionsParams {
  subject: Subject
  topic: string
  gradeLevel: GradeLevel
  difficulty: Difficulty
  count: number
  questionTypes?: QuestionType[]
  includeExplanations?: boolean
  includeHints?: boolean
}

interface ValidationResult {
  isCorrect: boolean
  score: number
  feedback?: string
  explanation?: string
}
```

## User/Auth Service

### Interface: `IAuthService`

```typescript
interface IAuthService {
  signUp(email: string, password: string, userData?: UserData): Promise<User>
  signIn(email: string, password: string): Promise<AuthSession>
  signOut(): Promise<void>
  resetPassword(email: string): Promise<void>
  updatePassword(newPassword: string): Promise<void>
  getCurrentUser(): Promise<User | null>
  updateProfile(data: UpdateProfileDto): Promise<User>
}
```

### Types

```typescript
interface User {
  id: string
  email: string
  profile: UserProfile
  subscription: Subscription
  createdAt: Date
  lastLoginAt: Date
}

interface UserProfile {
  fullName: string
  avatarUrl?: string
  school?: string
  subjects?: Subject[]
  gradeLevels?: GradeLevel[]
  bio?: string
  preferences?: {
    theme: 'light' | 'dark' | 'system'
    emailNotifications: boolean
    defaultSubject?: Subject
    defaultGradeLevel?: GradeLevel
  }
}

interface AuthSession {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

interface Subscription {
  plan: 'free' | 'basic' | 'pro' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  currentPeriodEnd?: Date
  features: {
    maxWorksheets: number
    maxQuestionsPerWorksheet: number
    aiGeneration: boolean
    exportFormats: string[]
    collaboration: boolean
  }
}
```

## Export Service

### Interface: `IExportService`

```typescript
interface IExportService {
  exportToPDF(worksheetId: string, options?: ExportOptions): Promise<Blob>
  exportToWord(worksheetId: string, options?: ExportOptions): Promise<Blob>
  exportToGoogleDocs(worksheetId: string): Promise<string> // Returns URL
  exportAnswerKey(worksheetId: string, format: ExportFormat): Promise<Blob>
}
```

### Types

```typescript
interface ExportOptions {
  includeAnswerKey?: boolean
  includeInstructions?: boolean
  studentName?: string
  className?: string
  date?: Date
  customHeader?: string
  customFooter?: string
  fontSize?: 'small' | 'medium' | 'large'
  spacing?: 'compact' | 'normal' | 'relaxed'
}

enum ExportFormat {
  PDF = 'pdf',
  WORD = 'word',
  GOOGLE_DOCS = 'google_docs',
  PRINT = 'print'
}
```

## AI Generation Service

### Interface: `IAIService`

```typescript
interface IAIService {
  generateWorksheet(params: AIGenerationParams): Promise<Worksheet>
  improveQuestion(question: Question): Promise<Question>
  generateExplanation(question: Question): Promise<string>
  suggestTopics(subject: Subject, gradeLevel: GradeLevel): Promise<string[]>
  checkContent(content: string): Promise<ContentCheckResult>
}
```

### Types

```typescript
interface AIGenerationParams {
  subject: Subject
  topic: string
  gradeLevel: GradeLevel
  difficulty: Difficulty
  questionCount: number
  questionTypes?: QuestionType[]
  learningObjectives?: string[]
  avoidTopics?: string[]
  style?: 'formal' | 'casual' | 'fun'
  includeRealWorldExamples?: boolean
}

interface ContentCheckResult {
  isAppropriate: boolean
  issues?: {
    type: 'inappropriate' | 'too_difficult' | 'too_easy' | 'off_topic'
    description: string
    severity: 'low' | 'medium' | 'high'
  }[]
  suggestions?: string[]
}
```

## Error Handling

All services follow a consistent error handling pattern:

```typescript
class ServiceError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public statusCode?: number,
    public details?: any
  ) {
    super(message)
  }
}

enum ErrorCode {
  // Auth errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  
  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Permission errors
  FORBIDDEN = 'FORBIDDEN',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  
  // System errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE'
}
```

## Rate Limiting

API calls are subject to rate limiting based on subscription tier:

| Tier | Requests/Hour | AI Generations/Day |
|------|---------------|-------------------|
| Free | 100 | 5 |
| Basic | 500 | 20 |
| Pro | 2000 | 100 |
| Enterprise | Unlimited | Unlimited |

## Pagination

List endpoints support pagination:

```typescript
interface PaginationParams {
  page?: number // Default: 1
  limit?: number // Default: 20, Max: 100
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
```

## WebSocket Events (Future)

For real-time collaboration:

```typescript
// Event types
enum WebSocketEvent {
  WORKSHEET_UPDATED = 'worksheet:updated',
  QUESTION_ADDED = 'question:added',
  QUESTION_REMOVED = 'question:removed',
  USER_JOINED = 'user:joined',
  USER_LEFT = 'user:left',
  CURSOR_MOVED = 'cursor:moved'
}

// Client -> Server
socket.emit(WebSocketEvent.WORKSHEET_UPDATED, {
  worksheetId: string,
  changes: any
})

// Server -> Client
socket.on(WebSocketEvent.WORKSHEET_UPDATED, (data) => {
  // Handle update
})
```

---

*This API documentation will be updated as new services and endpoints are added to the application.*