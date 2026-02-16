/**
 * Shared tutorial UI components — simulated SillyTavern widgets
 * and step-card primitives used by every tutorial page.
 */
import {
  AtSign,
  Settings,
  Plug,
  Type,
  BookOpen,
  UserCog,
  Image as ImageIcon,
  Box,
  Smile,
  Contact,
  ChevronDown,
  Lightbulb,
  FileText,
  PenLine,
  Trash2,
  Sparkles,
  Menu,
  Send,
  CheckCircle,
} from 'lucide-react'

/* ───────────────────────── Simulated ST Components ───────────────────────── */

export function STPanel({
  children,
  className = '',
  isDark,
}: {
  children: React.ReactNode
  className?: string
  isDark: boolean
}) {
  return (
    <div
      className={`rounded-xl p-4 shadow-lg ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #18191e, #1e1f24)'
          : 'linear-gradient(135deg, #f8f6ff, #f3f0fa)',
        border: isDark
          ? '1px solid rgba(107,114,128,0.3)'
          : '1px solid rgba(147,51,234,0.12)',
      }}
    >
      {children}
    </div>
  )
}

export function STButton({
  icon: Icon,
  active,
  highlight,
  isDark,
  className = '',
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  active?: boolean
  highlight?: string | null
  isDark: boolean
  className?: string
}) {
  const ringOffsetClass = isDark ? 'ring-offset-[#1b1c21]' : 'ring-offset-white'
  const highlightRing = highlight
    ? highlight === 'red'
      ? `ring-2 ring-red-500 ring-offset-2 ${ringOffsetClass} animate-pulse z-10`
      : highlight === 'purple'
      ? `ring-2 ring-purple-500 ring-offset-2 ${ringOffsetClass} animate-pulse z-10`
      : highlight === 'yellow'
      ? `ring-2 ring-yellow-500 ring-offset-2 ${ringOffsetClass} animate-pulse z-10`
      : highlight === 'pink'
      ? `ring-2 ring-pink-500 ring-offset-2 ${ringOffsetClass} animate-pulse z-10`
      : ''
    : ''

  return (
    <button
      className={`p-2 rounded transition-all flex items-center justify-center relative cursor-default
        ${active
          ? isDark
            ? 'bg-gray-600 text-white'
            : 'bg-freesia-100 text-freesia-700'
          : isDark
          ? 'bg-[#2b2d31] text-gray-400 hover:bg-gray-600 hover:text-white'
          : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-600'
        }
        ${highlightRing}
        ${className}`}
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  )
}

export function STNavbar({
  activeIndex,
  highlightIndex,
  highlightColor = 'red',
  isDark,
}: {
  activeIndex: number
  highlightIndex?: number
  highlightColor?: string
  isDark: boolean
}) {
  const icons = [Settings, Plug, Type, BookOpen, UserCog, ImageIcon, Box, Smile, Contact]

  return (
    <div
      className="flex gap-2 pb-3 mb-4 justify-center overflow-x-auto"
      style={{
        borderBottom: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
      }}
    >
      {icons.map((Icon, idx) => (
        <div key={idx} className="relative">
          <STButton
            icon={Icon}
            active={idx === activeIndex}
            highlight={idx === highlightIndex ? highlightColor : null}
            isDark={isDark}
          />
          {idx === highlightIndex && (
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  highlightColor === 'red'
                    ? '#ef4444'
                    : highlightColor === 'pink'
                    ? '#ec4899'
                    : highlightColor === 'yellow'
                    ? '#eab308'
                    : highlightColor === 'purple'
                    ? '#a855f7'
                    : '#9333ea',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

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

export function STLabel({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div
      className="font-semibold mb-2 text-sm flex items-center gap-2"
      style={{ color: isDark ? '#e5e7eb' : '#334155' }}
    >
      {children}
    </div>
  )
}

export function STCheckbox({
  label,
  checked = false,
  highlight,
  highlightColor = 'yellow',
  isDark,
}: {
  label: string
  checked?: boolean
  highlight?: boolean
  highlightColor?: string
  isDark: boolean
}) {
  const hlBg =
    highlightColor === 'yellow'
      ? 'rgba(234,179,8,0.08)'
      : highlightColor === 'pink'
      ? 'rgba(236,72,153,0.08)'
      : 'rgba(147,51,234,0.08)'
  const hlBorder =
    highlightColor === 'yellow'
      ? 'rgba(234,179,8,0.3)'
      : highlightColor === 'pink'
      ? 'rgba(236,72,153,0.3)'
      : 'rgba(147,51,234,0.3)'

  return (
    <div
      className="flex items-center gap-3 p-2 rounded transition-colors"
      style={{
        background: highlight ? hlBg : 'transparent',
        border: highlight ? `1px solid ${hlBorder}` : '1px solid transparent',
      }}
    >
      <div
        className="w-5 h-5 rounded border flex items-center justify-center shrink-0"
        style={{
          background: checked
            ? isDark
              ? '#4b5563'
              : '#c084fc'
            : isDark
            ? '#0b0c0f'
            : '#ffffff',
          borderColor: checked
            ? isDark
              ? '#6b7280'
              : '#a855f7'
            : isDark
            ? '#4b5563'
            : '#cbd5e1',
        }}
      >
        {checked && (
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: isDark ? '#ffffff' : '#ffffff' }}
          />
        )}
      </div>
      <span className="text-sm select-none" style={{ color: isDark ? '#d1d5db' : '#475569' }}>
        {label}
      </span>
    </div>
  )
}

/* ───────────────────────── Shared Mock Input Bar ───────────────────────── */

export function MockPetalsInputBar({
  isDark,
  highlightGear,
}: {
  isDark: boolean
  highlightGear?: boolean
}) {
  const barBg = isDark ? '#1e1f24' : '#f3f0fa'
  const barBorder = isDark ? 'rgba(107,114,128,0.35)' : 'rgba(147,51,234,0.12)'
  const iconColor = isDark ? '#9ca3af' : '#64748b'
  const inputBg = isDark ? '#0b0c0f' : '#ffffff'
  const inputBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'
  const placeholderColor = isDark ? '#6b7280' : '#94a3b8'

  const gearRing = highlightGear
    ? isDark
      ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white animate-pulse'
    : ''

  const quickActions = [
    { id: 'mention', Icon: AtSign },
    { id: 'idea', Icon: Lightbulb },
    { id: 'template', Icon: FileText },
    { id: 'edit', Icon: PenLine },
    { id: 'clear', Icon: Trash2 },
    { id: 'settings', Icon: Settings },
  ]

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: barBg,
        border: `1px solid ${barBorder}`,
      }}
    >
      <div
        className="flex items-center justify-center gap-1 px-3 py-2"
        style={{
          borderBottom: `1px solid ${isDark ? 'rgba(107,114,128,0.2)' : 'rgba(147,51,234,0.08)'}`,
        }}
      >
        {quickActions.map(({ id, Icon }) => (
          <div
            key={id}
            className={`h-8 min-w-10 px-2 rounded-full flex items-center justify-center cursor-default ${
              id === 'settings' && highlightGear ? gearRing : ''
            }`}
            style={{
              background: isDark ? '#1f2127' : '#ffffff',
              border: isDark
                ? '1px solid rgba(107,114,128,0.3)'
                : '1px solid rgba(147,51,234,0.1)',
              color:
                id === 'settings' && highlightGear
                  ? isDark
                    ? '#fbbf24'
                    : '#d97706'
                  : iconColor,
            }}
          >
            <Icon size={15} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5">
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Menu size={16} />
        </div>
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Sparkles size={16} />
        </div>
        <div
          className="flex-1 px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            color: placeholderColor,
          }}
        >
          输入想发送的消息，或输入 /? 获取帮助
        </div>
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Send size={16} />
        </div>
      </div>
    </div>
  )
}

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

/* ───────────────────────── Simulation Badge ───────────────────────── */

export function SimulationBadge({
  isDark,
  label = 'Simulation',
}: {
  isDark: boolean
  label?: string
}) {
  return (
    <div
      className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-wider"
      style={{
        background: isDark ? '#18191e' : '#f8f6ff',
        color: isDark ? '#6b7280' : '#94a3b8',
      }}
    >
      {label}
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
