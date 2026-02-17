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
