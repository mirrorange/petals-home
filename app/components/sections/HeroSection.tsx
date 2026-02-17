import { Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import PetalsIcon from '../ui/PetalsIcon'

interface HeroSectionProps {
  isDark: boolean
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-glow-pulse"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] animate-glow-pulse"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)',
            animationDelay: '1.5s',
          }}
        />
      </div>

      {/* Decorative dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(rgba(168,85,247,0.08) 1px, transparent 1px)'
            : 'radial-gradient(rgba(147,51,234,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="animate-slide-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          bg-freesia-100/80 text-freesia-700 border border-freesia-200/50
          dark:bg-freesia-900/30 dark:text-freesia-300 dark:border-freesia-700/30
          backdrop-blur-sm shadow-lg shadow-freesia-200/20 dark:shadow-freesia-900/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>SillyTavern 预设</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-freesia-500/15 text-freesia-600 dark:text-freesia-300 border border-freesia-300/30 dark:border-freesia-600/30">
            V5.2
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-slide-up-delayed text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6">
          <span className="block bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 30%, #f472b6 60%, #fda4af 100%)'
                : 'linear-gradient(135deg, #701a75 0%, #9333ea 30%, #ec4899 60%, #f472b6 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 8s ease infinite',
            }}
          >
            花瓣预设
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl font-light mt-2 tracking-wide
            text-slate-600 dark:text-slate-300"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Petals Preset
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up-delayed-2 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed
          text-slate-500 dark:text-slate-400 font-light">
          与小苍兰一起写故事吧。
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up-delayed-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/tutorials/quick-start"
            id="cta-quickstart"
            className="group relative px-8 py-3.5 rounded-full text-white font-semibold text-base overflow-hidden
              transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer
              shadow-lg shadow-freesia-500/25 dark:shadow-freesia-500/15"
            style={{
              background: 'linear-gradient(135deg, #9333ea, #c026d3, #ec4899)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #d946ef, #f472b6)',
              }}
            />
            <span className="relative flex items-center gap-2">
              <PetalsIcon className="w-4 h-4" />
              快速开始
            </span>
          </Link>

          <a
            id="cta-releases"
            href="https://discord.com/channels/1134557553011998840/1333735046120476686"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300
              hover:scale-105 active:scale-95
              text-freesia-700 dark:text-freesia-300
              bg-white/70 dark:bg-dark-surface/50
              border border-freesia-200/60 dark:border-freesia-700/30
              hover:border-freesia-300 dark:hover:border-freesia-600
              hover:bg-white dark:hover:bg-dark-surface/80
              shadow-lg shadow-freesia-200/20 dark:shadow-freesia-900/10
              backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              查看发布页
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
        </div>

      </div>

      {/* Scroll hint — positioned relative to the section, not the content */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float opacity-60">
        <span className="text-xs text-slate-400 dark:text-slate-500">向下滚动</span>
        <svg className="w-5 h-5 text-freesia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
