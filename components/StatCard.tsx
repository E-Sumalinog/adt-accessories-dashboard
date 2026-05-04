import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  color?: string
  onClick?: () => void
}

export default function StatCard({ title, value, icon: Icon, color = 'text-info-600', onClick }: StatCardProps) {
  const getBgColor = (textColor: string) => {
    if (textColor.includes('info')) return 'bg-info-50'
    if (textColor.includes('success')) return 'bg-success-50'
    if (textColor.includes('warning')) return 'bg-warning-50'
    if (textColor.includes('error')) return 'bg-error-50'
    if (textColor.includes('primary')) return 'bg-primary-50'
    if (textColor.includes('accent')) return 'bg-accent-50'
    return 'bg-gray-50'
  }

  return (
    <div 
      className="stat-card cursor-pointer hover:scale-105 transition-all duration-200 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${getBgColor(color)} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
