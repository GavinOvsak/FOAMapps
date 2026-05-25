import { useState } from 'react'

interface Props {
  currentUsername: string
  onSave: (username: string) => void
  onClose: () => void
  loading: boolean
}

export default function MyStarsModal({ currentUsername, onSave, onClose, loading }: Props) {
  const [value, setValue] = useState(currentUsername)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(value.trim())
    if (value.trim()) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
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

        <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          My GitHub Stars
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter your GitHub username to highlight apps whose repos you've starred. Your username is
          stored only in your browser.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="github-username"
            autoFocus
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !value.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {loading ? 'Loading stars…' : 'Save'}
            </button>
            {currentUsername && (
              <button
                type="button"
                onClick={() => { onSave(''); onClose() }}
                className="px-3 text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {currentUsername && !loading && (
          <p className="mt-3 text-xs text-gray-400 text-center">
            Currently showing stars for <strong>{currentUsername}</strong>
          </p>
        )}
      </div>
    </div>
  )
}
