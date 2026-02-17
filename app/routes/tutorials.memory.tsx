import { useState } from 'react'
import {
  Sparkles,
  Lightbulb,
  Layers,
  PenLine,
  Trash2,
  AtSign,
  BookOpen,
  Globe,
  MessageSquare,
  FileText,
  CheckCircle,
  X,
  Check,
} from 'lucide-react'
import type { Route } from './+types/tutorials.memory'
import {
  GuideStepCard,
  TutorialCompletionCard,
  TutorialHintCard,
  SimulationBadge,
} from '~/components/ui/tutorial'
import {
  STPanel,
} from '~/components/ui/tutorial-mock'
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialStepQuery,
  useTutorialTheme,
} from '~/components/ui/TutorialPageLayout'
import { MockMemory } from '~/components/ui/mock-ui'
import { hexToRgb } from '~/components/ui/TutorialColorUtils'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '记忆系统 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设记忆系统教程 — 了解故事记忆、全局记忆和总结的用法，学习如何通过 @Freesia 和快捷按钮管理记忆。',
    },
  ]
}

/* ───────────────────────── Mock Memory Type Selector ───────────────────────── */

function MockMemoryTypeSelector({
  isDark,
  title,
  items,
  selectedItem,
  selectionStates,
  onSelect,
  showIcons,
}: {
  isDark: boolean
  title: string
  items: string[]
  selectedItem?: string | null
  selectionStates?: Record<string, 'selected' | 'rejected' | null>
  onSelect?: (item: string) => void
  showIcons?: boolean
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
      {items.map((item) => {
        const isSelected = selectedItem === item
        const state = selectionStates?.[item]
        const isStateSelected = state === 'selected'
        const isStateRejected = state === 'rejected'

        let borderStyle = itemBorder
        let bgStyle = itemBg
        if (isSelected) {
          borderStyle = isDark
            ? '2px solid rgba(147,51,234,0.6)'
            : '2px solid rgba(147,51,234,0.4)'
          bgStyle = isDark
            ? 'rgba(147,51,234,0.08)'
            : 'rgba(147,51,234,0.04)'
        } else if (isStateSelected) {
          borderStyle = isDark
            ? '2px solid rgba(132,204,22,0.6)'
            : '2px solid rgba(132,204,22,0.5)'
          bgStyle = isDark
            ? 'rgba(132,204,22,0.06)'
            : 'rgba(132,204,22,0.04)'
        } else if (isStateRejected) {
          borderStyle = itemBorder
        }

        return (
          <div
            key={item}
            className={`px-4 py-3 rounded-lg text-sm font-medium text-center transition-all duration-200 ${
              onSelect ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'
            }`}
            style={{
              background: bgStyle,
              border: borderStyle,
              color: isSelected
                ? isDark
                  ? '#c084fc'
                  : '#7e22ce'
                : textColor,
            }}
            onClick={() => onSelect?.(item)}
          >
            <div className="flex items-center gap-3">
              {showIcons && (
                <span className="shrink-0">
                  {isStateSelected && (
                    <Check
                      size={16}
                      style={{ color: isDark ? '#84cc16' : '#65a30d' }}
                    />
                  )}
                  {isStateRejected && (
                    <X
                      size={16}
                      style={{ color: isDark ? '#ef4444' : '#dc2626' }}
                    />
                  )}
                  {!isStateSelected && !isStateRejected && (
                    <span className="w-4 h-4 block" />
                  )}
                </span>
              )}
              <span className="flex-1">{item}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ───────────────────────── Mock Memory Editor ───────────────────────── */

function MockMemoryEditor({
  isDark,
  title,
  content,
}: {
  isDark: boolean
  title: string
  content: string
}) {
  const menuBg = isDark
    ? 'linear-gradient(135deg, #1a1b20, #222328)'
    : 'linear-gradient(135deg, #fefcff, #f5f0ff)'
  const menuBorder = isDark
    ? '1px solid rgba(107,114,128,0.35)'
    : '1px solid rgba(147,51,234,0.15)'

  return (
    <div
      className="rounded-xl p-5 space-y-4 max-w-sm mx-auto"
      style={{
        background: menuBg,
        border: menuBorder,
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.6)'
          : '0 20px 60px rgba(147,51,234,0.12)',
      }}
    >
      <h3
        className="text-center text-base font-bold"
        style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
      >
        {title}
      </h3>
      <div
        className="rounded-lg p-3 text-sm leading-relaxed whitespace-pre-wrap"
        style={{
          background: isDark ? '#0b0c0f' : '#ffffff',
          border: isDark
            ? '1px solid rgba(107,114,128,0.3)'
            : '1px solid rgba(147,51,234,0.15)',
          color: isDark ? '#e5e7eb' : '#334155',
          minHeight: '100px',
          resize: 'vertical' as const,
        }}
      >
        {content}
      </div>
    </div>
  )
}

/* ───────────────────────── Mock Input Bar with memory highlights ───────────────────────── */

function MockInputBarWithHighlight({
  isDark,
  highlightEdit,
  highlightDelete,
}: {
  isDark: boolean
  highlightEdit?: boolean
  highlightDelete?: boolean
}) {
  const barBg = isDark ? '#1e1f24' : '#f3f0fa'
  const barBorder = isDark ? 'rgba(107,114,128,0.35)' : 'rgba(147,51,234,0.12)'
  const iconColor = isDark ? '#9ca3af' : '#64748b'

  const editRing = highlightEdit
    ? isDark
      ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-purple-500 ring-offset-2 ring-offset-white animate-pulse'
    : ''

  const deleteRing = highlightDelete
    ? isDark
      ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-red-500 ring-offset-2 ring-offset-white animate-pulse'
    : ''

  const quickActions = [
    { id: 'mention', Icon: AtSign, ringClass: '' },
    { id: 'idea', Icon: Lightbulb, ringClass: '' },
    { id: 'template', Icon: FileText, ringClass: '' },
    { id: 'edit', Icon: PenLine, ringClass: editRing },
    { id: 'clear', Icon: Trash2, ringClass: deleteRing },
    { id: 'settings', Icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ), ringClass: '' },
  ]

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
        {quickActions.map(({ id, Icon, ringClass }) => (
          <div
            key={id}
            className={`h-8 min-w-10 px-2 rounded-full flex items-center justify-center cursor-default ${ringClass}`}
            style={{
              background: isDark ? '#1f2127' : '#ffffff',
              border: isDark
                ? '1px solid rgba(107,114,128,0.3)'
                : '1px solid rgba(147,51,234,0.1)',
              color:
                (id === 'edit' && highlightEdit)
                  ? isDark
                    ? '#c084fc'
                    : '#9333ea'
                  : (id === 'clear' && highlightDelete)
                    ? isDark
                      ? '#f87171'
                      : '#ef4444'
                    : iconColor,
            }}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </div>
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Sparkles size={16} />
        </div>
        <div
          className="flex-1 px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: isDark ? '#0b0c0f' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'}`,
            color: isDark ? '#6b7280' : '#94a3b8',
          }}
        >
          输入想发送的消息，或输入 /? 获取帮助
        </div>
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────── Step 1: 认识记忆系统 ───────────────────── */

function StepIntro({ isDark }: { isDark: boolean }) {
  const memoryTypes = [
    {
      title: '故事记忆',
      titleEn: 'Story Memory',
      desc: '保存在当前聊天中的记忆。记录关于当前故事中的写作偏好、风格要求等。',
      accent: '#ec4899',
      icon: <MessageSquare size={20} />,
      points: [
        '存储在当前聊天中',
        '存储故事专属的写作偏好',
        '切换聊天后不会继承',
      ],
    },
    {
      title: '全局记忆',
      titleEn: 'Global Memory',
      desc: '在所有聊天中共享的记忆。适合保存通用的写作风格偏好。',
      accent: '#a855f7',
      icon: <Globe size={20} />,
      points: [
        '在所有聊天中全局共享',
        '存储通用写作偏好',
        '适合跨故事的一致性设置',
      ],
    },
    {
      title: '总结',
      titleEn: 'Summary',
      desc: '当前故事的情节摘要。由 Freesia 生成，帮助模型在长对话中保持上下文理解。',
      accent: '#8b5cf6',
      icon: <BookOpen size={20} />,
      points: [
        '存储当前故事的情节概要',
        '帮助模型理解长对话上下文',
        '可通过 @Freesia 指令要求总结',
      ],
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
          记忆系统（Memory System）
        </span>
        {' '}是花瓣预设的核心功能之一。它让 Freesia 能够记住你的偏好、追踪故事发展，
        并在长对话中保持一致性。记忆分为三类：
        <span className="font-semibold" style={{ color: isDark ? '#f472b6' : '#ec4899' }}> 故事记忆</span>、
        <span className="font-semibold" style={{ color: isDark ? '#c084fc' : '#9333ea' }}> 全局记忆</span>{' '}和{' '}
        <span className="font-semibold" style={{ color: isDark ? '#a78bfa' : '#8b5cf6' }}>总结</span>。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {memoryTypes.map((item) => (
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
            <ul className="space-y-1.5">
              {item.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: item.accent }}
                  />
                  <span style={{ color: isDark ? '#d1d5db' : '#475569' }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Show the MockMemory component */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="记忆更新卡" />
          <div
            className="text-xs font-medium mb-3"
            style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            当 Freesia 更新记忆时，你会看到这样的卡片
          </div>
          <MockMemory isDark={isDark} />
        </STPanel>
        <div className="space-y-3">
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
                <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
                  故事记忆
                </span>
                仅在当前聊天中生效，切换到其他聊天后不会继承。
              </li>
              <li>
                <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#9333ea' }}>
                  全局记忆
                </span>
                在所有聊天中共享，适合保存你一致的写作偏好。
              </li>
              <li>
                <span className="font-medium" style={{ color: isDark ? '#a78bfa' : '#8b5cf6' }}>
                  总结
                </span>
                帮助 Freesia 在长对话中不遗忘之前的情节。
              </li>
            </ul>
          </TutorialHintCard>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────── Step 2: 通过 @Freesia 管理记忆 ───────────────────── */

function StepAtFreesia({ isDark }: { isDark: boolean }) {
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
          通过 @Freesia 管理记忆
        </span>
        {' '}你可以使用{' '}
        <code
          className="text-xs px-1 py-0.5 rounded font-mono"
          style={{
            background: isDark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.06)',
            color: isDark ? '#f9a8d4' : '#db2777',
          }}
        >
          @Freesia
        </code>{' '}
        元指令让 Freesia 记住你的偏好、更新写作要求、或生成故事总结。这是管理记忆最自然的方式。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Example 1: 记住偏好 */}
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
          <div className="flex items-center gap-2 mb-2">
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
              记住偏好
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
            <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-bold">
              @Freesia
            </span>{' '}
            <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>
              请记住，我偏好细腻的感官描写和缓慢的叙事节奏
            </span>
          </div>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            Freesia 会将这个偏好保存到记忆中，后续创作时自动参考。
          </p>
        </div>

        {/* Example 2: 编写总结 */}
        <div
          className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(139,92,246,0.04), rgba(15,23,42,0.4))'
              : 'linear-gradient(135deg, rgba(139,92,246,0.03), rgba(255,255,255,0.9))',
            border: isDark
              ? '1px solid rgba(139,92,246,0.2)'
              : '1px solid rgba(139,92,246,0.12)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(139,92,246,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)',
                color: isDark ? '#c4b5fd' : '#7c3aed',
                border: isDark
                  ? '1px solid rgba(139,92,246,0.25)'
                  : '1px solid rgba(139,92,246,0.15)',
              }}
            >
              编写总结
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
            <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-bold">
              @Freesia
            </span>{' '}
            <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>
              请为前面的故事编写总结
            </span>
          </div>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            Freesia 会回顾之前的对话内容并生成一份故事摘要，保存到总结记忆中。
          </p>
        </div>

        {/* Example 3: 更新全局偏好 */}
        <div
          className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(168,85,247,0.04), rgba(15,23,42,0.4))'
              : 'linear-gradient(135deg, rgba(168,85,247,0.03), rgba(255,255,255,0.9))',
            border: isDark
              ? '1px solid rgba(168,85,247,0.2)'
              : '1px solid rgba(168,85,247,0.12)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(168,85,247,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.08)',
                color: isDark ? '#d8b4fe' : '#9333ea',
                border: isDark
                  ? '1px solid rgba(168,85,247,0.25)'
                  : '1px solid rgba(168,85,247,0.15)',
              }}
            >
              更新偏好
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
            <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-bold">
              @Freesia
            </span>{' '}
            <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>
              以后所有故事都用第一人称视角来写
            </span>
          </div>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            Freesia 会将通用偏好保存到全局记忆中，所有聊天都会生效。
          </p>
        </div>

        {/* Example 4: 修改记忆 */}
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
          <div className="flex items-center gap-2 mb-2">
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
              修改记忆
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
            <span style={{ color: isDark ? '#f472b6' : '#ec4899' }} className="font-bold">
              @Freesia
            </span>{' '}
            <span style={{ color: isDark ? '#f9a8d4' : '#db2777' }}>
              之前关于「快节奏」的要求改为「慢叙事」
            </span>
          </div>
          <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            Freesia 会更新已有的记忆条目，替换旧的偏好要求。
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
            Freesia 会根据指令内容
            <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
              自动判断
            </span>
            应该存储到故事记忆还是全局记忆中。
          </li>
          <li>
            你也可以在指令中明确指出，比如「请将这条记忆存储到全局记忆中」。
          </li>
          <li>
            记忆更新成功后，Freesia 会在回复中附带一张
            <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
              {' '}记忆更新卡{' '}
            </span>。
          </li>
        </ul>
      </TutorialHintCard>
    </div>
  )
}

/* ───────────────────── Step 3: 编辑记忆 ───────────────────── */

function StepEdit({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="找到编辑按钮"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              在输入框上方快速回复栏中，点击第四个按钮{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#c084fc' : '#9333ea' }}
              >
                编辑按钮
              </span>。
            </>
          }
          tip="编辑按钮允许你手动查看和修改已保存的记忆内容。"
        />
        <GuideStepCard
          index={2}
          title="选择记忆类型"
          accent="red"
          isDark={isDark}
          detail={
            <>
              点击后会弹出记忆类型选择菜单，选择要编辑的记忆类型。
            </>
          }
          tip="选择后会打开对应记忆的文本编辑器，你可以自由修改内容。"
        />
        <GuideStepCard
          index={3}
          title="编辑并保存"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在文本编辑器中修改记忆内容，完成后点击{' '}
              <span
                className="font-semibold"
              >
                Ok
              </span>
              {' '}保存更改，或点击{' '}
              <span className="font-medium">取消</span>
              {' '}放弃修改。
            </>
          }
        />
      </div>

      <div className="space-y-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="输入栏" />
          <div
            className="text-xs font-medium mb-3"
            style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            找到第四个按钮（编辑）
          </div>
          <MockInputBarWithHighlight isDark={isDark} highlightEdit />
        </STPanel>

        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="选择记忆类型" />
          <MockMemoryTypeSelector
            isDark={isDark}
            title="选择要编辑的记忆"
            items={['聊天记忆', '全局记忆', '总结']}
            selectedItem="聊天记忆"
          />
        </STPanel>

      </div>
    </div>
  )
}

/* ───────────────────── Step 4: 清除记忆 ───────────────────── */

function StepDelete({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="找到删除按钮"
          accent="red"
          isDark={isDark}
          detail={
            <>
              在输入框上方快速回复栏中，找到第五个按钮{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#f87171' : '#ef4444' }}
              > 删除按钮
              </span>
              {' '}并点击。
            </>
          }
          tip="删除按钮用于清除已保存的记忆内容，操作不可撤销。"
        />
        <GuideStepCard
          index={2}
          title="选择要清除的记忆"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              点击后会弹出记忆类型选择菜单，你可以选择或取消选择要清除的记忆类型：
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>
                  点击某个选项将其标记为{' '}
                  <span style={{ color: isDark ? '#84cc16' : '#65a30d' }}>✓ 选中</span>
                  {' '}状态
                </li>
                <li>
                  再次点击将其切换为{' '}
                  <span style={{ color: isDark ? '#ef4444' : '#dc2626' }}>✗ 排除</span>
                  {' '}状态
                </li>
              </ul>
            </>
          }
          tip="只有被选中的记忆类型会被清除，未选中的不受影响。"
        />
        <GuideStepCard
          index={3}
          title="确认清除"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              确认选择后，点击{' '}
              <span
                className="font-semibold"
                style={{ color: isDark ? '#c084fc' : '#9333ea' }}
              >
                Ok
              </span>
              {' '}按钮执行清除操作。被选中的记忆类型将被彻底清空。
            </>
          }
          tip="清除操作不可撤销，请确认后再操作。"
        />
      </div>

      <div className="space-y-4">
        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="输入栏" />
          <div
            className="text-xs font-medium mb-3"
            style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
          >
            找到第五个按钮（删除）
          </div>
          <MockInputBarWithHighlight isDark={isDark} highlightDelete />
        </STPanel>

        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="选择要清除的记忆" />
          <MockMemoryTypeSelector
            isDark={isDark}
            title="选择要清除的记忆类型"
            items={['聊天记忆', '全局记忆', '总结']}
            selectionStates={{
              '聊天记忆': 'selected',
              '全局记忆': 'rejected',
              '总结': 'rejected',
            }}
            showIcons
          />
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────── Step 5: 完成 ───────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="学会了！"
      description={
        <>
          现在你已经掌握了{' '}
          <span style={{ color: isDark ? '#c084fc' : '#9333ea' }} className="font-semibold">
            记忆系统
          </span>{' '}
          的使用方式，让 Freesia 拥有更好的记忆力吧。
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
            通过{' '}
            <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
              @Freesia
            </span>
            {' '}是最自然的记忆管理方式，随时在对话中使用。
          </li>
          <li>
            使用{' '}
            <span className="font-medium" style={{ color: isDark ? '#c084fc' : '#9333ea' }}>
              编辑按钮
            </span>
            {' '}可以精确修改已有记忆内容。
          </li>
          <li>
            使用{' '}
            <span className="font-medium" style={{ color: isDark ? '#f87171' : '#ef4444' }}>
              删除按钮
            </span>
            {' '}可以清除不再需要的记忆。
          </li>
          <li>
            善用记忆系统，让每一次创作都更加一致、连贯。
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
    title: '认识记忆系统',
    desc: '了解三种记忆类型与它们的作用',
    content: (isDark) => <StepIntro isDark={isDark} />,
  },
  {
    title: '@Freesia 管理记忆',
    desc: '通过元指令让 Freesia 记住偏好',
    content: (isDark) => <StepAtFreesia isDark={isDark} />,
  },
  {
    title: '编辑记忆',
    desc: '手动查看和修改记忆内容',
    content: (isDark) => <StepEdit isDark={isDark} />,
  },
  {
    title: '清除记忆',
    desc: '删除不再需要的记忆',
    content: (isDark) => <StepDelete isDark={isDark} />,
  },
  {
    title: '学习完成',
    desc: '开始使用记忆系统',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function Memory() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Layers className="w-3.5 h-3.5" />}
        badgeLabel="功能用法"
        title="记忆系统"
        description="了解故事记忆、全局记忆和总结，掌握记忆的查看、编辑与清除。"
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
