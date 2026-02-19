import {
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  Shield,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import type { Route } from './+types/tutorials.gemini-filter'
import {
  GuideStepCard,
  TutorialHintCard,
  TutorialCompletionCard,
  SimulationBadge,
  TutorialLinkCard,
} from '~/components/ui/tutorial'
import {
  STPanel,
  STButton,
  STNavbar,
  STInput,
  STLabel,
  STCheckbox,
  MockPetalsInputBar,
  MockSelectionMenu,
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
    { title: 'Gemini 反过滤 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        'Gemini 反过滤教程 — 解决 Gemini 模型外置审查拦截导致的截断或空回复问题，关闭流式传输或开启反过滤设置。',
    },
  ]
}

/* ───────────────────── Step 1: 关闭流式传输 ───────────────────── */

function StepDisableStream({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        {/* Context card */}
        <div
          className="rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: isDark ? 'rgba(234,179,8,0.06)' : 'rgba(234,179,8,0.04)',
            border: isDark ? '1px solid rgba(234,179,8,0.2)' : '1px solid rgba(234,179,8,0.12)',
            color: isDark ? '#cbd5e1' : '#475569',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={15} style={{ color: isDark ? '#fbbf24' : '#d97706' }} />
            <span className="font-bold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
              为什么会出现截断？
            </span>
          </div>
          Gemini 的外置内容审查在流式传输模式下，有时会在输出中途截断回复。关闭流式传输后，Gemini 将在生成完成后一次性返回结果，可有效绕过此拦截。
        </div>

        <GuideStepCard
          index={1}
          title="进入对话补全预设面板"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 1 个{' '}
              <span className="font-semibold">预设</span> 图标，确认面板标题为{' '}
              <span className="font-semibold">对话补全预设</span>。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="关闭流式传输"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              向下滚动找到{' '}
              <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
                流式传输
              </span>{' '}
              复选框，将其{' '}
              <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
                取消勾选
              </span>。
            </>
          }
          tip="关闭后回复将在生成完成后一次性显示，不再逐字输出。"
        />

        <GuideStepCard
          index={3}
          title="保存预设"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              修改后点击预设名称右侧的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
                保存按钮
              </span>{' '}
              使设置生效。
            </>
          }
          tip="未保存时刷新页面会丢失修改。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

        <STNavbar activeIndex={0} highlightIndex={0} highlightColor="red" isDark={isDark} />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <STLabel isDark={isDark}>对话补全预设</STLabel>
            <div className="flex gap-1">
              <STButton icon={FileDown} isDark={isDark} />
              <STButton icon={FileUp} isDark={isDark} />
              <STButton icon={Trash2} isDark={isDark} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <STInput value="Freesia Petals Full v5.3" isDark={isDark} />
            </div>
            <div className="flex gap-1">
              <div className="relative group">
                <STButton icon={Save} highlight="pink" isDark={isDark} />
                <div className="absolute bottom-full mb-2 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  3. 点击保存
                </div>
              </div>
              <STButton icon={Edit2} isDark={isDark} />
              <STButton icon={Plus} isDark={isDark} />
            </div>
          </div>

          <div
            className="mt-2 space-y-3 pt-3"
            style={{
              borderTop: isDark
                ? '1px solid rgba(107,114,128,0.3)'
                : '1px solid rgba(147,51,234,0.08)',
            }}
          >
            <STCheckbox label="解锁上下文长度" checked={true} isDark={isDark} />

            <div className="space-y-1">
              <div
                className="flex justify-between text-xs"
                style={{ color: isDark ? '#9ca3af' : '#64748b' }}
              >
                <span>上下文长度（以词符数计）</span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: isDark ? '#374151' : '#e2e8f0' }}
              >
                <div className="h-full w-full bg-blue-500" />
              </div>
            </div>

            <div
              className="flex justify-between text-xs"
              style={{ color: isDark ? '#9ca3af' : '#64748b' }}
            >
              <span>最大回复长度（以词符数计）</span>
            </div>
            <STInput value="32768" isDark={isDark} />

            {/* Streaming checkbox — highlighted OFF */}
            <div className="relative group">
              <div
                className="flex items-start gap-2 px-3 py-2.5 rounded-lg transition-all duration-200"
                style={{
                  background: isDark ? 'rgba(234,179,8,0.08)' : 'rgba(234,179,8,0.06)',
                  border: isDark
                    ? '1px solid rgba(234,179,8,0.3)'
                    : '1px solid rgba(234,179,8,0.2)',
                }}
              >
                {/* unchecked box */}
                <div
                  className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center"
                  style={{
                    background: isDark ? '#1f2937' : '#f1f5f9',
                    border: isDark ? '1px solid #4b5563' : '1px solid #cbd5e1',
                  }}
                />
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: isDark ? '#fbbf24' : '#d97706' }}
                  >
                    流式传输
                  </div>
                  <div
                    className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: isDark ? '#9ca3af' : '#64748b' }}
                  >
                    随着回复的生成，逐词逐句地显示结果。
                    <br />
                    当此选项关闭时，回复将在完成后一次性显示。
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                2. 取消勾选
              </div>
            </div>
          </div>
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────── Step 2: 开启反过滤设置 ───────────────────── */

function StepEnableFilter({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <div
          className="rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: isDark ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.04)',
            border: isDark ? '1px solid rgba(147,51,234,0.15)' : '1px solid rgba(147,51,234,0.08)',
            color: isDark ? '#cbd5e1' : '#475569',
          }}
        >
          <span className="font-bold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
            Gemini 反过滤
          </span>{' '}
          仅在
          <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
            关闭流式传输
          </span>
          后生效，且可能增加 Token 使用并减慢输出速度。建议先关闭流式；若仍出现截断或空回复，再在 Petals 设置中开启反过滤。
        </div>

        <GuideStepCard
          index={1}
          title="找到设置入口"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在输入框上方的快速回复按钮中，点击最右侧的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
                小齿轮按钮
              </span>
              ，打开 Freesia Petals 设置菜单。
            </>
          }
          tip="设置入口与预设功能设置教程中的入口相同。"
        />

        <GuideStepCard
          index={2}
          title="选择 Gemini 反过滤"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              在弹出的设置菜单中，找到并点击{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                Gemini 反过滤
              </span>{' '}
              入口，按提示开启即可。
            </>
          }
          tip="仅在流式传输关闭时生效；开启后可能增加 Token 消耗并让输出变慢。"
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
          <MockSelectionMenu
            isDark={isDark}
            title="Freesia Petals 设置菜单"
            items={[
              { id: 'user-options', label: '故事选项' },
              { id: 'reduce-token', label: '节省 Token' },
              { id: 'gemini-filter', label: 'Gemini 反过滤' },
            ]}
            highlightItemId="gemini-filter"
            highlightTone="purple"
          />
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────── Step 3: 完成 ───────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="配置完成!"
      description="已完成 Gemini 反过滤配置，截断或空回复问题应得到改善。"
    >
      <TutorialHintCard
        isDark={isDark}
        className="max-w-md mx-auto"
        title={
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb size={15} />
            小提示:
          </span>
        }
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>
            如果作品中{' '}
            <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>
              不包含 NSFW 内容
            </span>
            ，通常不需要进行此配置。
          </li>
          <li>
            Gemini 反过滤仅在{' '}
            <span className="font-medium" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
              关闭流式传输{' '}
            </span>
            后才会生效。
          </li>
          <li>建议先关流式；若仍出现空回复，再启用反过滤。</li>
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
    title: '关闭流式传输',
    desc: '在对话补全预设中关闭流式传输并保存',
    content: (isDark) => <StepDisableStream isDark={isDark} />,
  },
  {
    title: '开启 Gemini 反过滤',
    desc: '仍有空回复时，在设置中开启反过滤',
    content: (isDark) => <StepEnableFilter isDark={isDark} />,
  },
  {
    title: '配置完成',
    desc: '问题应已解决',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function GeminiFilter() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Shield className="w-3.5 h-3.5" />}
        badgeLabel="配置指南"
        title="Gemini 反过滤"
        description="防止 Gemini 外置审查拦截输出，解决截断/空回复问题。"
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
