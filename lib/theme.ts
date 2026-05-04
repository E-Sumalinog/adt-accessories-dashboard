// Professional Theme System with Dark Mode Support

export interface Theme {
  name: string
  colors: {
    // Primary Colors - Professional Blue
    primary: Record<string, string>
    // Secondary Colors - Professional Gray
    secondary: Record<string, string>
    // Accent Colors
    success: Record<string, string>
    warning: Record<string, string>
    error: Record<string, string>
    info: Record<string, string>
  }
  
  // Semantic Colors
  semantic: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
    sidebar: {
      background: string
      foreground: string
      border: string
      item: {
        hover: string
        active: string
      }
    }
  }
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    secondary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    }
  },
  semantic: {
    background: '#ffffff',
    foreground: '#111827',
    card: '#ffffff',
    cardForeground: '#111827',
    popover: '#ffffff',
    popoverForeground: '#111827',
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    muted: '#f8fafc',
    mutedForeground: '#64748b',
    accent: '#f1f5f9',
    accentForeground: '#0f172a',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#e2e8f0',
    input: '#ffffff',
    ring: '#2563eb',
    sidebar: {
      background: '#ffffff',
      foreground: '#111827',
      border: '#e2e8f0',
      item: {
        hover: '#f8fafc',
        active: '#e2e8f0'
      }
    }
  }
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: {
      50: '#1e3a8a',
      100: '#1e40af',
      200: '#1d4ed8',
      300: '#2563eb',
      400: '#3b82f6',
      500: '#60a5fa',
      600: '#93c5fd',
      700: '#bfdbfe',
      800: '#dbeafe',
      900: '#eff6ff',
      950: '#f0f9ff'
    },
    secondary: {
      50: '#030712',
      100: '#111827',
      200: '#1f2937',
      300: '#374151',
      400: '#4b5563',
      500: '#6b7280',
      600: '#9ca3af',
      700: '#d1d5db',
      800: '#e5e7eb',
      900: '#f3f4f6',
      950: '#f9fafb'
    },
    success: {
      50: '#052e16',
      100: '#14532d',
      200: '#166534',
      300: '#15803d',
      400: '#16a34a',
      500: '#22c55e',
      600: '#4ade80',
      700: '#86efac',
      800: '#bbf7d0',
      900: '#dcfce7',
      950: '#f0fdf4'
    },
    warning: {
      50: '#451a03',
      100: '#78350f',
      200: '#92400e',
      300: '#b45309',
      400: '#d97706',
      500: '#f59e0b',
      600: '#fbbf24',
      700: '#fcd34d',
      800: '#fde68a',
      900: '#fef3c7',
      950: '#fffbeb'
    },
    error: {
      50: '#450a0a',
      100: '#7f1d1d',
      200: '#991b1b',
      300: '#b91c1c',
      400: '#dc2626',
      500: '#ef4444',
      600: '#f87171',
      700: '#fecaca',
      800: '#fee2e2',
      900: '#fef2f2',
      950: '#ffffff'
    },
    info: {
      50: '#082f49',
      100: '#0c4a6e',
      200: '#075985',
      300: '#0369a1',
      400: '#0284c7',
      500: '#0ea5e9',
      600: '#38bdf8',
      700: '#7dd3fc',
      800: '#bae6fd',
      900: '#e0f2fe',
      950: '#f0f9ff'
    }
  },
  semantic: {
    background: '#0f172a',
    foreground: '#f8fafc',
    card: '#1e293b',
    cardForeground: '#f8fafc',
    popover: '#1e293b',
    popoverForeground: '#f8fafc',
    primary: '#3b82f6',
    primaryForeground: '#ffffff',
    secondary: '#1e293b',
    secondaryForeground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    accent: '#334155',
    accentForeground: '#f8fafc',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#334155',
    input: '#1e293b',
    ring: '#3b82f6',
    sidebar: {
      background: '#1e293b',
      foreground: '#f8fafc',
      border: '#334155',
      item: {
        hover: '#334155',
        active: '#475569'
      }
    }
  }
}

export type ThemeMode = 'light' | 'dark'

export const themes: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme
}

// Theme utilities
export const getTheme = (mode: ThemeMode): Theme => themes[mode]

export const getCSSVariables = (theme: Theme): Record<string, string> => {
  const vars: Record<string, string> = {}
  
  // Primary colors
  Object.entries(theme.colors.primary).forEach(([key, value]) => {
    vars[`--color-primary-${key}`] = value
  })
  
  // Secondary colors
  Object.entries(theme.colors.secondary).forEach(([key, value]) => {
    vars[`--color-secondary-${key}`] = value
  })
  
  Object.entries(theme.semantic).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'object' && subValue !== null) {
          Object.entries(subValue).forEach(([nestedKey, nestedValue]) => {
            vars[`--color-${key}-${subKey}-${nestedKey}`] = nestedValue as string
          })
        } else {
          vars[`--color-${key}-${subKey}`] = subValue as string
        }
      })
    } else {
      vars[`--color-${key}`] = value as string
    }
  })
  
  return vars
}
