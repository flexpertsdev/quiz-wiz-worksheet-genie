import { useState, useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { pdfService } from '@/services'
import { FileUploadDropzone } from '@/components/compound/FileUploadDropzone'
import { ProcessingProgress } from '@/components/compound/ProcessingProgress'
import { QuestionCard } from '@/components/blocks/QuestionCard'
import { Button } from '@/components/ui/Button'
import { QuestionType, Subject, GradeLevel, Difficulty } from '@/types'
import type { ExtractedQuestion, Worksheet } from '@/types'
import { ArrowRight, Download, Save } from 'lucide-react'

export const PDFImportPage = () => {
  const { currentJob, setCurrentJob, updateJob, addWorksheet } = useAppStore()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [extractedQuestions, setExtractedQuestions] = useState<ExtractedQuestion[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (currentJob?.id) {
      const interval = setInterval(async () => {
        try {
          const updatedJob = await pdfService.getJobStatus(currentJob.id)
          updateJob(currentJob.id, updatedJob)
          
          if (updatedJob.status === 'completed') {
            const questions = await pdfService.getExtractedQuestions(currentJob.id)
            setExtractedQuestions(questions)
            clearInterval(interval)
            setIsProcessing(false)
          } else if (updatedJob.status === 'failed') {
            clearInterval(interval)
            setIsProcessing(false)
          }
        } catch (error) {
          console.error('Failed to update job status:', error)
          clearInterval(interval)
          setIsProcessing(false)
        }
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [currentJob?.id, updateJob])

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files)
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleStartProcessing = async () => {
    if (selectedFiles.length === 0) return
    
    setIsProcessing(true)
    try {
      const job = await pdfService.uploadPDF(selectedFiles[0])
      setCurrentJob(job)
    } catch (error) {
      console.error('Failed to start processing:', error)
      setIsProcessing(false)
    }
  }

  const handleEditQuestion = (question: ExtractedQuestion) => {
    // TODO: Open question editor modal
    console.log('Edit question:', question)
  }

  const handleDeleteQuestion = (questionId: string) => {
    setExtractedQuestions(prev => prev.filter(q => q.id !== questionId))
  }

  const handleTypeChange = (questionId: string, type: QuestionType) => {
    setExtractedQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, detectedType: type } : q)
    )
  }

  const handleSaveAsWorksheet = () => {
    if (extractedQuestions.length === 0) return
    
    // Create a new worksheet from extracted questions
    const worksheet: Worksheet = {
      id: `worksheet-${Date.now()}`,
      userId: 'current-user', // TODO: Get from auth
      title: `Imported from ${selectedFiles[0]?.name || 'PDF'}`,
      description: `Worksheet created from PDF import on ${new Date().toLocaleDateString()}`,
      subject: Subject.OTHER, // TODO: Auto-detect or let user select
      gradeLevel: GradeLevel.GRADE_9, // TODO: Auto-detect or let user select
      difficulty: Difficulty.MEDIUM, // TODO: Auto-detect or let user select
      questions: extractedQuestions.map(eq => ({
        id: eq.id,
        type: eq.detectedType,
        question: eq.processedText,
        options: eq.suggestedAnswers,
        points: eq.metadata.points || 1,
        metadata: {
          difficulty: eq.metadata.difficulty || Difficulty.MEDIUM,
          subject: Subject.OTHER,
          topic: eq.metadata.topic
        }
      })),
      tags: ['imported', 'pdf'],
      isPublic: false,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    addWorksheet(worksheet)
    // TODO: Navigate to worksheet editor
    console.log('Worksheet created:', worksheet)
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Import PDF</h1>
          <p className="text-lg text-gray-600">
            Upload a PDF document to extract questions and create interactive worksheets
          </p>
        </header>

        {!currentJob && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <FileUploadDropzone
              onFileSelect={handleFileSelect}
              currentFiles={selectedFiles}
              onRemoveFile={handleRemoveFile}
              maxFiles={1}
              className="mb-6"
            />
            
            {selectedFiles.length > 0 && (
              <div className="flex justify-end">
                <Button
                  onClick={handleStartProcessing}
                  disabled={isProcessing}
                  size="lg"
                  className="gap-2"
                >
                  Start Processing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {currentJob && (
          <div className="space-y-6">
            <ProcessingProgress job={currentJob} />
            
            {currentJob.status === 'completed' && extractedQuestions.length > 0 && (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Extracted Questions ({extractedQuestions.length})
                    </h2>
                    <div className="flex gap-3">
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                      <Button onClick={handleSaveAsWorksheet} className="gap-2">
                        <Save className="w-4 h-4" />
                        Save as Worksheet
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {extractedQuestions.map(question => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        onEdit={handleEditQuestion}
                        onDelete={handleDeleteQuestion}
                        onTypeChange={handleTypeChange}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {currentJob.status === 'completed' && extractedQuestions.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-600 mb-4">
                  No questions were detected in this PDF. This might happen if:
                </p>
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li>• The PDF contains only images without text</li>
                  <li>• The document doesn't contain question-like content</li>
                  <li>• The PDF is corrupted or encrypted</li>
                </ul>
                <Button variant="outline" onClick={() => {
                  setCurrentJob(null)
                  setSelectedFiles([])
                  setExtractedQuestions([])
                }}>
                  Try Another PDF
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}