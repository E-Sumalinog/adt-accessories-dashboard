'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

interface NewsItem {
  id: string
  author: string
  avatar: string
  message: string
  time: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    author: 'Ali Connors',
    avatar: 'AC',
    message: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to grab coffee?',
    time: '2 hours ago',
    likes: 12,
    comments: 3,
    shares: 1,
    isLiked: false
  },
  {
    id: '2',
    author: 'Trevor Hansen',
    avatar: 'TH',
    message: 'The meeting has been rescheduled to 3 PM tomorrow. Please update your calendars.',
    time: '4 hours ago',
    likes: 8,
    comments: 2,
    shares: 0,
    isLiked: false
  },
  {
    id: '3',
    author: 'Sandra Adams',
    avatar: 'SA',
    message: 'Great presentation today! The client was very impressed with our proposal.',
    time: '6 hours ago',
    likes: 24,
    comments: 5,
    shares: 3,
    isLiked: true
  }
]

export default function Newsfeed() {
  const [items, setItems] = useState(newsItems)

  const handleLike = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1
        }
      }
      return item
    }))
  }

  const handleComment = (itemId: string) => {
    console.log(`Comment on item ${itemId}`)
    // You can add comment functionality here
  }

  const handleShare = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return { ...item, shares: item.shares + 1 }
      }
      return item
    }))
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Newsfeed</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                  {item.avatar}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.author}</p>
                <p className="text-sm text-gray-600 mt-1">{item.message}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                
                <div className="flex items-center space-x-4 mt-3">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center space-x-1 text-xs ${item.isLiked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600 transition-colors`}
                  >
                    <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                    <span>{item.likes}</span>
                  </button>
                  <button 
                    onClick={() => handleComment(item.id)}
                    className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{item.comments}</span>
                  </button>
                  <button 
                    onClick={() => handleShare(item.id)}
                    className="flex items-center space-x-1 text-xs text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{item.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
