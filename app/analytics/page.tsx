'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap
} from 'lucide-react'

interface MetricCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
  color: string
}

interface SalesData {
  month: string
  revenue: number
  orders: number
  customers: number
}

interface TopProduct {
  name: string
  sales: number
  revenue: number
  percentage: number
}

interface AnalyticsData {
  salesData: SalesData[]
  categoryData: { category: string; sales: number; revenue: number }[]
  topProducts: TopProduct[]
  stats: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    avgOrderValue: number
  }
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedPeriod])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/analytics?period=${selectedPeriod}`)
      if (!res.ok) throw new Error('Failed to fetch analytics data')
      const data = await res.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const metrics: MetricCard[] = analyticsData ? [
    {
      title: 'Total Revenue',
      value: `₱${analyticsData.stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Total Orders',
      value: analyticsData.stats.totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Active Customers',
      value: analyticsData.stats.totalCustomers.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Avg Order Value',
      value: `₱${analyticsData.stats.avgOrderValue.toFixed(2)}`,
      change: '+5.1%',
      trend: 'up',
      icon: Target,
      color: 'bg-orange-50 text-orange-600'
    }
  ] : []

  const salesData = analyticsData?.salesData || []
  const topProducts = analyticsData?.topProducts || []
  const categoryData = analyticsData?.categoryData || []

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Business insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <UserDropdown />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <div key={index} className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <div className={`flex items-center mt-1 text-xs ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {metric.change} from last period
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedMetric('revenue')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedMetric === 'revenue'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setSelectedMetric('orders')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedMetric === 'orders'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => setSelectedMetric('customers')}
                    className={`px-3 py-1 rounded text-sm ${
                      selectedMetric === 'customers'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Customers
                  </button>
                </div>
              </div>
              
              <div className="h-64 flex items-end justify-between space-x-2">
                {salesData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-primary-200 rounded-t relative group cursor-pointer">
                      <div
                        className="bg-primary-600 rounded-t transition-all duration-300 group-hover:bg-primary-700"
                        style={{
                          height: `${selectedMetric === 'revenue' 
                            ? (item.revenue / 120000) * 100
                            : selectedMetric === 'orders'
                            ? (item.orders / 400) * 100
                            : (item.customers / 300) * 100
                          }%`
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {selectedMetric === 'revenue' 
                            ? `₱${item.revenue.toLocaleString()}`
                            : selectedMetric === 'orders'
                            ? `${item.orders} orders`
                            : `${item.customers} customers`
                          }
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
              <div className="space-y-4">
                {categoryData.length > 0 ? (
                  categoryData.map((cat, index) => {
                    const totalRevenue = categoryData.reduce((sum, c) => sum + c.revenue, 0)
                    const percentage = totalRevenue > 0 ? (cat.revenue / totalRevenue * 100).toFixed(1) : '0'
                    const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-pink-600']
                    return (
                      <div key={cat.category}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${colors[index % colors.length]} h-2 rounded-full`} style={{width: `${percentage}%`}}></div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-sm text-gray-500">No category data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Top Products and Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Products */}
            <div className="lg:col-span-2 card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
              <div className="overflow-x-auto">
                {loading ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : topProducts.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Product</th>
                        <th className="text-right py-2 text-sm font-medium text-gray-700">Sales</th>
                        <th className="text-right py-2 text-sm font-medium text-gray-700">Revenue</th>
                        <th className="text-right py-2 text-sm font-medium text-gray-700">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => {
                        const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0)
                        const percentage = totalRevenue > 0 ? (product.revenue / totalRevenue * 100).toFixed(1) : '0'
                        return (
                          <tr key={index} className="border-b">
                            <td className="py-3">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </td>
                            <td className="text-right py-3 text-sm text-gray-900">{product.sales}</td>
                            <td className="text-right py-3 text-sm font-medium text-gray-900">
                              ₱{product.revenue.toLocaleString()}
                            </td>
                            <td className="text-right py-3">
                              <span className="text-sm text-gray-600">{percentage}%</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-500">No product data available</p>
                )}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Avg Order Value</p>
                      <p className="text-xs text-gray-600">Current period</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">₱{analyticsData?.stats.avgOrderValue.toFixed(2) || '0.00'}</p>
                    <p className="text-xs text-green-600">+8.3%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Revenue</p>
                      <p className="text-xs text-gray-600">Current period</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">₱{analyticsData?.stats.totalRevenue.toLocaleString() || '0'}</p>
                    <p className="text-xs text-green-600">+12.5%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Customers</p>
                      <p className="text-xs text-gray-600">Current period</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{analyticsData?.stats.totalCustomers.toLocaleString() || '0'}</p>
                    <p className="text-xs text-green-600">+15.3%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded">
                      <Package className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Orders</p>
                      <p className="text-xs text-gray-600">Current period</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{analyticsData?.stats.totalOrders.toLocaleString() || '0'}</p>
                    <p className="text-xs text-green-600">+8.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
