'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { toast } from 'sonner'
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  FileDown
} from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'sales' | 'inventory' | 'customers' | 'financial'
  description: string
  generatedDate: string
  generatedBy: string
  fileSize: string
  status: 'ready' | 'generating' | 'failed'
  downloadUrl?: string
}

const reports: Report[] = []

const reportTemplates = [
  {
    id: 'sales-monthly',
    name: 'Monthly Sales Report',
    type: 'sales',
    description: 'Revenue, orders, and customer metrics for a specific month',
    icon: TrendingUp,
    color: 'bg-green-50 text-green-600'
  },
  {
    id: 'inventory-status',
    name: 'Inventory Status',
    type: 'inventory',
    description: 'Current stock levels and movement analysis',
    icon: Package,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    id: 'customer-analytics',
    name: 'Customer Analytics',
    type: 'customers',
    description: 'Customer behavior and retention analysis',
    icon: Users,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    type: 'financial',
    description: 'Profit margins and expense analysis',
    icon: DollarSign,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    id: 'product-performance',
    name: 'Product Performance',
    type: 'sales',
    description: 'Top products and category analysis',
    icon: BarChart3,
    color: 'bg-pink-50 text-pink-600'
  },
  {
    id: 'order-analysis',
    name: 'Order Analysis',
    type: 'sales',
    description: 'Order patterns and fulfillment metrics',
    icon: ShoppingCart,
    color: 'bg-indigo-50 text-indigo-600'
  }
]

const typeColors = {
  sales: 'bg-green-100 text-green-800',
  inventory: 'bg-blue-100 text-blue-800',
  customers: 'bg-purple-100 text-purple-800',
  financial: 'bg-orange-100 text-orange-800'
}

const statusConfig = {
  ready: { color: 'bg-green-100 text-green-800', label: 'Ready' },
  generating: { color: 'bg-yellow-100 text-yellow-800', label: 'Generating' },
  failed: { color: 'bg-red-100 text-red-800', label: 'Failed' }
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || report.type === selectedType
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeColor = (type: string) => typeColors[type as keyof typeof typeColors]
  const getStatusConfig = (status: string) => statusConfig[status as keyof typeof statusConfig]

  const handleGenerateReport = (templateId: string) => {
    setSelectedTemplate(templateId)
    setShowGenerateModal(true)
  }

  const handleDownloadReport = async (reportId: string, type: string) => {
    try {
      setLoading(true)
      const period = '30days'
      const res = await fetch(`/api/reports?type=${type}&period=${period}`)
      if (!res.ok) throw new Error('Failed to fetch report data')
      const data = await res.json()

      // Generate CSV based on type
      let csvContent = ''
      let filename = ''

      if (type === 'sales' && data.sales) {
        csvContent = [
          ['Date', 'Orders', 'Revenue', 'Customers'],
          ...data.sales.map((row: any) => [
            new Date(row.date).toLocaleDateString(),
            row.orders,
            Number(row.revenue).toFixed(2),
            row.customers
          ])
        ].map(row => row.join(',')).join('\n')
        filename = `sales_report_${new Date().toISOString().split('T')[0]}.csv`
      } else if (type === 'inventory' && data.inventory) {
        csvContent = [
          ['Name', 'SKU', 'Category', 'Stock', 'Min Stock', 'Max Stock', 'Price', 'Status', 'Supplier', 'Location', 'Total Value'],
          ...data.inventory.map((row: any) => [
            row.name,
            row.sku,
            row.category,
            row.stock,
            row.min_stock,
            row.max_stock,
            Number(row.price).toFixed(2),
            row.status,
            row.supplier,
            row.location,
            Number(row.total_value).toFixed(2)
          ])
        ].map(row => row.join(',')).join('\n')
        filename = `inventory_report_${new Date().toISOString().split('T')[0]}.csv`
      } else if (type === 'customers' && data.customers) {
        csvContent = [
          ['Name', 'Email', 'Phone', 'Status', 'Total Orders', 'Total Spent', 'Join Date', 'Last Order Date'],
          ...data.customers.map((row: any) => [
            row.name,
            row.email,
            row.phone || '',
            row.status,
            row.total_orders,
            Number(row.total_spent).toFixed(2),
            row.join_date,
            row.last_order_date || ''
          ])
        ].map(row => row.join(',')).join('\n')
        filename = `customers_report_${new Date().toISOString().split('T')[0]}.csv`
      } else if (type === 'financial' && data.financial) {
        csvContent = [
          ['Month', 'Total Orders', 'Total Revenue', 'Unique Customers', 'Avg Order Value'],
          ...data.financial.map((row: any) => [
            new Date(row.month).toLocaleDateString(),
            row.total_orders,
            Number(row.total_revenue).toFixed(2),
            row.unique_customers,
            Number(row.avg_order_value).toFixed(2)
          ])
        ].map(row => row.join(',')).join('\n')
        filename = `financial_report_${new Date().toISOString().split('T')[0]}.csv`
      }

      if (csvContent) {
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to download report:', error)
      toast.error('Failed to download report')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReport = (reportId: string) => {
    console.log(`Deleting report: ${reportId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-1">Generate and manage business reports</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowGenerateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
              <UserDropdown />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
                  <p className="text-xs text-green-600 mt-1">+4 this month</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                  <p className="text-xs text-green-600 mt-1">Generated</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                  <p className="text-xs text-yellow-600 mt-1">Generating</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">156 MB</p>
                  <p className="text-xs text-gray-600 mt-1">Of 1 GB</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Report Templates */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Generate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <div
                    key={template.id}
                    className="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleGenerateReport(template.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${template.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        <button className="mt-2 text-sm text-primary-600 hover:text-primary-800 font-medium">
                          Generate →
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="sales">Sales</option>
                  <option value="inventory">Inventory</option>
                  <option value="customers">Customers</option>
                  <option value="financial">Financial</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="ready">Ready</option>
                  <option value="generating">Generating</option>
                  <option value="failed">Failed</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-sm text-gray-500">{report.description}</div>
                          <div className="text-xs text-gray-400 mt-1">By {report.generatedBy}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.generatedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {report.fileSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(report.status).color}`}>
                          {getStatusConfig(report.status).label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {report.status === 'ready' && (
                            <button
                              onClick={() => handleDownloadReport(report.id, report.type)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generate Report Modal */}
          {showGenerateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate New Report</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Report Type
                    </label>
                    <select
                      value={selectedTemplate || ''}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Choose a report type...</option>
                      {reportTemplates.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last 3 Months</option>
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                      <option>Custom Range</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <div className="flex space-x-3">
                      <label className="flex items-center">
                        <input type="radio" name="format" value="pdf" className="mr-2" defaultChecked />
                        <span className="text-sm">PDF</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" value="excel" className="mr-2" />
                        <span className="text-sm">Excel</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" value="csv" className="mr-2" />
                        <span className="text-sm">CSV</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowGenerateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const template = reportTemplates.find(t => t.id === selectedTemplate)
                      if (template) {
                        handleDownloadReport(Date.now().toString(), template.type)
                      }
                      setShowGenerateModal(false)
                    }}
                    disabled={loading}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? 'Generating...' : 'Generate Report'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
