import {
  Download,
  FileDown,
  ChevronUp,
  Plus,
  Trash2,
  Puzzle,
  Rocket,
} from 'lucide-react'
import type { Route } from './+types/tutorials.noass'
import {
  GuideStepCard,
  TutorialHintCard,
  TutorialCompletionCard,
  SimulationBadge,
} from '~/components/ui/tutorial'
import {
  STPanel,
  STNavbar,
  STCheckbox,
  STInput,
} from '~/components/ui/tutorial-mock'
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
          <SimulationBadge isDark={isDark} label="Dialog" />
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
    <TutorialCompletionCard
      isDark={isDark}
      title="配置完成!"
      descriptionClassName="max-w-xs"
      description="NoAss 插件已配置就绪，现在可以在 DeepSeek 模型中享受 Petals 预设的完整体验了。"
    >
      <TutorialHintCard isDark={isDark} className="max-w-md mx-auto">
        <ul className="list-disc pl-4 space-y-1">
          <li>NoAss 仅在使用 <span className="text-purple-400 font-medium">DeepSeek</span> 系列模型时需要配置。</li>
          <li>如果安装扩展后页面没有变化，请尝试<span className="text-yellow-500 font-medium">刷新网页</span>。</li>
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

export default function NoAss() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Rocket className="w-3.5 h-3.5" />}
        badgeLabel="NoAss 配置"
        title="NoAss 插件配置"
        description="跟着模拟 UI 完成 NoAss 插件安装与配置（仅 DeepSeek 模型需要）"
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
