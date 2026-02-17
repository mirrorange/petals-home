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
