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
