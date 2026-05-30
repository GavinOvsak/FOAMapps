import type { AppCategory, DataAccess } from './types'

export const LANGUAGE_NAMES: Record<string, string> = {
  ar: 'Arabic',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  hi: 'Hindi',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ru: 'Russian',
  sw: 'Swahili',
  tr: 'Turkish',
  zh: 'Chinese',
}

export const LANGUAGE_FLAGS: Record<string, string> = {
  ar: '🇸🇦',
  de: '🇩🇪',
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  hi: '🇮🇳',
  it: '🇮🇹',
  ja: '🇯🇵',
  ko: '🇰🇷',
  nl: '🇳🇱',
  pl: '🇵🇱',
  pt: '🇧🇷',
  ru: '🇷🇺',
  sw: '🇰🇪',
  tr: '🇹🇷',
  zh: '🇨🇳',
}

export const CATEGORY_META: Record<AppCategory, { label: string; description: string }> = {
  clinical: {
    label: 'Clinical',
    description: 'Point-of-care tools, calculators, and bedside references',
  },
  education: {
    label: 'Education',
    description: 'Learning platforms, textbooks, and simulation resources',
  },
  data: {
    label: 'Data & Research',
    description: 'Open datasets, research tools, and data repositories',
  },
}

export const ACCESS_META: Record<DataAccess, { label: string; color: string }> = {
  open: {
    label: 'Open Access',
    color: 'bg-green-100 text-green-800',
  },
  credentialed: {
    label: 'Free · Account Required',
    color: 'bg-amber-100 text-amber-800',
  },
  restricted: {
    label: 'Restricted',
    color: 'bg-red-100 text-red-800',
  },
}
