'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Theme, ThemeMode, getTheme, getCSSVariables } from '@/lib/theme'

interface ThemeContextType {
  theme: Theme
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultMode?: ThemeMode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultMode = 'light' 
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode)
  const [theme, setTheme] = useState<Theme>(getTheme(defaultMode))

  useEffect(() => {
    // Load theme preference from localStorage
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode
    if (savedMode && ['light', 'dark'].includes(savedMode)) {
      setMode(savedMode)
      setTheme(getTheme(savedMode))
    }

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme-mode')) {
        const newMode = e.matches ? 'dark' : 'light'
        setMode(newMode)
        setTheme(getTheme(newMode))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement
    const cssVars = getCSSVariables(theme)
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Update data-theme attribute
    root.setAttribute('data-theme', mode)
    
    // Update body class for dark mode
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme, mode])

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode)
    setTheme(getTheme(newMode))
    localStorage.setItem('theme-mode', newMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
