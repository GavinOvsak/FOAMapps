import type { AppCategory } from '../types'
import { useT } from '../TranslationContext'

type CategoryOrAll = AppCategory | 'all'

interface Props {
  active: CategoryOrAll
  onChange: (cat: CategoryOrAll) => void
  counts: Record<CategoryOrAll, number>
}

export default function CategoryTabs({ active, onChange, counts }: Props) {
  const t = useT()

  const TABS: { id: CategoryOrAll; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'clinical', label: t.catClinical },
    { id: 'education', label: t.catEducation },
    { id: 'data', label: t.catData },
  ]

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
