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
