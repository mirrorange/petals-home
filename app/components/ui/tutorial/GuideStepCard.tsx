export type GuideAccent = 'red' | 'purple' | 'yellow' | 'blue' | 'green'

export function GuideStepCard({
  index,
  title,
  detail,
  tip,
  accent = 'purple',
  isDark,
}: {
  index: number
  title: string
  detail: React.ReactNode
  tip?: React.ReactNode
  accent?: GuideAccent
  isDark: boolean
}) {
  const accentColorMap: Record<GuideAccent, string> = {
    red: '#ef4444',
    purple: '#a855f7',
    yellow: '#eab308',
    blue: '#3b82f6',
    green: '#22c55e',
  }

  const accentColor = accentColorMap[accent]

  return (
    <div
      className="rounded-2xl p-4 md:p-5 space-y-2"
      style={{
        background: isDark ? 'rgba(15,23,42,0.32)' : 'rgba(255,255,255,0.82)',
        border: isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(147,51,234,0.08)',
        boxShadow: isDark ? '0 10px 22px rgba(0,0,0,0.25)' : '0 10px 22px rgba(148,163,184,0.12)',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5"
          style={{ background: accentColor, color: '#ffffff' }}
        >
          {index}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold" style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}>
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
            {detail}
          </p>
          {tip && (
            <p className="mt-2 text-xs font-medium" style={{ color: accentColor }}>
              {tip}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
