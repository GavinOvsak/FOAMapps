import { LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../constants'

export interface LangInfo {
  code: string
  count: number
}

interface Props {
  languages: LangInfo[]
  activeLanguages: Set<string>
  onToggle: (code: string) => void
  onClear: () => void
}

export default function LanguageFilter({ languages, activeLanguages, onToggle, onClear }: Props) {
  if (languages.length <= 1) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-gray-500 shrink-0">Language:</span>
      <div className="flex gap-1.5 flex-wrap">
        {languages.map(({ code, count }) => {
          const isActive = activeLanguages.has(code)
          const flag = LANGUAGE_FLAGS[code] ?? '🌐'
          const name = LANGUAGE_NAMES[code] ?? code.toUpperCase()
          return (
            <button
              key={code}
              onClick={() => onToggle(code)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors inline-flex items-center gap-1.5 ${
                isActive
                  ? 'bg-violet-600 text-white'
                  : 'bg-violet-100 text-violet-800 hover:opacity-80'
              }`}
            >
              <span>{flag}</span>
              <span>{name}</span>
              <span
                className={`inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-current'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
      {activeLanguages.size > 0 && (
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-gray-600 underline ml-1"
        >
          Clear
        </button>
      )}
    </div>
  )
}
