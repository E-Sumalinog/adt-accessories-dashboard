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
  minStock: number
  maxStock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  description: string
  imageUrl: string
  supplier: string
  location: string
  createdAt: string
  updatedAt: string
}


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
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productStats, setProductStats] = useState({
    total: 0,
    active: 0,
    lowStock: 0,
    totalValue: 0
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products')
      if (!res.ok) {
        console.error('API ERROR:', await res.text())
        setProducts([])
        return
      }
      const data = await res.json()
      setProducts(data)
      updateStats(data)
    } catch (err) {
      console.error('FETCH FAILED:', err)
      setProducts([])
    }
  }

  const updateStats = (allProducts: Product[]) => {
    setProductStats({
      total: allProducts.length,
      active: allProducts.filter(p => p.status === 'active').length,
      lowStock: allProducts.filter(p => p.stock < 20).length,
      totalValue: allProducts.reduce((sum, p) => sum + (Number(p.price) * Number(p.stock)), 0)
    })
  }

  const handleCreateProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
      if (!res.ok) throw new Error('Failed to create product')
      await loadProducts()
      setShowCreateModal(false)
      toast.success('Product created successfully')
    } catch (err) {
      console.error('CREATE FAILED:', err)
      toast.error('Failed to create product')
    }
  }

  const handleEditProduct = async (product: Partial<Product>) => {
    if (!selectedProduct?.id) return
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedProduct.id, ...product })
      })
      if (!res.ok) throw new Error('Failed to update product')
      await loadProducts()
      setShowEditModal(false)
      toast.success('Product updated successfully')
    } catch (err) {
      console.error('UPDATE FAILED:', err)
      toast.error('Failed to update product')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!res.ok) throw new Error('Failed to delete product')
      await loadProducts()
      toast.success('Product deleted successfully')
    } catch (err) {
      console.error('DELETE FAILED:', err)
      toast.error('Failed to delete product')
    }
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
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">{productStats.total}</p>
                  <p className="text-xs text-green-600 mt-1">All products in catalog</p>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">{productStats.active}</p>
                  <p className="text-xs text-green-600 mt-1">{productStats.total > 0 ? `${((productStats.active / productStats.total) * 100).toFixed(1)}%` : '0%'} of catalog</p>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">{productStats.lowStock}</p>
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
                  <p className="text-2xl font-bold text-gray-900 mt-1">₱{productStats.totalValue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">Inventory value</p>
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
                      <span className="text-lg font-bold text-gray-900">₱{Number(product.price).toFixed(2)}</span>
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
                        <button
                          onClick={() => {
                            setSelectedProduct(product)
                            setShowEditModal(true)
                          }}
                          className="p-1 text-gray-600 hover:text-gray-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-red-600 hover:text-red-900"
                        >
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
                      <p className="text-2xl font-bold text-gray-900">₱{Number(selectedProduct.price).toFixed(2)}</p>
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
                        <p className="text-gray-900">{selectedProduct.updatedAt}</p>
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

      {showCreateModal && (
        <CreateProductModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateProduct} />
      )}

      {showEditModal && selectedProduct && (
        <EditProductModal product={selectedProduct!} onClose={() => setShowEditModal(false)} onUpdate={handleEditProduct} />
      )}
    </div>
  )
}

function CreateProductModal({ onClose, onCreate }: { onClose: () => void, onCreate: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    price: 0,
    stock: 0,
    minStock: 10,
    maxStock: 100,
    status: 'active' as 'active' | 'inactive' | 'out_of_stock',
    description: '',
    imageUrl: '',
    supplier: '',
    location: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    onCreate(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border rounded-lg px-3 py-2">
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                <input type="number" value={formData.minStock} onChange={(e) => setFormData({...formData, minStock: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                <input type="number" value={formData.maxStock} onChange={(e) => setFormData({...formData, maxStock: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive' | 'out_of_stock'})} className="w-full border rounded-lg px-3 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input type="text" value={formData.supplier} onChange={(e) => setFormData({...formData, supplier: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function EditProductModal({ product, onClose, onUpdate }: { product: Product, onClose: () => void, onUpdate: (product: Partial<Product>) => void }) {
  const [formData, setFormData] = useState({
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: product.price,
    stock: product.stock,
    minStock: product.minStock,
    maxStock: product.maxStock,
    status: product.status,
    description: product.description,
    imageUrl: product.imageUrl,
    supplier: product.supplier,
    location: product.location
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    onUpdate(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border rounded-lg px-3 py-2">
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                <input type="number" value={formData.minStock} onChange={(e) => setFormData({...formData, minStock: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                <input type="number" value={formData.maxStock} onChange={(e) => setFormData({...formData, maxStock: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive' | 'out_of_stock'})} className="w-full border rounded-lg px-3 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input type="text" value={formData.supplier} onChange={(e) => setFormData({...formData, supplier: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
