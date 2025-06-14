import type { IPDFService } from '../interfaces/IPDFService'
import { QuestionType, Difficulty } from '@/types'
import type { PDFProcessingJob, ExtractedQuestion } from '@/types'

export class MockPDFService implements IPDFService {
  private jobs: Map<string, PDFProcessingJob> = new Map()
  
  async uploadPDF(file: File): Promise<PDFProcessingJob> {
    const jobId = `job-${Date.now()}`
    
    const job: PDFProcessingJob = {
      id: jobId,
      fileName: file.name,
      status: 'pending',
      progress: 0,
      totalPages: 10, // Mock value
      processedPages: 0,
      extractedQuestions: [],
      startedAt: new Date()
    }
    
    this.jobs.set(jobId, job)
    
    // Simulate processing
    setTimeout(() => this.simulateProcessing(jobId), 100)
    
    return job
  }
  
  async getJobStatus(jobId: string): Promise<PDFProcessingJob> {
    const job = this.jobs.get(jobId)
    if (!job) {
      throw new Error('Job not found')
    }
    return job
  }
  
  async getExtractedQuestions(jobId: string): Promise<ExtractedQuestion[]> {
    const job = this.jobs.get(jobId)
    if (!job) {
      throw new Error('Job not found')
    }
    return job.extractedQuestions
  }
  
  async cancelJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId)
    if (job && job.status === 'processing') {
      job.status = 'failed'
      job.errors = [{ message: 'Job cancelled by user', type: 'unknown' }]
    }
  }
  
  async extractTextFromPage(file: File, pageNumber: number): Promise<string> {
    // Mock implementation
    return `Mock text from page ${pageNumber} of ${file.name}`
  }
  
  async getPDFMetadata(file: File): Promise<{
    numPages: number
    title?: string
    author?: string
    subject?: string
    keywords?: string[]
  }> {
    return {
      numPages: 10,
      title: file.name.replace('.pdf', ''),
      author: 'Mock Author',
      subject: 'Mathematics',
      keywords: ['algebra', 'geometry', 'quiz']
    }
  }
  
  private simulateProcessing(jobId: string) {
    const job = this.jobs.get(jobId)
    if (!job) return
    
    job.status = 'processing'
    
    // Simulate page-by-page processing
    const processInterval = setInterval(() => {
      if (job.processedPages < job.totalPages) {
        job.processedPages++
        job.progress = (job.processedPages / job.totalPages) * 100
        
        // Generate mock questions for each page
        if (job.processedPages % 2 === 0) {
          const question: ExtractedQuestion = {
            id: `q-${job.processedPages}-${Date.now()}`,
            sourcePageNumber: job.processedPages,
            rawText: `Question ${job.extractedQuestions.length + 1}: What is 2 + 2?`,
            processedText: 'What is 2 + 2?',
            detectedType: QuestionType.MULTIPLE_CHOICE,
            confidence: 0.95,
            suggestedAnswers: ['2', '3', '4', '5'],
            metadata: {
              points: 1,
              difficulty: Difficulty.EASY,
              topic: 'Addition'
            }
          }
          job.extractedQuestions.push(question)
        }
      } else {
        job.status = 'completed'
        job.completedAt = new Date()
        clearInterval(processInterval)
      }
    }, 500)
  }
}