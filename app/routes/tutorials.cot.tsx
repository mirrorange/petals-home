import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  CheckCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Settings,
  MessageSquare,
  Zap,
  RefreshCw,
  Languages,
  Send,
  AtSign,
  Lightbulb,
  FileText,
  PenLine,
  Trash2,
  Menu,
} from 'lucide-react'
import type { Route } from './+types/tutorials.cot'
import Navbar from '~/components/sections/Navbar'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'
import {
  STPanel,
  GuideStepCard,
  SimulationBadge,
} from '~/components/ui/TutorialComponents'

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

/* ───────────────────────── Mock Chat Input Bar ───────────────────────── */

/** Simulated chat input area with quick actions and settings gear */
function MockChatInputBar({
  isDark,
  highlightGear,
}: {
  isDark: boolean
  highlightGear?: boolean
}) {
  const barBg = isDark ? '#1e1f24' : '#f3f0fa'
  const barBorder = isDark ? 'rgba(107,114,128,0.35)' : 'rgba(147,51,234,0.12)'
  const iconColor = isDark ? '#9ca3af' : '#64748b'
  const inputBg = isDark ? '#0b0c0f' : '#ffffff'
  const inputBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'
  const placeholderColor = isDark ? '#6b7280' : '#94a3b8'

  const gearRing = highlightGear
    ? isDark
      ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white animate-pulse'
    : ''
  const quickActions = [
    { id: 'mention', Icon: AtSign },
    { id: 'idea', Icon: Lightbulb },
    { id: 'template', Icon: FileText },
    { id: 'edit', Icon: PenLine },
    { id: 'clear', Icon: Trash2 },
    { id: 'settings', Icon: Settings },
  ]

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: barBg,
        border: `1px solid ${barBorder}`,
      }}
    >
      {/* Top quick actions row */}
      <div
        className="flex items-center justify-center gap-1 px-3 py-2"
        style={{
          borderBottom: `1px solid ${isDark ? 'rgba(107,114,128,0.2)' : 'rgba(147,51,234,0.08)'}`,
        }}
      >
        {quickActions.map(({ id, Icon }) => (
          <div
            key={id}
            className={`h-8 min-w-10 px-2 rounded-full flex items-center justify-center cursor-default ${
              id === 'settings' && highlightGear ? gearRing : ''
            }`}
            style={{
              background: isDark ? '#1f2127' : '#ffffff',
              border: isDark
                ? '1px solid rgba(107,114,128,0.3)'
                : '1px solid rgba(147,51,234,0.1)',
              color: id === 'settings' && highlightGear
                ? isDark
                  ? '#fbbf24'
                  : '#d97706'
                : iconColor,
            }}
          >
            <Icon size={15} />
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Menu button */}
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{
            color: iconColor,
          }}
        >
          <Menu size={16} />
        </div>

        {/* Quick reply button */}
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{
            color: iconColor,
          }}
        >
          <Sparkles size={16} />
        </div>

        {/* Input field */}
        <div
          className="flex-1 px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            color: placeholderColor,
          }}
        >
          输入想发送的消息，或输入 /? 获取帮助
        </div>

        {/* Send button */}
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{
            color: iconColor,
          }}
        >
          <Send size={16} />
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Mock Settings Menu ───────────────────────── */

function MockSettingsMenu({
  isDark,
  highlightCot,
}: {
  isDark: boolean
  highlightCot?: boolean
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
  const dimColor = isDark ? '#9ca3af' : '#94a3b8'

  const items = [
    { label: 'CoT 设置', highlight: highlightCot },
    { label: '回复长度', highlight: false },
    { label: '语言设置', highlight: false },
  ]

  const cotRing = isDark
    ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
    : 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-white animate-pulse'

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
        Freesia Petals 设置菜单
      </h3>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`px-4 py-3 rounded-lg text-sm font-medium text-center cursor-default ${
            item.highlight ? cotRing : ''
          }`}
          style={{
            background: itemBg,
            border: itemBorder,
            color: item.highlight
              ? isDark
                ? '#fbbf24'
                : '#d97706'
              : textColor,
          }}
        >
          {item.label}
        </div>
      ))}
      <div className="flex justify-center pt-2">
        <div
          className="px-4 py-2 rounded-lg text-sm font-medium cursor-default"
          style={{
            background: isDark ? 'rgba(127,29,29,0.5)' : 'rgba(185,28,28,0.1)',
            border: isDark
              ? '1px solid rgba(239,68,68,0.3)'
              : '1px solid rgba(185,28,28,0.2)',
            color: isDark ? '#fca5a5' : '#991b1b',
          }}
        >
          取消
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Mock CoT Mode Selector ───────────────────────── */

function MockCoTModeSelector({
  isDark,
  highlightMode,
}: {
  isDark: boolean
  highlightMode?: 'linear' | 'iterative' | 'iterative-lang' | null
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

  const modes = [
    { id: 'linear' as const, label: '线性（推荐）' },
    { id: 'iterative' as const, label: '迭代' },
    { id: 'iterative-lang' as const, label: '迭代&切换语言' },
  ]

  const highlightRing = (mode: string) => {
    if (highlightMode !== mode) return ''
    return isDark
      ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
      : 'ring-2 ring-purple-500 ring-offset-2 ring-offset-white animate-pulse'
  }

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
        Petals CoT 模式菜单
      </h3>
      {modes.map((mode) => (
        <div
          key={mode.id}
          className={`px-4 py-3 rounded-lg text-sm font-medium text-center cursor-default ${highlightRing(mode.id)}`}
          style={{
            background: itemBg,
            border: itemBorder,
            color: highlightMode === mode.id
              ? isDark
                ? '#c084fc'
                : '#7e22ce'
              : textColor,
          }}
        >
          {mode.label}
        </div>
      ))}
      <div className="flex justify-center pt-2">
        <div
          className="px-4 py-2 rounded-lg text-sm font-medium cursor-default"
          style={{
            background: isDark ? 'rgba(127,29,29,0.5)' : 'rgba(185,28,28,0.1)',
            border: isDark
              ? '1px solid rgba(239,68,68,0.3)'
              : '1px solid rgba(185,28,28,0.2)',
            color: isDark ? '#fca5a5' : '#991b1b',
          }}
        >
          取消
        </div>
      </div>
    </div>
  )
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

function InteractiveCoTSelector({
  isDark,
  activeMode,
  onSelect,
}: {
  isDark: boolean
  activeMode: CoTModeId | null
  onSelect: (mode: CoTModeId | null) => void
}) {
  const menuBg = isDark
    ? 'linear-gradient(135deg, #1a1b20, #222328)'
    : 'linear-gradient(135deg, #fefcff, #f5f0ff)'
  const menuBorder = isDark
    ? '1px solid rgba(107,114,128,0.35)'
    : '1px solid rgba(147,51,234,0.15)'
  const textColor = isDark ? '#e5e7eb' : '#334155'

  const modes: { id: CoTModeId; label: string; accent: string }[] = [
    { id: 'linear', label: '线性（推荐）', accent: '#ec4899' },
    { id: 'iterative', label: '迭代', accent: '#a855f7' },
    { id: 'iterative-lang', label: '迭代&切换语言', accent: '#3b82f6' },
  ]

  return (
    <div
      className="rounded-xl p-5 space-y-3"
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
        Petals CoT 模式菜单
      </h3>
      {modes.map((mode) => {
        const isActive = activeMode === mode.id
        const itemBg = isActive
          ? isDark
            ? `rgba(${hexToRgb(mode.accent)},0.12)`
            : `rgba(${hexToRgb(mode.accent)},0.07)`
          : isDark
          ? '#2b2d31'
          : '#ffffff'
        const itemBorder = isActive
          ? `1px solid ${mode.accent}`
          : isDark
          ? '1px solid rgba(107,114,128,0.3)'
          : '1px solid rgba(147,51,234,0.1)'

        return (
          <div
            key={mode.id}
            className="px-4 py-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-all duration-200"
            style={{
              background: itemBg,
              border: itemBorder,
              color: isActive ? mode.accent : textColor,
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isActive
                ? isDark
                  ? `0 0 20px rgba(${hexToRgb(mode.accent)},0.15)`
                  : `0 0 20px rgba(${hexToRgb(mode.accent)},0.1)`
                : 'none',
            }}
            onMouseEnter={() => onSelect(mode.id)}
            onClick={() => onSelect(mode.id)}
          >
            {mode.label}
          </div>
        )
      })}
      <div className="flex justify-center pt-2">
        <div
          className="px-4 py-2 rounded-lg text-sm font-medium cursor-default"
          style={{
            background: isDark ? 'rgba(127,29,29,0.5)' : 'rgba(185,28,28,0.1)',
            border: isDark
              ? '1px solid rgba(239,68,68,0.3)'
              : '1px solid rgba(185,28,28,0.2)',
            color: isDark ? '#fca5a5' : '#991b1b',
          }}
        >
          取消
        </div>
      </div>
    </div>
  )
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

/** Helper: convert hex color to "r,g,b" string */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '128,128,128'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
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
          <MockChatInputBar isDark={isDark} highlightGear />
        </STPanel>

        {/* Simulation: Settings menu */}
        <STPanel isDark={isDark} className="relative">
          <div
            className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-wider"
            style={{
              background: isDark ? '#18191e' : '#f8f6ff',
              color: isDark ? '#6b7280' : '#94a3b8',
            }}
          >
            设置菜单
          </div>
          <MockSettingsMenu isDark={isDark} highlightCot />
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
            <InteractiveCoTSelector
              isDark={isDark}
              activeMode={activeMode}
              onSelect={setActiveMode}
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
    <div className="text-center space-y-6 py-8">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
          color: '#22c55e',
          boxShadow: '0 0 0 4px rgba(34,197,94,0.08)',
        }}
      >
        <CheckCircle size={40} />
      </div>
      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          配置完成!
        </h3>
        <p className="max-w-sm mx-auto text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          CoT 模式已设定完毕，Freesia 与 Petals 将按照你选择的方式协同创作。
        </p>
      </div>
      <div
        className="p-4 rounded-xl text-left text-sm max-w-md mx-auto"
        style={{
          background: isDark ? '#202225' : '#ffffff',
          border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
          color: isDark ? '#9ca3af' : '#64748b',
        }}
      >
        <p className="font-bold mb-2" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb size={15} />
            小提示:
          </span>
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>如果不确定选哪个模式，推荐使用<span className="text-pink-400 font-medium">线性</span>模式开始体验。</li>
          <li>你可以随时通过同一入口<span className="text-yellow-500 font-medium">切换 CoT 模式</span>，无需重新初始化。</li>
          <li>不同模式适用于不同场景，建议先试用再决定。</li>
        </ul>
      </div>
    </div>
  )
}

/* ───────────────────────── Main Page ───────────────────────── */

interface Step {
  title: string
  desc: string
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
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('petals-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    setIsDark(isCurrentlyDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('petals-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div
      className={`min-h-screen transition-colors duration-500
      ${isDark ? 'bg-dark-bg text-slate-200' : 'bg-[#fefcff] text-slate-800'}`}
    >
      <FloatingPetals />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Spacer for fixed nav */}
      <div className="pt-28" />

      {/* Main content area */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        {/* Back to tutorials button */}
        <Link
          to="/tutorials"
          className="inline-flex items-center gap-1.5 text-sm font-medium mb-8
            text-slate-500 dark:text-slate-400
            hover:text-freesia-600 dark:hover:text-freesia-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回教程目录
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4
            bg-freesia-100/80 text-freesia-700 border border-freesia-200/50
            dark:bg-freesia-900/30 dark:text-freesia-300 dark:border-freesia-700/30"
          >
            <Settings className="w-3.5 h-3.5" />
            配置指南
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #e9d5ff, #c084fc, #f472b6)'
                  : 'linear-gradient(135deg, #701a75, #9333ea, #ec4899)',
              }}
            >
              Petals CoT 配置指南
            </span>
          </h1>
          <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            了解 CoT 模式的配置入口与三种模式的工作原理，选择最适合你的创作方式。
          </p>
        </div>

        {/* Step indicator card */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.5))',
            border: isDark
              ? '1px solid rgba(147,51,234,0.15)'
              : '1px solid rgba(147,51,234,0.1)',
            backdropFilter: 'blur(12px)',
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(147,51,234,0.06)',
          }}
        >
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-3 mb-5">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className="group relative cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500"
                  style={{
                    background:
                      idx === currentStep
                        ? 'linear-gradient(135deg, #9333ea, #ec4899)'
                        : idx < currentStep
                        ? isDark
                          ? 'rgba(147,51,234,0.2)'
                          : 'rgba(147,51,234,0.1)'
                        : isDark
                        ? 'rgba(107,114,128,0.15)'
                        : 'rgba(148,163,184,0.1)',
                    color:
                      idx === currentStep
                        ? '#ffffff'
                        : idx < currentStep
                        ? isDark
                          ? '#c084fc'
                          : '#9333ea'
                        : isDark
                        ? '#6b7280'
                        : '#94a3b8',
                    border:
                      idx === currentStep
                        ? 'none'
                        : idx < currentStep
                        ? isDark
                          ? '1px solid rgba(147,51,234,0.3)'
                          : '1px solid rgba(147,51,234,0.2)'
                        : isDark
                        ? '1px solid rgba(107,114,128,0.2)'
                        : '1px solid rgba(148,163,184,0.15)',
                    boxShadow:
                      idx === currentStep
                        ? '0 4px 15px rgba(147,51,234,0.3)'
                        : 'none',
                    transform: idx === currentStep ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {idx < currentStep ? <CheckCircle size={18} /> : idx + 1}
                </div>
                {/* Connecting line */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute top-1/2 left-full -translate-y-1/2 w-3 h-0.5 pointer-events-none"
                    style={{
                      background: idx < currentStep
                        ? isDark ? '#7e22ce' : '#c084fc'
                        : isDark ? 'rgba(107,114,128,0.2)' : 'rgba(148,163,184,0.2)',
                    }}
                  />
                )}
                {/* Tooltip */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium"
                  style={{ color: isDark ? '#9ca3af' : '#64748b' }}
                >
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex gap-1 mb-6">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className="h-1 flex-1 rounded-full transition-all duration-500"
                style={{
                  background: idx <= currentStep
                    ? 'linear-gradient(90deg, #9333ea, #ec4899)'
                    : isDark
                    ? 'rgba(107,114,128,0.15)'
                    : 'rgba(148,163,184,0.15)',
                }}
              />
            ))}
          </div>

          {/* Step title */}
          <div className="mb-1">
            <h2
              className="text-xl sm:text-2xl font-bold"
              style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
            >
              {steps[currentStep].title}
            </h2>
            <p className="text-sm mt-1" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
              步骤 {currentStep + 1} / {steps.length} · {steps[currentStep].desc}
            </p>
          </div>
        </div>

        {/* Step content with animation */}
        <div
          key={currentStep}
          className="mb-8"
          style={{
            animation: 'fadeSlideIn 0.4s ease-out forwards',
          }}
        >
          {steps[currentStep].content(isDark)}
        </div>

        {/* Navigation buttons */}
        <div
          className="flex justify-between items-center pt-6"
          style={{
            borderTop: isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(147,51,234,0.08)',
          }}
        >
          <button
            onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer
              ${currentStep === 0
                ? 'opacity-30 cursor-not-allowed'
                : isDark
                ? 'text-slate-300 hover:bg-white/5'
                : 'text-slate-600 hover:bg-freesia-50'
              }`}
          >
            <ArrowLeft className="w-4 h-4" />
            上一步
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all cursor-pointer
                hover:scale-105 active:scale-95 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #9333ea, #c026d3, #ec4899)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
                boxShadow: '0 4px 15px rgba(147,51,234,0.25)',
              }}
            >
              下一步
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/tutorials"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all
                hover:scale-105 active:scale-95 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                boxShadow: '0 4px 15px rgba(34,197,94,0.25)',
              }}
            >
              返回教程目录
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <FooterSection />

      {/* Inline animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
