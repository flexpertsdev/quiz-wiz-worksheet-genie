import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/components/pages/HomePage'
import { PDFImportPage } from '@/components/pages/PDFImportPage'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/import" element={<PDFImportPage />} />
          <Route path="/worksheets" element={<div className="p-8">Worksheets Page (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App