import { FileText, Brain, BookOpen, GraduationCap } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Brain className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold text-gray-900">Quiz Wiz</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered educational worksheet generator. Create custom quizzes, worksheets, and study materials in seconds.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

        <div className="text-center mt-16">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
            Get Started - It's Free!
          </button>
        </div>
      </div>
    </div>
  )
}

export default App