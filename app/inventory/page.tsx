'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { toast } from 'sonner'
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
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  maxStock: number
  price: number
  status: 'active' | 'inactive' | 'out_of_stock'
  supplier: string
  location: string
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  optimal: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Optimal' },
  low: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle, label: 'Low Stock' },
  critical: { color: 'bg-red-100 text-red-800', icon: AlertTriangle, label: 'Critical' },
  overstock: { color: 'bg-blue-100 text-blue-800', icon: TrendingUp, label: 'Overstock' }
}

const getInventoryStatus = (item: InventoryItem): 'optimal' | 'low' | 'critical' | 'overstock' => {
  if (item.stock === 0) return 'critical'
  if (item.stock < item.minStock) return 'low'
  if (item.stock > item.maxStock) return 'overstock'
  return 'optimal'
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [showRestockModal, setShowRestockModal] = useState(false)

  useEffect(() => {
    loadInventory()
  }, [])

  const loadInventory = async () => {
    try {
      const res = await fetch('/api/products')
      if (!res.ok) {
        console.error('API ERROR:', await res.text())
        setInventoryItems([])
        return
      }
      const data = await res.json()
      setInventoryItems(data)
    } catch (err) {
      console.error('FETCH FAILED:', err)
      setInventoryItems([])
    }
  }

  const handleRestock = async (itemId: string, quantity: number) => {
    try {
      const item = inventoryItems.find(i => i.id === itemId)
      if (!item) return

      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: itemId,
          name: item.name,
          sku: item.sku,
          category: item.category,
          price: item.price,
          stock: Number(item.stock) + quantity,
          minStock: item.minStock,
          maxStock: item.maxStock,
          status: item.status,
          location: item.location,
          supplier: item.supplier,
          description: '',
          imageUrl: ''
        })
      })
      if (!res.ok) throw new Error('Failed to restock')
      await loadInventory()
      setShowRestockModal(false)
      toast.success('Item restocked successfully')
    } catch (err) {
      console.error('RESTOCK FAILED:', err)
      toast.error('Failed to restock item')
    }
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const itemStatus = getInventoryStatus(item)
    const matchesStatus = selectedStatus === 'all' || itemStatus === selectedStatus
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

  const handleExportInventory = () => {
    const csvContent = [
      ['SKU', 'Name', 'Category', 'Stock', 'Min Stock', 'Max Stock', 'Price', 'Supplier', 'Location'],
      ...inventoryItems.map(item => [
        item.sku,
        item.name,
        item.category,
        item.stock.toString(),
        item.minStock.toString(),
        item.maxStock.toString(),
        item.price.toString(),
        item.supplier,
        item.location
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">{inventoryItems.length}</p>
                  <p className="text-xs text-green-600 mt-1">All products</p>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">{inventoryItems.filter(i => i.stock < i.minStock).length}</p>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">{inventoryItems.filter(i => i.stock === 0).length}</p>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">₱{inventoryItems.reduce((sum, i) => sum + (i.price * i.stock), 0).toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">Inventory value</p>
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => {
                    const inventoryStatus = getInventoryStatus(item)
                    const statusInfo = getStatusConfig(inventoryStatus)
                    const stockPercentage = getStockPercentage(item.stock, item.maxStock)
                    const StatusIcon = statusInfo.icon
                    const totalValue = item.price * item.stock

                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                            <div className="text-xs text-gray-400">{item.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {item.stock} / {item.maxStock}
                                </span>
                                <span className="text-xs text-gray-500">{stockPercentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    inventoryStatus === 'critical' ? 'bg-red-500' :
                                    inventoryStatus === 'low' ? 'bg-yellow-500' :
                                    inventoryStatus === 'overstock' ? 'bg-blue-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Min: {item.minStock}
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
                          <div className="text-sm font-medium text-gray-900">₱{totalValue.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">@ ₱{Number(item.price).toFixed(2)}</div>
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
                            {(inventoryStatus === 'low' || inventoryStatus === 'critical') && (
                              <button
                                onClick={() => {
                                  setSelectedItem(item)
                                  setShowRestockModal(true)
                                }}
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
                    <h3 className="text-lg font-semibold text-gray-900">{selectedItem.name}</h3>
                    <p className="text-gray-500">SKU: {selectedItem.sku}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusConfig(getInventoryStatus(selectedItem)).color}`}>
                      {getStatusConfig(getInventoryStatus(selectedItem)).label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedItem.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Stock Range</p>
                      <p className="text-gray-900">{selectedItem.minStock} - {selectedItem.maxStock} units</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Unit Price</p>
                      <p className="text-gray-900">₱{Number(selectedItem.price).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Value</p>
                      <p className="text-lg font-semibold text-gray-900">₱{(Number(selectedItem.price) * Number(selectedItem.stock)).toFixed(2)}</p>
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

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Stock Level Progress</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Current Stock</span>
                      <span className="text-sm font-medium text-gray-900">
                        {getStockPercentage(selectedItem.stock, selectedItem.maxStock)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          getInventoryStatus(selectedItem) === 'critical' ? 'bg-red-500' :
                          getInventoryStatus(selectedItem) === 'low' ? 'bg-yellow-500' :
                          getInventoryStatus(selectedItem) === 'overstock' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(getStockPercentage(selectedItem.stock, selectedItem.maxStock), 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    {(getInventoryStatus(selectedItem) === 'low' || getInventoryStatus(selectedItem) === 'critical') && (
                      <button
                        onClick={() => {
                          setShowItemDetails(false)
                          setShowRestockModal(true)
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Request Restock</span>
                      </button>
                    )}
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

          {/* Restock Modal */}
          {showRestockModal && selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Restock Item</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Product</p>
                    <p className="text-gray-900">{selectedItem.name}</p>
                    <p className="text-sm text-gray-500">Current Stock: {selectedItem.stock}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity to Add
                    </label>
                    <input
                      type="number"
                      min="1"
                      defaultValue={selectedItem.maxStock - selectedItem.stock}
                      id="restockQuantity"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowRestockModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const quantityInput = document.getElementById('restockQuantity') as HTMLInputElement
                        const quantity = parseInt(quantityInput?.value || '0')
                        if (quantity > 0) {
                          handleRestock(selectedItem.id, quantity)
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Restock
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
