import { Link } from 'react-router-dom'
import { FileText, Brain, BookOpen, GraduationCap, Upload, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const HomePage = () => {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Brain className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold text-gray-900">Quiz Wiz</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your AI-powered educational worksheet generator. Create custom quizzes, worksheets, and study materials in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/import">
              <Button size="lg" className="gap-2">
                <Upload className="w-5 h-5" />
                Import PDF
              </Button>
            </Link>
            <Link to="/worksheets">
              <Button size="lg" variant="outline" className="gap-2">
                Browse Worksheets
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <FileText className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Custom Worksheets</h3>
            <p className="text-gray-600">
              Generate personalized worksheets tailored to your curriculum and student needs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <BookOpen className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Study Materials</h3>
            <p className="text-gray-600">
              Create comprehensive study guides and practice materials for any subject.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <GraduationCap className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quiz Generation</h3>
            <p className="text-gray-600">
              Instantly generate quizzes with multiple choice, short answer, and essay questions.
            </p>
          </div>
        </div>

        <section className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            New: PDF Import Feature! 🎉
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-3">Convert PDFs to Interactive Quizzes</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Upload any PDF exam or worksheet
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  AI-powered question extraction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Automatic question type detection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Edit and enhance extracted questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Export as interactive worksheets
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Link to="/import">
                <Button size="lg" className="gap-2">
                  Try PDF Import Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}