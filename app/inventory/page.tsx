'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Truck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Download,
  BarChart3,
  RefreshCw,
  CheckCircle
} from 'lucide-react'

interface InventoryItem {
  id: string
  productName: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  reorderPoint: number
  unitPrice: number
  totalValue: number
  lastRestocked: string
  daysSinceRestock: number
  status: 'optimal' | 'low' | 'critical' | 'overstock'
  supplier: string
  location: string
}

const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    productName: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    reorderPoint: 15,
    unitPrice: 2499.00,
    totalValue: 112455.00,
    lastRestocked: '2024-01-10',
    daysSinceRestock: 8,
    status: 'optimal',
    supplier: 'Tech Supplies Inc.',
    location: 'Warehouse A - Shelf 12'
  },
  {
    id: '2',
    productName: 'Smart Watch Pro',
    sku: 'SWP-002',
    category: 'Electronics',
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    reorderPoint: 20,
    unitPrice: 8999.00,
    totalValue: 71992.00,
    lastRestocked: '2024-01-05',
    daysSinceRestock: 13,
    status: 'critical',
    supplier: 'Smart Tech Co.',
    location: 'Warehouse B - Shelf 5'
  },
  {
    id: '3',
    productName: 'Laptop Backpack',
    sku: 'LBB-003',
    category: 'Accessories',
    currentStock: 0,
    minStock: 20,
    maxStock: 80,
    reorderPoint: 25,
    unitPrice: 899.00,
    totalValue: 0.00,
    lastRestocked: '2024-01-01',
    daysSinceRestock: 17,
    status: 'critical',
    supplier: 'Bag Manufacturers Ltd.',
    location: 'Warehouse A - Shelf 8'
  },
  {
    id: '4',
    productName: 'USB-C Hub',
    sku: 'UCH-004',
    category: 'Accessories',
    currentStock: 78,
    minStock: 25,
    maxStock: 60,
    reorderPoint: 30,
    unitPrice: 599.00,
    totalValue: 46722.00,
    lastRestocked: '2024-01-15',
    daysSinceRestock: 3,
    status: 'overstock',
    supplier: 'Connectivity Solutions',
    location: 'Warehouse B - Shelf 15'
  },
  {
    id: '5',
    productName: 'Wireless Mouse',
    sku: 'WMO-005',
    category: 'Electronics',
    currentStock: 156,
    minStock: 50,
    maxStock: 150,
    reorderPoint: 60,
    unitPrice: 399.00,
    totalValue: 62244.00,
    lastRestocked: '2024-01-12',
    daysSinceRestock: 6,
    status: 'optimal',
    supplier: 'Peripheral Products Inc.',
    location: 'Warehouse A - Shelf 20'
  }
]

const statusConfig = {
  optimal: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Optimal' },
  low: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle, label: 'Low Stock' },
  critical: { color: 'bg-red-100 text-red-800', icon: AlertTriangle, label: 'Critical' },
  overstock: { color: 'bg-blue-100 text-blue-800', icon: TrendingUp, label: 'Overstock' }
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showItemDetails, setShowItemDetails] = useState(false)

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusConfig = (status: string) => statusConfig[status as keyof typeof statusConfig]
  
  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100)
  }

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowItemDetails(true)
  }

  const handleRestock = (itemId: string) => {
    console.log(`Restocking item: ${itemId}`)
  }

  const handleExportInventory = () => {
    console.log('Exporting inventory to CSV/Excel')
  }

  const categories = ['all', 'Electronics', 'Accessories', 'Clothing', 'Home & Garden']

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
              <p className="text-gray-600 mt-1">Monitor and manage stock levels across all products</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportInventory}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
              <UserDropdown />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">287</p>
                  <p className="text-xs text-green-600 mt-1">+12 new this week</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
                  <p className="text-xs text-yellow-600 mt-1">Reorder needed</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Items</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                  <p className="text-xs text-red-600 mt-1">Immediate action</p>
                </div>
                <div className="p-3 rounded-lg bg-red-50">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₱893.4K</p>
                  <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="optimal">Optimal</option>
                  <option value="low">Low Stock</option>
                  <option value="critical">Critical</option>
                  <option value="overstock">Overstock</option>
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

          {/* Inventory Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Restocked
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => {
                    const statusInfo = getStatusConfig(item.status)
                    const stockPercentage = getStockPercentage(item.currentStock, item.maxStock)
                    const StatusIcon = statusInfo.icon
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                            <div className="text-xs text-gray-400">{item.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {item.currentStock} / {item.maxStock}
                                </span>
                                <span className="text-xs text-gray-500">{stockPercentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    item.status === 'critical' ? 'bg-red-500' :
                                    item.status === 'low' ? 'bg-yellow-500' :
                                    item.status === 'overstock' ? 'bg-blue-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Min: {item.minStock} | Reorder at: {item.reorderPoint}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₱{item.totalValue.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">@ ₱{item.unitPrice.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.lastRestocked}</div>
                          <div className="text-sm text-gray-500">{item.daysSinceRestock} days ago</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewItem(item)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            {(item.status === 'low' || item.status === 'critical') && (
                              <button
                                onClick={() => handleRestock(item.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Truck className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Item Details Modal */}
          {showItemDetails && selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Inventory Details</h2>
                  <button
                    onClick={() => setShowItemDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <AlertTriangle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedItem.productName}</h3>
                    <p className="text-gray-500">SKU: {selectedItem.sku}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(selectedItem.status).color}`}>
                      {getStatusConfig(selectedItem.status).label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedItem.currentStock} units</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Stock Range</p>
                      <p className="text-gray-900">{selectedItem.minStock} - {selectedItem.maxStock} units</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Unit Price</p>
                      <p className="text-gray-900">₱{selectedItem.unitPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Value</p>
                      <p className="text-lg font-semibold text-gray-900">₱{selectedItem.totalValue.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supplier</p>
                      <p className="text-gray-900">{selectedItem.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{selectedItem.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Restocked</p>
                      <p className="text-gray-900">{selectedItem.lastRestocked}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Days Since Restock</p>
                      <p className="text-gray-900">{selectedItem.daysSinceRestock} days</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Stock Level Progress</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Current Stock</span>
                      <span className="text-sm font-medium text-gray-900">
                        {getStockPercentage(selectedItem.currentStock, selectedItem.maxStock)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          selectedItem.status === 'critical' ? 'bg-red-500' :
                          selectedItem.status === 'low' ? 'bg-yellow-500' :
                          selectedItem.status === 'overstock' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(getStockPercentage(selectedItem.currentStock, selectedItem.maxStock), 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    {(selectedItem.status === 'low' || selectedItem.status === 'critical') && (
                      <button
                        onClick={() => handleRestock(selectedItem.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Request Restock</span>
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Edit Item
                    </button>
                    <button
                      onClick={() => setShowItemDetails(false)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
