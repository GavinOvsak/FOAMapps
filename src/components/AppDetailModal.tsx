import type { App } from '../types'
import { LANGUAGE_NAMES, LANGUAGE_FLAGS, CATEGORY_META, ACCESS_META } from '../constants'
import { useT } from '../TranslationContext'

interface Props {
  app: App
  onClose: () => void
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function AppDetailModal({ app, onClose }: Props) {
  const t = useT()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-sm text-gray-700"
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

        <h2 className="text-base font-bold text-gray-900 pr-8 mb-4">{app.name}</h2>

        {app.description && (
          <p className="text-gray-600 leading-relaxed mb-4">{app.description}</p>
        )}

        <dl className="space-y-2.5">
          <div>
            <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{t.website}</dt>
            <dd>
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                {app.url}
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{t.categoryLabel}</dt>
            <dd className="text-gray-600">{CATEGORY_META[app.category].label}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{t.languagesLabel}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {app.languages.map(code => (
                <span key={code} className="inline-flex items-center gap-1 text-xs bg-violet-50 text-violet-800 px-2 py-0.5 rounded-full">
                  <span>{LANGUAGE_FLAGS[code] ?? '🌐'}</span>
                  <span>{LANGUAGE_NAMES[code] ?? code.toUpperCase()}</span>
                </span>
              ))}
            </dd>
          </div>

          {app.access && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{t.accessLabel}</dt>
              <dd>
                <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${ACCESS_META[app.access].color}`}>
                  {app.access === 'open' ? t.openAccess : t.credentialedAccess}
                </span>
              </dd>
            </div>
          )}

          {app.dataType && app.dataType.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{t.dataTypesLabel}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {app.dataType.map(dt => (
                  <span key={dt} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{dt}</span>
                ))}
              </dd>
            </div>
          )}

          {app.github && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">GitHub</dt>
              <dd>
                <a href={`https://github.com/${app.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                  {`https://github.com/${app.github}`}
                </a>
              </dd>
            </div>
          )}

          {app.dateAdded && (
            <div>
              <dt className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{t.addedLabel}</dt>
              <dd className="text-gray-600">{formatDate(app.dateAdded)}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}
