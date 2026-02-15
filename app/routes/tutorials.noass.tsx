import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  Download,
  FileDown,
  ChevronUp,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Globe,
  Puzzle,
} from 'lucide-react'
import type { Route } from './+types/tutorials.noass'
import Navbar from '~/components/sections/Navbar'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'
import {
  STPanel,
  STNavbar,
  STLabel,
  STCheckbox,
  STInput,
  GuideStepCard,
  SimulationBadge,
} from '~/components/ui/TutorialComponents'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'NoAss 插件配置（DeepSeek）教程 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设 NoAss 插件安装与配置教程（仅 DeepSeek）— 跟着模拟 UI 一步步完成 NoAss 插件安装与 Petals V5 预设导入。',
    },
  ]
}

/* ───────────────────────── Mock Extension-specific UI ───────────────────────── */

/** Mock: 扩展页顶部横幅 */
function MockExtensionBar({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 rounded-lg"
      style={{
        background: isDark ? '#18191e' : '#f0ecf9',
        border: isDark
          ? '1px solid rgba(107,114,128,0.3)'
          : '1px solid rgba(147,51,234,0.12)',
      }}
    >
      <span
        className="text-sm font-bold tracking-wide"
        style={{ color: isDark ? '#e5e7eb' : '#1e1b4b' }}
      >
        扩展
      </span>
      <div className="flex items-center gap-3">
        <STCheckbox label="在扩展更新时通知" checked={false} isDark={isDark} />
        <MockBarButton isDark={isDark} icon={<Puzzle size={14} />} label="管理扩展" />
        <MockBarButton isDark={isDark} icon={<Download size={14} />} label="安装扩展" highlight />
      </div>
    </div>
  )
}

function MockBarButton({
  isDark,
  icon,
  label,
  highlight,
}: {
  isDark: boolean
  icon: React.ReactNode
  label: string
  highlight?: boolean
}) {
  const highlightRing = highlight
    ? isDark
      ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-red-500 ring-offset-2 ring-offset-white animate-pulse'
    : ''

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium cursor-default ${highlightRing}`}
      style={{
        background: isDark ? '#2b2d31' : '#ffffff',
        border: isDark ? '1px solid rgba(107,114,128,0.4)' : '1px solid rgba(107,114,128,0.2)',
        color: isDark ? '#d1d5db' : '#374151',
      }}
    >
      {icon}
      {label}
    </div>
  )
}

/** Mock: Git URL 安装扩展弹窗 */
function MockInstallDialog({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="rounded-xl p-6 space-y-5 max-w-md mx-auto"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1a1b20, #222328)'
          : 'linear-gradient(135deg, #fefcff, #f5f0ff)',
        border: isDark
          ? '1px solid rgba(107,114,128,0.35)'
          : '1px solid rgba(147,51,234,0.15)',
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6)'
          : '0 20px 60px rgba(147,51,234,0.12)',
      }}
    >
      {/* Title */}
      <h3
        className="text-center text-base font-bold"
        style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
      >
        输入扩展程序的 Git URL 以安装
      </h3>

      {/* Disclaimer */}
      <div
        className="text-xs leading-relaxed text-center"
        style={{ color: isDark ? '#f87171' : '#dc2626' }}
      >
        <span className="font-bold">免责声明：</span>使用外部的扩展程序可能存在意料外的副作用和安全隐患。在导入扩展程序前，请一定确认其来源可信。我们不为第三方扩展程序造成的任何损失负责。
      </div>

      {/* Example */}
      <div
        className="text-xs text-center"
        style={{ color: isDark ? '#9ca3af' : '#64748b' }}
      >
        例：https://github.com/author/extension-name
      </div>

      {/* URL Input */}
      <div
        className="px-3 py-2.5 rounded-lg font-mono text-sm"
        style={{
          background: isDark ? '#0b0c0f' : '#ffffff',
          border: isDark
            ? '1px solid rgba(234,179,8,0.5)'
            : '1px solid rgba(234,179,8,0.4)',
          color: isDark ? '#e5e7eb' : '#334155',
          boxShadow: isDark
            ? '0 0 12px rgba(234,179,8,0.1)'
            : '0 0 12px rgba(234,179,8,0.08)',
        }}
      >
        https://gitgud.io/Monblant/noass
      </div>

      {/* Branch input */}
      <div>
        <div className="text-xs text-center mb-1.5" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
          Branch or tag name (optional)
        </div>
        <div
          className="px-3 py-2 rounded-lg text-sm"
          style={{
            background: isDark ? '#0b0c0f' : '#ffffff',
            border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.12)',
            color: isDark ? '#6b7280' : '#94a3b8',
          }}
        >
          e.g. main, dev, v1.0.0
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 pt-1">
        <MockDialogButton isDark={isDark} label="Install for all users" />
        <MockDialogButton isDark={isDark} label="Install just for me" primary />
        <MockDialogButton isDark={isDark} label="取消" />
      </div>
    </div>
  )
}

function MockDialogButton({
  isDark,
  label,
  primary,
}: {
  isDark: boolean
  label: string
  primary?: boolean
}) {
  return (
    <div
      className="px-3.5 py-2 rounded text-xs font-medium cursor-default"
      style={{
        background: primary
          ? isDark
            ? 'rgba(127,29,29,0.6)'
            : 'rgba(185,28,28,0.12)'
          : isDark
          ? '#2b2d31'
          : '#f1f5f9',
        border: primary
          ? isDark
            ? '1px solid rgba(239,68,68,0.4)'
            : '1px solid rgba(185,28,28,0.25)'
          : isDark
          ? '1px solid rgba(107,114,128,0.35)'
          : '1px solid rgba(107,114,128,0.15)',
        color: primary
          ? isDark
            ? '#fca5a5'
            : '#991b1b'
          : isDark
          ? '#d1d5db'
          : '#475569',
      }}
    >
      {label}
    </div>
  )
}

/** Mock: NoAss Settings 面板 */
function MockNoAssSettings({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-0">
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 rounded-t-xl"
        style={{
          background: isDark ? '#18191e' : '#f0ecf9',
          border: isDark
            ? '1px solid rgba(107,114,128,0.3)'
            : '1px solid rgba(147,51,234,0.12)',
        }}
      >
        <span
          className="text-sm font-bold"
          style={{ color: isDark ? '#e5e7eb' : '#1e1b4b' }}
        >
          NoAss settings
        </span>
        <ChevronUp size={18} style={{ color: isDark ? '#9ca3af' : '#64748b' }} />
      </div>

      {/* Checkboxes area */}
      <div
        className="px-4 py-3 space-y-0"
        style={{
          background: isDark ? '#1e1f24' : '#f8f6ff',
          borderLeft: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.12)',
          borderRight: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.12)',
        }}
      >
        <STCheckbox label="Enable NoAss" checked={true} highlight={true} highlightColor="pink" isDark={isDark} />
        <STCheckbox label="Enable Insertable Prefill" checked={false} isDark={isDark} />
        <STCheckbox label="Separate Chat History" checked={false} isDark={isDark} />
      </div>

      {/* Preset area */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-b-xl"
        style={{
          background: isDark ? '#1e1f24' : '#f8f6ff',
          border: isDark
            ? '1px solid rgba(107,114,128,0.3)'
            : '1px solid rgba(147,51,234,0.12)',
        }}
      >
        <span
          className="text-sm font-bold whitespace-nowrap"
          style={{ color: isDark ? '#e5e7eb' : '#1e1b4b' }}
        >
          NoAss Preset:
        </span>
        <div className="w-32">
          <STInput value="Petals V5" isDark={isDark} />
        </div>
        <div className="flex gap-1">
          <MockSmallButton isDark={isDark} icon={<Plus size={14} />} />
          <MockSmallButton isDark={isDark} icon={<FileDown size={14} />} highlight="yellow" />
          <MockSmallButton isDark={isDark} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
            </svg>
          } />
          <MockSmallButton isDark={isDark} icon={<Trash2 size={14} />} danger />
        </div>
      </div>
    </div>
  )
}

function MockSmallButton({
  isDark,
  icon,
  highlight,
  danger,
}: {
  isDark: boolean
  icon: React.ReactNode
  highlight?: string
  danger?: boolean
}) {
  const highlightRing = highlight === 'yellow'
    ? isDark
      ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white animate-pulse'
    : ''

  return (
    <div
      className={`p-1.5 rounded cursor-default flex items-center justify-center ${highlightRing}`}
      style={{
        background: danger
          ? isDark
            ? 'rgba(127,29,29,0.5)'
            : 'rgba(185,28,28,0.1)'
          : isDark
          ? '#2b2d31'
          : '#ffffff',
        border: danger
          ? isDark
            ? '1px solid rgba(239,68,68,0.3)'
            : '1px solid rgba(185,28,28,0.2)'
          : isDark
          ? '1px solid rgba(107,114,128,0.35)'
          : '1px solid rgba(107,114,128,0.15)',
        color: danger
          ? isDark
            ? '#fca5a5'
            : '#991b1b'
          : isDark
          ? '#9ca3af'
          : '#64748b',
      }}
    >
      {icon}
    </div>
  )
}

/* ───────────────────────── Step content builders ───────────────────────── */

function StepInstallNoAss({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="进入扩展页面"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 7 个 <span className="font-semibold">扩展</span> 图标（盒子），进入扩展管理页面。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="点击安装扩展"
          accent="red"
          isDark={isDark}
          detail={
            <>
              在扩展页面顶部栏找到{' '}
              <span className="font-semibold" style={{ color: isDark ? '#fca5a5' : '#dc2626' }}>
                安装扩展
              </span>{' '}
              按钮并点击，将弹出安装弹窗。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="输入 NoAss 的 Git URL"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在弹窗的输入框中粘贴以下地址：
              <code
                className="block mt-2 px-2 py-1.5 rounded text-xs font-mono leading-relaxed break-all"
                style={{
                  background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
                  color: isDark ? '#fbbf24' : '#b45309',
                }}
              >
                https://gitgud.io/Monblant/noass
              </code>
            </>
          }
          tip="点击 Install just for me 或 Install for all users 完成安装。"
        />
      </div>

      <div className="space-y-4">
        {/* Simulation: Extension bar */}
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} />
          <STNavbar activeIndex={6} highlightIndex={6} highlightColor="red" isDark={isDark} />
          <MockExtensionBar isDark={isDark} />
        </STPanel>

        {/* Simulation: Install dialog */}
        <STPanel isDark={isDark} className="relative">
          <div
            className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-wider"
            style={{
              background: isDark ? '#18191e' : '#f8f6ff',
              color: isDark ? '#6b7280' : '#94a3b8',
            }}
          >
            Dialog
          </div>
          <MockInstallDialog isDark={isDark} />
        </STPanel>
      </div>
    </div>
  )
}

function StepConfigureNoAss({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="勾选 Enable NoAss"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              安装完成后，在扩展页面找到{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                NoAss settings
              </span>{' '}
              面板，勾选{' '}
              <span className="font-semibold" style={{ color: isDark ? '#f9a8d4' : '#be185d' }}>
                Enable NoAss
              </span>
              。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="导入 NoAss 预设"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在 <span className="font-semibold">NoAss Preset</span> 一行，点击黄色高亮的导入按钮，选择预设文件并导入{' '}
              <span className="font-semibold">Petals V5</span> 预设。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="选中 Petals V5 预设"
          accent="green"
          isDark={isDark}
          detail={
            <>
              导入完成后，在 NoAss Preset 下拉框中选择{' '}
              <span className="font-semibold">Petals V5</span>，确认其被选中为当前活跃预设。
            </>
          }
          tip="预设名称没出现则代表导入失败，请重试。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />
        <STNavbar activeIndex={6} highlightIndex={6} highlightColor="purple" isDark={isDark} />
        <MockNoAssSettings isDark={isDark} />
      </STPanel>
    </div>
  )
}

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <div className="text-center space-y-6 py-8">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
          color: '#22c55e',
          boxShadow: '0 0 0 4px rgba(34,197,94,0.08)',
        }}
      >
        <CheckCircle size={40} />
      </div>
      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          配置完成!
        </h3>
        <p className="max-w-xs mx-auto text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          NoAss 插件已配置就绪，现在可以在 DeepSeek 模型中享受 Petals 预设的完整体验了。
        </p>
      </div>
      <div
        className="p-4 rounded-xl text-left text-sm max-w-md mx-auto"
        style={{
          background: isDark ? '#202225' : '#ffffff',
          border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
          color: isDark ? '#9ca3af' : '#64748b',
        }}
      >
        <p className="font-bold mb-2" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
          💡 小提示:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>NoAss 仅在使用 <span className="text-purple-400 font-medium">DeepSeek</span> 系列模型时需要配置。</li>
          <li>如果安装扩展后页面没有变化，请尝试<span className="text-yellow-500 font-medium">刷新网页</span>。</li>
        </ul>
      </div>
    </div>
  )
}

/* ───────────────────────── Main Page ───────────────────────── */

interface Step {
  title: string
  desc: string
  content: (isDark: boolean) => React.ReactNode
}

const steps: Step[] = [
  {
    title: '安装 NoAss 插件',
    desc: '通过 Git URL 安装扩展',
    content: (isDark) => <StepInstallNoAss isDark={isDark} />,
  },
  {
    title: '配置 NoAss 插件',
    desc: '启用插件并导入预设',
    content: (isDark) => <StepConfigureNoAss isDark={isDark} />,
  },
  {
    title: '完成配置',
    desc: '开始使用',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function NoAssDeepSeek() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('petals-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    setIsDark(isCurrentlyDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('petals-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div
      className={`min-h-screen transition-colors duration-500
      ${isDark ? 'bg-dark-bg text-slate-200' : 'bg-[#fefcff] text-slate-800'}`}
    >
      <FloatingPetals />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Spacer for fixed nav */}
      <div className="pt-28" />

      {/* Main content area */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        {/* Back to tutorials button */}
        <Link
          to="/tutorials"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-8
            text-slate-500 dark:text-slate-400
            hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回教程目录
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4
            bg-freesia-100/80 text-freesia-700 border border-freesia-200/50
            dark:bg-freesia-900/30 dark:text-freesia-300 dark:border-freesia-700/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            NoAss 配置
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
              NoAss 插件配置
            </span>
          </h1>
          <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            跟着模拟 UI 完成 NoAss 插件安装与配置（仅 DeepSeek 模型需要）
          </p>
        </div>

        {/* Step indicator card */}
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
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3 mb-5">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
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
                {/* Connecting line */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute top-1/2 left-full -translate-y-1/2 w-3 h-0.5 pointer-events-none"
                    style={{
                      background: idx < currentStep
                        ? isDark ? '#7e22ce' : '#c084fc'
                        : isDark ? 'rgba(107,114,128,0.2)' : 'rgba(148,163,184,0.2)',
                    }}
                  />
                )}
                {/* Tooltip */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium"
                  style={{ color: isDark ? '#9ca3af' : '#64748b' }}
                >
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex gap-1 mb-6">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className="h-1 flex-1 rounded-full transition-all duration-500"
                style={{
                  background: idx <= currentStep
                    ? 'linear-gradient(90deg, #9333ea, #ec4899)'
                    : isDark
                    ? 'rgba(107,114,128,0.15)'
                    : 'rgba(148,163,184,0.15)',
                }}
              />
            ))}
          </div>

          {/* Step title */}
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

        {/* Step content with animation */}
        <div
          key={currentStep}
          className="mb-8"
          style={{
            animation: 'fadeSlideIn 0.4s ease-out forwards',
          }}
        >
          {steps[currentStep].content(isDark)}
        </div>

        {/* Navigation buttons */}
        <div
          className="flex justify-between items-center pt-6"
          style={{
            borderTop: isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(147,51,234,0.08)',
          }}
        >
          <button
            onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer
              ${currentStep === 0
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
              onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
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
      </div>

      <FooterSection />

      {/* Inline animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
