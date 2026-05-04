'use client'

import { useState } from 'react'
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

const metrics: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '₱1,245,890',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Total Orders',
    value: '3,456',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Active Customers',
    value: '1,234',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Conversion Rate',
    value: '3.45%',
    change: '-2.1%',
    trend: 'down',
    icon: Target,
    color: 'bg-orange-50 text-orange-600'
  }
]

interface SalesData {
  month: string
  revenue: number
  orders: number
  customers: number
}

const salesData: SalesData[] = [
  { month: 'Jan', revenue: 89000, orders: 234, customers: 189 },
  { month: 'Feb', revenue: 92000, orders: 256, customers: 201 },
  { month: 'Mar', revenue: 88000, orders: 245, customers: 195 },
  { month: 'Apr', revenue: 95000, orders: 278, customers: 223 },
  { month: 'May', revenue: 102000, orders: 301, customers: 245 },
  { month: 'Jun', revenue: 108000, orders: 323, customers: 267 }
]

interface TopProduct {
  name: string
  sales: number
  revenue: number
  percentage: number
}

const topProducts: TopProduct[] = [
  { name: 'Wireless Bluetooth Headphones', sales: 156, revenue: 389844, percentage: 31.3 },
  { name: 'Smart Watch Pro', sales: 89, revenue: 800911, percentage: 25.7 },
  { name: 'USB-C Hub', sales: 234, revenue: 140166, percentage: 18.9 },
  { name: 'Wireless Mouse', sales: 345, revenue: 137655, percentage: 15.2 },
  { name: 'Laptop Backpack', sales: 67, revenue: 60233, percentage: 9.0 }
]

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

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
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Electronics</span>
                    <span className="text-sm text-gray-600">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Accessories</span>
                    <span className="text-sm text-gray-600">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Clothing</span>
                    <span className="text-sm text-gray-600">7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '7%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Home & Garden</span>
                    <span className="text-sm text-gray-600">3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '3%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products and Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Products */}
            <div className="lg:col-span-2 card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
              <div className="overflow-x-auto">
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
                    {topProducts.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="text-right py-3 text-sm text-gray-900">{product.sales}</td>
                        <td className="text-right py-3 text-sm font-medium text-gray-900">
                          ₱{product.revenue.toLocaleString()}
                        </td>
                        <td className="text-right py-3">
                          <span className="text-sm text-gray-600">{product.percentage}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Best Day</p>
                      <p className="text-xs text-gray-600">June 15, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">₱45,678</p>
                    <p className="text-xs text-gray-600">156 orders</p>
                  </div>
                </div>

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
                    <p className="text-sm font-bold text-gray-900">₱{avgOrderValue.toFixed(2)}</p>
                    <p className="text-xs text-green-600">+8.3%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Customer Retention</p>
                      <p className="text-xs text-gray-600">30-day period</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">78.5%</p>
                    <p className="text-xs text-green-600">+3.2%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded">
                      <Package className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Products Sold</p>
                      <p className="text-xs text-gray-600">Total units</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">12,456</p>
                    <p className="text-xs text-green-600">+15.7%</p>
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
