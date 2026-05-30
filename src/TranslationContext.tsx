import { createContext, useContext } from 'react'
import type { Translations } from './i18n'
import { translations } from './i18n'

const TranslationContext = createContext<Translations>(translations.en)

export function TranslationProvider({
  lang,
  children,
}: {
  lang: string
  children: React.ReactNode
}) {
  const t = translations[lang] ?? translations.en
  return (
    <TranslationContext.Provider value={t}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useT() {
  return useContext(TranslationContext)
}
