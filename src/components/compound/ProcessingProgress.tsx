import type { FC } from 'react'
import type { PDFProcessingJob } from '@/types'
import { Loader2, CheckCircle, XCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProcessingProgressProps {
  job: PDFProcessingJob
  className?: string
}

export const ProcessingProgress: FC<ProcessingProgressProps> = ({ job, className }) => {
  const getStatusIcon = () => {
    switch (job.status) {
      case 'pending':
        return <Loader2 className="w-5 h-5 text-gray-400" />
      case 'processing':
        return <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (job.status) {
      case 'pending':
        return 'Waiting to process...'
      case 'processing':
        return `Processing page ${job.processedPages} of ${job.totalPages}...`
      case 'completed':
        return `Completed! Found ${job.extractedQuestions.length} questions`
      case 'failed':
        return 'Processing failed'
    }
  }

  const getStatusColor = () => {
    switch (job.status) {
      case 'pending':
        return 'bg-gray-200'
      case 'processing':
        return 'bg-indigo-600'
      case 'completed':
        return 'bg-green-500'
      case 'failed':
        return 'bg-red-500'
    }
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-6', className)}>
      <div className="flex items-start gap-4">
        <FileText className="w-8 h-8 text-gray-400 flex-shrink-0" />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">{job.fileName}</h3>
            {getStatusIcon()}
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{getStatusText()}</p>
          
          {job.status === 'processing' && (
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn(
                  'absolute inset-y-0 left-0 transition-all duration-500',
                  getStatusColor()
                )}
                style={{ width: `${job.progress}%` }}
              />
            </div>
          )}
          
          {job.errors && job.errors.length > 0 && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm font-medium text-red-800 mb-1">Errors occurred:</p>
              <ul className="text-sm text-red-600 space-y-1">
                {job.errors.map((error, index) => (
                  <li key={index}>
                    {error.page && `Page ${error.page}: `}{error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {job.status === 'completed' && job.extractedQuestions.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total pages:</span>
                <span className="ml-2 font-medium text-gray-900">{job.totalPages}</span>
              </div>
              <div>
                <span className="text-gray-500">Questions found:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {job.extractedQuestions.length}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Processing time:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {job.completedAt && (
                    `${Math.round((job.completedAt.getTime() - job.startedAt.getTime()) / 1000)}s`
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}