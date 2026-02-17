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
