'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { 
  Search, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign,
  Star,
  PlusCircle,
  Pencil,
  Trash2
} from 'lucide-react'
import { Order, Product } from '@/lib/type'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  activeProducts: number
  totalCustomers: number
}

interface TopProduct extends Product {
  totalSales: number
  totalRevenue: number
  rating: number
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({
  revenue: 0,
  totalOrders: 0,
  activeProducts: 0,
  totalCustomers: 0,

  pending: 0,
  processing: 0,
  shipped: 0,
  delivered: 0,
  cancelled: 0,
  })

  const [previousStats, setPreviousStats] = useState({
    revenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    totalCustomers: 0,
  })

  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [activities, setActivities] = useState([])

  const loadDashboardData = async () => {
    try {
      const res = await fetch("/api/dashboard");

      const data = await res.json();

      if (!data.success) return;

      setStats({
        revenue: Number(data.stats.totalRevenue || 0),
        totalOrders: Number(data.stats.totalOrders || 0),
        activeProducts: Number(data.stats.activeProducts || 0),
        totalCustomers: Number(data.stats.totalCustomers || 0),

        pending: Number(data.stats.pending || 0),
        processing: Number(data.stats.processing || 0),
        shipped: Number(data.stats.shipped || 0),
        delivered: Number(data.stats.delivered || 0),
        cancelled: Number(data.stats.cancelled || 0),
      })
      console.log("LOAD DASHBOARD:", data.stats)

      // Fake previous stats for growth %
      setPreviousStats({
        revenue: data.stats.totalRevenue * 0.88,
        totalOrders: Math.max(1, Math.floor(data.stats.totalOrders * 0.92)),
        activeProducts: Math.max(1, data.stats.activeProducts - 2),
        totalCustomers: Math.max(1, Math.floor(data.stats.totalCustomers * 0.93)),
      });

      setRecentOrders(data.recentOrders);

      const formattedTopProducts = data.topProducts.map((product: any) => ({
        ...product,
        totalSales: Number(product.total_sales),
        totalRevenue: Number(product.total_revenue),
        rating: 4.5 + Math.random() * 0.5,
      }));

      setTopProducts(formattedTopProducts);

      const activityResponse = await fetch("/api/activity-logs");
      const activityData = await activityResponse.json();
      setActivities(activityData);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats')

      if (!res.ok) {
        throw new Error('Failed to fetch dashboard stats')
      }

      const data = await res.json()

      console.log("DASHBOARD STATS:", data)

      setStats({
        revenue: data.revenue || 0,
        totalOrders: data.totalOrders || 0,

        // temporary placeholders
        activeProducts: 0,
        totalCustomers: 0,

        pending: data.pending || 0,
        processing: data.processing || 0,
        shipped: data.shipped || 0,
        delivered: data.delivered || 0,
        cancelled: data.cancelled || 0,
      })

    } catch (error) {
      console.error(error)
    }
  }

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return '+0%'
    const change = ((current - previous) / previous) * 100
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
  }

  const calculateNewItems = (current: number, previous: number) => {
    const diff = current - previous
    return diff > 0 ? `+${diff} new` : ''
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
  console.log("FORMAT AMOUNT:", amount, typeof amount)

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0
  }).format(amount)
}

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-PH').format(num)
  }

  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

    // Load real data on component mount
  useEffect(() => {
    loadDashboardData()
  }, [])

  const getActivityIcon = (action: string) => {
  switch (action) {
    case "CREATE":
      return <PlusCircle className="w-4 h-4 text-green-600" />;

    case "UPDATE":
      return <Pencil className="w-4 h-4 text-yellow-600" />;

    case "DELETE":
      return <Trash2 className="w-4 h-4 text-red-600" />;

    default:
      return <PlusCircle className="w-4 h-4 text-gray-600" />;
  }
  };

  const getActivityDot = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-500";

      case "UPDATE":
        return "bg-yellow-500";

      case "DELETE":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <UserDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name || 'Admin'}
          </h1>
            <p className="text-gray-600">{user?.email ? `Logged in as ${user.email}` : 'Professional Accessories Management Dashboard'}</p>
          </div>

          {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Revenue */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.revenue)}
                </p>

                <p className="text-sm text-green-600 mt-1">
                  {calculateChange(stats.revenue, previousStats.revenue)}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
         
          {/* Orders */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(stats.totalOrders)}
                </p>

                <p className="text-sm text-green-600 mt-1">
                  {calculateChange(
                    stats.totalOrders,
                    previousStats.totalOrders
                  )}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-50">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Products
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(stats.activeProducts)}
                </p>

                <p className="text-sm text-green-600 mt-1">
                  {calculateNewItems(
                    stats.activeProducts,
                    previousStats.activeProducts
                  )}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-red-50">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* Customers */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Customers
                </p>

                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(stats.totalCustomers)}
                </p>

                <p className="text-sm text-green-600 mt-1">
                  {calculateChange(
                    stats.totalCustomers,
                    previousStats.totalCustomers
                  )}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

        </div>

        <div className="card mb-6 overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h2>

            <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
              {activities.length}
            </span>
          </div>

          <div className="p-6 max-h-[350px] overflow-y-auto">

            <div className="space-y-4">

              {activities.map((activity: any) => (
                <div
                  key={activity.id}
                  className="border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium text-gray-900">{order.orderNumber}</p>
                              <p className="text-sm text-gray-600">{order.customerName}</p>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-gray-500">{order.items?.[0]?.productName || 'Multiple items'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(order.totalAmount)}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{product.totalSales} sold</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(product.totalRevenue)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card mt-6">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <ShoppingCart className="w-5 h-5 text-red-600" />
                      <span>New Order</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <Package className="w-5 h-5 text-blue-600" />
                      <span>Add Product</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span>Customer List</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span>Sales Report</span>
                    </button>
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
