/**
 * Shared tutorial UI components — step-card primitives
 * used by tutorial pages.
 */
import { CheckCircle } from 'lucide-react'

/* ───────────────────────── Guide Step Card ───────────────────────── */

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

/* ───────────────────────── Shared Hint Card ───────────────────────── */

export function TutorialHintCard({
  isDark,
  title = '💡 小提示:',
  className = '',
  children,
}: {
  isDark: boolean
  title?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`p-4 rounded-xl text-left text-sm ${className}`}
      style={{
        background: isDark ? '#202225' : '#ffffff',
        border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
        color: isDark ? '#9ca3af' : '#64748b',
      }}
    >
      <p className="font-bold mb-2" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

/* ──────────────────────── Shared Completion Card ──────────────────────── */

export function TutorialCompletionCard({
  isDark,
  title,
  description,
  descriptionClassName = 'max-w-sm',
  children,
}: {
  isDark: boolean
  title: string
  description: React.ReactNode
  descriptionClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className="text-center space-y-6 py-8">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
          color: '#22c55e',
          boxShadow: '0 0 0 4px rgba(34,197,94,0.08)',
        }}
      >
        <CheckCircle size={40} />
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
          {title}
        </h3>
        <p className={`${descriptionClassName} mx-auto text-sm`} style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
