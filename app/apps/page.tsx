'use client'

import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { Package } from 'lucide-react'

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Apps</h1>
              <p className="text-sm text-gray-500">Manage your applications and integrations</p>
            </div>
            <UserDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="card p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Apps Section</h2>
                <p className="text-gray-600">Manage your applications and integrations here.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
