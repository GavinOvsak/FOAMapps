import { useT } from '../TranslationContext'

interface Props {
  onClose: () => void
  submitEmail: string
}

export default function InfoModal({ onClose, submitEmail }: Props) {
  const t = useT()

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
          <h2 className="text-lg font-bold text-gray-900">{t.infoTitle}</h2>
        </div>

        <p className="mb-3">{t.infoAboutFoam}</p>

        <h3 className="font-semibold text-gray-900 mb-1">{t.infoHowToUseTitle}</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-600">
          <li>{t.infoStep1}</li>
          <li>{t.infoStep2}</li>
          <li>
            {t.infoStep3}{' '}
            <code className="bg-gray-100 px-1 rounded font-mono text-xs">{'</>'}</code>
          </li>
          <li>{t.infoStep4}</li>
        </ul>

        <h3 className="font-semibold text-gray-900 mb-1">{t.infoSubmitTitle}</h3>
        <p className="mb-1 text-gray-600">{t.infoSubmitDesc}</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>
            <a
              href="https://github.com/GavinOvsak/FOAMapps/issues/new?template=add-app.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {t.infoGithubIssue}
            </a>{' '}
            {t.infoUsingTemplate}
          </li>
          <li>
            {t.infoEmail}{' '}
            <a href={`mailto:${submitEmail}`} className="text-blue-600 underline">
              {submitEmail}
            </a>
          </li>
        </ul>

        <p className="mt-4 text-xs text-gray-400">{t.infoFooterNote}</p>
      </div>
    </div>
  )
}
