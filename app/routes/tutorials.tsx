import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  Rocket,
  Settings,
  Layers,
  Palette,
  ArrowRight,
  BookOpen,
  ChevronDown,
  MessageCircleQuestion,
  ExternalLink,
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
      { label: '反过滤/防截断（Gemini）', href: '/tutorials/gemini-filter', ready: true },
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
      { label: '可选功能提示词', href: '/tutorials/optional-prompts', ready: true },
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
      { label: '自定义提示词', href: '/tutorials/custom-prompt', ready: true },
    ],
    accentFrom: '#d946ef',
    accentTo: '#fb7185',
    accentGlow: 'rgba(217,70,239,0.15)',
  },
]

interface FAQItem {
  question: string
  answer: React.ReactNode
}

function buildFaqItems(isDark: boolean): FAQItem[] {
  const linkStyle: React.CSSProperties = {
    color: isDark ? '#c084fc' : '#9333ea',
    textDecoration: 'none',
    fontWeight: 500,
    borderBottom: isDark ? '1px solid rgba(192,132,252,0.3)' : '1px solid rgba(147,51,234,0.25)',
    paddingBottom: '1px',
    transition: 'all 0.2s',
  }

  return [
    {
      question: '弹出红框报错「SlashCommandParserError」怎么办？',
      answer: (
        <span>
          请将酒馆（SillyTavern）更新至最新版本，并确认已正确配置 STScript 选项。详情请参阅{' '}
          <Link to="/tutorials/quick-start" style={linkStyle}>
            预设安装教程 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          。
        </span>
      ),
    },
    {
      question: '导入预设后找不到正则表达式？',
      answer: (
        <span>
          正则已随预设一同绑定导入，无需单独添加。如果导入后仍未显示：① 请确保酒馆已更新至最新版本；②
          尝试刷新网页或重启酒馆程序。
        </span>
      ),
    },
    {
      question: '思维链（CoT）内容没有被隐藏？',
      answer: (
        <span>
          首先确认正则已被正确导入（检查正则列表中是否存在预设的正则规则）。若正则正常，请点击编辑消息，检查模型输出中正文前是否包含{' '}
          <code
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.85em',
              background: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.08)',
              color: isDark ? '#d8b4fe' : '#7e22ce',
            }}
          >
            {'<START_OF_CONTENT>'}
          </code>{' '}
          标记。若缺少此标记，说明模型输出格式异常，可尝试重新生成回复。
        </span>
      ),
    },
    {
      question: '如何防止模型抢话（替用户说话）？',
      answer: (
        <span>
          请进行以下两步设置：① 将回复模式切换为{' '}
          <Link to="/tutorials/basic-settings?step=4" style={linkStyle}>
            续写模式 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          ；② 启用{' '}
          <Link to="/tutorials/optional-prompts?step=2" style={linkStyle}>
            防抢话可选提示词 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          。
        </span>
      ),
    },
    {
      question: '模型输出出现截断/空回怎么处理？',
      answer: (
        <span>
          根据使用的模型尝试对应的解决方案：
          <br />
          <strong>Claude 模型</strong> — 确保在基本参数中选择了正确的预填充类型。注意 Prefill 不支持 Claude 4.6
          及以上版本，请参阅{' '}
          <Link to="/tutorials/basic-settings?step=5" style={linkStyle}>
            基本参数设置 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          ；
          <br />
          <strong>DeepSeek 模型</strong> — 确保已安装{' '}
          <Link to="/tutorials/noass" style={linkStyle}>
            NoAss 插件 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          ；
          <br />
          <strong>Gemini 模型</strong> — 请关闭流式传输，并考虑开启{' '}
          <Link to="/tutorials/gemini-filter" style={linkStyle}>
            Gemini 反过滤 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          ；
          <br />
          若以上方法均无效，请联系橘子反馈问题。
        </span>
      ),
    },
    {
      question: '故事选项无法点击该怎么办？',
      answer: (
        <span>
          花瓣预设未使用酒馆插件实现选项功能，因此酒馆默认的前端美化不支持交互。请使用 QR 按钮中第二项（小灯泡图标）将回复内容填充到输入框实现选择。详见{' '}
          <Link to="/tutorials/impersonate" style={linkStyle}>
            选项与代回教程 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>
          。
        </span>
      ),
    },
    {
      question: '如何切换叙事人称？',
      answer: (
        <span>
          预设提示词中并未固定叙事人称，通常会沿用角色卡中设定的人称。如需切换，请直接在聊天输入框中使用{' '}
          <Link to="/tutorials/at-freesia" style={linkStyle}>
            @Freesia 功能 <ExternalLink style={{ display: 'inline', width: 12, height: 12, verticalAlign: '-1px' }} />
          </Link>{' '}
          告诉小苍兰你想使用的人称即可。
        </span>
      ),
    },
  ]
}

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

      {/* FAQ */}
      <FAQSection isDark={isDark} />

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

/* ─────────────────────── FAQ Section ─────────────────────── */

function FAQSection({ isDark }: { isDark: boolean }) {
  const faqItems = buildFaqItems(isDark)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index))

  return (
    <section id="faq" className="relative px-4 pb-24">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] animate-glow-pulse"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(192,38,211,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5
             backdrop-blur-sm"
            style={{
              background: isDark
                ? 'rgba(192,38,211,0.12)'
                : 'rgba(217,70,239,0.08)',
              border: isDark
                ? '1px solid rgba(192,38,211,0.2)'
                : '1px solid rgba(217,70,239,0.15)',
              color: isDark ? '#f0abfc' : '#a21caf',
            }}
          >
            <MessageCircleQuestion className="w-4 h-4" />
            <span>FAQ</span>
          </div>

          <h2
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3"
            style={{
              color: isDark ? '#f5d0fe' : '#1e1b4b',
            }}
          >
            常见问题
          </h2>
          <p
            className="text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: isDark ? '#a78bfa80' : '#64748b' }}
          >
            在使用花瓣预设时遇到了疑问？来这里找找答案吧。
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <FAQAccordionItem
              key={idx}
              item={item}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={toggle}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Credits */}
        <p
          className="mt-10 text-center text-xs leading-relaxed"
          style={{ color: isDark ? 'rgba(168,139,250,0.45)' : 'rgba(100,116,139,0.6)' }}
        >
          感谢{' '}
          <span style={{ fontWeight: 600, color: isDark ? 'rgba(192,132,252,0.6)' : 'rgba(147,51,234,0.55)' }}>
            蔬（@souffle100253006）
          </span>{' '}
          整理了部分常见问题。
        </p>
      </div>
    </section>
  )
}

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  isDark,
}: {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
  isDark: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [measuredHeight, setMeasuredHeight] = useState(0)
  const isPinkTone = index % 2 === 1

  useEffect(() => {
    if (contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  const toneStyles = isPinkTone
    ? {
        openBgDark: 'linear-gradient(135deg, rgba(43,20,39,0.95), rgba(63,25,54,0.82))',
        closedBgDark: 'linear-gradient(135deg, rgba(26,13,24,0.75), rgba(34,16,31,0.58))',
        openBgLight: 'linear-gradient(135deg, rgba(255,252,254,0.98), rgba(255,242,248,0.94))',
        closedBgLight: 'linear-gradient(135deg, rgba(255,252,254,0.85), rgba(255,246,250,0.68))',
        openBorderDark: '1px solid rgba(236,72,153,0.3)',
        closedBorderDark: '1px solid rgba(236,72,153,0.14)',
        openBorderLight: '1px solid rgba(236,72,153,0.22)',
        closedBorderLight: '1px solid rgba(236,72,153,0.1)',
        openShadowDark: '0 8px 30px rgba(236,72,153,0.12)',
        openShadowLight: '0 8px 30px rgba(236,72,153,0.08)',
        badgeOpenDark: 'linear-gradient(135deg, #ec4899, #f472b6)',
        badgeOpenLight: 'linear-gradient(135deg, #f472b6, #ec4899)',
        badgeClosedDark: 'rgba(236,72,153,0.14)',
        badgeClosedLight: 'rgba(236,72,153,0.08)',
        badgeTextClosedDark: '#f9a8d4',
        badgeTextClosedLight: '#db2777',
        questionOpenDark: '#fbcfe8',
        questionOpenLight: '#be185d',
        chevronDark: '#f472b6',
        chevronLight: '#db2777',
      }
    : {
        openBgDark: 'linear-gradient(135deg, rgba(26,22,40,0.95), rgba(35,28,55,0.8))',
        closedBgDark: 'linear-gradient(135deg, rgba(15,12,24,0.7), rgba(22,18,34,0.5))',
        openBgLight: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(250,245,255,0.9))',
        closedBgLight: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(252,249,255,0.6))',
        openBorderDark: '1px solid rgba(192,38,211,0.25)',
        closedBorderDark: '1px solid rgba(147,51,234,0.1)',
        openBorderLight: '1px solid rgba(192,38,211,0.2)',
        closedBorderLight: '1px solid rgba(147,51,234,0.08)',
        openShadowDark: '0 8px 30px rgba(192,38,211,0.08)',
        openShadowLight: '0 8px 30px rgba(147,51,234,0.06)',
        badgeOpenDark: 'linear-gradient(135deg, #9333ea, #c026d3)',
        badgeOpenLight: 'linear-gradient(135deg, #a855f7, #d946ef)',
        badgeClosedDark: 'rgba(147,51,234,0.12)',
        badgeClosedLight: 'rgba(147,51,234,0.06)',
        badgeTextClosedDark: '#c084fc',
        badgeTextClosedLight: '#9333ea',
        questionOpenDark: '#f0abfc',
        questionOpenLight: '#7e22ce',
        chevronDark: '#a78bfa',
        chevronLight: '#9333ea',
      }

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: isDark
          ? isOpen
            ? toneStyles.openBgDark
            : toneStyles.closedBgDark
          : isOpen
            ? toneStyles.openBgLight
            : toneStyles.closedBgLight,
        border: isDark
          ? isOpen
            ? toneStyles.openBorderDark
            : toneStyles.closedBorderDark
          : isOpen
            ? toneStyles.openBorderLight
            : toneStyles.closedBorderLight,
        boxShadow: isOpen
          ? isDark
            ? toneStyles.openShadowDark
            : toneStyles.openShadowLight
          : 'none',
      }}
    >
      {/* Question button */}
      <button
        id={`faq-toggle-${index}`}
        onClick={() => onToggle(index)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer transition-colors duration-200"
        style={{ background: 'transparent', border: 'none' }}
        aria-expanded={isOpen}
      >
        {/* Numbered badge */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: isOpen
              ? isDark
                ? toneStyles.badgeOpenDark
                : toneStyles.badgeOpenLight
              : isDark
                ? toneStyles.badgeClosedDark
                : toneStyles.badgeClosedLight,
            color: isOpen
              ? '#fff'
              : isDark
                ? toneStyles.badgeTextClosedDark
                : toneStyles.badgeTextClosedLight,
            transition: 'all 0.3s',
          }}
        >
          {index + 1}
        </span>

        {/* Question text */}
        <span
          className="flex-1 text-sm sm:text-[15px] font-semibold leading-snug"
          style={{
            color: isOpen
              ? isDark
                ? toneStyles.questionOpenDark
                : toneStyles.questionOpenLight
              : isDark
                ? '#e2e8f0'
                : '#334155',
            transition: 'color 0.3s',
          }}
        >
          {item.question}
        </span>

        {/* Chevron */}
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: isDark ? toneStyles.chevronDark : toneStyles.chevronLight,
          }}
        />
      </button>

      {/* Answer panel */}
      <div
        style={{
          maxHeight: isOpen ? `${measuredHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
          overflow: 'hidden',
        }}
      >
        <div
          ref={contentRef}
          className="px-5 pb-5 text-sm leading-relaxed"
          style={{
            paddingLeft: 'calc(1.25rem + 1.75rem + 0.75rem)', // align with question text
            color: isDark ? '#cbd5e1' : '#475569',
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  )
}
