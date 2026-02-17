import { ChevronDown } from 'lucide-react'

export function STInput({ value, isDark }: { value: string; isDark: boolean }) {
  return (
    <div
      className="px-3 py-2 rounded w-full text-sm font-mono flex items-center justify-between"
      style={{
        background: isDark ? '#0b0c0f' : '#ffffff',
        border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.15)',
        color: isDark ? '#d1d5db' : '#475569',
      }}
    >
      <span className="truncate">{value}</span>
      <ChevronDown size={14} className={isDark ? 'text-gray-500' : 'text-slate-400'} />
    </div>
  )
}
