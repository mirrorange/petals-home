import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
        bg-white/60 hover:bg-white/90 shadow-lg shadow-freesia-200/30 border border-freesia-200/40
        dark:bg-dark-surface/80 dark:hover:bg-dark-surface dark:shadow-freesia-900/30 dark:border-freesia-700/30
        hover:scale-110 active:scale-95 backdrop-blur-sm"
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-freesia-600 transition-all duration-300
            ${isDark ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
        />
      </div>
    </button>
  )
}
