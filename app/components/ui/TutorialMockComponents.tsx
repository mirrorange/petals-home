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
  Link2Off,
  Save,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import { hexToRgb } from './TutorialColorUtils'

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

type HighlightTone = 'yellow' | 'purple' | 'pink'
type PromptTone = 'purple' | 'pink'

const toneColorMap: Record<
  HighlightTone,
  {
    ringClass: string
    textDark: string
    textLight: string
  }
> = {
  yellow: {
    ringClass: 'ring-2 ring-yellow-500 ring-offset-2 animate-pulse',
    textDark: '#fbbf24',
    textLight: '#d97706',
  },
  purple: {
    ringClass: 'ring-2 ring-purple-500 ring-offset-2 animate-pulse',
    textDark: '#c084fc',
    textLight: '#7e22ce',
  },
  pink: {
    ringClass: 'ring-2 ring-pink-500 ring-offset-2 animate-pulse',
    textDark: '#f472b6',
    textLight: '#ec4899',
  },
}

const promptToneMap: Record<
  PromptTone,
  {
    highlightBgDark: string
    highlightBgLight: string
    highlightBorderDark: string
    highlightBorderLight: string
    editActiveDark: string
    editActiveLight: string
    tooltipBgDark: string
    tooltipBgLight: string
    codeBgDark: string
    codeBgLight: string
    codeTextDark: string
    codeTextLight: string
  }
> = {
  purple: {
    highlightBgDark: 'rgba(168,85,247,0.08)',
    highlightBgLight: 'rgba(168,85,247,0.04)',
    highlightBorderDark: '1px solid rgba(168,85,247,0.3)',
    highlightBorderLight: '1px solid rgba(168,85,247,0.2)',
    editActiveDark: '#c084fc',
    editActiveLight: '#9333ea',
    tooltipBgDark: '#a855f7',
    tooltipBgLight: '#7e22ce',
    codeBgDark: 'rgba(168,85,247,0.12)',
    codeBgLight: 'rgba(168,85,247,0.06)',
    codeTextDark: '#d8b4fe',
    codeTextLight: '#7e22ce',
  },
  pink: {
    highlightBgDark: 'rgba(236,72,153,0.08)',
    highlightBgLight: 'rgba(236,72,153,0.04)',
    highlightBorderDark: '1px solid rgba(236,72,153,0.3)',
    highlightBorderLight: '1px solid rgba(236,72,153,0.2)',
    editActiveDark: '#f472b6',
    editActiveLight: '#ec4899',
    tooltipBgDark: '#ec4899',
    tooltipBgLight: '#db2777',
    codeBgDark: 'rgba(236,72,153,0.12)',
    codeBgLight: 'rgba(236,72,153,0.06)',
    codeTextDark: '#f9a8d4',
    codeTextLight: '#db2777',
  },
}

function buildHighlightRing(isDark: boolean, tone: HighlightTone): string {
  const toneColor = toneColorMap[tone]
  const ringOffsetClass = isDark ? 'ring-offset-[#1b1c21]' : 'ring-offset-white'
  return `${toneColor.ringClass} ${ringOffsetClass}`
}

function getToneTextColor(isDark: boolean, tone: HighlightTone): string {
  const toneColor = toneColorMap[tone]
  return isDark ? toneColor.textDark : toneColor.textLight
}

export function MockSelectionMenu({
  isDark,
  title,
  items,
  highlightItemId = null,
  highlightTone = 'yellow',
  showCancelButton = true,
  className = 'max-w-sm mx-auto',
}: {
  isDark: boolean
  title: string
  items: Array<{ id: string; label: string }>
  highlightItemId?: string | null
  highlightTone?: HighlightTone
  showCancelButton?: boolean
  className?: string
}) {
  const menuBg = isDark
    ? 'linear-gradient(135deg, #1a1b20, #222328)'
    : 'linear-gradient(135deg, #fefcff, #f5f0ff)'
  const menuBorder = isDark
    ? '1px solid rgba(107,114,128,0.35)'
    : '1px solid rgba(147,51,234,0.15)'
  const itemBg = isDark ? '#2b2d31' : '#ffffff'
  const itemBorder = isDark
    ? '1px solid rgba(107,114,128,0.3)'
    : '1px solid rgba(147,51,234,0.1)'
  const textColor = isDark ? '#e5e7eb' : '#334155'
  const highlightRing = buildHighlightRing(isDark, highlightTone)
  const highlightTextColor = getToneTextColor(isDark, highlightTone)

  return (
    <div
      className={`rounded-xl p-5 space-y-3 ${className}`}
      style={{
        background: menuBg,
        border: menuBorder,
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6)'
          : '0 20px 60px rgba(147,51,234,0.12)',
      }}
    >
      <h3
        className="text-center text-base font-bold mb-4"
        style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
      >
        {title}
      </h3>
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-4 py-3 rounded-lg text-sm font-medium text-center cursor-default ${
            highlightItemId === item.id ? highlightRing : ''
          }`}
          style={{
            background: itemBg,
            border: itemBorder,
            color: highlightItemId === item.id ? highlightTextColor : textColor,
          }}
        >
          {item.label}
        </div>
      ))}
      {showCancelButton && (
        <div className="flex justify-center pt-2">
          <div
            className="px-4 py-2 rounded-lg text-sm font-medium cursor-default"
            style={{
              background: isDark ? 'rgba(127,29,29,0.5)' : 'rgba(185,28,28,0.1)',
              border: isDark
                ? '1px solid rgba(239,68,68,0.3)'
                : '1px solid rgba(185,28,28,0.2)',
              color: isDark ? '#fca5a5' : '#991b1b',
            }}
          >
            取消
          </div>
        </div>
      )}
    </div>
  )
}

export function MockInteractiveSelectionMenu({
  isDark,
  title,
  items,
  activeItemId,
  onSelect,
  onItemHover,
  showCancelButton = false,
  className = 'max-w-sm mx-auto',
}: {
  isDark: boolean
  title: string
  items: Array<{ id: string; label: string; accent: string }>
  activeItemId: string | null
  onSelect: (id: string) => void
  onItemHover?: (id: string) => void
  showCancelButton?: boolean
  className?: string
}) {
  const menuBg = isDark
    ? 'linear-gradient(135deg, #1a1b20, #222328)'
    : 'linear-gradient(135deg, #fefcff, #f5f0ff)'
  const menuBorder = isDark
    ? '1px solid rgba(107,114,128,0.35)'
    : '1px solid rgba(147,51,234,0.15)'
  const textColor = isDark ? '#e5e7eb' : '#334155'

  return (
    <div
      className={`rounded-xl p-5 space-y-3 ${className}`}
      style={{
        background: menuBg,
        border: menuBorder,
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6)'
          : '0 20px 60px rgba(147,51,234,0.12)',
      }}
    >
      <h3
        className="text-center text-base font-bold mb-4"
        style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
      >
        {title}
      </h3>
      {items.map((item) => {
        const isActive = activeItemId === item.id
        const itemBg = isActive
          ? isDark
            ? `rgba(${hexToRgb(item.accent)},0.12)`
            : `rgba(${hexToRgb(item.accent)},0.07)`
          : isDark
          ? '#2b2d31'
          : '#ffffff'
        const itemBorder = isActive
          ? `1px solid ${item.accent}`
          : isDark
          ? '1px solid rgba(107,114,128,0.3)'
          : '1px solid rgba(147,51,234,0.1)'

        return (
          <div
            key={item.id}
            className="px-4 py-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200"
            style={{
              background: itemBg,
              border: itemBorder,
              color: isActive ? item.accent : textColor,
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isActive
                ? isDark
                  ? `0 0 20px rgba(${hexToRgb(item.accent)},0.15)`
                  : `0 0 20px rgba(${hexToRgb(item.accent)},0.1)`
                : 'none',
            }}
            onMouseEnter={onItemHover ? () => onItemHover(item.id) : undefined}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </div>
        )
      })}
      {showCancelButton && (
        <div className="flex justify-center pt-2">
          <div
            className="px-4 py-2 rounded-lg text-sm font-medium cursor-default"
            style={{
              background: isDark ? 'rgba(127,29,29,0.5)' : 'rgba(185,28,28,0.1)',
              border: isDark
                ? '1px solid rgba(239,68,68,0.3)'
                : '1px solid rgba(185,28,28,0.2)',
              color: isDark ? '#fca5a5' : '#991b1b',
            }}
          >
            取消
          </div>
        </div>
      )}
    </div>
  )
}

export function MockPromptListRow({
  isDark,
  emoji,
  label,
  enabled,
  highlight,
  onEditHighlight,
  toggleHighlightTooltip,
  highlightEnabledToggleTone,
  tone = 'purple',
}: {
  isDark: boolean
  emoji: string
  label: string
  enabled: boolean
  highlight?: boolean
  onEditHighlight?: boolean
  toggleHighlightTooltip?: string
  highlightEnabledToggleTone?: PromptTone
  tone?: PromptTone
}) {
  const palette = promptToneMap[tone]
  const highlightedTogglePalette = highlightEnabledToggleTone
    ? promptToneMap[highlightEnabledToggleTone]
    : null

  return (
    <div
      className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200"
      style={{
        background: highlight
          ? isDark
            ? palette.highlightBgDark
            : palette.highlightBgLight
          : isDark
            ? 'rgba(30,30,40,0.6)'
            : 'rgba(250,245,255,0.6)',
        border: highlight
          ? isDark
            ? palette.highlightBorderDark
            : palette.highlightBorderLight
          : isDark
            ? '1px solid rgba(107,114,128,0.2)'
            : '1px solid rgba(147,51,234,0.08)',
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="text-[9px] shrink-0"
          style={{ color: isDark ? '#fbbf24' : '#d97706' }}
        >
          ✱
        </span>
        <span
          className="text-xs truncate"
          style={{ color: isDark ? '#e5e7eb' : '#334155' }}
        >
          {emoji}
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link2Off
          size={14}
          strokeWidth={1.8}
          style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
        />
        <div className="relative group">
          <PenLine
            size={14}
            strokeWidth={1.8}
            style={{
              color: onEditHighlight
                ? isDark
                  ? palette.editActiveDark
                  : palette.editActiveLight
                : isDark
                  ? '#6b7280'
                  : '#94a3b8',
            }}
          />
          {onEditHighlight && (
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: isDark ? palette.tooltipBgDark : palette.tooltipBgLight,
                color: '#fff',
              }}
            >
              点击编辑
            </div>
          )}
        </div>
        <div className="relative group">
          {enabled ? (
            <ToggleRight
              size={20}
              style={{
                color: highlight && highlightedTogglePalette
                  ? isDark
                    ? highlightedTogglePalette.editActiveDark
                    : highlightedTogglePalette.editActiveLight
                  : isDark
                    ? '#a855f7'
                    : '#9333ea',
              }}
            />
          ) : (
            <ToggleLeft
              size={20}
              style={{ color: isDark ? '#4b5563' : '#94a3b8' }}
            />
          )}
          {toggleHighlightTooltip && highlight && (
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: isDark ? palette.tooltipBgDark : palette.tooltipBgLight,
                color: '#fff',
              }}
            >
              {toggleHighlightTooltip}
            </div>
          )}
        </div>
        <span
          className="text-xs font-mono"
          style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
        >
          -
        </span>
      </div>
    </div>
  )
}

export function MockPromptListColumns({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-3 py-1"
      style={{
        borderBottom: isDark
          ? '1px solid rgba(107,114,128,0.2)'
          : '1px solid rgba(147,51,234,0.08)',
      }}
    >
      <span className="text-xs font-medium" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
        名称
      </span>
      <span className="text-xs font-medium" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
        词符
      </span>
    </div>
  )
}

export function MockPromptEditDialogHeader({
  isDark,
  name,
  tone = 'purple',
}: {
  isDark: boolean
  name: string
  tone?: PromptTone
}) {
  const fieldBg = isDark ? '#0b0c0f' : '#ffffff'
  const fieldBorder = isDark
    ? 'rgba(107,114,128,0.3)'
    : 'rgba(147,51,234,0.15)'
  const labelColor = isDark ? '#e5e7eb' : '#334155'
  const titleColor = tone === 'pink'
    ? isDark
      ? '#f472b6'
      : '#db2777'
    : isDark
      ? '#c084fc'
      : '#7e22ce'

  return (
    <>
      <h3
        className="text-lg font-bold"
        style={{ color: titleColor }}
      >
        编辑
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            姓名
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs truncate"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? '#d1d5db' : '#475569',
            }}
          >
            {name}
          </div>
        </div>
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            角色
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? '#d1d5db' : '#475569',
            }}
          >
            系统
          </div>
        </div>
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            触发器
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? '#6b7280' : '#94a3b8',
            }}
          >
            All types (default)
          </div>
        </div>
      </div>
    </>
  )
}

export function MockPromptEditDialogActions({
  isDark,
  highlightSave,
}: {
  isDark: boolean
  highlightSave?: boolean
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-default"
        style={{
          background: isDark ? '#2b2d31' : '#f1f5f9',
          color: isDark ? '#9ca3af' : '#64748b',
        }}
      >
        ✕
      </div>
      <div className="relative group">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-default ${
            highlightSave
              ? isDark
                ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
                : 'ring-2 ring-green-500 ring-offset-2 ring-offset-white animate-pulse'
              : ''
          }`}
          style={{
            background: isDark ? '#2b2d31' : '#f1f5f9',
            color: highlightSave
              ? isDark
                ? '#4ade80'
                : '#16a34a'
              : isDark
                ? '#9ca3af'
                : '#64748b',
          }}
        >
          <Save size={16} />
        </div>
        {highlightSave && (
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: isDark ? '#22c55e' : '#16a34a',
              color: '#fff',
            }}
          >
            保存编辑
          </div>
        )}
      </div>
    </div>
  )
}

export function TutorialInlineCode({
  children,
  isDark,
  tone = 'purple',
}: {
  children: React.ReactNode
  isDark: boolean
  tone?: PromptTone
}) {
  const palette = promptToneMap[tone]

  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{
        background: isDark ? palette.codeBgDark : palette.codeBgLight,
        color: isDark ? palette.codeTextDark : palette.codeTextLight,
      }}
    >
      {children}
    </code>
  )
}
