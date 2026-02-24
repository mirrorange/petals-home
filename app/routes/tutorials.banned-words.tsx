import {
  Palette,
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  Link as LinkIcon,
} from 'lucide-react'
import type { Route } from './+types/tutorials.banned-words'
import {
  GuideStepCard,
  TutorialHintCard,
  TutorialInlineCode,
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
  STNavbar,
  STLabel,
  STButton,
  STInput,
  STCheckbox,
  MockPromptEditDialogActions,
  MockPromptEditDialogHeader,
  MockPromptListColumns,
  MockPromptListRow,
} from '~/components/ui/tutorial-mock'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '修改禁词表 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设禁词表教程 — 学习如何在提示词列表中找到并编辑禁词表，添加自定义禁用表达。',
    },
  ]
}

/* ───────────────────────── Mock Edit Dialog ───────────────────────── */

function MockEditDialog({
  isDark,
  highlightTextarea,
  highlightSave,
}: {
  isDark: boolean
  highlightTextarea?: boolean
  highlightSave?: boolean
}) {
  const fieldBg = isDark ? '#0b0c0f' : '#ffffff'
  const fieldBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'
  const labelColor = isDark ? '#e5e7eb' : '#334155'

  return (
    <div className="space-y-4">
      <MockPromptEditDialogHeader
        isDark={isDark}
        name="📍[禁词表] Avoid Cliché Expr"
        tone="pink"
      />

      {/* Prompt textarea */}
      <div>
        <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>提示词</div>
        <div className="relative group">
          <div
            className="px-3 py-2.5 rounded-lg text-[11px] leading-relaxed font-mono whitespace-pre-wrap min-h-[120px]"
            style={{
              background: fieldBg,
              border: highlightTextarea
                ? isDark
                  ? '2px solid rgba(236,72,153,0.5)'
                  : '2px solid rgba(236,72,153,0.4)'
                : `1px solid ${fieldBorder}`,
              color: isDark ? '#d1d5db' : '#475569',
              boxShadow: highlightTextarea
                ? isDark
                  ? '0 0 12px rgba(236,72,153,0.15)'
                  : '0 0 12px rgba(236,72,153,0.1)'
                : 'none',
            }}
          >
            ## Avoid Using Cliché Expressions{'\n'}
            - Use novel and varied expressions, avoiding cliché expressions.{'\n'}
            - Refrain from using the words: 闪过, 一丝, 狡黠, 石子{'\n'}
            - Avoid using expressions like: 投入水面, 激起涟漪, 指节发白, 闪烁着~的光芒, 像手术刀{'\n'}
            {highlightTextarea && (
              <span
                className="font-semibold"
                style={{ color: isDark ? '#f472b6' : '#db2777' }}
              >
                - 在这里添加你要禁用的表达
              </span>
            )}
          </div>
          {highlightTextarea && (
            <div
              className="absolute -top-3 right-2 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: isDark ? '#ec4899' : '#db2777',
                color: '#fff',
              }}
            >
              在此编辑
            </div>
          )}
        </div>
      </div>

      <MockPromptEditDialogActions isDark={isDark} highlightSave={highlightSave} />
    </div>
  )
}

/* ───────────────────────── Step 1: 找到禁词表 ───────────────────────── */

function StepFind({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="打开提示词列表"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 1 个 <span className="font-semibold">预设</span> 图标，进入{' '}
              <span className="font-semibold">对话补全预设</span> 的提示词列表。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="找到禁词表条目"
          accent="red"
          isDark={isDark}
          detail={
            <>
              在列表中找到{' '}
              <TutorialInlineCode isDark={isDark} tone="pink">
                📍[禁词表] Avoid Cliché Expressions
              </TutorialInlineCode>
              {' '}条目。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="点击编辑按钮"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              点击该条目右侧的{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#f472b6' : '#ec4899' }}
              >
                小铅笔（编辑）
              </span>
              {' '}按钮，进入编辑对话框。
            </>
          }
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

          <MockPromptListColumns isDark={isDark} />

          <div className="space-y-1.5">
            <MockPromptListRow isDark={isDark} tone="pink" emoji="" label="== 指南（可自定义）==" enabled={true} />
            <MockPromptListRow isDark={isDark} tone="pink" emoji="📍" label="[禁词表] Avoid Cliché Expressions" enabled={true} highlight={true} onEditHighlight={true} />
            <MockPromptListRow isDark={isDark} tone="pink" emoji="📍" label="[防软道歉] Avoid Evading" enabled={true} />
          </div>
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Step 2: 编辑禁词表 ───────────────────────── */

function StepEdit({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="添加禁用表达"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在编辑框的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                提示词
              </span>{' '}
              区域，参照已有格式添加你想要禁用的词汇或表达。
            </>
          }
          tip="每行用「-」开头列出；也可在已有行的逗号后追加词汇。"
        />

        <GuideStepCard
          index={2}
          title="保存编辑"
          accent="green"
          isDark={isDark}
          detail={
            <>
              编辑完成后，点击右下角{' '}
              <span className="font-semibold" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>
                保存
              </span>
              {' '}按钮关闭编辑对话框。
            </>
          }
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="编辑对话框" />
        <div className="pt-2">
          <MockEditDialog isDark={isDark} highlightTextarea={true} highlightSave={true} />
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Step 3: 保存预设 & 完成 ───────────────────────── */

function StepSave({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-10 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="保存预设"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              回到预设页面，点击名称输入框右侧的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
                紫色保存按钮
              </span>
              {' '}将修改写入预设文件。
            </>
          }
          tip="不保存预设的话，刷新页面后修改会丢失。"
        />

        <TutorialHintCard isDark={isDark}>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              每次修改 Prompt 后都需要点击{' '}
              <span className="text-purple-400">保存按钮</span> 保存预设。
            </li>
            <li>
              禁词表可以随时编辑，根据实际输出不断补充。
            </li>
          </ul>
        </TutorialHintCard>
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

        <STNavbar activeIndex={0} highlightIndex={0} highlightColor="red" isDark={isDark} />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <STLabel isDark={isDark}>对话补全预设</STLabel>
            <div className="flex gap-1">
              <STButton icon={LinkIcon} isDark={isDark} />
              <STButton icon={FileDown} isDark={isDark} />
              <STButton icon={FileUp} isDark={isDark} />
              <STButton icon={Trash2} isDark={isDark} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <STInput value="Freesia Petals v5.4" isDark={isDark} />
            </div>
            <div className="flex gap-1">
              <div className="relative group">
                <STButton icon={Save} highlight="purple" isDark={isDark} />
                <div className="absolute bottom-full mb-2 right-0 bg-purple-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  记得保存
                </div>
              </div>
              <STButton icon={Edit2} isDark={isDark} />
              <STButton icon={Plus} isDark={isDark} />
            </div>
          </div>

          <div
            className="mt-2 space-y-2 pt-3"
            style={{
              borderTop: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.08)',
            }}
          >
            <div className="flex items-center justify-between">
              <STCheckbox label="解锁上下文长度" checked={true} isDark={isDark} />
              <span className="text-xs" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
                AI可见的最大长度
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                <span>上下文长度 (词符)</span>
                <span className="font-mono text-blue-400">2000000</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: isDark ? '#374151' : '#e2e8f0' }}>
                <div className="h-full w-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Main Page ───────────────────────── */

interface Step extends TutorialStepItem {
  content: (isDark: boolean) => React.ReactNode
}

const steps: Step[] = [
  {
    title: '找到禁词表',
    desc: '在提示词列表中定位条目',
    content: (isDark) => <StepFind isDark={isDark} />,
  },
  {
    title: '编辑禁词内容',
    desc: '添加自定义禁用表达',
    content: (isDark) => <StepEdit isDark={isDark} />,
  },
  {
    title: '保存预设',
    desc: '将修改写入预设',
    content: (isDark) => <StepSave isDark={isDark} />,
  },
]

export default function BannedWords() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Palette className="w-3.5 h-3.5" />}
        badgeLabel="定制教程"
        title="修改禁词表"
        description="添加自定义禁用表达，让 AI 避免输出你不喜欢的词汇。"
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
