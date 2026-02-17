import {
  Palette,
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  PenLine,
  Link2Off,
  Link as LinkIcon,
  ToggleRight,
  ToggleLeft,
  Brain,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import type { Route } from './+types/tutorials.custom-cot'
import {
  STPanel,
  STNavbar,
  STLabel,
  STButton,
  STInput,
  STCheckbox,
  GuideStepCard,
  SimulationBadge,
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
    { title: '定制 CoT 问题 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设 CoT 定制教程 — 学习如何新增或修改 Petals CoT 中的主要问题与可选问题，优化 AI 思考方向。',
    },
  ]
}

/* ───────────────────────── Mock Prompt List Row ───────────────────────── */

function MockPromptRow({
  isDark,
  emoji,
  label,
  enabled,
  highlight,
  onEditHighlight,
}: {
  isDark: boolean
  emoji: string
  label: string
  enabled: boolean
  highlight?: boolean
  onEditHighlight?: boolean
}) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200"
      style={{
        background: highlight
          ? isDark
            ? 'rgba(168,85,247,0.08)'
            : 'rgba(168,85,247,0.04)'
          : isDark
            ? 'rgba(30,30,40,0.6)'
            : 'rgba(250,245,255,0.6)',
        border: highlight
          ? isDark
            ? '1px solid rgba(168,85,247,0.3)'
            : '1px solid rgba(168,85,247,0.2)'
          : isDark
            ? '1px solid rgba(107,114,128,0.2)'
            : '1px solid rgba(147,51,234,0.08)',
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="text-[9px] shrink-0"
          style={{ color: isDark ? '#fbbf24' : '#d97706' }}
        >
          ✱
        </span>
        <span
          className="text-xs truncate"
          style={{ color: isDark ? '#e5e7eb' : '#334155' }}
        >
          {emoji}{label}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link2Off
          size={14}
          strokeWidth={1.8}
          style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
        />
        <div className="relative group">
          <PenLine
            size={14}
            strokeWidth={1.8}
            style={{
              color: onEditHighlight
                ? isDark ? '#c084fc' : '#9333ea'
                : isDark ? '#6b7280' : '#94a3b8',
            }}
          />
          {onEditHighlight && (
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: isDark ? '#a855f7' : '#7e22ce',
                color: '#fff',
              }}
            >
              点击编辑
            </div>
          )}
        </div>
        {enabled ? (
          <ToggleRight
            size={20}
            style={{
              color: isDark ? '#a855f7' : '#9333ea',
            }}
          />
        ) : (
          <ToggleLeft
            size={20}
            style={{ color: isDark ? '#4b5563' : '#94a3b8' }}
          />
        )}
        <span
          className="text-xs font-mono"
          style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
        >
          -
        </span>
      </div>
    </div>
  )
}

/* ───────────────────────── Shared Mock Edit Dialog Bottom Bar ───────────────────────── */

function MockEditDialogBar({
  isDark,
  highlightSave,
}: {
  isDark: boolean
  highlightSave?: boolean
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-default"
        style={{
          background: isDark ? '#2b2d31' : '#f1f5f9',
          color: isDark ? '#9ca3af' : '#64748b',
        }}
      >
        ✕
      </div>
      <div className="relative group">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-default ${
            highlightSave
              ? isDark
                ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
                : 'ring-2 ring-green-500 ring-offset-2 ring-offset-white animate-pulse'
              : ''
          }`}
          style={{
            background: isDark ? '#2b2d31' : '#f1f5f9',
            color: highlightSave
              ? isDark ? '#4ade80' : '#16a34a'
              : isDark ? '#9ca3af' : '#64748b',
          }}
        >
          <Save size={16} />
        </div>
        {highlightSave && (
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: isDark ? '#22c55e' : '#16a34a',
              color: '#fff',
            }}
          >
            保存编辑
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────────────────────── Mock Edit Dialog Header (name/role/trigger) ───────────────────────── */

function MockEditDialogHeader({
  isDark,
  name,
}: {
  isDark: boolean
  name: string
}) {
  const fieldBg = isDark ? '#0b0c0f' : '#ffffff'
  const fieldBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'
  const labelColor = isDark ? '#e5e7eb' : '#334155'

  return (
    <>
      <h3
        className="text-lg font-bold"
        style={{ color: isDark ? '#c084fc' : '#7e22ce' }}
      >
        编辑
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>姓名</div>
          <div
            className="px-2 py-1.5 rounded text-xs truncate"
            style={{ background: fieldBg, border: `1px solid ${fieldBorder}`, color: isDark ? '#d1d5db' : '#475569' }}
          >
            {name}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>角色</div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{ background: fieldBg, border: `1px solid ${fieldBorder}`, color: isDark ? '#d1d5db' : '#475569' }}
          >
            系统
          </div>
        </div>
        <div>
          <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>触发器</div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{ background: fieldBg, border: `1px solid ${fieldBorder}`, color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            All types (default)
          </div>
        </div>
      </div>
    </>
  )
}

/* ───────────────────────── Inline code style helper ───────────────────────── */

function InlineCode({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{
        background: isDark ? 'rgba(168,85,247,0.12)' : 'rgba(168,85,247,0.06)',
        color: isDark ? '#d8b4fe' : '#7e22ce',
      }}
    >
      {children}
    </code>
  )
}

/* ───────────────────────── Step 1: 了解 CoT 问题类型 ───────────────────────── */

function StepUnderstand({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="什么是 Petals CoT"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              Petals CoT 是一种基于<span className="font-semibold">问题</span>的思维链。在思考时，Freesia 会向 Petals 询问指定的问题来引导推理。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="主要问题 (Mandatory)"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              每次 CoT 都会考虑的问题。适合<span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>关键的、必须考虑</span>的内容。
            </>
          }
          tip="例如：情感一致性检查、角色行为合理性等核心问题。"
        />

        <GuideStepCard
          index={3}
          title="可选问题 (Optional)"
          accent="green"
          isDark={isDark}
          detail={
            <>
              Freesia 根据上下文<span className="font-semibold" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>选择其中几个</span>问题进行考虑。适合可选的、在特定时机可为故事增色的问题。
            </>
          }
          tip="例如：伏笔机会、感官细节丰富度等锦上添花的问题。"
        />
      </div>

      {/* Right side: visual concept card */}
      <div className="space-y-4">
        <div
          className="rounded-xl p-5 space-y-4"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.5))',
            border: isDark
              ? '1px solid rgba(147,51,234,0.15)'
              : '1px solid rgba(147,51,234,0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} style={{ color: isDark ? '#c084fc' : '#9333ea' }} />
            <span className="text-sm font-bold" style={{ color: isDark ? '#e5e7eb' : '#334155' }}>
              CoT 思考流程
            </span>
          </div>

          {/* Mandatory */}
          <div
            className="rounded-lg p-3 space-y-2"
            style={{
              background: isDark ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.04)',
              border: isDark ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(168,85,247,0.12)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  background: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(168,85,247,0.1)',
                  color: isDark ? '#c084fc' : '#7e22ce',
                }}
              >
                主要问题
              </span>
              <span className="text-[10px]" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                每次必答
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-start gap-2 text-xs" style={{ color: isDark ? '#d1d5db' : '#475569' }}>
                <HelpCircle size={12} className="shrink-0 mt-0.5" style={{ color: isDark ? '#c084fc' : '#9333ea' }} />
                <span>Based on the latest user input, along with the story's history and requirements, how will the next part of the story unfold?</span>
              </div>
              <div className="flex items-start gap-2 text-xs" style={{ color: isDark ? '#d1d5db' : '#475569' }}>
                <HelpCircle size={12} className="shrink-0 mt-0.5" style={{ color: isDark ? '#c084fc' : '#9333ea' }} />
                <span>你的自定义主要问题…</span>
              </div>
            </div>
          </div>

          {/* Optional */}
          <div
            className="rounded-lg p-3 space-y-2"
            style={{
              background: isDark ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.03)',
              border: isDark ? '1px solid rgba(34,197,94,0.15)' : '1px solid rgba(34,197,94,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  background: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.08)',
                  color: isDark ? '#4ade80' : '#16a34a',
                }}
              >
                可选问题
              </span>
              <span className="text-[10px]" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                按上下文选择
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-start gap-2 text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                <HelpCircle size={12} className="shrink-0 mt-0.5" style={{ color: isDark ? '#4ade80' : '#16a34a' }} />
                <span>Are there opportunities to introduce twists, surprises, or new elements into the story?</span>
              </div>
              <div className="flex items-start gap-2 text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                <HelpCircle size={12} className="shrink-0 mt-0.5" style={{ color: isDark ? '#4ade80' : '#16a34a' }} />
                <span>你的自定义可选问题…</span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 text-xs pt-1"
            style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            <Sparkles size={12} />
            <span>Freesia 在 CoT 中逐一思考这些问题</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Method 1 (Part 1): 找到问题条目 ───────────────────────── */

function StepFindQuestions({
  isDark,
  startIndex = 1,
}: {
  isDark: boolean
  startIndex?: number
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={startIndex}
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
          index={startIndex + 1}
          title="找到 Questions to Consider 条目"
          accent="red"
          isDark={isDark}
          detail={
            <>
              在列表中找到{' '}
              <InlineCode isDark={isDark}>🌸[问题] Questions to Consider</InlineCode>
              {' '}条目。
            </>
          }
        />

        <GuideStepCard
          index={startIndex + 2}
          title="点击编辑按钮"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              点击该条目右侧的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>
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

          <div
            className="flex items-center justify-between px-3 py-1"
            style={{
              borderBottom: isDark
                ? '1px solid rgba(107,114,128,0.2)'
                : '1px solid rgba(147,51,234,0.08)',
            }}
          >
            <span className="text-xs font-medium" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>名称</span>
            <span className="text-xs font-medium" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>词符</span>
          </div>

          <div className="space-y-1.5">
            <MockPromptRow isDark={isDark} emoji="🌸" label="Memory" enabled={true} />
            <MockPromptRow isDark={isDark} emoji="" label="== 需考虑的问题 ==" enabled={true} />
            <MockPromptRow isDark={isDark} emoji="🌸" label="[问题] Questions to Consider" enabled={true} highlight={true} onEditHighlight={true} />
          </div>
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Method 1 (Part 2): 编辑问题内容 ───────────────────────── */

function StepEditQuestions({
  isDark,
  startIndex = 1,
}: {
  isDark: boolean
  startIndex?: number
}) {
  const fieldBg = isDark ? '#0b0c0f' : '#ffffff'
  const fieldBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={startIndex}
          title="添加自定义问题"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在编辑框的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>提示词</span>
              {' '}区域，按对应位置添加问题：
              <span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>主要问题</span>添加在
              {' '}<InlineCode isDark={isDark}>Mandatory Questions</InlineCode>{' '}下方，
              <span className="font-semibold" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>可选问题</span>添加在
              {' '}<InlineCode isDark={isDark}>Optional Questions</InlineCode>{' '}下方。
            </>
          }
          tip="每行用「-」开头，一个问题一行。"
        />

        <GuideStepCard
          index={startIndex + 1}
          title="保存编辑"
          accent="green"
          isDark={isDark}
          detail={
            <>
              编辑完成后，点击右下角{' '}
              <span className="font-semibold" style={{ color: isDark ? '#4ade80' : '#16a34a' }}>保存</span>
              {' '}按钮关闭编辑对话框。
            </>
          }
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="编辑对话框" />
        <div className="pt-2 space-y-4">
          <MockEditDialogHeader isDark={isDark} name="🌸[问题] Questions to Consider" />

          <div>
            <div className="text-xs font-medium mb-1" style={{ color: isDark ? '#e5e7eb' : '#334155' }}>提示词</div>
            <div className="relative group">
              <div
                className="px-3 py-2.5 rounded-lg text-[11px] leading-relaxed font-mono whitespace-pre-wrap min-h-[120px]"
                style={{
                  background: fieldBg,
                  border: isDark
                    ? '2px solid rgba(168,85,247,0.5)'
                    : '2px solid rgba(168,85,247,0.4)',
                  color: isDark ? '#d1d5db' : '#475569',
                  boxShadow: isDark
                    ? '0 0 12px rgba(168,85,247,0.15)'
                    : '0 0 12px rgba(168,85,247,0.1)',
                }}
              >
                <span style={{ color: isDark ? '#9ca3af' : '#64748b' }}>## Mandatory Questions</span>
                <br />
                - Based on the latest user input, along with the story's history and requirements, how will the next part of the story unfold?
                <br />
                <span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
                  - 在这里添加新的主要问题
                </span>
                <br />
                <br />
                <span style={{ color: isDark ? '#9ca3af' : '#64748b' }}>## Optional Questions</span>
                <br />
                - Are there opportunities to introduce twists, surprises, or new elements into the story?
                <br />
                <span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
                  - 在这里添加新的可选问题
                </span>
              </div>
              <div
                className="absolute -top-3 right-2 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: isDark ? '#a855f7' : '#7e22ce',
                  color: '#fff',
                }}
              >
                在此编辑
              </div>
            </div>
          </div>

          <MockEditDialogBar isDark={isDark} highlightSave={true} />
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Step 2: 方法一（修改问题条目） ───────────────────────── */

function StepMethodOne({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-8">
      <StepFindQuestions isDark={isDark} startIndex={1} />
      <StepEditQuestions isDark={isDark} startIndex={4} />
    </div>
  )
}

/* ───────────────────────── Step 3: 方法二（使用 addglobalvar 宏） ───────────────────────── */

function StepMacro({ isDark }: { isDark: boolean }) {
  const fieldBg = isDark ? '#0b0c0f' : '#ffffff'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="选择目标提示词条目"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              打开你希望绑定问题的提示词条目（如写作风格指南等），点击编辑按钮。
            </>
          }
          tip="当问题与某个提示词组件关联时，推荐使用此方法。问题将随该条目一起开关，且便于分享。"
        />

        <GuideStepCard
          index={2}
          title="添加 addglobalvar 宏"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在提示词内容中添加宏指令。使用{' '}
              <InlineCode isDark={isDark}>Petals_Mandatory_Question</InlineCode>{' '}
              新增主要问题，使用{' '}
              <InlineCode isDark={isDark}>Petals_Optional_Question</InlineCode>{' '}
              新增可选问题。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="保存编辑"
          accent="green"
          isDark={isDark}
          detail={
            <>
              保存后，该问题将随此提示词条目一起生效或关闭。
            </>
          }
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="编辑对话框" />
        <div className="pt-2 space-y-4">
          <MockEditDialogHeader isDark={isDark} name="🎨[自定义文风模板]" />

          <div>
            <div className="text-xs font-medium mb-1" style={{ color: isDark ? '#e5e7eb' : '#334155' }}>提示词</div>
            <div className="relative group">
              <div
                className="px-3 py-2.5 rounded-lg text-[11px] leading-relaxed font-mono whitespace-pre-wrap min-h-[100px]"
                style={{
                  background: fieldBg,
                  border: isDark
                    ? '2px solid rgba(234,179,8,0.5)'
                    : '2px solid rgba(234,179,8,0.4)',
                  color: isDark ? '#d1d5db' : '#475569',
                  boxShadow: isDark
                    ? '0 0 12px rgba(234,179,8,0.15)'
                    : '0 0 12px rgba(234,179,8,0.1)',
                }}
              >
                ...(其他提示词内容)...
                <br />
                <br />
                <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#b45309' }}>
                  {'{{addglobalvar::Petals_Mandatory_Question::'}
                  <br />
                  {'- 自定义主要问题}}'}
                  <br />
                  {'{{addglobalvar::Petals_Optional_Question::'}
                  <br />
                  {'- 自定义可选问题1'}
                  <br />
                  {'- 自定义可选问题2}}'}
                </span>
              </div>
              <div
                className="absolute -top-3 right-2 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: isDark ? '#eab308' : '#b45309',
                  color: '#fff',
                }}
              >
                宏指令
              </div>
            </div>
          </div>

          <MockEditDialogBar isDark={isDark} highlightSave={true} />
        </div>
      </STPanel>
    </div>
  )
}

/* ───────────────────────── Step 4: 保存预设 ───────────────────────── */

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
              两种方法可以混合使用：核心问题直接写在 Questions 条目中，与特定提示词关联的问题用 addglobalvar 宏。
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
              <STInput value="Freesia Petals Full v5.2" isDark={isDark} />
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
    title: '了解 CoT 问题类型',
    desc: '主要问题与可选问题的区别',
    content: (isDark) => <StepUnderstand isDark={isDark} />,
  },
  {
    title: '方法一：修改问题条目',
    desc: '定位并直接编辑 Questions to Consider',
    content: (isDark) => <StepMethodOne isDark={isDark} />,
  },
  {
    title: '方法二：使用 addglobalvar 宏',
    desc: '将问题绑定到提示词条目',
    content: (isDark) => <StepMacro isDark={isDark} />,
  },
  {
    title: '保存预设',
    desc: '将修改写入预设',
    content: (isDark) => <StepSave isDark={isDark} />,
  },
]

export default function CustomCoT() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Palette className="w-3.5 h-3.5" />}
        badgeLabel="定制教程"
        title="定制 CoT 问题"
        description="新增或修改思维链中的问题，引导 AI 思考方向。"
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
