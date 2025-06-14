import type { PDFProcessingJob, ExtractedQuestion } from '@/types'

export interface IPDFService {
  // Upload and process PDF
  uploadPDF(file: File): Promise<PDFProcessingJob>
  
  // Get processing status
  getJobStatus(jobId: string): Promise<PDFProcessingJob>
  
  // Get extracted questions
  getExtractedQuestions(jobId: string): Promise<ExtractedQuestion[]>
  
  // Cancel processing job
  cancelJob(jobId: string): Promise<void>
  
  // Extract text from specific page
  extractTextFromPage(file: File, pageNumber: number): Promise<string>
  
  // Get PDF metadata
  getPDFMetadata(file: File): Promise<{
    numPages: number
    title?: string
    author?: string
    subject?: string
    keywords?: string[]
  }>
}