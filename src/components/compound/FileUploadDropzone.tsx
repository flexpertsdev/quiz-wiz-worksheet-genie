import { useCallback } from 'react'
import type { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadDropzoneProps {
  onFileSelect: (files: File[]) => void
  acceptedFileTypes?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number // in bytes
  currentFiles?: File[]
  onRemoveFile?: (index: number) => void
  className?: string
}

export const FileUploadDropzone: FC<FileUploadDropzoneProps> = ({
  onFileSelect,
  acceptedFileTypes = { 'application/pdf': ['.pdf'] },
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB
  currentFiles = [],
  onRemoveFile,
  className
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles)
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
    maxSize
  })

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all',
          'hover:border-indigo-400 hover:bg-indigo-50',
          isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        )}
      >
        <input {...getInputProps()} />
        
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        
        {isDragActive ? (
          <p className="text-lg font-medium text-indigo-600">Drop the PDF files here...</p>
        ) : (
          <>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drag & drop PDF files here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Maximum file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
              {maxFiles > 1 && ` • Up to ${maxFiles} files`}
            </p>
          </>
        )}
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-medium text-red-800 mb-2">Some files were rejected:</p>
          <ul className="text-sm text-red-600 space-y-1">
            {fileRejections.map(({ file, errors }, index) => (
              <li key={index}>
                {file.name}: {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Selected files:</p>
          {currentFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {onRemoveFile && (
                <button
                  onClick={() => onRemoveFile(index)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}