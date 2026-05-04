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
  Trash2, 
  Tag,
  DollarSign,
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle,
  Headphones,
  Watch,
  Backpack,
  Usb,
  Mouse,
  Keyboard,
  Smartphone,
  Lamp
} from 'lucide-react'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  description: string
  imageUrl: string
  createdAt: string
  lastUpdated: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    price: 2499.00,
    stock: 45,
    status: 'active',
    description: 'Premium wireless headphones with noise cancellation',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTE4LjUgMTJjMC0xLjctMS4zLTMtMy0zcy0zIDEuMy0zIDNjMCAyLjIgMS4zIDQuMSAzIDQuMSAxLjctMS4zIDMtMyAzLTN6bS0xLjUgMEwxMiA3bC01IDVjMCAxLjctMS4zIDMtMyAzeiIvPgo8L3N2Zz4KPC9zdmc+',
    createdAt: '2024-01-01',
    lastUpdated: '2024-01-18'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    sku: 'SWP-002',
    category: 'Electronics',
    price: 8999.00,
    stock: 12,
    status: 'active',
    description: 'Advanced smartwatch with health tracking features',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRUFGMkZGIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNGQUY1RjYiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHJlY3QgeD0iNiIgeT0iNiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMjAiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4KPC9zdmc+',
    createdAt: '2024-01-05',
    lastUpdated: '2024-01-17'
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    sku: 'LBB-003',
    category: 'Accessories',
    price: 899.00,
    stock: 0,
    status: 'out_of_stock',
    description: 'Durable backpack with laptop compartment',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTEwIDE5djE0aDR2LTE0aC00em02IDBoLTR2MTRoNHYtMTR6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cjwvc3ZnPg==',
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-16'
  },
  {
    id: '4',
    name: 'USB-C Hub',
    sku: 'UCH-004',
    category: 'Accessories',
    price: 599.00,
    stock: 78,
    status: 'active',
    description: 'Multi-port USB-C hub with 4K HDMI output',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiM4QkQzRkYiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHJlY3QgeD0iNCIgeT0iOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjgiIHJ4PSIxIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjEyIiByPSIxIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMiIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo8L3N2Zz4=',
    createdAt: '2024-01-12',
    lastUpdated: '2024-01-18'
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    sku: 'WMO-005',
    category: 'Electronics',
    price: 399.00,
    stock: 156,
    status: 'active',
    description: 'Ergonomic wireless mouse with precision tracking',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTUgMTJjMC0zLjg3IDMuMTMtNyA3LTdzNyAzLjEzIDcgNy0zLjEzIDctNyA3LTctNy0zLjEzLTctNyA3eiIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo8L3N2Zz4=',
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-17'
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    sku: 'MKB-006',
    category: 'Electronics',
    price: 1299.00,
    stock: 23,
    status: 'active',
    description: 'RGB mechanical keyboard with blue switches',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHJlY3QgeD0iNCIgeT0iOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjgiIHJ4PSIxIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjEyIiByPSIxIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMiIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxjaXJjbGUgY3g9IjE0IiBjeT0iMTIiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8Y2lyY2xlIGN4PSIxNyIgY3k9IjEyIiByPSIxIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cjwvc3ZnPg==',
    createdAt: '2024-01-18',
    lastUpdated: '2024-01-20'
  },
  {
    id: '7',
    name: 'Phone Case',
    sku: 'PHC-007',
    category: 'Accessories',
    price: 199.00,
    stock: 89,
    status: 'active',
    description: 'Protective phone case with kickstand',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHJlY3QgeD0iNiIgeT0iMiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjIwIiByeD0iMiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo8L3N2Zz4=',
    createdAt: '2024-01-20',
    lastUpdated: '2024-01-22'
  },
  {
    id: '8',
    name: 'Desk Lamp',
    sku: 'DKL-008',
    category: 'Home & Garden',
    price: 799.00,
    stock: 34,
    status: 'active',
    description: 'LED desk lamp with adjustable brightness',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTEyIDJjMC41IDAgMSAuNSAxIDF2MTZjMCAuNS0uNSAxLTEgMWgtMGMtLjUgMC0xLS41LTEtMVYzYzAtLjUuNS0xIDEtMXptNiA2aC0xdi0xaC0xdjFoLTF2LTFoLTF2MWgtMXYtMWgtMXYxaC0xdi0xaC0xdi0xaC0xdjFoLTF2LTFoLTF2MWgtMXYtMWgtMXYxaC0xdi0xaC0xdi0xaC0xdi0xaC0xdjFoLTF2LTFoLTF2MWgtMXYtMWgtMXYxaC0xdi0xaC0xdi0xaC0xdi0xaC0xdjFoLTF2LTFoLTF2MWgtMXYtMWgtMXYxaC0xdi0xaC0xdi0xaC0xdi0xaC0xdjFoLTF2LTFoLTF2MWgtMXYtMWgtMXYxaC0xdi0xaC0xdi0xaC0xdi0xaC0xdi0xaC0xdjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8L3N2Zz4KPC9zdmc+',
    createdAt: '2024-01-22',
    lastUpdated: '2024-01-25'
  }
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  out_of_stock: 'bg-red-100 text-red-800'
}

const stockLevels = {
  high: { color: 'text-green-600', label: 'In Stock' },
  medium: { color: 'text-yellow-600', label: 'Low Stock' },
  low: { color: 'text-red-600', label: 'Critical' }
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => statusColors[status as keyof typeof statusColors]
  
  const getStockLevel = (stock: number) => {
    if (stock === 0) return stockLevels.low
    if (stock < 20) return stockLevels.medium
    return stockLevels.high
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowProductDetails(true)
  }

  const handleExportProducts = () => {
    console.log('Exporting products to CSV/Excel')
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
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportProducts}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
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
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
                  <p className="text-xs text-green-600 mt-1">+5 new this month</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">76</p>
                  <p className="text-xs text-green-600 mt-1">85.4% of catalog</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                  <p className="text-xs text-yellow-600 mt-1">Reorder needed</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₱245.8K</p>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50">
                  <DollarSign className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search products..."
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out_of_stock">Out of Stock</option>
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stockLevel = getStockLevel(product.stock)
              return (
                <div key={product.id} className="card group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className={`w-full h-48 rounded-t-lg flex items-center justify-center ${
                      product.id === '1' ? 'bg-blue-100' :
                      product.id === '2' ? 'bg-pink-100' :
                      product.id === '3' ? 'bg-gray-100' :
                      product.id === '4' ? 'bg-blue-100' :
                      product.id === '5' ? 'bg-gray-100' :
                      product.id === '6' ? 'bg-blue-100' :
                      product.id === '7' ? 'bg-gray-100' :
                      'bg-yellow-100'
                    }`}>
                      {
                        product.id === '1' ? <Headphones className="w-16 h-16 text-blue-600" /> :
                        product.id === '2' ? <Watch className="w-16 h-16 text-pink-600" /> :
                        product.id === '3' ? <Backpack className="w-16 h-16 text-gray-600" /> :
                        product.id === '4' ? <Usb className="w-16 h-16 text-blue-600" /> :
                        product.id === '5' ? <Mouse className="w-16 h-16 text-gray-600" /> :
                        product.id === '6' ? <Keyboard className="w-16 h-16 text-blue-600" /> :
                        product.id === '7' ? <Smartphone className="w-16 h-16 text-gray-600" /> :
                        <Lamp className="w-16 h-16 text-yellow-600" />
                      }
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">₱{product.price.toFixed(2)}</span>
                      <span className={`text-sm font-medium ${stockLevel.color}`}>
                        {stockLevel.label}: {product.stock}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="p-1 text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Product Details Modal */}
          {showProductDetails && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
                  <button
                    onClick={() => setShowProductDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <AlertCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className={`w-full h-64 rounded-lg flex items-center justify-center ${
                      selectedProduct.id === '1' ? 'bg-blue-100' :
                      selectedProduct.id === '2' ? 'bg-pink-100' :
                      selectedProduct.id === '3' ? 'bg-gray-100' :
                      selectedProduct.id === '4' ? 'bg-blue-100' :
                      selectedProduct.id === '5' ? 'bg-gray-100' :
                      selectedProduct.id === '6' ? 'bg-blue-100' :
                      selectedProduct.id === '7' ? 'bg-gray-100' :
                      'bg-yellow-100'
                    }`}>
                      {
                        selectedProduct.id === '1' ? <Headphones className="w-24 h-24 text-blue-600" /> :
                        selectedProduct.id === '2' ? <Watch className="w-24 h-24 text-pink-600" /> :
                        selectedProduct.id === '3' ? <Backpack className="w-24 h-24 text-gray-600" /> :
                        selectedProduct.id === '4' ? <Usb className="w-24 h-24 text-blue-600" /> :
                        selectedProduct.id === '5' ? <Mouse className="w-24 h-24 text-gray-600" /> :
                        selectedProduct.id === '6' ? <Keyboard className="w-24 h-24 text-blue-600" /> :
                        selectedProduct.id === '7' ? <Smartphone className="w-24 h-24 text-gray-600" /> :
                        <Lamp className="w-24 h-24 text-yellow-600" />
                      }
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                      <p className="text-gray-500">SKU: {selectedProduct.sku}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedProduct.status)}`}>
                        {selectedProduct.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {selectedProduct.category}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-gray-900">₱{selectedProduct.price.toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Stock Level</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-semibold ${getStockLevel(selectedProduct.stock).color}`}>
                          {selectedProduct.stock} units
                        </span>
                        <span className="text-sm text-gray-500">
                          ({getStockLevel(selectedProduct.stock).label})
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="text-gray-900">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Created</p>
                        <p className="text-gray-900">{selectedProduct.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Updated</p>
                        <p className="text-gray-900">{selectedProduct.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Edit Product
                  </button>
                  <button
                    onClick={() => setShowProductDetails(false)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Close
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
