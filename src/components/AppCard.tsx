import type { App } from '../types'
import { LANGUAGE_FLAGS, ACCESS_META } from '../constants'
import { useT } from '../TranslationContext'

const TAG_COLORS = [
  'bg-blue-100 text-blue-800',
  'bg-emerald-100 text-emerald-800',
  'bg-purple-100 text-purple-800',
  'bg-orange-100 text-orange-800',
  'bg-pink-100 text-pink-800',
  'bg-teal-100 text-teal-800',
  'bg-red-100 text-red-800',
  'bg-yellow-100 text-yellow-800',
  'bg-indigo-100 text-indigo-800',
  'bg-cyan-100 text-cyan-800',
]

function tagColor(tag: string): string {
  let h = 0
  for (const c of tag) h = (h * 31 + c.charCodeAt(0)) % TAG_COLORS.length
  return TAG_COLORS[h]
}

interface Props {
  app: App
  stars?: string
  isUserStarred: boolean
  isLocalStarred: boolean
  onToggleLocalStar: () => void
  onOpenDetail: () => void
  activeTag: string | null
  onTagClick: (tag: string) => void
}

export default function AppCard({
  app, stars, isUserStarred, isLocalStarred, onToggleLocalStar, onOpenDetail, activeTag, onTagClick,
}: Props) {
  const t = useT()
  const nonEnglishLangs = app.languages.filter(l => l !== 'en')
  const isDataApp = app.category === 'data'
  const accessMeta = app.access ? ACCESS_META[app.access] : null

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onOpenDetail}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-2 p-4 pb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            onClick={e => { e.stopPropagation(); onOpenDetail() }}
            title={t.moreInfo}
            className="shrink-0 text-gray-300 hover:text-blue-400 transition-colors"
            aria-label={t.moreInfo}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <h2 className="text-base font-semibold text-gray-900 leading-snug">{app.name}</h2>
        </div>

        {app.github ? (
          <div className="flex items-center gap-1 shrink-0">
            {stars !== undefined ? (
              <a
                href={`https://github.com/${app.github}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full transition-opacity hover:opacity-75 ${
                  isUserStarred ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <StarIcon filled={isUserStarred} />
                {stars}
              </a>
            ) : (
              <span className="flex items-center gap-1 text-xs text-gray-300 animate-pulse">
                <StarIcon filled={false} />
                &hellip;
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={e => { e.stopPropagation(); onToggleLocalStar() }}
            title={isLocalStarred ? t.removeFromMyStars : t.addToMyStars}
            className={`shrink-0 p-0.5 rounded transition-colors ${
              isLocalStarred ? 'text-amber-400 hover:text-amber-500' : 'text-gray-400 hover:text-amber-300'
            }`}
          >
            <StarIcon filled={isLocalStarred} />
          </button>
        )}
      </div>

      {/* Description */}
      {app.description && (
        <p className="px-4 pb-2 text-xs text-gray-400 truncate">{app.description}</p>
      )}

      {/* Tags + language flags + access badge */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
        {app.tags.map(tag => (
          <button
            key={tag}
            onClick={e => { e.stopPropagation(); onTagClick(tag) }}
            className={`text-xs font-medium px-2 py-0.5 rounded-full transition-opacity ${tagColor(tag)} ${
              activeTag === tag ? 'ring-2 ring-offset-1 ring-blue-400' : 'hover:opacity-80'
            }`}
          >
            {tag}
          </button>
        ))}

        {nonEnglishLangs.length > 0 && (
          <span
            className="flex items-center gap-0.5 text-xs text-gray-400 ml-0.5"
            title={nonEnglishLangs.join(', ')}
          >
            {nonEnglishLangs.map(l => (
              <span key={l} className="text-sm leading-none" role="img" aria-label={l}>
                {LANGUAGE_FLAGS[l] ?? '🌐'}
              </span>
            ))}
          </span>
        )}

        {isDataApp && accessMeta && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${accessMeta.color}`}>
            {app.access === 'open' ? t.openAccess : t.credentialedAccess}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 px-4 py-3 border-t border-gray-50">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex-1 text-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          {isDataApp ? t.accessData : t.openApp}
        </a>
        {app.github && (
          <a
            href={`https://github.com/${app.github}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="GitHub"
            className="flex items-center justify-center text-sm font-mono font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            {'</>'}
          </a>
        )}
      </div>
    </div>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}
