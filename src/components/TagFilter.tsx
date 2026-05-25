const TAG_COLORS: Record<string, string> = {}
const PALETTE: [string, string][] = [
  ['bg-blue-100 text-blue-800', 'bg-blue-600 text-white'],
  ['bg-emerald-100 text-emerald-800', 'bg-emerald-600 text-white'],
  ['bg-purple-100 text-purple-800', 'bg-purple-600 text-white'],
  ['bg-orange-100 text-orange-800', 'bg-orange-600 text-white'],
  ['bg-pink-100 text-pink-800', 'bg-pink-600 text-white'],
  ['bg-teal-100 text-teal-800', 'bg-teal-600 text-white'],
  ['bg-red-100 text-red-800', 'bg-red-600 text-white'],
  ['bg-yellow-100 text-yellow-800', 'bg-yellow-600 text-white'],
  ['bg-indigo-100 text-indigo-800', 'bg-indigo-600 text-white'],
  ['bg-cyan-100 text-cyan-800', 'bg-cyan-600 text-white'],
]

function getColors(tag: string): [string, string] {
  if (!TAG_COLORS[tag]) {
    let h = 0
    for (const c of tag) h = (h * 31 + c.charCodeAt(0)) % PALETTE.length
    TAG_COLORS[tag] = String(h)
  }
  const idx = parseInt(TAG_COLORS[tag])
  return PALETTE[idx]
}

interface Props {
  allTags: string[]
  activeTags: Set<string>
  onToggle: (tag: string) => void
  onClear: () => void
}

export default function TagFilter({ allTags, activeTags, onToggle, onClear }: Props) {
  if (allTags.length === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-gray-500 shrink-0">Filter:</span>
      <div className="flex gap-1.5 flex-wrap">
        {allTags.map(tag => {
          const [inactive, active] = getColors(tag)
          const isActive = activeTags.has(tag)
          return (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                isActive ? active : `${inactive} hover:opacity-80`
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
      {activeTags.size > 0 && (
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
