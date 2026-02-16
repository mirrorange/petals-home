import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '~/components/sections/Navbar'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'

export interface TutorialStepItem {
  title: string
  desc: string
}

function clampStep(stepIndex: number, totalSteps: number) {
  if (totalSteps <= 0) return 0
  return Math.max(0, Math.min(totalSteps - 1, stepIndex))
}

export function useTutorialTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('petals-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    setIsDark(isCurrentlyDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('petals-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return { isDark, toggleTheme }
}

export function useTutorialStepQuery(totalSteps: number, paramKey = 'step') {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentStep = useMemo(() => {
    const rawStep = searchParams.get(paramKey)
    if (!rawStep) return 0

    const parsed = Number(rawStep)
    if (!Number.isInteger(parsed)) return 0

    // Query parameter is 1-based (?step=1 is the first step).
    return clampStep(parsed - 1, totalSteps)
  }, [paramKey, searchParams, totalSteps])

  const setCurrentStep = useCallback(
    (stepIndex: number) => {
      const nextStep = clampStep(stepIndex, totalSteps)
      const nextParams = new URLSearchParams(searchParams)

      if (nextStep <= 0) {
        nextParams.delete(paramKey)
      } else {
        nextParams.set(paramKey, String(nextStep + 1))
      }

      setSearchParams(nextParams)
    },
    [paramKey, searchParams, setSearchParams, totalSteps],
  )

  return { currentStep, setCurrentStep }
}

export function TutorialPageShell({
  isDark,
  onToggleTheme,
  children,
}: {
  isDark: boolean
  onToggleTheme: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-dark-bg text-slate-200' : 'bg-[#fefcff] text-slate-800'
      }`}
    >
      <FloatingPetals />
      <Navbar isDark={isDark} onToggleTheme={onToggleTheme} />

      <div className="pt-28" />

      <div className="max-w-5xl mx-auto px-4 pb-24">{children}</div>

      <FooterSection />
    </div>
  )
}

export function TutorialPageHeader({
  isDark,
  badgeIcon,
  badgeLabel,
  title,
  description,
}: {
  isDark: boolean
  badgeIcon: React.ReactNode
  badgeLabel: string
  title: string
  description: string
}) {
  return (
    <>
      <Link
        to="/tutorials"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8
          text-slate-500 dark:text-slate-400
          hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回教程目录
      </Link>

      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4
            bg-freesia-100/80 text-freesia-700 border border-freesia-200/50
            dark:bg-freesia-900/30 dark:text-freesia-300 dark:border-freesia-700/30"
        >
          {badgeIcon}
          {badgeLabel}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(135deg, #e9d5ff, #c084fc, #f472b6)'
                : 'linear-gradient(135deg, #701a75, #9333ea, #ec4899)',
            }}
          >
            {title}
          </span>
        </h1>
        <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          {description}
        </p>
      </div>
    </>
  )
}

export function TutorialStepNavigator({
  isDark,
  steps,
  currentStep,
  onStepChange,
  children,
}: {
  isDark: boolean
  steps: TutorialStepItem[]
  currentStep: number
  onStepChange: (stepIndex: number) => void
  children: React.ReactNode
}) {
  return (
    <>
      <div
        className="rounded-2xl p-5 mb-8"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.5))',
          border: isDark
            ? '1px solid rgba(147,51,234,0.15)'
            : '1px solid rgba(147,51,234,0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(147,51,234,0.06)',
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => onStepChange(idx)}
              className="group relative cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500"
                style={{
                  background:
                    idx === currentStep
                      ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                      : idx < currentStep
                      ? isDark
                        ? 'rgba(147,51,234,0.2)'
                        : 'rgba(147,51,234,0.1)'
                      : isDark
                      ? 'rgba(107,114,128,0.15)'
                      : 'rgba(148,163,184,0.1)',
                  color:
                    idx === currentStep
                      ? '#ffffff'
                      : idx < currentStep
                      ? isDark
                        ? '#c084fc'
                        : '#9333ea'
                      : isDark
                      ? '#6b7280'
                      : '#94a3b8',
                  border:
                    idx === currentStep
                      ? 'none'
                      : idx < currentStep
                      ? isDark
                        ? '1px solid rgba(147,51,234,0.3)'
                        : '1px solid rgba(147,51,234,0.2)'
                      : isDark
                      ? '1px solid rgba(107,114,128,0.2)'
                      : '1px solid rgba(148,163,184,0.15)',
                  boxShadow:
                    idx === currentStep
                      ? '0 4px 15px rgba(147,51,234,0.3)'
                      : 'none',
                  transform: idx === currentStep ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {idx < currentStep ? <CheckCircle size={18} /> : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="absolute top-1/2 left-full -translate-y-1/2 w-3 h-0.5 pointer-events-none hidden sm:block"
                  style={{
                    background:
                      idx < currentStep
                        ? isDark
                          ? '#7e22ce'
                          : '#c084fc'
                        : isDark
                        ? 'rgba(107,114,128,0.2)'
                        : 'rgba(148,163,184,0.2)',
                  }}
                />
              )}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium"
                style={{ color: isDark ? '#9ca3af' : '#64748b' }}
              >
                {step.title}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-1 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{
                background:
                  idx <= currentStep
                    ? 'linear-gradient(90deg, #9333ea, #ec4899)'
                    : isDark
                    ? 'rgba(107,114,128,0.15)'
                    : 'rgba(148,163,184,0.15)',
              }}
            />
          ))}
        </div>

        <div className="mb-1">
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
          >
            {steps[currentStep].title}
          </h2>
          <p className="text-sm mt-1" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
            步骤 {currentStep + 1} / {steps.length} · {steps[currentStep].desc}
          </p>
        </div>
      </div>

      <div
        key={currentStep}
        className="mb-8"
        style={{
          animation: 'fadeSlideIn 0.4s ease-out forwards',
        }}
      >
        {children}
      </div>

      <div
        className="flex justify-between items-center pt-6"
        style={{
          borderTop: isDark
            ? '1px solid rgba(107,114,128,0.2)'
            : '1px solid rgba(147,51,234,0.08)',
        }}
      >
        <button
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
            currentStep === 0
              ? 'opacity-30 cursor-not-allowed'
              : isDark
              ? 'text-slate-300 hover:bg-white/5'
              : 'text-slate-600 hover:bg-freesia-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          上一步
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => onStepChange(Math.min(steps.length - 1, currentStep + 1))}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all cursor-pointer
              hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #9333ea, #c026d3, #ec4899)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
              boxShadow: '0 4px 15px rgba(147,51,234,0.25)',
            }}
          >
            下一步
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to="/tutorials"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all
              hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              boxShadow: '0 4px 15px rgba(34,197,94,0.25)',
            }}
          >
            返回教程目录
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
