import { useState } from 'react'
import { LANGUAGE_NAMES, CATEGORY_META } from '../constants'
import type { App, AppCategory } from '../types'

interface Props {
  app: App
  onClose: () => void
}

const REPO = 'GavinOvsak/FOAMapps'

function buildIssueUrl(title: string, body: string): string {
  return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
}

export default function EditAppModal({ app, onClose }: Props) {
  const [name, setName] = useState(app.name)
  const [url, setUrl] = useState(app.url)
  const [github, setGithub] = useState(app.github ?? '')
  const [category, setCategory] = useState<AppCategory>(app.category)
  const [languages, setLanguages] = useState<Set<string>>(new Set(app.languages))
  const [tags, setTags] = useState(app.tags.join(', '))
  const [description, setDescription] = useState(app.description ?? '')
  const [reason, setReason] = useState('')

  const isValid = name.trim() && url.trim() && tags.trim() && reason.trim()

  const toggleLang = (code: string) =>
    setLanguages(prev => {
      const next = new Set(prev)
      next.has(code) ? next.delete(code) : next.add(code)
      return next
    })

  const handleSubmit = () => {
    const tagList = tags.split(',').map(t => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean)
    const langList = [...languages]

    const data: Record<string, unknown> = {
      name: name.trim(),
      url: url.trim(),
      category,
      languages: langList,
      tags: tagList,
    }
    if (github.trim()) data.github = github.trim()
    if (description.trim()) data.description = description.trim()

    const jsonBlock = `<!-- FOAMAPPS_JSON\n${JSON.stringify({ action: 'edit', appUrl: app.url, data }, null, 2)}\n-->`

    const lines: string[] = [
      `## Edit Request: ${app.name}`,
      '',
      `**Reason for edit:** ${reason.trim()}`,
      '',
      '### Proposed values',
      '',
      `**Name:** ${name.trim()}`,
      `**URL:** ${url.trim()}`,
      `**Category:** ${category}`,
      `**Languages:** ${langList.join(', ')}`,
      `**Tags:** ${tagList.join(', ')}`,
    ]
    if (github.trim()) lines.push(`**GitHub:** ${github.trim()}`)
    if (description.trim()) lines.push(`**Description:** ${description.trim()}`)
    lines.push('', '---', jsonBlock)

    window.open(buildIssueUrl(`[Edit App] ${app.name}`, lines.join('\n')), '_blank')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 text-sm text-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-base font-bold text-gray-900 pr-8 mb-1">Suggest an Edit</h2>
        <p className="text-xs text-gray-400 mb-5">
          Editing <span className="font-medium text-gray-600">{app.name}</span> · Opens a pre-filled GitHub issue
        </p>

        <div className="space-y-4">
          <Field label="Reason for edit" required>
            <input
              className={inputCls}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="e.g. URL changed, wrong category, missing language…"
            />
          </Field>

          <Field label="App Name" required>
            <input className={inputCls} value={name} onChange={e => setName(e.target.value)} />
          </Field>

          <Field label="App URL" required>
            <input className={inputCls} value={url} onChange={e => setUrl(e.target.value)} type="url" />
          </Field>

          <Field label="GitHub Repository" hint="optional · owner/repo">
            <input className={inputCls} value={github} onChange={e => setGithub(e.target.value)} placeholder="owner/repo" />
          </Field>

          <Field label="Category" required>
            <div className="flex gap-2">
              {(['clinical', 'education', 'data'] as AppCategory[]).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    category === cat
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {CATEGORY_META[cat].label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Languages" required>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(LANGUAGE_NAMES).map(([code, langName]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => toggleLang(code)}
                  className={`px-2 py-0.5 rounded-full text-xs border transition-colors ${
                    languages.has(code)
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {langName}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Tags" required hint="comma-separated, lowercase-hyphenated">
            <input className={inputCls} value={tags} onChange={e => setTags(e.target.value)} />
          </Field>

          <Field label="Description" hint="optional">
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Field>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Open GitHub Issue →
        </button>
      </div>
    </div>
  )
}

const inputCls = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'

function Field({ label, required, hint, children }: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {hint && <span className="ml-1 font-normal text-gray-400">({hint})</span>}
      </label>
      {children}
    </div>
  )
}
