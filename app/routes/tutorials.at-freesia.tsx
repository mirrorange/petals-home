import { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  AtSign,
  Lightbulb,
  MessageSquare,
  Zap,
  PenLine,
  Send,
  Menu,
  Settings,
  FileText,
  Trash2,
  Layers,
} from 'lucide-react'
import type { Route } from './+types/tutorials.at-freesia'
import {
  GuideStepCard,
  TutorialCompletionCard,
  TutorialHintCard,
} from '~/components/ui/TutorialComponents'
import { STPanel, SimulationBadge } from '~/components/ui/TutorialMockComponents'
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialStepQuery,
  useTutorialTheme,
} from '~/components/ui/TutorialPageLayout'
import { hexToRgb } from '~/components/ui/TutorialColorUtils'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '@Freesia 系统 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设 @Freesia 系统教程 — 了解如何通过 @Freesia 元指令与小苍兰对话、混合创作或发出纯元指令。',
    },
  ]
}

/* ───────────────────────── Detect Mode Helper ───────────────────────── */

type InputMode = 'no-meta' | 'mixed' | 'pure-meta'

function detectMode(text: string): InputMode {
  const trimmed = text.trim()
  if (!trimmed) return 'no-meta'
  const atIndex = trimmed.indexOf('@Freesia')
  if (atIndex < 0) return 'no-meta'
  if (atIndex === 0) return 'pure-meta'
  return 'mixed'
}

function getModeLabel(mode: InputMode): string {
  switch (mode) {
    case 'no-meta':
      return '无元指令'
    case 'mixed':
      return '混合模式'
    case 'pure-meta':
      return '纯元指令模式'
  }
}

function getModeColor(mode: InputMode, isDark: boolean): string {
  switch (mode) {
    case 'no-meta':
      return isDark ? '#9ca3af' : '#64748b'
    case 'mixed':
      return isDark ? '#c084fc' : '#9333ea'
    case 'pure-meta':
      return isDark ? '#f472b6' : '#ec4899'
  }
}

function getModeDescription(mode: InputMode): string {
  switch (mode) {
    case 'no-meta':
      return '当前输入不包含 @Freesia，内容将被作为纯故事输入处理。'
    case 'mixed':
      return '检测到混合模式：@Freesia 之前的内容为故事输入，之后的内容为元指令。Freesia 将执行完整工作流输出故事正文，同时遵循元指令。'
    case 'pure-meta':
      return '检测到纯元指令模式：以 @Freesia 开头，故事暂停，Freesia 将专注处理你的指令或与你聊天。'
  }
}

/* ───────────────────────── Interactive Mock Input Bar ───────────────────────── */

function InteractiveMockInputBar({
  isDark,
  value,
  onChange,
  onAtClick,
}: {
  isDark: boolean
  value: string
  onChange: (value: string) => void
  onAtClick: () => void
}) {
  const barBg = isDark ? '#1e1f24' : '#f3f0fa'
  const barBorder = isDark ? 'rgba(107,114,128,0.35)' : 'rgba(147,51,234,0.12)'
  const iconColor = isDark ? '#9ca3af' : '#64748b'
  const inputBg = isDark ? '#0b0c0f' : '#ffffff'
  const inputBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'

  const mode = detectMode(value)

  const quickActions = [
    { id: 'mention', Icon: AtSign, onClick: onAtClick, highlight: true },
    { id: 'idea', Icon: Lightbulb, onClick: undefined, highlight: false },
    { id: 'template', Icon: FileText, onClick: undefined, highlight: false },
    { id: 'edit', Icon: PenLine, onClick: undefined, highlight: false },
    { id: 'clear', Icon: Trash2, onClick: undefined, highlight: false },
    { id: 'settings', Icon: Settings, onClick: undefined, highlight: false },
  ]

  const atHighlightRing = isDark
    ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-[#1b1c21]'
    : 'ring-2 ring-pink-500 ring-offset-2 ring-offset-white'

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: barBg,
        border: `1px solid ${barBorder}`,
      }}
    >
      <div
        className="flex items-center justify-center gap-1 px-3 py-2"
        style={{
          borderBottom: `1px solid ${isDark ? 'rgba(107,114,128,0.2)' : 'rgba(147,51,234,0.08)'}`,
        }}
      >
        {quickActions.map(({ id, Icon, onClick, highlight }) => (
          <div
            key={id}
            className={`h-8 min-w-10 px-2 rounded-full flex items-center justify-center ${
              onClick ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
            } ${id === 'mention' && highlight ? atHighlightRing : ''}`}
            style={{
              background: isDark ? '#1f2127' : '#ffffff',
              border: isDark
                ? '1px solid rgba(107,114,128,0.3)'
                : '1px solid rgba(147,51,234,0.1)',
              color:
                id === 'mention' && highlight
                  ? isDark
                    ? '#f472b6'
                    : '#ec4899'
                  : iconColor,
            }}
            onClick={onClick}
          >
            <Icon size={15} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5">
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Menu size={16} />
        </div>
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Sparkles size={16} />
        </div>
        <input
          className="flex-1 px-3 py-1.5 rounded-lg text-sm outline-none transition-all"
          style={{
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            color: isDark ? '#e5e7eb' : '#1e293b',
          }}
          placeholder="试试输入故事内容，或输入 @Freesia..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Send size={16} />
        </div>
      </div>

      {/* Mode indicator */}
      <div
        className="px-3 py-2 flex items-center gap-2 transition-all duration-300"
        style={{
          borderTop: `1px solid ${isDark ? 'rgba(107,114,128,0.15)' : 'rgba(147,51,234,0.06)'}`,
          background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(147,51,234,0.02)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
          style={{ background: getModeColor(mode, isDark) }}
        />
        <span
          className="text-xs font-semibold transition-colors duration-300"
          style={{ color: getModeColor(mode, isDark) }}
        >
          {getModeLabel(mode)}
        </span>
      </div>
    </div>
  )
}

/* ───────────────────────── Mode Result Card ───────────────────────── */

function ModeResultCard({
  isDark,
  mode,
  storyPart,
  metaPart,
}: {
  isDark: boolean
  mode: InputMode
  storyPart: string
  metaPart: string
}) {
  if (mode === 'no-meta' && !storyPart) return null

  return (
    <div
      className="rounded-xl p-4 space-y-3 transition-all duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(15,12,24,0.6), rgba(26,22,37,0.4))'
          : 'linear-gradient(135deg, rgba(250,245,255,0.8), rgba(255,255,255,0.9))',
        border: isDark
          ? '1px solid rgba(147,51,234,0.2)'
          : '1px solid rgba(147,51,234,0.1)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
          style={{
            background: `${getModeColor(mode, isDark)}18`,
            color: getModeColor(mode, isDark),
            border: `1px solid ${getModeColor(mode, isDark)}30`,
          }}
        >
          {getModeLabel(mode)}
        </span>
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: isDark ? '#cbd5e1' : '#475569' }}
      >
        {getModeDescription(mode)}
      </p>

      {mode !== 'no-meta' && (
        <div className="space-y-2 pt-1">
          {storyPart && (
            <div
              className="rounded-lg px-3 py-2 text-xs"
              style={{
                background: isDark ? 'rgba(147,51,234,0.08)' : 'rgba(147,51,234,0.04)',
                border: isDark
                  ? '1px solid rgba(147,51,234,0.15)'
                  : '1px solid rgba(147,51,234,0.08)',
              }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-wider block mb-1"
                style={{ color: isDark ? '#c084fc' : '#9333ea' }}
              >
                故事输入
              </span>
              <span style={{ color: isDark ? '#e5e7eb' : '#334155' }}>{storyPart}</span>
            </div>
          )}
          <div
            className="rounded-lg px-3 py-2 text-xs"
            style={{
              background: isDark ? 'rgba(236,72,153,0.08)' : 'rgba(236,72,153,0.04)',
              border: isDark
                ? '1px solid rgba(236,72,153,0.15)'
                : '1px solid rgba(236,72,153,0.08)',
            }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-wider block mb-1"
              style={{ color: isDark ? '#f472b6' : '#ec4899' }}
            >
              元指令
            </span>
            <span style={{ color: isDark ? '#e5e7eb' : '#334155' }}>
              {metaPart || '（空元指令）'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── Step 1: 认识 @Freesia ───────────────────────── */

function StepIntro({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="什么是 @Freesia"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              <span
                className="font-semibold"
                style={{ color: isDark ? '#f472b6' : '#ec4899' }}
              >
                @Freesia
              </span>{' '}
              是花瓣预设的元指令系统。你可以在输入故事内容的同时，通过{' '}
              <code
                className="text-xs px-1.5 py-0.5 rounded font-mono"
                style={{
                  background: isDark ? 'rgba(147,51,234,0.12)' : 'rgba(147,51,234,0.06)',
                  color: isDark ? '#d8b4fe' : '#7e22ce',
                }}
              >
                @Freesia
              </code>{' '}
              向小苍兰发送元指令，指导她如何创作。
            </>
          }
          tip="元指令不是故事内容的一部分 — 它是你与 Freesia 之间的「悄悄话」。"
        />
        <GuideStepCard
          index={2}
          title="如何触发"
          accent="red"
          isDark={isDark}
          detail={
            <>
              两种方式触发 @Freesia：
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>
                  点击输入框上方快速回复栏最左侧的{' '}
                  <span
                    className="font-semibold"
                    style={{ color: isDark ? '#f472b6' : '#ec4899' }}
                  >
                    @ 按钮
                  </span>
                </li>
                <li>
                  直接在输入框中手动输入{' '}
                  <code
                    className="text-xs px-1.5 py-0.5 rounded font-mono"
                    style={{
                      background: isDark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.06)',
                      color: isDark ? '#f9a8d4' : '#db2777',
                    }}
                  >
                    @Freesia
                  </code>
                </li>
              </ul>
            </>
          }
          tip="@ 按钮会自动输入框末尾插入 @Freesia"
        />
      </div>

      <div className="space-y-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="解析规则" />
          <div
            className="rounded-xl p-5 space-y-4 max-w-sm mx-auto"
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
              className="text-center text-base font-bold mb-2"
              style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
            >
              输入解析规则
            </h3>

            {/* Visual parse illustration */}
            <div
              className="rounded-lg p-3 text-sm font-mono"
              style={{
                background: isDark ? '#0b0c0f' : '#ffffff',
                border: isDark
                  ? '1px solid rgba(107,114,128,0.3)'
                  : '1px solid rgba(147,51,234,0.1)',
              }}
            >
              <span style={{ color: isDark ? '#c084fc' : '#9333ea' }}>故事输入...&ensp;</span>
              <span
                className="font-bold px-0.5"
                style={{ color: isDark ? '#f472b6' : '#ec4899' }}
              >
                @Freesia&ensp;
              </span>
              <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>元指令输入...</span>
            </div>

            <div className="space-y-2 text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: isDark ? '#c084fc' : '#9333ea' }}
                />
                <span>
                  <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#9333ea' }}>
                    @Freesia 之前
                  </span>{' '}
                  → 故事输入（纳入上下文）
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: isDark ? '#f472b6' : '#ec4899' }}
                />
                <span>
                  <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
                    @Freesia 之后
                  </span>{' '}
                  → 元指令（指导 Freesia）
                </span>
              </div>
            </div>
          </div>
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────────── Step 2: 混合模式 ───────────────────────── */

function StepMixed({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
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
          混合模式（Mixed Mode）
        </span>
        {' '}在输入故事内容的同时使用{' '}
        <code
          className="text-xs px-1 py-0.5 rounded font-mono"
          style={{
            background: isDark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.06)',
            color: isDark ? '#f9a8d4' : '#db2777',
          }}
        >
          @Freesia
        </code>{' '}
        提出指令。Freesia 会执行完整工作流，输出故事正文，同时遵循你的元指令。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Example 1 */}
        <div
          className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(147,51,234,0.04), rgba(15,23,42,0.4))'
              : 'linear-gradient(135deg, rgba(147,51,234,0.03), rgba(255,255,255,0.9))',
            border: isDark
              ? '1px solid rgba(147,51,234,0.2)'
              : '1px solid rgba(147,51,234,0.12)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(147,51,234,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.08)',
                color: isDark ? '#d8b4fe' : '#9333ea',
                border: isDark
                  ? '1px solid rgba(147,51,234,0.25)'
                  : '1px solid rgba(147,51,234,0.15)',
              }}
            >
              示例 1
            </span>
          </div>
          <div
            className="rounded-lg p-3 text-sm font-mono leading-relaxed"
            style={{
              background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.02)',
              border: isDark
                ? '1px solid rgba(107,114,128,0.2)'
                : '1px solid rgba(147,51,234,0.06)',
              color: isDark ? '#e5e7eb' : '#334155',
            }}
          >
            <span style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>她轻轻推开了花园的门。</span>
            <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-bold">
              @Freesia
            </span>{' '}
            <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>描写得更细腻一点</span>
          </div>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            故事继续推进，Freesia 会在创作中增加更多细节和感官描写。
          </p>
        </div>

        {/* Example 2 */}
        <div
          className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(236,72,153,0.04), rgba(15,23,42,0.4))'
              : 'linear-gradient(135deg, rgba(236,72,153,0.03), rgba(255,255,255,0.9))',
            border: isDark
              ? '1px solid rgba(236,72,153,0.2)'
              : '1px solid rgba(236,72,153,0.12)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(236,72,153,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(236,72,153,0.15)' : 'rgba(236,72,153,0.08)',
                color: isDark ? '#f9a8d4' : '#db2777',
                border: isDark
                  ? '1px solid rgba(236,72,153,0.25)'
                  : '1px solid rgba(236,72,153,0.15)',
              }}
            >
              示例 2
            </span>
          </div>
          <div
            className="rounded-lg p-3 text-sm font-mono leading-relaxed"
            style={{
              background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.02)',
              border: isDark
                ? '1px solid rgba(107,114,128,0.2)'
                : '1px solid rgba(147,51,234,0.06)',
              color: isDark ? '#e5e7eb' : '#334155',
            }}
          >
            <span style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
              "你还记得我们第一次见面吗？" 她低声问道。
            </span>
            <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-bold">
              @Freesia
            </span>{' '}
            <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>
              这段对话用回忆穿插的方式展开，营造怀旧氛围
            </span>
          </div>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            Freesia 会按照指令，以回忆穿插叙事的方式续写对话。
          </p>
        </div>
      </div>

      <TutorialHintCard
        isDark={isDark}
        title={
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb size={15} />
            小提示:
          </span>
        }
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>
            混合模式下 Freesia 仍然会执行
            <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
              完整的工作流
            </span>
            ，输出包含故事正文的回复。
          </li>
          <li>
            元指令用于指导 Freesia 的创作方向。
          </li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────────── Step 3: 纯元指令模式 ───────────────────────── */

function StepPureMeta({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark ? 'rgba(236,72,153,0.06)' : 'rgba(236,72,153,0.04)',
          border: isDark
            ? '1px solid rgba(236,72,153,0.15)'
            : '1px solid rgba(236,72,153,0.08)',
          color: isDark ? '#cbd5e1' : '#475569',
        }}
      >
        <span className="font-bold" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
          纯元指令模式（Pure Meta Mode）
        </span>
        {' '}以{' '}
        <code
          className="text-xs px-1 py-0.5 rounded font-mono"
          style={{
            background: isDark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.06)',
            color: isDark ? '#f9a8d4' : '#db2777',
          }}
        >
          @Freesia
        </code>{' '}
        开头，故事暂停，不再执行工作流。Freesia 将专注于处理你的任务，或者单纯和你聊聊天。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: '指导创作',
            titleEn: 'Guide Writing',
            desc: '给 Freesia 下达创作相关的指令，如调整风格、修改设定等。',
            example: '@Freesia 接下来的场景切换到黄昏的海边',
            accent: '#ec4899',
            icon: <PenLine size={20} />,
          },
          {
            title: '讨论剧情',
            titleEn: 'Discuss Plot',
            desc: '和 Freesia 讨论故事走向、角色发展等创作问题。',
            example: '@Freesia 你觉得这个角色的动机够充分吗？',
            accent: '#a855f7',
            icon: <MessageSquare size={20} />,
          },
          {
            title: '自由对话',
            titleEn: 'Free Chat',
            desc: '不涉及创作，单纯和小苍兰聊天、询问功能用法等。',
            example: '@Freesia 你好呀，最近怎么样？',
            accent: '#8b5cf6',
            icon: <Sparkles size={20} />,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
            style={{
              background: isDark
                ? `linear-gradient(135deg, rgba(${hexToRgb(item.accent)},0.04), rgba(15,23,42,0.4))`
                : `linear-gradient(135deg, rgba(${hexToRgb(item.accent)},0.03), rgba(255,255,255,0.9))`,
              border: isDark
                ? `1px solid rgba(${hexToRgb(item.accent)},0.2)`
                : `1px solid rgba(${hexToRgb(item.accent)},0.12)`,
              boxShadow: isDark
                ? '0 10px 30px rgba(0,0,0,0.3)'
                : `0 10px 30px rgba(${hexToRgb(item.accent)},0.08)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${item.accent}20, ${item.accent}10)`,
                  border: `1px solid ${item.accent}30`,
                  color: item.accent,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4
                  className="text-base font-bold"
                  style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
                >
                  {item.title}
                </h4>
                <span
                  className="text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: item.accent }}
                >
                  {item.titleEn}
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              {item.desc}
            </p>
            <div
              className="rounded-lg px-3 py-2 text-xs font-mono"
              style={{
                background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                border: isDark
                  ? '1px solid rgba(107,114,128,0.2)'
                  : '1px solid rgba(147,51,234,0.06)',
                color: isDark ? '#f9a8d4' : '#db2777',
              }}
            >
              {item.example}
            </div>
          </div>
        ))}
      </div>

      <TutorialHintCard
        isDark={isDark}
        title={
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb size={15} />
            小提示:
          </span>
        }
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>
            纯元指令模式下，故事
            <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#db2777' }}>
              不会推进
            </span>
            ，Freesia 不执行工作流，专注于回答你的指令。
          </li>
          <li>
            适合在创作间隙调整方向、回顾设定，或者单纯和小苍兰聊聊天~
          </li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────────── Step 4: 互动模拟 ───────────────────────── */

function StepInteractive({ isDark }: { isDark: boolean }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const mode = detectMode(inputValue)
  const atIndex = inputValue.indexOf('@Freesia')
  const storyPart = atIndex > 0 ? inputValue.substring(0, atIndex).trim() : ''
  const metaPart =
    atIndex >= 0 ? inputValue.substring(atIndex + '@Freesia'.length).trim() : ''

  const handleAtClick = () => {
    const newVal = inputValue + (inputValue && !inputValue.endsWith(' ') ? ' ' : '') + '@Freesia '
    setInputValue(newVal)
  }

  // Example presets
  const presets = [
    {
      label: '无元指令',
      value: '她走进了满是阳光的花房，空气里弥漫着淡淡的甜香。',
      accent: isDark ? '#9ca3af' : '#64748b',
    },
    {
      label: '混合模式',
      value: '他们在月光下并肩走着。@Freesia 描写得更细腻一点',
      accent: isDark ? '#c084fc' : '#9333ea',
    },
    {
      label: '纯元指令',
      value: '@Freesia 帮我梳理一下目前的角色关系',
      accent: isDark ? '#f472b6' : '#ec4899',
    },
  ]

  return (
    <div className="space-y-6">
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
          互动体验
        </span>
        {' '}在下方的模拟输入框中输入内容，或点击{' '}
        <span className="font-semibold" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
          @ 按钮
        </span>
        {' '}和预设示例按钮，体验不同模式的实时识别效果。
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 items-start">
        {/* Left: interactive input */}
        <div className="space-y-4">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="互动模拟" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              在输入框中输入内容，或使用下方快捷按钮
            </div>
            <InteractiveMockInputBar
              isDark={isDark}
              value={inputValue}
              onChange={setInputValue}
              onAtClick={handleAtClick}
            />

            {/* Preset buttons */}
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: `${p.accent}15`,
                    color: p.accent,
                    border: `1px solid ${p.accent}30`,
                  }}
                  onClick={() => setInputValue(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </STPanel>
        </div>

        {/* Right: result card */}
        <div className="lg:sticky lg:top-28">
          <div className="min-h-[200px]">
            {inputValue.trim() ? (
              <div
                key={mode}
                style={{ animation: 'atFreesiaFadeIn 0.3s ease-out forwards' }}
              >
                <ModeResultCard
                  isDark={isDark}
                  mode={mode}
                  storyPart={storyPart}
                  metaPart={metaPart}
                />
              </div>
            ) : (
              <div
                className="h-full min-h-[200px] rounded-2xl flex flex-col items-center justify-center gap-4 p-6"
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
                  <AtSign size={28} />
                </div>
                <div className="text-center">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
                  >
                    <span className="lg:hidden">在上方输入框中输入内容</span>
                    <span className="hidden lg:inline">在左侧输入框中输入内容</span>
                  </p>
                  <p className="text-xs" style={{ color: isDark ? '#4b5563' : '#cbd5e1' }}>
                    实时查看模式识别与解析结果
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes atFreesiaFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ───────────────────────── Step 5: 完成 ───────────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="学会了！"
      description={
        <>
          现在你已经掌握了{' '}
          <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-semibold">
            @Freesia
          </span>{' '}
          的使用方式，随时与小苍兰沟通你的创作意图吧。
        </>
      }
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
            <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
              混合模式
            </span>
            适合边写边调整，不中断故事节奏。
          </li>
          <li>
            <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
              纯元指令模式
            </span>
            适合暂停故事、专注讨论或自由聊天。
          </li>
          <li>
            灵活切换两种模式，让 Freesia 成为你最好的创作搭档。
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
    title: '认识 @Freesia',
    desc: '了解元指令系统与触发方式',
    content: (isDark) => <StepIntro isDark={isDark} />,
  },
  {
    title: '混合模式',
    desc: '在故事中嵌入创作指令',
    content: (isDark) => <StepMixed isDark={isDark} />,
  },
  {
    title: '纯元指令模式',
    desc: '暂停故事，专注对话',
    content: (isDark) => <StepPureMeta isDark={isDark} />,
  },
  {
    title: '互动体验',
    desc: '亲手试试 @Freesia',
    content: (isDark) => <StepInteractive isDark={isDark} />,
  },
  {
    title: '学习完成',
    desc: '开始使用 @Freesia',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function AtFreesia() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Layers className="w-3.5 h-3.5" />}
        badgeLabel="功能用法"
        title="@Freesia 系统"
        description="通过 @Freesia 向小苍兰发送元指令，混合创作或自由对话。"
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
