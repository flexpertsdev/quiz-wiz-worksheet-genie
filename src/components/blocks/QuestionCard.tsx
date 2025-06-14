import type { FC } from 'react'
import { QuestionType } from '@/types'
import type { ExtractedQuestion } from '@/types'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: ExtractedQuestion
  onEdit: (question: ExtractedQuestion) => void
  onDelete: (questionId: string) => void
  onTypeChange: (questionId: string, type: QuestionType) => void
  className?: string
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  onEdit,
  onDelete,
  onTypeChange,
  className
}) => {
  const getQuestionTypeLabel = (type: QuestionType) => {
    const labels: Record<QuestionType, string> = {
      [QuestionType.MULTIPLE_CHOICE]: 'Multiple Choice',
      [QuestionType.TRUE_FALSE]: 'True/False',
      [QuestionType.SHORT_ANSWER]: 'Short Answer',
      [QuestionType.ESSAY]: 'Essay',
      [QuestionType.FILL_IN_BLANK]: 'Fill in the Blank',
      [QuestionType.MATCHING]: 'Matching',
      [QuestionType.ORDERING]: 'Ordering'
    }
    return labels[type]
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  return (
    <Card variant="bordered" className={className}>
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-500">
                Page {question.sourcePageNumber}
              </span>
              <span className="text-gray-300">•</span>
              <select
                value={question.detectedType}
                onChange={(e) => onTypeChange(question.id, e.target.value as QuestionType)}
                className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Object.values(QuestionType).map(type => (
                  <option key={type} value={type}>
                    {getQuestionTypeLabel(type)}
                  </option>
                ))}
              </select>
              <div className={cn('flex items-center gap-1', getConfidenceColor(question.confidence))}>
                {getConfidenceIcon(question.confidence)}
                <span className="text-sm">
                  {Math.round(question.confidence * 100)}% confident
                </span>
              </div>
            </div>
            
            <p className="text-gray-900 mb-3">{question.processedText}</p>
            
            {question.suggestedAnswers && question.suggestedAnswers.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Detected answers:</p>
                <div className="flex flex-wrap gap-2">
                  {question.suggestedAnswers.map((answer, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {String.fromCharCode(65 + index)}. {answer}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {question.metadata && (
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {question.metadata.points && (
                  <span>Points: {question.metadata.points}</span>
                )}
                {question.metadata.difficulty && (
                  <span>Difficulty: {question.metadata.difficulty}</span>
                )}
                {question.metadata.topic && (
                  <span>Topic: {question.metadata.topic}</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(question)}
              aria-label="Edit question"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(question.id)}
              aria-label="Delete question"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {question.rawText !== question.processedText && (
          <details className="mt-3">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Show original text
            </summary>
            <p className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-700 whitespace-pre-wrap">
              {question.rawText}
            </p>
          </details>
        )}
      </CardContent>
    </Card>
  )
}