import { buildHighlightRing, getToneTextColor, type HighlightTone } from './theme'

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
