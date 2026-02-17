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
