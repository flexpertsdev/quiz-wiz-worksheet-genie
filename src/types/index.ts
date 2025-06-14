// Question Types
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  FILL_IN_BLANK = 'fill_in_blank',
  MATCHING = 'matching',
  ORDERING = 'ordering'
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum Subject {
  MATH = 'math',
  SCIENCE = 'science',
  ENGLISH = 'english',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
  COMPUTER_SCIENCE = 'computer_science',
  OTHER = 'other'
}

export enum GradeLevel {
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

// Question Interfaces
export interface Question {
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
  }
}

// PDF Processing Types
export interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export interface ExtractedQuestion {
  id: string
  sourcePageNumber: number
  sourceBoundingBox?: BoundingBox
  rawText: string
  processedText: string
  detectedType: QuestionType
  confidence: number
  suggestedAnswers?: string[]
  metadata: {
    points?: number
    difficulty?: Difficulty
    topic?: string
    subtopic?: string
  }
}

export interface PDFProcessingJob {
  id: string
  fileName: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  totalPages: number
  processedPages: number
  extractedQuestions: ExtractedQuestion[]
  errors?: ProcessingError[]
  startedAt: Date
  completedAt?: Date
}

export interface ProcessingError {
  page?: number
  message: string
  type: 'ocr_failed' | 'parsing_error' | 'invalid_format' | 'unknown'
}

// Worksheet Types
export interface Worksheet {
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

export interface CreateWorksheetDto {
  title: string
  description?: string
  subject: Subject
  gradeLevel: GradeLevel
  difficulty: Difficulty
  questions?: Question[]
  tags?: string[]
  isPublic?: boolean
}

// User Types
export interface User {
  id: string
  email: string
  profile: UserProfile
  createdAt: Date
  lastLoginAt: Date
}

export interface UserProfile {
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