import { useState } from 'react'
import {
  Settings,
  Zap,
  Lightbulb,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from 'lucide-react'
import type { Route } from './+types/tutorials.preset-features'
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
import { MockAtFreesia, MockOptions } from '~/components/ui/mock-ui'
import {
  STPanel,
  MockPetalsInputBar,
  MockInteractiveSelectionMenu,
  MockSelectionMenu,
} from '~/components/ui/tutorial-mock'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Petals 预设功能设置 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设功能设置教程 — 了解元回复设置、UI 主题切换、故事选项开关、节省 Token 模式的配置方式与用法。',
    },
  ]
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
          title="选择对应功能入口"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在弹出的
              <span className="font-semibold"> Freesia Petals 设置菜单 </span>
              中，按需选择对应项目：
              <span className="font-semibold"> 元回复设置</span>、
              <span className="font-semibold"> UI主题</span>、
              <span className="font-semibold"> 故事选项</span> 或
              <span className="font-semibold"> 节省 Token</span>。
            </>
          }
          tip="菜单选项较多，可能需要滚动找到对应入口。"
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
              { id: 'always-reply', label: '元回复设置' },
              { id: 'theme', label: 'UI主题' },
              { id: 'user-options', label: '故事选项' },
              { id: 'reduce-token', label: '节省 Token' },
            ]}
            highlightItemId="always-reply"
            highlightTone="yellow"
          />
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────── Step 2: 元回复设置 ───────────────────── */

function StepAlwaysReply({ isDark }: { isDark: boolean }) {
  const [enabled, setEnabled] = useState(true)

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
          元回复设置（Always Reply）
        </span>
        {' '}控制 Freesia 是否在每次回复时都附带元回复（Meta Reply）。元回复是 Freesia 以自身视角的创作反馈与交流。
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
        {/* Left: explanation */}
        <div className="space-y-4">
          {/* Status explanation */}
          <div
            className="rounded-xl p-4 transition-all duration-300"
            style={{
              background: enabled
                ? isDark ? 'rgba(236,72,153,0.06)' : 'rgba(236,72,153,0.04)'
                : isDark ? 'rgba(107,114,128,0.06)' : 'rgba(107,114,128,0.04)',
              border: enabled
                ? isDark ? '1px solid rgba(236,72,153,0.2)' : '1px solid rgba(236,72,153,0.1)'
                : isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(107,114,128,0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {enabled ? (
                <ToggleRight size={18} style={{ color: '#ec4899' }} />
              ) : (
                <ToggleLeft size={18} style={{ color: isDark ? '#6b7280' : '#94a3b8' }} />
              )}
              <span
                className="text-sm font-bold"
                style={{ color: enabled ? '#ec4899' : isDark ? '#9ca3af' : '#64748b' }}
              >
                {enabled ? '始终开启' : '按需触发'}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
              {enabled
                ? '每次回复都会附带 Freesia 的元回复。'
                : '只有当你的输入包含 @Freesia 元指令时，才会出现元回复。'}
            </p>
          </div>

          {/* MessageCard example */}
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="元回复示例" />
            <div
              className="text-xs font-medium mb-3"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              Freesia 的元回复
            </div>
            <MockAtFreesia isDark={isDark} />
          </STPanel>
        </div>

        {/* Right: ST button dialog simulation */}
        <div className="space-y-4">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="元回复开关" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              点击切换启用/禁用状态
            </div>
            <MockInteractiveSelectionMenu
              isDark={isDark}
              title="是否始终请求 Freesia 元回复？"
              items={[
                { id: 'enable', label: '启用', accent: '#ec4899' },
                { id: 'disable', label: '禁用', accent: '#6b7280' },
              ]}
              activeItemId={enabled ? 'enable' : 'disable'}
              onSelect={(id) => setEnabled(id === 'enable')}
            />
          </STPanel>
        </div>
      </div>

      <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
        <ul className="list-disc pl-4 space-y-1">
          <li>对于<span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>带剧情角色卡</span>的游玩，建议<span className="font-medium text-amber-500">关闭</span>元回复，避免 Freesia 剧透后续剧情。</li>
          <li>对于<span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>无预设剧情</span>的自由创作场景，元回复能让 Freesia 给出有价值的写作反馈。</li>
          <li>关闭后仍可随时通过 <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>@Freesia</span> 指令手动触发元回复。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 3: UI 主题 ───────────────────── */

function StepTheme({ isDark }: { isDark: boolean }) {
  const [previewDark, setPreviewDark] = useState(isDark)

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
          UI 主题（Theme）
        </span>
        {' '}切换花瓣预设所有 UI 组件的外观主题。影响 Petals CoT、故事梗概、记忆面板、故事选项等所有渲染 UI 的明暗模式。
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
        {/* Left: theme info + live preview */}
        <div className="space-y-4">
          
          {/* Live preview of Petals UI */}
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="实时预览" />
            <div
              className="text-xs font-medium mb-3"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              {previewDark ? '深色模式' : '浅色模式'}下的 Petals UI 效果
            </div>
            <div
              className="rounded-lg overflow-hidden p-3 transition-all duration-500"
              style={{
                background: previewDark
                  ? 'linear-gradient(180deg, #0c0a14, #12101e)'
                  : 'linear-gradient(180deg, #fefcff, #faf7ff)',
              }}
            >
              <MockOptions isDark={previewDark} />
            </div>
          </STPanel>
        </div>

        {/* Right: ST button dialog simulation */}
        <div className="space-y-4">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="主题选择" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              点击切换查看浅色/深色效果
            </div>
            <MockInteractiveSelectionMenu
              isDark={isDark}
              title="切换花瓣预设 UI 主题"
              items={[
                { id: 'light', label: '浅色模式', accent: '#eab308' },
                { id: 'dark', label: '深色模式', accent: '#a855f7' },
              ]}
              activeItemId={previewDark ? 'dark' : 'light'}
              onSelect={(id) => setPreviewDark(id === 'dark')}
            />
          </STPanel>
        </div>
      </div>

      <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
        <ul className="list-disc pl-4 space-y-1">
          <li>主题设置会影响<span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>所有 Petals UI 组件</span>的外观，包括 Petals CoT、故事梗概、记忆面板、故事选项等。</li>
          <li>切换主题时 Petals 会自动重新加载对话以应用新的 Regex 渲染规则。</li>
          <li>主题设置与 SillyTavern 自身的 UI 主题<span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>相互独立</span>。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 4: 故事选项 ───────────────────── */

function StepUserOptions({ isDark }: { isDark: boolean }) {
  const [enabled, setEnabled] = useState(true)

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
          故事选项（User Options）
        </span>
        {' '}启用后，Freesia 会在每次回复末尾自动生成多个推进故事的输入选项。不知道接下来怎么推进？让 Freesia 给你灵感！
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
        {/* Left: explanation + feature overview */}
        <div className="space-y-4">
          {/* MockOptions example */}
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="故事选项示例" />
            <div
              className="text-xs font-medium mb-3"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              Freesia 自动生成的故事选项
            </div>
            <div
              className="rounded-lg overflow-hidden transition-all duration-300"
              style={{
                opacity: enabled ? 1 : 0.4,
                filter: enabled ? 'none' : 'grayscale(0.5)',
              }}
            >
              <MockOptions isDark={isDark} />
            </div>
            {!enabled && (
              <div
                className="mt-3 text-center text-xs font-medium py-2 rounded-lg"
                style={{
                  background: isDark ? 'rgba(107,114,128,0.1)' : 'rgba(107,114,128,0.06)',
                  color: isDark ? '#6b7280' : '#94a3b8',
                }}
              >
                故事选项已禁用
              </div>
            )}
          </STPanel>
        </div>

        {/* Right: ST button dialog simulation */}
        <div className="lg:sticky lg:top-28">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="故事选项开关" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              点击切换启用/禁用状态
            </div>
            <MockInteractiveSelectionMenu
              isDark={isDark}
              title="是否启用故事选项功能？"
              items={[
                { id: 'enable', label: '启用', accent: '#7c3aed' },
                { id: 'disable', label: '禁用', accent: '#6b7280' },
              ]}
              activeItemId={enabled ? 'enable' : 'disable'}
              onSelect={(id) => setEnabled(id === 'enable')}
            />
          </STPanel>
        </div>
      </div>

      <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
        <ul className="list-disc pl-4 space-y-1">
          <li>故事选项会在每次回复的末尾自动出现，你可以选择其中一个作为你的下一步发言。</li>
          <li>如果你更喜欢完全自主决定故事走向，可以<span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>关闭</span>此功能。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 5: 节省 Token ───────────────────── */

function StepReduceToken({ isDark }: { isDark: boolean }) {
  const [enabled, setEnabled] = useState(false)

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
          节省 Token（Reduce Token）
        </span>
        {' '}开启后，对于深度 15 以上的历史消息，将仅发送故事梗概而非完整文本，有效减少上下文长度和 Token 消耗。
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
        {/* Left: explanation + diagram */}
        <div className="space-y-4">
          {/* Status */}
          <div
            className="rounded-xl p-4 transition-all duration-300"
            style={{
              background: enabled
                ? isDark ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.04)'
                : isDark ? 'rgba(107,114,128,0.06)' : 'rgba(107,114,128,0.04)',
              border: enabled
                ? isDark ? '1px solid rgba(6,182,212,0.2)' : '1px solid rgba(6,182,212,0.1)'
                : isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(107,114,128,0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} style={{ color: enabled ? '#06b6d4' : isDark ? '#6b7280' : '#94a3b8' }} />
              <span
                className="text-sm font-bold"
                style={{ color: enabled ? '#06b6d4' : isDark ? '#9ca3af' : '#64748b' }}
              >
                {enabled ? '节省模式已开启' : '节省模式已关闭'}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
              {enabled
                ? '深度 15 以上的消息将发送故事梗概代替完整文本，显著减少 Token 消耗，适合超长对话。'
                : '所有消息将发送完整内容，不进行任何折叠，适合上下文窗口充足的场景。'}
            </p>
          </div>

          {/* Depth visualization */}
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="工作原理" />
            <div
              className="text-xs font-medium mb-4"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              节省 Token 模式示意
            </div>

            <div className="space-y-2">
              {[
                { depth: 30, label: '更早消息', full: false },
                { depth: 20, label: '较早消息', full: false },
                { depth: 15, label: '临界深度', full: true, highlight: true },
                { depth: 10, label: '近期消息', full: true },
                { depth: 0, label: '最新消息', full: true },
              ].map((item) => (
                <div
                  key={item.depth}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
                  style={{
                    background: item.highlight
                      ? isDark ? 'rgba(234,179,8,0.08)' : 'rgba(234,179,8,0.06)'
                      : !item.full && enabled
                      ? isDark ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.04)'
                      : isDark ? 'rgba(107,114,128,0.06)' : 'rgba(107,114,128,0.04)',
                    border: item.highlight
                      ? '1px dashed rgba(234,179,8,0.4)'
                      : !item.full && enabled
                      ? isDark ? '1px solid rgba(6,182,212,0.15)' : '1px solid rgba(6,182,212,0.1)'
                      : '1px solid transparent',
                  }}
                >
                  <span
                    className="text-[10px] font-mono font-bold w-12 text-center shrink-0"
                    style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
                  >
                    D{item.depth}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-medium"
                      style={{ color: isDark ? '#e5e7eb' : '#334155' }}
                    >
                      {item.label}
                    </div>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0"
                    style={{
                      background: item.full || !enabled
                        ? isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)'
                        : isDark ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.08)',
                      color: item.full || !enabled ? '#22c55e' : '#06b6d4',
                      border: item.full || !enabled
                        ? '1px solid rgba(34,197,94,0.2)'
                        : '1px solid rgba(6,182,212,0.2)',
                    }}
                  >
                    {item.full || !enabled ? '完整内容' : '仅梗概'}
                  </span>
                </div>
              ))}
            </div>
          </STPanel>
        </div>

        {/* Right: ST button dialog simulation */}
        <div className="lg:sticky lg:top-28">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="节省 Token 开关" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              点击切换开启/关闭状态
            </div>
            <MockInteractiveSelectionMenu
              isDark={isDark}
              title="节省 Token 模式"
              items={[
                { id: 'enable', label: '开启', accent: '#06b6d4' },
                { id: 'disable', label: '关闭', accent: '#6b7280' },
              ]}
              activeItemId={enabled ? 'enable' : 'disable'}
              onSelect={(id) => setEnabled(id === 'enable')}
            />
          </STPanel>
        </div>
      </div>

      <TutorialHintCard isDark={isDark} title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}>
        <ul className="list-disc pl-4 space-y-1">
          <li>此功能依赖<span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>故事梗概（Synopsis）</span>功能，确保故事梗概已正确生成。</li>
          <li>深度 15 以内的消息<span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>始终发送完整内容</span>，不受此设置影响。</li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 6: 完成 ───────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="功能设置完成!"
      description="预设功能已根据你的偏好配置完毕，Freesia 将按照你的设置运行。"
    >
      <TutorialHintCard
        isDark={isDark}
        className="max-w-md mx-auto"
        title={<span className="inline-flex items-center gap-1.5"><Lightbulb size={15} />小提示:</span>}
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>所有功能可随时通过<span className="text-yellow-500 font-medium">齿轮按钮</span>后，在设置菜单中点击对应入口重新配置。</li>
          <li>各功能之间相互独立，可按需自由组合开关。</li>
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
    desc: '从设置菜单选择四项对应入口',
    content: (isDark) => <StepFindEntry isDark={isDark} />,
  },
  {
    title: '元回复设置',
    desc: '配置 Freesia 元回复的触发方式',
    content: (isDark) => <StepAlwaysReply isDark={isDark} />,
  },
  {
    title: 'UI 主题',
    desc: '切换浅色 / 深色模式',
    content: (isDark) => <StepTheme isDark={isDark} />,
  },
  {
    title: '故事选项',
    desc: '启用或关闭自动故事选项',
    content: (isDark) => <StepUserOptions isDark={isDark} />,
  },
  {
    title: '节省 Token',
    desc: '开启 Token 折叠以减少上下文',
    content: (isDark) => <StepReduceToken isDark={isDark} />,
  },
  {
    title: '配置完成',
    desc: '开始创作',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function PresetFeatures() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Settings className="w-3.5 h-3.5" />}
        badgeLabel="配置指南"
        title="预设功能设置"
        description="了解元回复设置、UI 主题切换、故事选项开关、节省 Token 模式的配置方式与用法。"
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
