import type { FC, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Brain, FileText, Upload, Home, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Import PDF', href: '/import', icon: Upload },
    { name: 'Worksheets', href: '/worksheets', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings }
  ]
  
  return (
    <div className="min-h-dvh bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Quiz Wiz</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>
      
      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}