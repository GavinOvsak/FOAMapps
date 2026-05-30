import { useState, useRef, useEffect } from 'react'

interface Props {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions: string[]
  placeholder?: string
}

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, '-')
}

export default function TagInput({ value, onChange, suggestions, placeholder }: Props) {
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const q = input.toLowerCase()
  const filtered = suggestions
    .filter(s => !value.includes(s) && s.includes(q))
    .slice(0, 8)

  const addTag = (raw: string) => {
    const tag = normalize(raw)
    if (tag && !value.includes(tag)) onChange([...value, tag])
    setInput('')
    setOpen(false)
    inputRef.current?.focus()
  }

  const removeTag = (tag: string) => onChange(value.filter(t => t !== tag))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const normInput = normalize(input)
  const showCustom = !!normInput && !filtered.includes(normInput) && !value.includes(normInput)

  return (
    <div ref={containerRef} className="relative">
      <div
        className="min-h-[38px] w-full px-2 py-1.5 border border-gray-200 rounded-lg flex flex-wrap gap-1 cursor-text focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            {tag}
            <button
              type="button"
              onMouseDown={e => { e.preventDefault(); removeTag(tag) }}
              className="text-blue-400 hover:text-blue-700 leading-none"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={e => { setInput(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[80px] text-sm outline-none bg-transparent py-0.5"
        />
      </div>

      {open && (filtered.length > 0 || showCustom) && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filtered.map(tag => (
            <li key={tag}>
              <button
                type="button"
                onMouseDown={e => { e.preventDefault(); addTag(tag) }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {tag}
              </button>
            </li>
          ))}
          {showCustom && (
            <li className={filtered.length > 0 ? 'border-t border-gray-100' : ''}>
              <button
                type="button"
                onMouseDown={e => { e.preventDefault(); addTag(input) }}
                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
              >
                Add "{normInput}"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
