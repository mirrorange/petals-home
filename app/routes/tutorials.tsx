import { Link } from 'react-router'
import {
  Rocket,
  Settings,
  Layers,
  Palette,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import type { Route } from './+types/tutorials'
import Navbar from '~/components/sections/Navbar'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'
import { useTutorialTheme } from '~/components/ui/TutorialPageLayout'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '使用教程 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设使用教程目录 — 快速开始、配置指南、功能用法、定制教程。手把手带你上手 Petals Preset。',
    },
  ]
}

interface TutorialCategory {
  id: string
  icon: React.ReactNode
  title: string
  titleEn: string
  description: string
  items: { label: string; href: string; ready: boolean }[]
  accentFrom: string
  accentTo: string
  accentGlow: string
}

const categories: TutorialCategory[] = [
  {
    id: 'quick-start',
    icon: <Rocket className="w-6 h-6" />,
    title: '快速开始',
    titleEn: 'Quick Start',
    description: '从零开始，跟着教程完成花瓣预设的安装与配置，几分钟即可上手。',
    items: [
      { label: '预设安装教程', href: '/tutorials/quick-start', ready: true },
      { label: '重新设置预设', href: '/tutorials/reset-preset', ready: true },
      { label: 'NoAss 插件配置（DeepSeek）', href: '/tutorials/noass', ready: true },
    ],
    accentFrom: '#9333ea',
    accentTo: '#ec4899',
    accentGlow: 'rgba(147,51,234,0.15)',
  },
  {
    id: 'config-guide',
    icon: <Settings className="w-6 h-6" />,
    title: '配置指南',
    titleEn: 'Configuration Guide',
    description: '深入了解预设的各项配置选项，根据自己的需求自由调整参数。',
    items: [
      { label: 'Petals CoT 配置', href: '/tutorials/cot', ready: true },
      { label: '基本参数设置', href: '/tutorials/basic-settings', ready: true },
      { label: '预设功能设置', href: '/tutorials/preset-features', ready: true },
    ],
    accentFrom: '#7e22ce',
    accentTo: '#a855f7',
    accentGlow: 'rgba(126,34,206,0.15)',
  },
  {
    id: 'feature-usage',
    icon: <Layers className="w-6 h-6" />,
    title: '功能用法',
    titleEn: 'Feature Usage',
    description: '详细了解花瓣预设的每一项核心功能，充分发挥创作潜力。',
    items: [
      { label: '@Freesia 系统', href: '/tutorials/at-freesia', ready: true },
      { label: '记忆系统', href: '/tutorials/memory', ready: true },
      { label: '故事摘要', href: '/tutorials/synopsis', ready: true },
      { label: '选项与代回', href: '/tutorials/impersonate', ready: true },
    ],
    accentFrom: '#c026d3',
    accentTo: '#f472b6',
    accentGlow: 'rgba(192,38,211,0.15)',
  },
  {
    id: 'customization',
    icon: <Palette className="w-6 h-6" />,
    title: '定制教程',
    titleEn: 'Customization',
    description: '学习如何根据个人风格定制预设的行为、界面和输出格式。',
    items: [
      { label: '修改禁词表', href: '/tutorials/banned-words', ready: true },
      { label: '定制 CoT 问题', href: '/tutorials/custom-cot', ready: true },
      { label: '自定义文风', href: '/tutorials/custom-style', ready: true },
    ],
    accentFrom: '#d946ef',
    accentTo: '#fb7185',
    accentGlow: 'rgba(217,70,239,0.15)',
  },
]

export default function Tutorials() {
  const { isDark, toggleTheme } = useTutorialTheme()

  return (
    <div
      className={`min-h-screen transition-colors duration-500
      ${isDark ? 'bg-dark-bg text-slate-200' : 'bg-[#fefcff] text-slate-800'}`}
    >
      <FloatingPetals />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Hero header */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] animate-glow-pulse"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-glow-pulse"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)',
              animationDelay: '1.5s',
            }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(168,85,247,0.06) 1px, transparent 1px)'
              : 'radial-gradient(rgba(147,51,234,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">


          {/* Badge */}
          <div className="animate-slide-up mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            bg-freesia-100/80 text-freesia-700 border border-freesia-200/50
            dark:bg-freesia-900/30 dark:text-freesia-300 dark:border-freesia-700/30
            backdrop-blur-sm shadow-lg shadow-freesia-200/20 dark:shadow-freesia-900/20"
          >
            <BookOpen className="w-4 h-4" />
            <span>使用指南</span>
          </div>

          {/* Title */}
          <h1 className="animate-slide-up-delayed text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 30%, #f472b6 60%, #fda4af 100%)'
                  : 'linear-gradient(135deg, #701a75 0%, #9333ea 30%, #ec4899 60%, #f472b6 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              使用教程
            </span>
          </h1>

          <p className="animate-slide-up-delayed-2 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed
            text-slate-500 dark:text-slate-400 font-light"
          >
            从安装到进阶，小苍兰手把手带你上手花瓣预设。
          </p>
        </div>
      </section>

      {/* Tutorial categories */}
      <section className="relative px-4 pb-24">
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} isDark={isDark} index={idx} />
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

function CategoryCard({
  category,
  isDark,
  index,
}: {
  category: TutorialCategory
  isDark: boolean
  index: number
}) {
  const hasReady = category.items.some((i) => i.ready)

  return (
    <div
      id={`tutorial-category-${category.id}`}
      className="group relative rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02]"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.6))',
        border: isDark
          ? '1px solid rgba(147,51,234,0.15)'
          : '1px solid rgba(147,51,234,0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 8px 32px rgba(147,51,234,0.06)',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{ background: category.accentGlow }}
      />

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${category.accentFrom}18, ${category.accentTo}18)`,
            border: `1px solid ${category.accentFrom}30`,
            color: isDark ? category.accentTo : category.accentFrom,
          }}
        >
          {category.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {category.title}
          </h2>
          <span
            className="text-[11px] font-medium uppercase tracking-wider"
            style={{
              color: isDark ? category.accentTo : category.accentFrom,
            }}
          >
            {category.titleEn}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
        {category.description}
      </p>

      {/* Item list */}
      <ul className="space-y-2">
        {category.items.map((item) => {
          const inner = (
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                item.ready
                  ? 'hover:bg-freesia-50/80 dark:hover:bg-freesia-900/20 cursor-pointer group/item'
                  : 'opacity-50 cursor-default'
              }`}
              style={{
                background: item.ready
                  ? isDark
                    ? 'rgba(147,51,234,0.06)'
                    : 'rgba(147,51,234,0.03)'
                  : 'transparent',
                border: item.ready
                  ? isDark
                    ? '1px solid rgba(147,51,234,0.1)'
                    : '1px solid rgba(147,51,234,0.06)'
                  : '1px solid transparent',
              }}
            >
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{
                  background: item.ready
                    ? `linear-gradient(135deg, ${category.accentFrom}, ${category.accentTo})`
                    : isDark
                    ? '#475569'
                    : '#94a3b8',
                }}
              />
              <span
                className={`flex-1 ${
                  item.ready
                    ? 'text-slate-700 dark:text-slate-300'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.label}
              </span>
              {item.ready ? (
                <ArrowRight className="w-4 h-4 text-freesia-400 dark:text-freesia-500 opacity-0 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-0.5" />
              ) : (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full
                  bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                >
                  即将推出
                </span>
              )}
            </div>
          )

          return (
            <li key={item.href}>
              {item.ready ? (
                <Link to={item.href}>{inner}</Link>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
