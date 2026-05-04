'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe,
  CreditCard,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

interface SettingSection {
  id: string
  title: string
  icon: React.ElementType
  color: string
}

const settingSections: SettingSection[] = [
  { id: 'general', title: 'General', icon: Settings, color: 'bg-blue-50 text-blue-600' },
  { id: 'profile', title: 'Profile', icon: User, color: 'bg-green-50 text-green-600' },
  { id: 'notifications', title: 'Notifications', icon: Bell, color: 'bg-purple-50 text-purple-600' },
  { id: 'security', title: 'Security', icon: Shield, color: 'bg-red-50 text-red-600' },
  { id: 'billing', title: 'Billing', icon: CreditCard, color: 'bg-orange-50 text-orange-600' },
  { id: 'integrations', title: 'Integrations', icon: Globe, color: 'bg-indigo-50 text-indigo-600' }
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSave = () => {
    setIsSaving(true)
    setSaveMessage('')
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    }, 1500)
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />
      case 'profile':
        return <ProfileSettings />
      case 'notifications':
        return <NotificationSettings />
      case 'security':
        return <SecuritySettings />
      case 'billing':
        return <BillingSettings />
      case 'integrations':
        return <IntegrationSettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your system preferences and configuration</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              <UserDropdown />
            </div>
          </div>
          {saveMessage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{saveMessage}</p>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-4">
                <nav className="space-y-1">
                  {settingSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded ${section.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{section.title}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="card p-6">
                {renderSectionContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function GeneralSettings() {
  const [settings, setSettings] = useState({
    companyName: 'ADT Accessories',
    companyEmail: 'info@orderflow.com',
    companyPhone: '+63 2 8123 4567',
    companyAddress: 'Makati City, Metro Manila, Philippines',
    timezone: 'Asia/Manila',
    language: 'en',
    currency: 'PHP',
    dateFormat: 'MM/DD/YYYY',
    weekStartsOn: 'monday'
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => setSettings({...settings, companyName: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Email
          </label>
          <input
            type="email"
            value={settings.companyEmail}
            onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Phone
          </label>
          <input
            type="tel"
            value={settings.companyPhone}
            onChange={(e) => setSettings({...settings, companyPhone: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Address
          </label>
          <input
            type="text"
            value={settings.companyAddress}
            onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Asia/Manila">Asia/Manila (UTC+8)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              <option value="UTC">UTC (UTC+0)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="fil">Filipino</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({...settings, currency: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="PHP">Philippine Peso (₱)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
      
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold">
          JD
        </div>
        <div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Change Avatar
          </button>
          <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="John"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="john.doe@orderflow.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+63 912 345 6789"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    lowStockAlerts: true,
    customerMessages: true,
    weeklyReports: false,
    marketingEmails: false
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({...notifications, [key]: !notifications[key]})
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
        
        {[
          { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
          { key: 'pushNotifications', label: 'Push Notifications', icon: Bell },
          { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone }
        ].map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">Receive notifications via {label.toLowerCase()}</p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification(key as keyof typeof notifications)}
              className="text-gray-400 hover:text-gray-600"
            >
              {notifications[key as keyof typeof notifications] ? (
                <ToggleRight className="w-8 h-8 text-primary-600" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Types</h3>
        
        {[
          { key: 'orderUpdates', label: 'Order Updates', description: 'New orders, status changes' },
          { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'When items need restocking' },
          { key: 'customerMessages', label: 'Customer Messages', description: 'New customer inquiries' },
          { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly performance summaries' },
          { key: 'marketingEmails', label: 'Marketing Emails', description: 'Product updates and promotions' }
        ].map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{label}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
              onClick={() => toggleNotification(key as keyof typeof notifications)}
              className="text-gray-400 hover:text-gray-600"
            >
              {notifications[key as keyof typeof notifications] ? (
                <ToggleRight className="w-8 h-8 text-primary-600" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Update Password
            </button>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Enable 2FA
          </button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Active Sessions</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-900">Chrome on Windows</p>
                <p className="text-xs text-gray-500">Makati City • Last active 2 hours ago</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium text-gray-900">Safari on iPhone</p>
                <p className="text-xs text-gray-500">Quezon City • Last active 1 day ago</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800">Revoke</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Billing Settings</h2>
      
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">Professional Plan</p>
            <p className="text-gray-600">₱2,999/month</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
            <p className="text-sm text-gray-500">Expires 12/24</p>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-800">Update</button>
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Billing History</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Professional Plan - January 2024</p>
              <p className="text-xs text-gray-500">Paid on Jan 1, 2024</p>
            </div>
            <p className="text-sm font-medium text-gray-900">₱2,999</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Professional Plan - December 2023</p>
              <p className="text-xs text-gray-500">Paid on Dec 1, 2023</p>
            </div>
            <p className="text-sm font-medium text-gray-900">₱2,999</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Integrations</h2>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Email Service</p>
                <p className="text-sm text-gray-500">Send automated emails to customers</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Connected
            </button>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Payment Gateway</p>
                <p className="text-sm text-gray-500">Process online payments</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Connected
            </button>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">SMS Service</p>
                <p className="text-sm text-gray-500">Send SMS notifications</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
