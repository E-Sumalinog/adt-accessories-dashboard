// Real data management system
export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  orderDate: string
  deliveryDate?: string
  items: OrderItem[]
  paymentMethod: string
  shippingAddress: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  joinDate: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'vip'
  lastOrderDate: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
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
  imageUrl?: string
  supplier: string
  location: string
  createdAt: string
  updatedAt: string
}

// localStorage persistence functions
const STORAGE_KEYS = {
  ORDERS: 'orderflow_orders',
  CUSTOMERS: 'orderflow_customers',
  PRODUCTS: 'orderflow_products'
}

// Initial real data
const initialOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Juan Santos',
    customerEmail: 'juan.santos@email.com',
    customerPhone: '+63 912 345 6789',
    status: 'delivered',
    totalAmount: 3450.00,
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    items: [
      {
        id: '1-1',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        quantity: 2,
        unitPrice: 1250.00,
        totalPrice: 2500.00
      },
      {
        id: '1-2',
        productId: '4',
        productName: 'USB-C Hub',
        quantity: 1,
        unitPrice: 599.00,
        totalPrice: 599.00
      }
    ],
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Makati Ave, Makati City, Metro Manila',
    notes: 'Customer requested express delivery',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Maria Reyes',
    customerEmail: 'maria.reyes@email.com',
    customerPhone: '+63 923 456 7890',
    status: 'processing',
    totalAmount: 8999.00,
    orderDate: '2024-01-16',
    items: [
      {
        id: '2-1',
        productId: '2',
        productName: 'Smart Watch Pro',
        quantity: 1,
        unitPrice: 8999.00,
        totalPrice: 8999.00
      }
    ],
    paymentMethod: 'GCash',
    shippingAddress: '456 Quezon Blvd, Quezon City, Metro Manila',
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos.mendoza@email.com',
    customerPhone: '+63 934 567 8901',
    status: 'shipped',
    totalAmount: 450.75,
    orderDate: '2024-01-17',
    deliveryDate: '2024-01-20',
    items: [
      {
        id: '3-1',
        productId: '5',
        productName: 'Wireless Mouse',
        quantity: 1,
        unitPrice: 399.00,
        totalPrice: 399.00
      },
      {
        id: '3-2',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        quantity: 1,
        unitPrice: 1250.00,
        totalPrice: 1250.00
      }
    ],
    paymentMethod: 'Bank Transfer',
    shippingAddress: '789 Ortigas Ave, Pasig City, Metro Manila',
    createdAt: '2024-01-17T11:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  }
]

// Helper functions for localStorage
const saveToStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

const loadFromStorage = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return defaultValue
    }
  }
  return defaultValue
}

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'Juan Santos',
    email: 'juan.santos@email.com',
    phone: '+63 912 345 6789',
    address: '123 Makati Ave',
    city: 'Makati City',
    country: 'Philippines',
    joinDate: '2023-01-15',
    totalOrders: 12,
    totalSpent: 3450.00,
    status: 'vip',
    lastOrderDate: '2024-01-15',
    notes: 'Premium customer, always pays on time',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Reyes',
    email: 'maria.reyes@email.com',
    phone: '+63 923 456 7890',
    address: '456 Quezon Blvd',
    city: 'Quezon City',
    country: 'Philippines',
    joinDate: '2023-03-22',
    totalOrders: 8,
    totalSpent: 8999.00,
    status: 'active',
    lastOrderDate: '2024-01-16',
    createdAt: '2023-03-22T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '3',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+63 934 567 8901',
    address: '789 Ortigas Ave',
    city: 'Pasig City',
    country: 'Philippines',
    joinDate: '2023-06-10',
    totalOrders: 5,
    totalSpent: 450.75,
    status: 'active',
    lastOrderDate: '2024-01-17',
    createdAt: '2023-06-10T11:15:00Z',
    updatedAt: '2024-01-17T11:15:00Z'
  }
]

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    price: 1250.00,
    stock: 45,
    minStock: 10,
    maxStock: 100,
    status: 'active',
    description: 'Premium wireless headphones with noise cancellation',
    supplier: 'Tech Supplies Inc.',
    location: 'Warehouse A - Shelf 12',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    sku: 'SWP-002',
    category: 'Electronics',
    price: 8999.00,
    stock: 12,
    minStock: 5,
    maxStock: 50,
    status: 'active',
    description: 'Advanced smartwatch with health tracking features',
    supplier: 'Smart Tech Co.',
    location: 'Warehouse B - Shelf 5',
    createdAt: '2024-01-05T09:30:00Z',
    updatedAt: '2024-01-17T16:45:00Z'
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    sku: 'LBB-003',
    category: 'Accessories',
    price: 899.00,
    stock: 0,
    minStock: 10,
    maxStock: 50,
    status: 'out_of_stock',
    description: 'Durable backpack with laptop compartment',
    supplier: 'Bag Manufacturers Ltd.',
    location: 'Warehouse A - Shelf 8',
    createdAt: '2024-01-10T11:15:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '4',
    name: 'USB-C Hub',
    sku: 'UCH-004',
    category: 'Accessories',
    price: 599.00,
    stock: 78,
    minStock: 15,
    maxStock: 100,
    status: 'active',
    description: 'Multi-port USB-C hub with 4K HDMI output',
    supplier: 'Connectivity Solutions',
    location: 'Warehouse B - Shelf 15',
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    sku: 'WMO-005',
    category: 'Electronics',
    price: 399.00,
    stock: 156,
    minStock: 25,
    maxStock: 200,
    status: 'active',
    description: 'Ergonomic wireless mouse with precision tracking',
    supplier: 'Peripheral Products Inc.',
    location: 'Warehouse A - Shelf 20',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-17T11:15:00Z'
  }
]

// Initialize data from localStorage or use initial data
let orders: Order[] = loadFromStorage(STORAGE_KEYS.ORDERS, initialOrders)
let customers: Customer[] = loadFromStorage(STORAGE_KEYS.CUSTOMERS, initialCustomers)
let products: Product[] = loadFromStorage(STORAGE_KEYS.PRODUCTS, initialProducts)

// Order management functions
export const orderService = {
  getAllOrders: (): Order[] => [...orders],
  
  getOrderById: (id: string): Order | undefined => orders.find(order => order.id === id),
  
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    orders.push(newOrder)
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
    
    // Update customer stats
    const customer = customers.find(c => c.email === orderData.customerEmail)
    if (customer) {
      customer.totalOrders += 1
      customer.totalSpent += orderData.totalAmount
      customer.lastOrderDate = orderData.orderDate
      customer.updatedAt = new Date().toISOString()
      saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    }
    
    // Update product stock
    orderData.items.forEach(item => {
      const product = products.find(p => p.id === item.productId)
      if (product) {
        product.stock -= item.quantity
        product.updatedAt = new Date().toISOString()
        if (product.stock === 0) {
          product.status = 'out_of_stock'
        } else if (product.stock < product.minStock) {
          // Keep active but will show as low stock
        }
      }
    })
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
    
    return newOrder
  },
  
  updateOrder: (id: string, updates: Partial<Order>): Order | null => {
    const index = orders.findIndex(order => order.id === id)
    if (index === -1) return null
    
    orders[index] = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
    return orders[index]
  },
  
  deleteOrder: (id: string): boolean => {
    const index = orders.findIndex(order => order.id === id)
    if (index === -1) return false
    
    const order = orders[index]
    
    // Restore product stock
    order.items.forEach(item => {
      const product = products.find(p => p.id === item.productId)
      if (product) {
        product.stock += item.quantity
        product.updatedAt = new Date().toISOString()
        if (product.stock > 0 && product.status === 'out_of_stock') {
          product.status = 'active'
        }
      }
    })
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
    
    // Update customer stats
    const customer = customers.find(c => c.email === order.customerEmail)
    if (customer) {
      customer.totalOrders = Math.max(0, customer.totalOrders - 1)
      customer.totalSpent = Math.max(0, customer.totalSpent - order.totalAmount)
      customer.updatedAt = new Date().toISOString()
      saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    }
    
    orders.splice(index, 1)
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
    return true
  },
  
  updateOrderStatus: (id: string, status: Order['status']): Order | null => {
    return orderService.updateOrder(id, { status })
  }
}

// Customer management functions
export const customerService = {
  getAllCustomers: (): Customer[] => [...customers],
  
  getCustomerById: (id: string): Customer | undefined => customers.find(customer => customer.id === id),
  
  createCustomer: (customerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'createdAt' | 'updatedAt'>): Customer => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    customers.push(newCustomer)
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    return newCustomer
  },
  
  updateCustomer: (id: string, updates: Partial<Customer>): Customer | null => {
    const index = customers.findIndex(customer => customer.id === id)
    if (index === -1) return null
    
    customers[index] = {
      ...customers[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    return customers[index]
  },
  
  deleteCustomer: (id: string): boolean => {
    const index = customers.findIndex(customer => customer.id === id)
    if (index === -1) return false
    
    customers.splice(index, 1)
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
    return true
  }
}

// Product management functions
export const productService = {
  getAllProducts: (): Product[] => [...products],
  
  getProductById: (id: string): Product | undefined => products.find(product => product.id === id),
  
  createProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    products.push(newProduct)
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
    return newProduct
  },
  
  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const index = products.findIndex(product => product.id === id)
    if (index === -1) return null
    
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    // Update status based on stock
    if (updates.stock !== undefined) {
      if (updates.stock === 0) {
        products[index].status = 'out_of_stock'
      } else if (products[index].status === 'out_of_stock' && updates.stock > 0) {
        products[index].status = 'active'
      }
    }
    
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
    return products[index]
  },
  
  deleteProduct: (id: string): boolean => {
    const index = products.findIndex(product => product.id === id)
    if (index === -1) return false
    
    products.splice(index, 1)
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
    return true
  },
  
  updateStock: (id: string, quantity: number, operation: 'add' | 'subtract' = 'add'): Product | null => {
    const product = productService.getProductById(id)
    if (!product) return null
    
    const newStock = operation === 'add' ? product.stock + quantity : Math.max(0, product.stock - quantity)
    
    return productService.updateProduct(id, { stock: newStock })
  }
}

// Statistics functions
export const statsService = {
  getOrderStats: () => {
    const allOrders = orderService.getAllOrders()
    return {
      total: allOrders.length,
      pending: allOrders.filter(o => o.status === 'pending').length,
      processing: allOrders.filter(o => o.status === 'processing').length,
      shipped: allOrders.filter(o => o.status === 'shipped').length,
      delivered: allOrders.filter(o => o.status === 'delivered').length,
      cancelled: allOrders.filter(o => o.status === 'cancelled').length,
      totalRevenue: allOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    }
  },
  
  getCustomerStats: () => {
    const allCustomers = customerService.getAllCustomers()
    return {
      total: allCustomers.length,
      active: allCustomers.filter(c => c.status === 'active').length,
      inactive: allCustomers.filter(c => c.status === 'inactive').length,
      vip: allCustomers.filter(c => c.status === 'vip').length,
      totalSpent: allCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0),
      avgOrderValue: allCustomers.length > 0 
        ? allCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0) / allCustomers.reduce((sum, customer) => sum + customer.totalOrders, 0)
        : 0
    }
  },
  
  getProductStats: () => {
    const allProducts = productService.getAllProducts()
    return {
      total: allProducts.length,
      active: allProducts.filter(p => p.status === 'active').length,
      inactive: allProducts.filter(p => p.status === 'inactive').length,
      outOfStock: allProducts.filter(p => p.status === 'out_of_stock').length,
      lowStock: allProducts.filter(p => p.stock < p.minStock && p.stock > 0).length,
      totalValue: allProducts.reduce((sum, product) => sum + (product.stock * product.price), 0)
    }
  }
}
