'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import UserDropdown from '@/components/UserDropdown'
import { Code, Database, Globe, Smartphone, Filter, Search, ExternalLink, Github } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and inventory management.',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team features.',
    category: 'Mobile App',
    technologies: ['React Native', 'Firebase', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com',
    featured: true
  },
  {
    id: '3',
    title: 'Data Analytics Dashboard',
    description: 'Interactive dashboard for visualizing complex business metrics and KPIs.',
    category: 'Data Science',
    technologies: ['Python', 'D3.js', 'PostgreSQL', 'Flask'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    featured: false
  },
  {
    id: '4',
    title: 'AI Chatbot',
    description: 'Intelligent chatbot with natural language processing and machine learning.',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
    imageUrl: 'https://images.unsplash.com/photo-1531297483765-8028e23d3b1a?w=600&h=400&fit=crop',
    githubUrl: 'https://github.com/example',
    featured: false
  },
  {
    id: '5',
    title: 'Portfolio Website',
    description: 'Modern portfolio website with animations and responsive design.',
    category: 'Web Development',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: '6',
    title: 'Weather App',
    description: 'Real-time weather application with location tracking and forecasts.',
    category: 'Mobile App',
    technologies: ['React Native', 'Weather API', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1504608524845-5e0e58b8c819?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com',
    featured: false
  }
]

const categories = ['All', 'Web Development', 'Mobile App', 'Data Science', 'AI/ML']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const otherProjects = filteredProjects.filter(project => !project.featured)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development': return <Globe className="w-4 h-4" />
      case 'Mobile App': return <Smartphone className="w-4 h-4" />
      case 'Data Science': return <Database className="w-4 h-4" />
      case 'AI/ML': return <Code className="w-4 h-4" />
      default: return <Code className="w-4 h-4" />
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
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">Showcase of my work and contributions</p>
            </div>
            <UserDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map(project => (
                  <div key={project.id} className="card group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(project.category)}
                        <span className="text-sm text-gray-600">{project.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map(project => (
                  <div key={project.id} className="card group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(project.category)}
                        <span className="text-sm text-gray-600">{project.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
