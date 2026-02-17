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
