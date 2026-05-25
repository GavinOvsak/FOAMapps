interface Props {
  onClose: () => void
  submitEmail: string
}

export default function InfoModal({ onClose, submitEmail }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 text-sm text-gray-700 leading-relaxed"
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

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⚕️</span>
          <h2 className="text-lg font-bold text-gray-900">About FOAM Apps Directory</h2>
        </div>

        <p className="mb-3">
          <strong>FOAM</strong> stands for <strong>Free Open Access Medical</strong> education. This
          directory catalogues free, openly accessible web apps useful to clinicians, students, and
          healthcare teams worldwide.
        </p>

        <h3 className="font-semibold text-gray-900 mb-1">How to use</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-600">
          <li>
            <strong>Search</strong> by app name or tag keyword.
          </li>
          <li>
            <strong>Click a tag</strong> chip to filter by category (click multiple to combine).
          </li>
          <li>
            Apps with a public GitHub repo show a{' '}
            <code className="bg-gray-100 px-1 rounded font-mono text-xs">&lt;/&gt;</code> button to
            view source and a <strong>star count</strong> pulled live from GitHub.
          </li>
          <li>
            <strong>My Stars</strong> — enter your GitHub username to highlight (and optionally
            filter to) apps whose repos you have already starred.
          </li>
        </ul>

        <h3 className="font-semibold text-gray-900 mb-1">Submit an app</h3>
        <p className="mb-1 text-gray-600">
          Know a free, open-access medical app that belongs here? Submit it two ways:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>
            Open a{' '}
            <a
              href="https://github.com/GavinOvsak/FOAMapps/issues/new?template=add-app.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              GitHub issue
            </a>{' '}
            using our "Add App" template.
          </li>
          <li>
            Email{' '}
            <a href={`mailto:${submitEmail}`} className="text-blue-600 underline">
              {submitEmail}
            </a>
          </li>
        </ul>

        <p className="mt-4 text-xs text-gray-400">
          Star counts are fetched from the GitHub API and cached for 1 hour. The GitHub API allows
          60 unauthenticated requests/hour per IP.
        </p>
      </div>
    </div>
  )
}
