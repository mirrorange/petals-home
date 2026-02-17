import { Link } from 'react-router'
import { ArrowRight, FileText, RotateCcw } from 'lucide-react'
import type { Route } from './+types/tutorials.reset-preset'
import {
  GuideStepCard,
  TutorialCompletionCard,
  TutorialHintCard,
  SimulationBadge,
} from '~/components/ui/tutorial'
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
  MockPetalsInputBar,
  MockSelectionMenu,
} from '~/components/ui/tutorial-mock'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '重新设置预设 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设重新设置教程 — 打开 Freesia Petals 设置菜单，找到重设预设，并按提示快速完成重新配置。',
    },
  ]
}

function StepFindResetEntry({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="打开 Freesia Petals 设置菜单"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在输入框上方那一排 QR 快捷按钮中，点击最右侧的
              <span
                className="font-semibold"
                style={{ color: isDark ? '#fbbf24' : '#d97706' }}
              >
                {' '}小齿轮按钮
              </span>
              。
            </>
          }
          tip="齿轮按钮是预设设置入口。"
        />
        <GuideStepCard
          index={2}
          title="选择重设预设"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在弹出的
              <span className="font-semibold"> Freesia Petals 设置菜单 </span>
              中，找到并点击
              <span className="font-semibold"> 重设预设</span>。
            </>
          }
          tip="如果菜单较长，请向下滚动查看。"
        />
      </div>

      <div className="space-y-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} />
          <div
            className="text-xs font-medium mb-3"
            style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            输入栏与快捷按钮
          </div>
          <MockPetalsInputBar isDark={isDark} highlightGear />
        </STPanel>

        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="设置菜单" />
          <MockSelectionMenu
            isDark={isDark}
            title="Freesia Petals 设置菜单"
            items={[
              { id: 'gemini-antifiltering', label: 'Gemini 反过滤' },
              { id: 'advanced-settings', label: '高级设置' },
              { id: 'reset-preset', label: '重设预设' },
              { id: 'about', label: '关于' },
            ]}
            highlightItemId="reset-preset"
            highlightTone="yellow"
          />
        </STPanel>
      </div>
    </div>
  )
}

function StepFollowConfigGuide({ isDark }: { isDark: boolean }) {
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
        重设过程中，具体参数请按需参考
        <span className="font-semibold"> 配置指南 </span>
        部分的教程完成调整。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ConfigLinkCard
          isDark={isDark}
          tone="pink"
          title="Petals CoT 配置"
          desc="配置必选与可选问题"
          href="/tutorials/cot"
        />
        <ConfigLinkCard
          isDark={isDark}
          tone="blue"
          title="基本参数设置"
          desc="回复长度、语言等基础参数"
          href="/tutorials/basic-settings"
        />
        <ConfigLinkCard
          isDark={isDark}
          tone="green"
          title="预设功能设置"
          desc="调整元回复、主题与选项开关"
          href="/tutorials/preset-features"
        />
      </div>

      <TutorialHintCard
        isDark={isDark}
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>如需调整设置，可以直接从设置菜单的对应入口调整，无需每次都执行重设预设。</li>
          <li>若不确定，建议调整后实际对话测试 1-2 轮再继续修改。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

type ConfigCardTone = 'pink' | 'blue' | 'green'

const CONFIG_CARD_TONE_STYLES: Record<
  ConfigCardTone,
  {
    cardBackgroundDark: string
    cardBackgroundLight: string
    cardBorderDark: string
    cardBorderLight: string
    iconDark: string
    iconLight: string
    titleDark: string
    titleLight: string
    linkBackgroundDark: string
    linkBackgroundLight: string
    linkBorderDark: string
    linkBorderLight: string
    linkTextDark: string
    linkTextLight: string
  }
> = {
  pink: {
    cardBackgroundDark: 'rgba(236,72,153,0.09)',
    cardBackgroundLight: 'rgba(236,72,153,0.05)',
    cardBorderDark: '1px solid rgba(236,72,153,0.26)',
    cardBorderLight: '1px solid rgba(236,72,153,0.16)',
    iconDark: '#f9a8d4',
    iconLight: '#db2777',
    titleDark: '#fce7f3',
    titleLight: '#831843',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(190,24,93,0.24), rgba(236,72,153,0.26))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.2))',
    linkBorderDark: '1px solid rgba(244,114,182,0.4)',
    linkBorderLight: '1px solid rgba(236,72,153,0.28)',
    linkTextDark: '#fce7f3',
    linkTextLight: '#9d174d',
  },
  blue: {
    cardBackgroundDark: 'rgba(37,99,235,0.1)',
    cardBackgroundLight: 'rgba(37,99,235,0.06)',
    cardBorderDark: '1px solid rgba(59,130,246,0.28)',
    cardBorderLight: '1px solid rgba(37,99,235,0.18)',
    iconDark: '#93c5fd',
    iconLight: '#2563eb',
    titleDark: '#dbeafe',
    titleLight: '#1e3a8a',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(30,64,175,0.24), rgba(59,130,246,0.26))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(96,165,250,0.2))',
    linkBorderDark: '1px solid rgba(96,165,250,0.4)',
    linkBorderLight: '1px solid rgba(59,130,246,0.28)',
    linkTextDark: '#dbeafe',
    linkTextLight: '#1e40af',
  },
  green: {
    cardBackgroundDark: 'rgba(16,185,129,0.09)',
    cardBackgroundLight: 'rgba(16,185,129,0.06)',
    cardBorderDark: '1px solid rgba(52,211,153,0.26)',
    cardBorderLight: '1px solid rgba(16,185,129,0.16)',
    iconDark: '#6ee7b7',
    iconLight: '#059669',
    titleDark: '#d1fae5',
    titleLight: '#065f46',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(4,120,87,0.24), rgba(16,185,129,0.25))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(52,211,153,0.2))',
    linkBorderDark: '1px solid rgba(52,211,153,0.38)',
    linkBorderLight: '1px solid rgba(16,185,129,0.25)',
    linkTextDark: '#d1fae5',
    linkTextLight: '#065f46',
  },
}

function ConfigLinkCard({
  isDark,
  tone,
  title,
  desc,
  href,
}: {
  isDark: boolean
  tone: ConfigCardTone
  title: string
  desc: string
  href: string
}) {
  const toneStyles = CONFIG_CARD_TONE_STYLES[tone]

  return (
    <div
      className="p-4 rounded-xl text-left text-sm flex items-start gap-3"
      style={{
        background: isDark ? toneStyles.cardBackgroundDark : toneStyles.cardBackgroundLight,
        border: isDark ? toneStyles.cardBorderDark : toneStyles.cardBorderLight,
      }}
    >
      <FileText
        className="w-5 h-5 shrink-0 mt-0.5"
        style={{ color: isDark ? toneStyles.iconDark : toneStyles.iconLight }}
      />
      <div className="space-y-2">
        <h4 className="font-bold" style={{ color: isDark ? toneStyles.titleDark : toneStyles.titleLight }}>
          {title}
        </h4>
        <p className="text-xs" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
          {desc}
        </p>
        <Link
          to={href}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: isDark ? toneStyles.linkBackgroundDark : toneStyles.linkBackgroundLight,
            border: isDark ? toneStyles.linkBorderDark : toneStyles.linkBorderLight,
            color: isDark ? toneStyles.linkTextDark : toneStyles.linkTextLight,
          }}
        >
          查看教程
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="重设完成"
      description="预设已重新初始化。你可以继续按配置指南细化各项参数。"
    >
      <TutorialHintCard isDark={isDark} className="max-w-md mx-auto">
        <ul className="list-disc pl-4 space-y-1">
          <li>后续如需再次重设，重复齿轮菜单中的“重设预设”流程即可。</li>
        </ul>
      </TutorialHintCard>
    </TutorialCompletionCard>
  )
}

interface Step extends TutorialStepItem {
  content: (isDark: boolean) => React.ReactNode
}

const steps: Step[] = [
  {
    title: '找到重设入口',
    desc: '从齿轮菜单定位重设预设',
    content: (isDark) => <StepFindResetEntry isDark={isDark} />,
  },
  {
    title: '参考配置指南',
    desc: '按需完成详细参数配置',
    content: (isDark) => <StepFollowConfigGuide isDark={isDark} />,
  },
  {
    title: '完成',
    desc: '开始使用',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function ResetPresetTutorial() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<RotateCcw className="w-3.5 h-3.5" />}
        badgeLabel="重设预设"
        title="重新设置预设"
        description="通过 Freesia Petals 设置菜单快速重设，并按配置指南完成参数恢复。"
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
