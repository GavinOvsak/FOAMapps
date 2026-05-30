import { useState } from 'react'
import type { App } from '../types'

interface Props {
  app: App
  onClose: () => void
}

const REPO = 'GavinOvsak/FOAMapps'

function buildIssueUrl(title: string, body: string): string {
  return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
}

const REASONS = [
  'App is no longer free / paywalled',
  'URL is dead or unreachable',
  'Duplicate of another listing',
  'No longer maintained / abandoned',
  'Other',
]

export default function DeleteAppModal({ app, onClose }: Props) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const isValid = reason && (reason !== 'Other' || details.trim())

  const handleSubmit = () => {
    const jsonBlock = `<!-- FOAMAPPS_JSON\n${JSON.stringify({ action: 'delete', appUrl: app.url }, null, 2)}\n-->`

    const body = [
      `## Removal Request: ${app.name}`,
      '',
      `**App URL:** ${app.url}`,
      `**Reason:** ${reason}`,
      details.trim() ? `**Details:** ${details.trim()}` : null,
      '',
      '---',
      jsonBlock,
    ].filter(l => l !== null).join('\n')

    window.open(buildIssueUrl(`[Remove App] ${app.name}`, body), '_blank')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-sm text-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-base font-bold text-gray-900 pr-8 mb-1">Request Removal</h2>
        <p className="text-xs text-gray-400 mb-5">
          For <span className="font-medium text-gray-600">{app.name}</span> · Opens a pre-filled GitHub issue
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Reason <span className="text-red-400">*</span>
            </label>
            <div className="space-y-1.5">
              {REASONS.map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="accent-red-500"
                  />
                  <span className="text-xs text-gray-600">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Additional details {reason !== 'Other' ? <span className="font-normal text-gray-400">(optional)</span> : <span className="text-red-400">*</span>}
            </label>
            <textarea
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
              rows={3}
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="Any additional context…"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="mt-5 w-full py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Open GitHub Issue →
        </button>
      </div>
    </div>
  )
}
