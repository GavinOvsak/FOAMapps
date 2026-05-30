import { useState, useMemo } from 'react'
import { LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../constants'
import { useT } from '../TranslationContext'

interface Props {
  currentUsername: string
  onSaveUsername: (username: string) => void
  languagePrefs: string[]
  onSaveLanguagePrefs: (langs: string[]) => void
  availableLanguages: string[]
  loadingStars: boolean
  onClose: () => void
}

export default function AccountModal({
  currentUsername,
  onSaveUsername,
  languagePrefs,
  onSaveLanguagePrefs,
  availableLanguages,
  loadingStars,
  onClose,
}: Props) {
  const t = useT()
  const [usernameValue, setUsernameValue] = useState(currentUsername)
  const [langSearch, setLangSearch] = useState('')
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set(languagePrefs))

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveUsername(usernameValue.trim())
  }

  const toggleLang = (code: string) => {
    setSelectedLangs(prev => {
      const next = new Set(prev)
      next.has(code) ? next.delete(code) : next.add(code)
      return next
    })
  }

  const filteredLangs = useMemo(() => {
    const q = langSearch.toLowerCase()
    return availableLanguages.filter(code => {
      if (!q) return true
      const name = (LANGUAGE_NAMES[code] ?? code).toLowerCase()
      return name.includes(q) || code.includes(q)
    })
  }, [availableLanguages, langSearch])

  const handleSaveLangs = () => {
    onSaveLanguagePrefs([...selectedLangs])
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-base font-bold text-gray-900 pr-6">{t.accountTitle}</h2>

        {/* GitHub Stars */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">{t.githubStarsSection}</span>
          </div>
          <p className="text-xs text-gray-500">{t.githubStarsDesc}</p>
          <form onSubmit={handleUsernameSubmit} className="flex gap-2">
            <input
              type="text"
              value={usernameValue}
              onChange={e => setUsernameValue(e.target.value)}
              placeholder={t.githubUsernamePlaceholder}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loadingStars || !usernameValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
            >
              {loadingStars ? '…' : t.githubSave}
            </button>
            {currentUsername && (
              <button
                type="button"
                onClick={() => onSaveUsername('')}
                className="text-sm text-red-400 hover:text-red-600 border border-red-200 px-2.5 py-2 rounded-lg transition-colors"
              >
                {t.githubClear}
              </button>
            )}
          </form>
          {currentUsername && (
            <p className="text-xs text-gray-400">{t.githubCurrentUser(currentUsername)}</p>
          )}
        </section>

        <hr className="border-gray-100" />

        {/* Language Preferences */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">🌐</span>
            <span className="text-sm font-semibold text-gray-800">{t.langPrefsSection}</span>
          </div>
          <p className="text-xs text-gray-500">{t.langPrefsDesc}</p>

          {availableLanguages.length > 1 && (
            <input
              type="text"
              value={langSearch}
              onChange={e => setLangSearch(e.target.value)}
              placeholder={t.searchLanguages}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          )}

          <div className="flex flex-col gap-1 max-h-44 overflow-y-auto">
            {filteredLangs.map(code => {
              const isSelected = selectedLangs.has(code)
              const flag = LANGUAGE_FLAGS[code] ?? '🌐'
              const name = LANGUAGE_NAMES[code] ?? code.toUpperCase()
              return (
                <button
                  key={code}
                  onClick={() => toggleLang(code)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    isSelected
                      ? 'bg-violet-50 border border-violet-200 text-violet-900'
                      : 'hover:bg-gray-50 border border-transparent text-gray-700'
                  }`}
                >
                  <span className="text-base leading-none">{flag}</span>
                  <span className="flex-1">{name}</span>
                  {isSelected && (
                    <svg className="w-4 h-4 text-violet-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {selectedLangs.size === 0 && (
            <p className="text-xs text-gray-400 italic">{t.noLangPrefs}</p>
          )}

          <button
            onClick={handleSaveLangs}
            className="mt-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            {t.savePreferences}
          </button>
        </section>
      </div>
    </div>
  )
}
