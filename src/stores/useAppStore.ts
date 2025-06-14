import { create } from 'zustand'
import type { PDFProcessingJob, Worksheet, User } from '@/types'

interface AppState {
  // User State
  user: User | null
  isAuthenticated: boolean
  
  // PDF Processing State
  currentJob: PDFProcessingJob | null
  processingJobs: PDFProcessingJob[]
  
  // Worksheet State
  worksheets: Worksheet[]
  currentWorksheet: Worksheet | null
  
  // UI State
  isSidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  
  // Actions
  setUser: (user: User | null) => void
  setCurrentJob: (job: PDFProcessingJob | null) => void
  updateJob: (jobId: string, updates: Partial<PDFProcessingJob>) => void
  addWorksheet: (worksheet: Worksheet) => void
  setCurrentWorksheet: (worksheet: Worksheet | null) => void
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  currentJob: null,
  processingJobs: [],
  worksheets: [],
  currentWorksheet: null,
  isSidebarOpen: false,
  theme: 'system',
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setCurrentJob: (job) => set({ currentJob: job }),
  
  updateJob: (jobId, updates) => set((state) => ({
    processingJobs: state.processingJobs.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    ),
    currentJob: state.currentJob?.id === jobId 
      ? { ...state.currentJob, ...updates } 
      : state.currentJob
  })),
  
  addWorksheet: (worksheet) => set((state) => ({
    worksheets: [...state.worksheets, worksheet]
  })),
  
  setCurrentWorksheet: (worksheet) => set({ currentWorksheet: worksheet }),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setTheme: (theme) => set({ theme })
}))