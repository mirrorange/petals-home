import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import ThemeToggle from '~/components/ui/ThemeToggle'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'py-3 bg-white/70 dark:bg-dark-bg/70 backdrop-blur-xl shadow-lg shadow-freesia-200/10 dark:shadow-freesia-900/10 border-b border-freesia-200/20 dark:border-freesia-800/20'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 relative flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <Sparkles className={`w-5 h-5 transition-colors duration-300
            ${scrolled ? 'text-freesia-500' : 'text-freesia-400'}`}
          />
          <span
            className="text-lg font-bold bg-clip-text text-transparent transition-all"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(135deg, #e9d5ff, #f472b6)'
                : 'linear-gradient(135deg, #701a75, #ec4899)',
            }}
          >
            花瓣预设
          </span>
        </a>

        {/* Nav links — absolutely centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <a href="#features" className="text-sm font-medium text-slate-500 dark:text-slate-400
            hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors">
            功能特性
          </a>
          <a
            href="https://discord.com/channels/1134557553011998840/1333735046120476686"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 dark:text-slate-400
              hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors"
          >
            发布页
          </a>
        </div>

        {/* Theme toggle */}
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </nav>
  )
}
