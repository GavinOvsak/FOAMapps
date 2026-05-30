import type { AppCategory } from '../types'
import { CATEGORY_META } from '../constants'

type CategoryOrAll = AppCategory | 'all'

interface Props {
  active: CategoryOrAll
  onChange: (cat: CategoryOrAll) => void
  counts: Record<CategoryOrAll, number>
}

const TABS: { id: CategoryOrAll; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'clinical', label: CATEGORY_META.clinical.label },
  { id: 'education', label: CATEGORY_META.education.label },
  { id: 'data', label: CATEGORY_META.data.label },
]

export default function CategoryTabs({ active, onChange, counts }: Props) {
  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-0.5">
      {TABS.map(tab => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex items-center justify-center text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-current'
              }`}
            >
              {counts[tab.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
