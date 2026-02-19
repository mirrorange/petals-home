import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router'
import { Home, Sparkles, BookOpen, Info, ExternalLink } from 'lucide-react'
import PetalsIcon from '~/components/ui/PetalsIcon'
import ThemeToggle from '~/components/ui/ThemeToggle'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

/* ── Navigation items ── */
const navLinks = [
  { to: '/', label: '首页', icon: Home },
  { to: '/#features', label: '功能特性', icon: Sparkles },
  { to: '/tutorials', label: '使用教程', icon: BookOpen },
  { to: '/about', label: '关于花瓣', icon: Info },
] as const

const externalLink = {
  href: 'https://discord.com/channels/1134557553011998840/1333735046120476686',
  label: '发布页',
  icon: ExternalLink,
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
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
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <PetalsIcon
              title="花瓣预设图标"
              className={`w-5 h-5 transition-colors duration-300 ${scrolled ? 'text-freesia-500' : 'text-freesia-400'}`}
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
          </Link>

          {/* Desktop nav links — absolutely centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-slate-500 dark:text-slate-400
                  hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href={externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-500 dark:text-slate-400
                hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors"
            >
              {externalLink.label}
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Mobile hamburger button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
                bg-white/60 hover:bg-white/90 shadow-lg shadow-freesia-200/30 border border-freesia-200/40
                dark:bg-dark-surface/80 dark:hover:bg-dark-surface dark:shadow-freesia-900/30 dark:border-freesia-700/30
                hover:scale-110 active:scale-95 backdrop-blur-sm`}
              aria-label={mobileOpen ? '关闭导航菜单' : '打开导航菜单'}
              aria-expanded={mobileOpen}
            >
              {/* Animated hamburger → X */}
              <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
                <span
                  className="block h-[2px] rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: isDark
                      ? 'linear-gradient(90deg, #c084fc, #f472b6)'
                      : 'linear-gradient(90deg, #9333ea, #ec4899)',
                    transform: mobileOpen
                      ? 'translateY(6px) rotate(45deg)'
                      : 'translateY(0) rotate(0)',
                  }}
                />
                <span
                  className="block h-[2px] rounded-full transition-all duration-300"
                  style={{
                    background: isDark
                      ? 'linear-gradient(90deg, #c084fc, #f472b6)'
                      : 'linear-gradient(90deg, #9333ea, #ec4899)',
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                <span
                  className="block h-[2px] rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: isDark
                      ? 'linear-gradient(90deg, #c084fc, #f472b6)'
                      : 'linear-gradient(90deg, #9333ea, #ec4899)',
                    transform: mobileOpen
                      ? 'translateY(-6px) rotate(-45deg)'
                      : 'translateY(0) rotate(0)',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer Overlay ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'rgba(10, 8, 21, 0.85)'
              : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={closeMobile}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] max-w-[85vw] transition-transform duration-400 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(17, 14, 31, 0.98), rgba(10, 8, 21, 0.98))'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(254, 252, 255, 0.98))',
            borderLeft: isDark
              ? '1px solid rgba(168, 85, 247, 0.15)'
              : '1px solid rgba(168, 85, 247, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: isDark
              ? '-8px 0 40px rgba(0, 0, 0, 0.5)'
              : '-8px 0 40px rgba(147, 51, 234, 0.08)',
          }}
        >
          {/* Decorative gradient accent line */}
          <div
            className="absolute top-0 left-0 w-[1px] h-full"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.3), rgba(244, 114, 182, 0.3), transparent)'
                : 'linear-gradient(180deg, transparent, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15), transparent)',
            }}
          />

          {/* Decorative top glow */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse at top right, rgba(168, 85, 247, 0.1), transparent 70%)'
                : 'radial-gradient(ellipse at top right, rgba(168, 85, 247, 0.06), transparent 70%)',
            }}
          />

          <div className="relative flex flex-col h-full pt-24 pb-8 px-6">
            {/* Navigation links */}
            <div className="flex-1 space-y-1.5">
              {navLinks.map(({ to, label, icon: Icon }, index) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMobile}
                  className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300
                    text-slate-600 dark:text-slate-300
                    hover:text-freesia-700 dark:hover:text-freesia-200
                    hover:bg-freesia-100/60 dark:hover:bg-freesia-900/25
                    active:scale-[0.98]"
                  style={{
                    transitionDelay: mobileOpen ? `${index * 50 + 100}ms` : '0ms',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                      bg-freesia-100/50 dark:bg-freesia-900/20
                      group-hover:bg-freesia-200/70 dark:group-hover:bg-freesia-800/30
                      group-hover:shadow-md group-hover:shadow-freesia-200/20 dark:group-hover:shadow-freesia-900/20"
                    style={{
                      border: isDark
                        ? '1px solid rgba(168, 85, 247, 0.12)'
                        : '1px solid rgba(168, 85, 247, 0.08)',
                    }}
                  >
                    <Icon className="w-4 h-4 text-freesia-500 dark:text-freesia-400 transition-colors
                      group-hover:text-freesia-600 dark:group-hover:text-freesia-300" />
                  </span>
                  <span>{label}</span>
                </Link>
              ))}

              {/* Divider */}
              <div
                className="mx-4 my-3"
                style={{
                  height: '1px',
                  background: isDark
                    ? 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.15), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.1), transparent)',
                  opacity: mobileOpen ? 1 : 0,
                  transition: 'opacity 300ms ease',
                  transitionDelay: mobileOpen ? '350ms' : '0ms',
                }}
              />

              {/* External link */}
              <a
                href={externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300
                  text-slate-600 dark:text-slate-300
                  hover:text-freesia-700 dark:hover:text-freesia-200
                  hover:bg-freesia-100/60 dark:hover:bg-freesia-900/25
                  active:scale-[0.98]"
                style={{
                  transitionDelay: mobileOpen ? '400ms' : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                    bg-freesia-100/50 dark:bg-freesia-900/20
                    group-hover:bg-freesia-200/70 dark:group-hover:bg-freesia-800/30
                    group-hover:shadow-md group-hover:shadow-freesia-200/20 dark:group-hover:shadow-freesia-900/20"
                  style={{
                    border: isDark
                      ? '1px solid rgba(168, 85, 247, 0.12)'
                      : '1px solid rgba(168, 85, 247, 0.08)',
                  }}
                >
                  <externalLink.icon className="w-4 h-4 text-freesia-500 dark:text-freesia-400 transition-colors
                    group-hover:text-freesia-600 dark:group-hover:text-freesia-300" />
                </span>
                <span>{externalLink.label}</span>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-300 dark:text-slate-600" />
              </a>
            </div>

            {/* Bottom branding */}
            <div
              className="mt-auto pt-6"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transition: 'opacity 400ms ease',
                transitionDelay: mobileOpen ? '500ms' : '0ms',
              }}
            >
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(244, 114, 182, 0.06))'
                    : 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(244, 114, 182, 0.04))',
                  border: isDark
                    ? '1px solid rgba(168, 85, 247, 0.1)'
                    : '1px solid rgba(168, 85, 247, 0.06)',
                }}
              >
                <PetalsIcon className="w-4 h-4 text-freesia-400 dark:text-freesia-500" />
                <span
                  className="text-xs font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(135deg, #c084fc, #f472b6)'
                      : 'linear-gradient(135deg, #9333ea, #ec4899)',
                  }}
                >
                  Petals Preset
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-auto font-mono">
                  v5.3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

