import { Link2Off, PenLine, ToggleLeft, ToggleRight } from 'lucide-react'
import { promptToneMap, type PromptTone } from '../tutorial'

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
