import { useState } from 'react'
import {
  Sparkles,
  Settings,
  MessageSquare,
  Zap,
  RefreshCw,
  Languages,
  Send,
  Lightbulb,
} from 'lucide-react'
import type { Route } from './+types/tutorials.cot'
import {
  GuideStepCard,
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
import {
  STPanel,
  SimulationBadge,
  MockPetalsInputBar,
  MockInteractiveSelectionMenu,
  MockSelectionMenu,
} from '~/components/ui/TutorialMockComponents'
import { hexToRgb } from '~/components/ui/TutorialColorUtils'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Petals CoT 配置指南 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设 CoT（Chain of Thought）配置教程 — 了解线性、迭代、迭代&切换语言三种 CoT 模式的用法与配置方式。',
    },
  ]
}

/* ───────────── Interactive CoT Mode Selector for Step 2 ───────────── */

type CoTModeId = 'linear' | 'iterative' | 'iterative-lang'

const COT_MODE_DATA: Record<
  CoTModeId,
  {
    title: string
    subtitle: string
    description: string
    pros: string[]
    accentColor: string
    icon: React.ReactNode
    recommended?: boolean
  }
> = {
  linear: {
    title: '线性',
    subtitle: 'Linear',
    description:
      'Freesia 先提出创作问题；Petals 回答问题、给出建议；最后 Freesia 根据建议撰写正文。',
    pros: [
      '流程简单，输出快，兼容性好',
      '推荐新手和大多数用户使用',
    ],
    accentColor: '#ec4899',
    icon: <Zap size={22} />,
    recommended: true,
  },
  iterative: {
    title: '迭代',
    subtitle: 'Iterative',
    description:
      'Freesia 先写出初稿，然后由 Petals 对初稿进行审阅并提出修改建议，最后 Freesia 根据建议迭代优化。通过"写→评→改"循环提升质量。',
    pros: [
      '通过迭代打磨，产出质量更高',
      '适合对文本细节有较高要求的场景',
    ],
    accentColor: '#a855f7',
    icon: <RefreshCw size={22} />,
  },
  'iterative-lang': {
    title: '迭代 & 切换语言',
    subtitle: 'Iterative & Language Switch',
    description:
      '与迭代流程类似，但初稿以英语编写，最终使用目标语言进行迭代优化。通过语言切换打破模型的中文过拟合倾向。',
    pros: [
      '适合发现模型中文输出风格固化的用户',
    ],
    accentColor: '#3b82f6',
    icon: <Languages size={22} />,
  },
}

const COT_FLOW_COMPONENTS: Record<CoTModeId, (isDark: boolean) => React.ReactNode> = {
  linear: (isDark) => <CoTFlowLinear isDark={isDark} />,
  iterative: (isDark) => <CoTFlowIterative isDark={isDark} />,
  'iterative-lang': (isDark) => <CoTFlowIterativeLang isDark={isDark} />,
}

/* ───────────────────────── CoT Flow Diagram ───────────────────────── */

function FlowStep({
  isDark,
  label,
  role,
  accentColor,
  icon,
}: {
  isDark: boolean
  label: string
  role: string
  accentColor: string
  icon: React.ReactNode
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: isDark
          ? `rgba(${hexToRgb(accentColor)},0.08)`
          : `rgba(${hexToRgb(accentColor)},0.06)`,
        border: `1px solid ${isDark
          ? `rgba(${hexToRgb(accentColor)},0.25)`
          : `rgba(${hexToRgb(accentColor)},0.18)`
        }`,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: isDark
            ? `rgba(${hexToRgb(accentColor)},0.2)`
            : `rgba(${hexToRgb(accentColor)},0.12)`,
          color: accentColor,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
          style={{ color: accentColor }}
        >
          {role}
        </div>
        <div
          className="text-sm font-medium"
          style={{ color: isDark ? '#e5e7eb' : '#334155' }}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

function CoTFlowLinear({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-1">
      <FlowStep
        isDark={isDark}
        role="Freesia 小苍兰"
        label="分析场景，提出创作问题"
        accentColor="#ec4899"
        icon={<MessageSquare size={18} />}
      />
      <FlowStep
        isDark={isDark}
        role="Petals 花瓣"
        label="基于问题给出创作建议"
        accentColor="#a855f7"
        icon={<Sparkles size={18} />}
      />
      <FlowStep
        isDark={isDark}
        role="Freesia 小苍兰"
        label="根据建议撰写故事正文"
        accentColor="#ec4899"
        icon={<Send size={18} />}
      />
    </div>
  )
}

function CoTFlowIterative({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-1">
      <FlowStep
        isDark={isDark}
        role="Freesia 小苍兰"
        label="创作初稿"
        accentColor="#ec4899"
        icon={<Send size={18} />}
      />
      <FlowStep
        isDark={isDark}
        role="Petals 花瓣"
        label="审阅初稿，给出修改建议"
        accentColor="#a855f7"
        icon={<RefreshCw size={18} />}
      />
      <FlowStep
        isDark={isDark}
        role="Freesia 小苍兰"
        label="根据建议迭代优化"
        accentColor="#ec4899"
        icon={<Sparkles size={18} />}
      />
    </div>
  )
}

function CoTFlowIterativeLang({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-1">
      <FlowStep
        isDark={isDark}
        role="Freesia 小苍兰"
        label="以英语编写初稿"
        accentColor="#3b82f6"
        icon={<Languages size={18} />}
      />
      <FlowStep
        isDark={isDark}
        role="Petals 花瓣"
        label="审阅初稿，给出修改建议"
        accentColor="#a855f7"
        icon={<RefreshCw size={18} />}
      />
      <FlowStep
        isDark={isDark}
        role="Freesia 小苍兰"
        label="使用目标语言迭代优化"
        accentColor="#ec4899"
        icon={<Sparkles size={18} />}
      />
    </div>
  )
}

/* ───────────────────────── CoT Mode Detail Card ───────────────────────── */

function CoTModeCard({
  isDark,
  title,
  subtitle,
  description,
  pros,
  accentColor,
  icon,
  flow,
  recommended,
}: {
  isDark: boolean
  title: string
  subtitle: string
  description: string
  pros: string[]
  accentColor: string
  icon: React.ReactNode
  flow: React.ReactNode
  recommended?: boolean
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
      {/* Recommended badge */}
      {recommended && (
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: isDark
              ? `rgba(${hexToRgb(accentColor)},0.15)`
              : `rgba(${hexToRgb(accentColor)},0.1)`,
            color: accentColor,
            border: `1px solid ${isDark
              ? `rgba(${hexToRgb(accentColor)},0.3)`
              : `rgba(${hexToRgb(accentColor)},0.2)`
            }`,
          }}
        >
          ✦ 推荐
        </div>
      )}

      {/* Header */}
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

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: isDark ? '#cbd5e1' : '#475569' }}
      >
        {description}
      </p>

      {/* Workflow flow */}
      <div
        className="rounded-xl p-4"
        style={{
          background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
          border: isDark
            ? '1px solid rgba(107,114,128,0.15)'
            : '1px solid rgba(147,51,234,0.06)',
        }}
      >
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-3"
          style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
        >
          工作流程
        </div>
        {flow}
      </div>

      {/* Pros */}
      <ul className="space-y-1.5">
        {pros.map((pro, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: accentColor }}
            />
            <span style={{ color: isDark ? '#d1d5db' : '#475569' }}>{pro}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ───────────────────────── Step content builders ───────────────────────── */

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
          title="进入 CoT 设置"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在弹出的
              <span className="font-semibold"> Freesia Petals 设置菜单 </span>
              中，点击最上方的
              <span
                className="font-semibold"
                style={{ color: isDark ? '#fbbf24' : '#d97706' }}
              >
                {' '}CoT 设置{' '}
              </span>
              按钮。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="选择 CoT 模式"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              在 CoT 模式菜单中，选择需要的模式：
              <span className="font-semibold"> 线性（推荐）</span>、
              <span className="font-semibold"> 迭代</span>、或
              <span className="font-semibold"> 迭代&amp;切换语言</span>。
            </>
          }
          tip="不确定选哪个？继续看下一步的模式详解。"
        />
      </div>

      <div className="space-y-4">
        {/* Simulation: Chat input bar */}
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

        {/* Simulation: Settings menu */}
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="设置菜单" />
          <MockSelectionMenu
            isDark={isDark}
            title="Freesia Petals 设置菜单"
            items={[
              { id: 'cot', label: 'CoT 设置' },
              { id: 'length', label: '回复长度' },
              { id: 'language', label: '语言设置' },
            ]}
            highlightItemId="cot"
            highlightTone="yellow"
          />
        </STPanel>
      </div>
    </div>
  )
}

function StepModeDetails({ isDark }: { isDark: boolean }) {
  const [activeMode, setActiveMode] = useState<CoTModeId | null>(null)

  const modeData = activeMode ? COT_MODE_DATA[activeMode] : null
  const flowRenderer = activeMode ? COT_FLOW_COMPONENTS[activeMode] : null

  return (
    <div className="space-y-6">
      {/* Intro text */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.04)',
          border: isDark
            ? '1px solid rgba(147,51,234,0.15)'
            : '1px solid rgba(147,51,234,0.08)',
          color: isDark ? '#cbd5e1' : '#475569',
        }}
      >
        <span className="font-bold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
          Petals CoT（Chain of Thought）
        </span>
        {' '}是花瓣预设的核心思考机制。不同的 CoT 模式决定了 Freesia（小苍兰）和 Petals（花瓣）之间的协作方式。
        选择合适的模式可以显著提升创作质量。
      </div>

      {/* Interactive mode explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
        {/* Mobile top / Desktop right: Interactive mock CoT menu */}
        <div className="space-y-3 order-1 lg:order-2">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              悬浮或点击以查看模式详情
            </div>
            <MockInteractiveSelectionMenu
              isDark={isDark}
              title="Petals CoT 模式菜单"
              items={[
                { id: 'linear', label: '线性（推荐）', accent: '#ec4899' },
                { id: 'iterative', label: '迭代', accent: '#a855f7' },
                { id: 'iterative-lang', label: '迭代&切换语言', accent: '#3b82f6' },
              ]}
              activeItemId={activeMode}
              onSelect={(id) => setActiveMode(id as CoTModeId)}
              onItemHover={(id) => setActiveMode(id as CoTModeId)}
              showCancelButton={true}
              className=""
            />
          </STPanel>
        </div>

        {/* Mobile bottom / Desktop left: Mode detail card (shown on hover/click) */}
        <div className="min-h-[320px] relative order-2 lg:order-1">
          {modeData && flowRenderer ? (
            <div
              key={activeMode}
              style={{ animation: 'cotDetailFadeIn 0.35s ease-out forwards' }}
            >
              <CoTModeCard
                isDark={isDark}
                title={modeData.title}
                subtitle={modeData.subtitle}
                description={modeData.description}
                pros={modeData.pros}
                accentColor={modeData.accentColor}
                icon={modeData.icon}
                flow={flowRenderer(isDark)}
                recommended={modeData.recommended}
              />
            </div>
          ) : (
            /* Empty state prompt */
            <div
              className="h-full min-h-[320px] rounded-2xl flex flex-col items-center justify-center gap-4 p-6"
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
                <Sparkles size={28} />
              </div>
              <div className="text-center">
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
                >
                  <span className="lg:hidden">在上方菜单中悬浮或点击</span>
                  <span className="hidden lg:inline">在右侧菜单中悬浮或点击</span>
                </p>
                <p
                  className="text-xs"
                  style={{ color: isDark ? '#4b5563' : '#cbd5e1' }}
                >
                  查看对应 CoT 模式的详细介绍与工作流程
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation keyframes for detail card */}
      <style>{`
        @keyframes cotDetailFadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="配置完成!"
      description="CoT 模式已设定完毕，Freesia 与 Petals 将按照你选择的方式协同创作。"
    >
      <TutorialHintCard
        isDark={isDark}
        className="max-w-md mx-auto"
        title={(
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb size={15} />
            小提示:
          </span>
        )}
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>如果不确定选哪个模式，推荐使用<span className="text-pink-400 font-medium">线性</span>模式开始体验。</li>
          <li>你可以随时通过同一入口<span className="text-yellow-500 font-medium">切换 CoT 模式</span>，无需重新初始化。</li>
          <li>不同模式适用于不同场景，建议先试用再决定。</li>
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
    desc: '从快速回复栏齿轮进入 CoT 设置',
    content: (isDark) => <StepFindEntry isDark={isDark} />,
  },
  {
    title: 'CoT 模式详解',
    desc: '了解三种 CoT 模式的原理与适用场景',
    content: (isDark) => <StepModeDetails isDark={isDark} />,
  },
  {
    title: '配置完成',
    desc: '开始创作',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function CoTConfig() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Settings className="w-3.5 h-3.5" />}
        badgeLabel="配置指南"
        title="Petals CoT 配置指南"
        description="了解 CoT 模式的配置入口与三种模式的工作原理，选择最适合你的创作方式。"
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
