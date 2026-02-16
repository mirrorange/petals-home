import { useState } from 'react'
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Settings,
  MessageSquare,
  Zap,
  Languages,
  Lightbulb,
  PenLine,
  Ruler,
  Globe,
  Shuffle,
  Cpu,
} from 'lucide-react'
import type { Route } from './+types/tutorials.basic-settings'
import {
  STPanel,
  GuideStepCard,
  SimulationBadge,
  MockPetalsInputBar,
  TutorialCompletionCard,
  TutorialHintCard,
} from '~/components/ui/TutorialComponents'
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialStepQuery,
  useTutorialTheme,
} from '~/components/ui/TutorialPageLayout'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Petals 基本参数设置 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设基本参数设置教程 — 了解回复长度、语言设置、模式设置、模型设置的配置方式与用法。',
    },
  ]
}

/** Helper: convert hex color to "r,g,b" string */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '128,128,128'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}

/* ───────────────────────── Mock Settings Menu ───────────────────────── */

function MockSettingsMenu({
  isDark,
  highlightItem,
}: {
  isDark: boolean
  highlightItem?: string | null
}) {
  const menuBg = isDark
    ? 'linear-gradient(135deg, #1a1b20, #222328)'
    : 'linear-gradient(135deg, #fefcff, #f5f0ff)'
  const menuBorder = isDark
    ? '1px solid rgba(107,114,128,0.35)'
    : '1px solid rgba(147,51,234,0.15)'
  const itemBg = isDark ? '#2b2d31' : '#ffffff'
  const itemBorder = isDark
    ? '1px solid rgba(107,114,128,0.3)'
    : '1px solid rgba(147,51,234,0.1)'
  const textColor = isDark ? '#e5e7eb' : '#334155'

  const items = [
    { label: '回复长度', id: 'length' },
    { label: '语言设置', id: 'language' },
    { label: '模式设置', id: 'mode' },
    { label: '模型设置', id: 'model' },
  ]

  const hlRing = isDark
    ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
    : 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white animate-pulse'

  return (
    <div
      className="rounded-xl p-5 space-y-3 max-w-sm mx-auto"
      style={{
        background: menuBg,
        border: menuBorder,
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6)'
          : '0 20px 60px rgba(147,51,234,0.12)',
      }}
    >
      <h3
        className="text-center text-base font-bold mb-4"
        style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
      >
        Freesia Petals 设置菜单
      </h3>
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-4 py-3 rounded-lg text-sm font-medium text-center cursor-default ${
            highlightItem === item.id ? hlRing : ''
          }`}
          style={{
            background: itemBg,
            border: itemBorder,
            color: highlightItem === item.id
              ? isDark ? '#fbbf24' : '#d97706'
              : textColor,
          }}
        >
          {item.label}
        </div>
      ))}
      <div className="flex justify-center pt-2">
        <div
          className="px-4 py-2 rounded-lg text-sm font-medium cursor-default"
          style={{
            background: isDark ? 'rgba(127,29,29,0.5)' : 'rgba(185,28,28,0.1)',
            border: isDark ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(185,28,28,0.2)',
            color: isDark ? '#fca5a5' : '#991b1b',
          }}
        >
          取消
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Mock Button Selector ───────────────────────── */

function MockButtonSelector({
  isDark,
  title,
  items,
  highlightItem,
}: {
  isDark: boolean
  title: string
  items: string[]
  highlightItem?: string | null
}) {
  const menuBg = isDark
    ? 'linear-gradient(135deg, #1a1b20, #222328)'
    : 'linear-gradient(135deg, #fefcff, #f5f0ff)'
  const menuBorder = isDark
    ? '1px solid rgba(107,114,128,0.35)'
    : '1px solid rgba(147,51,234,0.15)'
  const itemBg = isDark ? '#2b2d31' : '#ffffff'
  const itemBorder = isDark
    ? '1px solid rgba(107,114,128,0.3)'
    : '1px solid rgba(147,51,234,0.1)'
  const textColor = isDark ? '#e5e7eb' : '#334155'

  const hlRing = isDark
    ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
    : 'ring-2 ring-purple-500 ring-offset-2 ring-offset-white animate-pulse'

  return (
    <div
      className="rounded-xl p-5 space-y-3 max-w-sm mx-auto"
      style={{
        background: menuBg,
        border: menuBorder,
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6)'
          : '0 20px 60px rgba(147,51,234,0.12)',
      }}
    >
      <h3
        className="text-center text-base font-bold mb-4"
        style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
      >
        {title}
      </h3>
      {items.map((item) => (
        <div
          key={item}
          className={`px-4 py-3 rounded-lg text-sm font-medium text-center cursor-default ${
            highlightItem === item ? hlRing : ''
          }`}
          style={{
            background: itemBg,
            border: itemBorder,
            color: highlightItem === item
              ? isDark ? '#c084fc' : '#7e22ce'
              : textColor,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────── Detail Card Component ───────────────────────── */

function SettingDetailCard({
  isDark,
  title,
  subtitle,
  description,
  points,
  accentColor,
  icon,
}: {
  isDark: boolean
  title: string
  subtitle: string
  description: string
  points: string[]
  accentColor: string
  icon: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6 space-y-4 relative overflow-hidden"
      style={{
        background: isDark
          ? `linear-gradient(135deg, rgba(${hexToRgb(accentColor)},0.04), rgba(15,23,42,0.4))`
          : `linear-gradient(135deg, rgba(${hexToRgb(accentColor)},0.03), rgba(255,255,255,0.9))`,
        border: isDark
          ? `1px solid rgba(${hexToRgb(accentColor)},0.2)`
          : `1px solid rgba(${hexToRgb(accentColor)},0.12)`,
        boxShadow: isDark
          ? `0 10px 30px rgba(0,0,0,0.3)`
          : `0 10px 30px rgba(${hexToRgb(accentColor)},0.08)`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
            border: `1px solid ${accentColor}30`,
            color: accentColor,
          }}
        >
          {icon}
        </div>
        <div>
          <h3
            className="text-lg font-bold"
            style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
          >
            {title}
          </h3>
          <span
            className="text-[11px] font-medium uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {subtitle}
          </span>
        </div>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: isDark ? '#cbd5e1' : '#475569' }}
      >
        {description}
      </p>
      <ul className="space-y-1.5">
        {points.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: accentColor }}
            />
            <span style={{ color: isDark ? '#d1d5db' : '#475569' }}>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ───────────────────── Step 1: 找到配置入口 ───────────────────── */

function StepFindEntry({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="找到设置入口"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在输入框上方那一排快速回复按钮中，找到最右侧的
              <span
                className="font-semibold"
                style={{ color: isDark ? '#fbbf24' : '#d97706' }}
              >
                {' '}小齿轮按钮{' '}
              </span>
              并点击。
            </>
          }
          tip="齿轮按钮是 Petals 预设所有设置的统一入口。"
        />
        <GuideStepCard
          index={2}
          title="选择设置项"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在弹出的
              <span className="font-semibold"> Freesia Petals 设置菜单 </span>
              中，选择你想要配置的参数项：
              <span className="font-semibold"> 回复长度</span>、
              <span className="font-semibold"> 语言设置</span>、
              <span className="font-semibold"> 模式设置</span> 或
              <span className="font-semibold"> 模型设置</span>。
            </>
          }
          tip="所有基本参数均可随时通过此入口调整，无需重新配置。"
        />
      </div>

      <div className="space-y-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} />
          <div
            className="text-xs font-medium mb-3"
            style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            输入栏与快速回复区域
          </div>
          <MockPetalsInputBar isDark={isDark} highlightGear />
        </STPanel>

        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="设置菜单" />
          <MockSettingsMenu isDark={isDark} highlightItem="length" />
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────── Step 2: 回复长度 ───────────────────── */

function StepLength({ isDark }: { isDark: boolean }) {
  const strategies: {
    label: string
    labelEn: string
    desc: string
    accent: string
    icon: React.ReactNode
  }[] = [
    {
      label: '约等于',
      labelEn: 'Approximately',
      desc: '期望正文大约在设置字数左右，允许一定的浮动范围。适合大多数日常写作场景。',
      accent: '#ec4899',
      icon: <Ruler size={20} />,
    },
    {
      label: '不少于',
      labelEn: 'At Least',
      desc: '期望正文字数不少于设置字数，适合希望获得更充实、丰富内容的场景。',
      accent: '#a855f7',
      icon: <ArrowRight size={20} />,
    },
    {
      label: '不多于',
      labelEn: 'At Most',
      desc: '期望正文字数不多于设置字数，适合希望获得简洁、精炼内容的场景。',
      accent: '#3b82f6',
      icon: <ArrowLeft size={20} />,
    },
  ]

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.04)',
          border: isDark ? '1px solid rgba(147,51,234,0.15)' : '1px solid rgba(147,51,234,0.08)',
          color: isDark ? '#cbd5e1' : '#475569',
        }}
      >
        <span className="font-bold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
          回复长度（Response Length）
        </span>
        {' '}控制模型每次回复的字词数量。通常
        <span className="font-semibold" style={{ color: isDark ? '#f472b6' : '#db2777' }}> 600 - 800 </span>
        是较推荐的区间。设置后，你还需要选择一个控制策略来决定字数的约束方式。
      </div>

      {/* Mock selectors side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="字数选择" />
          <MockButtonSelector
            isDark={isDark}
            title="回复长度菜单"
            items={['未设置', '400', '600', '800', '自定义']}
            highlightItem="600"
          />
        </STPanel>
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="控制策略" />
          <MockButtonSelector
            isDark={isDark}
            title="请选择控制策略:"
            items={['约等于', '不少于', '不多于']}
            highlightItem={null}
          />
        </STPanel>
      </div>

      {/* Three strategy cards — static display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategies.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
            style={{
              background: isDark
                ? `linear-gradient(135deg, rgba(${hexToRgb(s.accent)},0.04), rgba(15,23,42,0.4))`
                : `linear-gradient(135deg, rgba(${hexToRgb(s.accent)},0.03), rgba(255,255,255,0.9))`,
              border: isDark
                ? `1px solid rgba(${hexToRgb(s.accent)},0.2)`
                : `1px solid rgba(${hexToRgb(s.accent)},0.12)`,
              boxShadow: isDark
                ? '0 10px 30px rgba(0,0,0,0.3)'
                : `0 10px 30px rgba(${hexToRgb(s.accent)},0.08)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${s.accent}20, ${s.accent}10)`,
                  border: `1px solid ${s.accent}30`,
                  color: s.accent,
                }}
              >
                {s.icon}
              </div>
              <div>
                <h4 className="text-base font-bold" style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}>
                  {s.label}
                </h4>
                <span
                  className="text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: s.accent }}
                >
                  {s.labelEn}
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
        <ul className="list-disc pl-4 space-y-1">
          <li>选择「<span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>自定义</span>」可输入任意字数目标。</li>
          <li>选择「<span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>未设置</span>」可清除当前长度设置，模型将自由决定回复长度。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 3: 语言设置 ───────────────────── */

function StepLanguage({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.04)',
          border: isDark ? '1px solid rgba(147,51,234,0.15)' : '1px solid rgba(147,51,234,0.08)',
          color: isDark ? '#cbd5e1' : '#475569',
        }}
      >
        <span className="font-bold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
          语言设置（Language Setting）
        </span>
        {' '}用于指定创作使用的语言。包含三个层级的语言配置，可分别控制不同场景下的语言偏好。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SettingDetailCard
          isDark={isDark}
          title="首选语言"
          subtitle="Primary Language"
          description="正文内容默认使用的语言。这是最基础的语言设置，影响整个故事的主要输出语言。"
          points={['选项：中文、English、日本語、한국어', '支持自定义输入任意语言']}
          accentColor="#ec4899"
          icon={<Globe size={22} />}
        />
        <SettingDetailCard
          isDark={isDark}
          title="对白语言"
          subtitle="Dialogue Language"
          description="角色对白使用的语言。如与首选语言不同，对白末尾会附带首选语言翻译。需角色卡支持。"
          points={['适合多语言混合叙事', '不确定时建议选「未设置」']}
          accentColor="#a855f7"
          icon={<MessageSquare size={22} />}
        />
        <SettingDetailCard
          isDark={isDark}
          title="CoT 语言"
          subtitle="Workflow Language"
          description="Freesia 与 Petals 之间沟通以及思考过程使用的语言。如与首选语言不同，思考块将使用独立语言。"
          points={['影响 <thinking> 块语言', '影响 Workflow 交流语言']}
          accentColor="#3b82f6"
          icon={<Languages size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="首选语言" />
          <MockButtonSelector
            isDark={isDark}
            title="语言设置 - 首选语言"
            items={['未设置', '中文', 'English', '日本語', '한국어', '自定义']}
            highlightItem="中文"
          />
        </STPanel>
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="对白语言" />
          <MockButtonSelector
            isDark={isDark}
            title="语言设置 - 对白语言"
            items={['未设置', '中文', 'English', '日本語', '한국어', '自定义']}
            highlightItem={null}
          />
        </STPanel>
      </div>

      <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
        <ul className="list-disc pl-4 space-y-1">
          <li>若不需要多语言功能，只需设置<span className="text-pink-400 font-medium">首选语言</span>即可，对白语言和 CoT 语言可保持「未设置」。</li>
          <li>选择「未设置」后，所有语言设置将被清除，模型将自动跟随对话历史中的语言。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 4: 模式设置 (Interactive Comparison) ───────────────────── */

type ModeType = 'continuation' | 'expansion'

interface ModeInfo {
  label: string
  labelEn: string
  accent: string
  icon: React.ReactNode
  tagline: string
  description: string
  points: string[]
}

const MODE_DATA: Record<ModeType, ModeInfo> = {
  continuation: {
    label: '续写',
    labelEn: 'Continuation',
    accent: '#ec4899',
    icon: <PenLine size={22} />,
    tagline: '接力创作，延续故事',
    description: '将你的输入视为故事内容的一部分，Freesia 会在此基础上自然续写后续情节。适合你已经写好故事片段，希望模型接力往下写的场景。',
    points: [
      '输入被视为已有故事内容',
      '模型将保持叙事连贯性向后续写',
      '适合已有明确剧情走向的写作',
    ],
  },
  expansion: {
    label: '扩写',
    labelEn: 'Expansion',
    accent: '#a855f7',
    icon: <Shuffle size={22} />,
    tagline: '大纲扩展，充实细节',
    description: '将你的输入视为用户意图、指令或故事片段的缩略描述，Freesia 会据此扩展出完整的段落内容。适合给出简要指令或情节要点让模型发挥。',
    points: [
      '输入被视为创作指令或缩略描述',
      '模型将基于意图扩展为完整内容',
      '适合快速推进剧情或大纲式写作',
    ],
  },
}

function StepMode({ isDark }: { isDark: boolean }) {
  const [activeMode, setActiveMode] = useState<ModeType | null>(null)
  const modeData = activeMode ? MODE_DATA[activeMode] : null

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.04)',
          border: isDark ? '1px solid rgba(147,51,234,0.15)' : '1px solid rgba(147,51,234,0.08)',
          color: isDark ? '#cbd5e1' : '#475569',
        }}
      >
        <span className="font-bold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
          模式设置（Mode Setting）
        </span>
        {' '}决定模型如何处理你的输入。两种模式对应不同的创作方式，影响 Freesia 对输入内容的理解方式。
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
        {/* Interactive mode selector */}
        <div className="space-y-3 order-1 lg:order-2">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="模式选择" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              悬浮或点击查看各模式特性对比
            </div>
            <div
              className="rounded-xl p-5 space-y-3 max-w-sm mx-auto"
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
              <h3
                className="text-center text-base font-bold mb-4"
                style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
              >
                Petals 模式菜单
              </h3>
              {(['continuation', 'expansion'] as ModeType[]).map((modeId) => {
                const m = MODE_DATA[modeId]
                const isActive = activeMode === modeId
                const bg = isActive
                  ? isDark
                    ? `rgba(${hexToRgb(m.accent)},0.12)`
                    : `rgba(${hexToRgb(m.accent)},0.07)`
                  : isDark ? '#2b2d31' : '#ffffff'
                const border = isActive
                  ? `1px solid ${m.accent}`
                  : isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)'
                return (
                  <div
                    key={modeId}
                    className="px-4 py-4 rounded-lg cursor-pointer transition-all duration-200"
                    style={{
                      background: bg,
                      border: border,
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isActive
                        ? isDark
                          ? `0 0 24px rgba(${hexToRgb(m.accent)},0.18)`
                          : `0 0 24px rgba(${hexToRgb(m.accent)},0.12)`
                        : 'none',
                    }}
                    onMouseEnter={() => setActiveMode(modeId)}
                    onClick={() => setActiveMode(modeId)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                        style={{
                          background: isActive
                            ? `rgba(${hexToRgb(m.accent)},0.15)`
                            : isDark ? 'rgba(107,114,128,0.12)' : 'rgba(148,163,184,0.08)',
                          color: isActive ? m.accent : isDark ? '#9ca3af' : '#94a3b8',
                        }}
                      >
                        {m.icon}
                      </div>
                      <div>
                        <div
                          className="text-sm font-bold transition-colors duration-200"
                          style={{ color: isActive ? m.accent : isDark ? '#e5e7eb' : '#334155' }}
                        >
                          {m.label}
                        </div>
                        <div
                          className="text-[11px] transition-colors duration-200"
                          style={{ color: isActive ? (isDark ? '#cbd5e1' : '#64748b') : (isDark ? '#6b7280' : '#94a3b8') }}
                        >
                          {m.tagline}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </STPanel>
        </div>

        {/* Detail card */}
        <div className="min-h-[280px] relative order-2 lg:order-1">
          {modeData ? (
            <div
              key={activeMode}
              style={{ animation: 'modeDetailFadeIn 0.35s ease-out forwards' }}
            >
              <SettingDetailCard
                isDark={isDark}
                title={modeData.label}
                subtitle={modeData.labelEn}
                description={modeData.description}
                points={modeData.points}
                accentColor={modeData.accent}
                icon={modeData.icon}
              />
            </div>
          ) : (
            <div
              className="h-full min-h-[280px] rounded-2xl flex flex-col items-center justify-center gap-4 p-6"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(147,51,234,0.03), rgba(15,23,42,0.3))'
                  : 'linear-gradient(135deg, rgba(147,51,234,0.02), rgba(255,255,255,0.8))',
                border: isDark
                  ? '1px dashed rgba(147,51,234,0.2)'
                  : '1px dashed rgba(147,51,234,0.15)',
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: isDark ? 'rgba(147,51,234,0.08)' : 'rgba(147,51,234,0.05)',
                  color: isDark ? '#7c3aed50' : '#9333ea40',
                }}
              >
                <Zap size={28} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium mb-1" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
                  <span className="lg:hidden">在上方菜单中悬浮或点击</span>
                  <span className="hidden lg:inline">在右侧菜单中悬浮或点击</span>
                </p>
                <p className="text-xs" style={{ color: isDark ? '#4b5563' : '#cbd5e1' }}>
                  查看续写与扩写模式的详细特性对比
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modeDetailFadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

/* ───────────────────── Step 5: 模型设置 ───────────────────── */

function StepModel({ isDark }: { isDark: boolean }) {
  const models = [
    { name: 'Claude (General)', desc: 'Claude 通用模式，适用于大多数 Claude 模型', accent: '#ec4899' },
    { name: 'Claude (Prefill)', desc: 'Claude 预填模式，适用于 Claude 4.5 及更早版本', accent: '#a855f7' },
    { name: 'Claude You.com', desc: '通过 You.com 接口使用的 Claude 模型', accent: '#8b5cf6' },
    { name: 'DeepSeek', desc: 'DeepSeek V3 模型', accent: '#3b82f6' },
    { name: 'Gemini', desc: 'Google Gemini 系列模型', accent: '#06b6d4' },
  ]

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.04)',
          border: isDark ? '1px solid rgba(147,51,234,0.15)' : '1px solid rgba(147,51,234,0.08)',
          color: isDark ? '#cbd5e1' : '#475569',
        }}
      >
        <span className="font-bold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
          模型设置（Model Setting）
        </span>
        {' '}用于为当前使用的模型绑定一个模型类型。Petals 会自动保存模型名称与所选类型的绑定关系，
        下次使用相同模型时会自动加载对应配置。
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-12 items-start">
        {/* Left: model cards + hint */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {models.map((m) => (
              <div
                key={m.name}
                className="rounded-xl p-4 space-y-2"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, rgba(${hexToRgb(m.accent)},0.04), rgba(15,23,42,0.4))`
                    : `linear-gradient(135deg, rgba(${hexToRgb(m.accent)},0.03), rgba(255,255,255,0.9))`,
                  border: isDark
                    ? `1px solid rgba(${hexToRgb(m.accent)},0.2)`
                    : `1px solid rgba(${hexToRgb(m.accent)},0.12)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `rgba(${hexToRgb(m.accent)},0.12)`,
                      color: m.accent,
                    }}
                  >
                    <Cpu size={16} />
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}>
                    {m.name}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
            <ul className="list-disc pl-4 space-y-1">
              <li>模型类型绑定是<span className="text-pink-400 font-medium">按模型名称保存</span>的，切换模型后会自动加载之前的绑定。</li>
              <li>首次使用新模型时需要手动设置一次类型，此后无需重复操作。</li>
              <li>若不确定选择哪个类型，Claude 系列模型推荐使用 <span className="text-purple-400 font-medium">Claude (General)</span>。</li>
            </ul>
          </TutorialHintCard>
        </div>

        {/* Right: simulation panel */}
        <div className="lg:sticky lg:top-28">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="模型类型选择" />
            <MockButtonSelector
              isDark={isDark}
              title="请为当前模型选择类型"
              items={['Claude (General)', 'Claude (Prefill)', 'Claude You.com', 'DeepSeek', 'Gemini']}
              highlightItem={null}
            />
          </STPanel>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────── Step 6: 完成 ───────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="配置完成!"
      description="基本参数已设定完毕，Freesia 将按照你的配置进行创作。"
    >
      <TutorialHintCard
        isDark={isDark}
        className="max-w-md mx-auto"
        title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>所有参数可随时通过<span className="text-yellow-500 font-medium">齿轮按钮</span>重新配置。</li>
        </ul>
      </TutorialHintCard>
    </TutorialCompletionCard>
  )
}

/* ───────────────────────── Main Page ───────────────────────── */

interface Step extends TutorialStepItem {
  content: (isDark: boolean) => React.ReactNode
}

const steps: Step[] = [
  {
    title: '找到配置入口',
    desc: '从快速回复栏齿轮进入设置菜单',
    content: (isDark) => <StepFindEntry isDark={isDark} />,
  },
  {
    title: '回复长度',
    desc: '设置期望的回复字词数与控制策略',
    content: (isDark) => <StepLength isDark={isDark} />,
  },
  {
    title: '语言设置',
    desc: '配置首选语言、对白语言和 CoT 语言',
    content: (isDark) => <StepLanguage isDark={isDark} />,
  },
  {
    title: '模式设置',
    desc: '选择续写或扩写模式',
    content: (isDark) => <StepMode isDark={isDark} />,
  },
  {
    title: '模型设置',
    desc: '为当前模型绑定类型',
    content: (isDark) => <StepModel isDark={isDark} />,
  },
  {
    title: '配置完成',
    desc: '开始创作',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function BasicSettings() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Settings className="w-3.5 h-3.5" />}
        badgeLabel="配置指南"
        title="基本参数设置"
        description="了解回复长度、语言设置、模式设置、模型设置的配置方式与用法。"
      />

      <TutorialStepNavigator
        isDark={isDark}
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      >
        {steps[currentStep].content(isDark)}
      </TutorialStepNavigator>
    </TutorialPageShell>
  )
}
