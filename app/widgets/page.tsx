'use client'

import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { Layout } from 'lucide-react'

export default function WidgetsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="ml-64">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Widgets</h1>
              <UserDropdown />
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className="card p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Layout className="w-16 h-16 text-accent-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Widgets Section</h2>
                  <p className="text-gray-600">Customize and configure dashboard widgets.</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  )
}
