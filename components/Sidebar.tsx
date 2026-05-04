'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Home, 
  Grid3X3, 
  Package, 
  FileText, 
  BarChart3, 
  User, 
  Settings,
  PackageOpen,
  Users,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  description?: string
}

const menuItems: MenuItem[] = [
  { 
    id: 'home', 
    label: 'Dashboard', 
    icon: Home, 
    description: 'Overview and metrics'
  },
  { 
    id: 'orders', 
    label: 'Orders', 
    icon: Package, 
    badge: '3',
    description: 'Manage orders'
  },
  { 
    id: 'customers', 
    label: 'Customers', 
    icon: Users, 
    badge: '156',
    description: 'Customer management'
  },
  { 
    id: 'products', 
    label: 'Products', 
    icon: Grid3X3, 
    badge: '5',
    description: 'Product catalog'
  },
  { 
    id: 'inventory', 
    label: 'Inventory', 
    icon: PackageOpen, 
    badge: '12',
    description: 'Stock management'
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: TrendingUp, 
    description: 'Business insights'
  },
  { 
    id: 'reports', 
    label: 'Reports', 
    icon: FileSpreadsheet, 
    description: 'Generate reports'
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: Settings, 
    description: 'System settings'
  },
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('home')
  const router = useRouter()
  const pathname = usePathname()
  const { mode } = useTheme()

  // Set active item based on current path
  useEffect(() => {
    const currentPath = pathname.replace('/', '') || 'home'
    setActiveItem(currentPath)
  }, [pathname])

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId)
    switch (itemId) {
      case 'home':
        router.push('/')
        break
      case 'orders':
        router.push('/orders')
        break
      case 'customers':
        router.push('/customers')
        break
      case 'products':
        router.push('/products')
        break
      case 'inventory':
        router.push('/inventory')
        break
      case 'analytics':
        router.push('/analytics')
        break
      case 'reports':
        router.push('/reports')
        break
      case 'settings':
        router.push('/settings')
        break
      default:
        console.log(`Navigation to ${itemId} not implemented yet`)
    }
  }

  return (
    <div className="sidebar w-64 h-screen fixed left-0 top-0 z-40 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ADT ACCESSORIES</h1>
            <p className="text-xs text-gray-500">Professional Accessories</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          
          return (
            <div
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''} cursor-pointer`}
              onClick={() => handleNavigation(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="badge-primary">
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
