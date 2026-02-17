import { Link } from 'react-router'
import {
  Layers,
  ArrowRight,
  FileText,
} from 'lucide-react'
import type { Route } from './+types/tutorials.synopsis'
import {
  GuideStepCard,
  TutorialCompletionCard,
  TutorialHintCard,
} from '~/components/ui/tutorial'
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialStepQuery,
  useTutorialTheme,
} from '~/components/ui/TutorialPageLayout'
import { MockSynopsis } from '~/components/ui/mock-ui'
import {
  STPanel,
  STNavbar,
  STLabel,
  SimulationBadge,
  MockPromptListColumns,
  MockPromptListRow,
} from '~/components/ui/tutorial-mock'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '故事摘要 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设故事摘要系统教程 — 了解摘要卡片的作用、如何关闭摘要提示词，以及结合节省 Token 功能的用法。',
    },
  ]
}

/* ───────────────────────── Step 1: 认识摘要系统 ───────────────────────── */

function StepIntro({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="什么是摘要系统"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              摘要系统（Event Synopsis）会在每次故事正文之后自动输出一张{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#c084fc' : '#7e22ce' }}
              >
                摘要卡片
              </span>
              ，记录当前事件的时间、地点与概要，帮助 AI 追踪故事进度。
            </>
          }
          tip="摘要系统默认启用，无需额外配置即可使用。"
        />

        <GuideStepCard
          index={2}
          title="摘要卡片包含什么"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              每张摘要卡片包含：
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>
                  <span className="font-medium" style={{ color: isDark ? '#93c5fd' : '#2563eb' }}>
                    时间与地点
                  </span>
                  {' '}— 故事场景的时空标记
                </li>
                <li>
                  <span className="font-medium" style={{ color: isDark ? '#93c5fd' : '#2563eb' }}>
                    当前事件
                  </span>
                  {' '}— 正在发生的核心事件
                </li>
                <li>
                  <span className="font-medium" style={{ color: isDark ? '#93c5fd' : '#2563eb' }}>
                    事件概要
                  </span>
                  {' '}— 本轮故事内容的简要总结
                </li>
              </ul>
            </>
          }
        />
      </div>

      <div className="space-y-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="摘要卡片预览" />
          <div className="pt-2">
            <MockSynopsis isDark={isDark} />
          </div>
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────────── Step 2: 关闭摘要 ───────────────────────── */

function StepToggle({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="何时需要关闭"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              若角色卡自带类似的摘要/事件追踪功能，可能会与预设摘要产生重复。此时建议关闭预设的摘要系统。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="找到摘要提示词"
          accent="red"
          isDark={isDark}
          detail={
            <>
              打开{' '}
              <span className="font-semibold">对话补全预设</span>{' '}→{' '}
              <span className="font-semibold">提示词列表</span>
              ，找到{' '}
              <code
                className="text-xs px-1.5 py-0.5 rounded font-mono"
                style={{
                  background: isDark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.06)',
                  color: isDark ? '#f9a8d4' : '#db2777',
                }}
              >
                📍[事件梗概] Event Synopsis
              </code>
              {' '}条目。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="切换开关"
          accent="green"
          isDark={isDark}
          detail={
            <>
              点击该条目右侧的{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#4ade80' : '#16a34a' }}
              >
                开关
              </span>
              {' '}即可启用或关闭摘要。关闭后故事正文之后将不再输出摘要卡片。
            </>
          }
          tip="修改后记得点击保存按钮保存预设。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="提示词列表" />

        <STNavbar activeIndex={0} highlightIndex={0} highlightColor="red" isDark={isDark} />

        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between mb-2">
            <STLabel isDark={isDark}>提示词</STLabel>
            <span
              className="text-xs"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              总词符数：0
            </span>
          </div>

          {/* Column headers */}
          <MockPromptListColumns isDark={isDark} />

          <div className="space-y-1.5">
            <MockPromptListRow isDark={isDark} tone="pink" emoji="" label="== 指南（可自定义）==" enabled={true} />
            <MockPromptListRow isDark={isDark} tone="pink" emoji="📍" label="[禁词表] Avoid Cliché Expressions" enabled={true} />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[事件梗概] Event Synopsis"
              enabled={true}
              highlight={true}
              highlightEnabledToggleTone="pink"
              toggleHighlightTooltip="点这里开关"
            />
          </div>
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Step 3: 完成 ───────────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="了解完成！"
      description={
        <>
          摘要系统会自动帮你追踪故事进度，无需额外操作。
        </>
      }
    >
      {/* Token saving callout */}
      <div
        className="p-4 rounded-xl text-left text-sm max-w-md mx-auto flex items-start gap-3"
        style={{
          background: isDark ? 'rgba(147,51,234,0.08)' : 'rgba(147,51,234,0.05)',
          border: isDark ? '1px solid rgba(147,51,234,0.25)' : '1px solid rgba(147,51,234,0.15)',
          color: isDark ? '#d8b4fe' : '#7e22ce',
        }}
      >
        <FileText
          className="w-5 h-5 shrink-0 mt-0.5"
          style={{ color: isDark ? '#c084fc' : '#9333ea' }}
        />
        <div className="space-y-2">
          <p className="font-bold" style={{ color: isDark ? '#e9d5ff' : '#581c87' }}>
            节省 Token
          </p>
          <p style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
            摘要启用时，可以结合{' '}
            <span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
              节省 Token 功能
            </span>
            ，将已读的故事摘要折叠以减少上下文占用。
          </p>
          <Link
            to="/tutorials/preset-features?step=5"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(147,51,234,0.2), rgba(168,85,247,0.25))'
                : 'linear-gradient(135deg, rgba(147,51,234,0.1), rgba(168,85,247,0.15))',
              border: isDark ? '1px solid rgba(147,51,234,0.35)' : '1px solid rgba(147,51,234,0.25)',
              color: isDark ? '#e9d5ff' : '#581c87',
            }}
          >
            查看节省 Token 教程
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <TutorialHintCard isDark={isDark} className="max-w-md mx-auto">
        <ul className="list-disc pl-4 space-y-1">
          <li>
            摘要系统{' '}
            <span className="font-medium" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>
              默认启用
            </span>
            ，开箱即用。
          </li>
          <li>
            若角色卡自带类似功能，可在提示词列表中关闭
            {' '}
            <code
              className="text-xs px-1 py-0.5 rounded font-mono"
              style={{
                background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
                color: isDark ? '#f9a8d4' : '#db2777',
              }}
            >
              Event Synopsis
            </code>
            。
          </li>
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
    title: '认识摘要系统',
    desc: '了解摘要卡片的作用与内容',
    content: (isDark) => <StepIntro isDark={isDark} />,
  },
  {
    title: '关闭摘要',
    desc: '在提示词列表中切换开关',
    content: (isDark) => <StepToggle isDark={isDark} />,
  },
  {
    title: '学习完成',
    desc: '开始使用摘要系统',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function Synopsis() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Layers className="w-3.5 h-3.5" />}
        badgeLabel="功能用法"
        title="故事摘要"
        description="自动追踪故事进度的摘要系统，以及如何按需开关。"
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
