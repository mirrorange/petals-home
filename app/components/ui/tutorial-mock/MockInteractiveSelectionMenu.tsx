import { hexToRgb } from '../TutorialColorUtils'

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
