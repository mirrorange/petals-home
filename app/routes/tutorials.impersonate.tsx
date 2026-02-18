import { useState } from 'react'
import {
  Layers,
  Lightbulb,
  ListChecks,
  PenLine,
  AtSign,
  Send,
  Menu,
  Sparkles,
  Settings,
  FileText,
  Trash2,
  CheckCircle,
} from 'lucide-react'
import type { Route } from './+types/tutorials.impersonate'
import {
  GuideStepCard,
  TutorialCompletionCard,
  TutorialHintCard,
  SimulationBadge,
} from '~/components/ui/tutorial'
import { STPanel } from '~/components/ui/tutorial-mock'
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
    { title: '选项与代回 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设选项与代回教程 — 了解用户选项、代写回复功能，以及如何通过 @Freesia 触发代回。',
    },
  ]
}

/* ───────────────────────── Impersonate Regex Detection ───────────────────────── */

const IMPERSONATE_REGEX =
  /[\s\S]*?@Freesia[\s\S]*((代|替|扮演|模仿)我|(帮|代|替)我?(写|回|笔)|impersonate|ghostwrite|(reply|write|answer) (as|for) me|(write|take) my (part|turn)|(on|in|from) my (behalf|style|perspective|view)|(as|were) me|What would I (say|do))/i

function detectImpersonate(text: string): {
  hasAt: boolean
  triggered: boolean
  meta: string
} {
  const trimmed = text.trim()
  if (!trimmed) return { hasAt: false, triggered: false, meta: '' }

  const atIndex = trimmed.indexOf('@Freesia')
  if (atIndex < 0) return { hasAt: false, triggered: false, meta: '' }

  const meta = trimmed.substring(atIndex + '@Freesia'.length).trim()
  const triggered = IMPERSONATE_REGEX.test(trimmed)
  return { hasAt: true, triggered, meta }
}

/* ───────────────────────── Interactive Mock Input Bar ───────────────────────── */

function ImpersonateMockInputBar({
  isDark,
  value,
  onChange,
  onAtClick,
  onBulbClick,
}: {
  isDark: boolean
  value: string
  onChange: (v: string) => void
  onAtClick: () => void
  onBulbClick: () => void
}) {
  const barBg = isDark ? '#1e1f24' : '#f3f0fa'
  const barBorder = isDark ? 'rgba(107,114,128,0.35)' : 'rgba(147,51,234,0.12)'
  const iconColor = isDark ? '#9ca3af' : '#64748b'
  const inputBg = isDark ? '#0b0c0f' : '#ffffff'
  const inputBorder = isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.15)'

  const { triggered } = detectImpersonate(value)

  const quickActions = [
    { id: 'mention', Icon: AtSign, onClick: onAtClick, highlight: false },
    { id: 'idea', Icon: Lightbulb, onClick: onBulbClick, highlight: true },
    { id: 'template', Icon: FileText, onClick: undefined, highlight: false },
    { id: 'edit', Icon: PenLine, onClick: undefined, highlight: false },
    { id: 'clear', Icon: Trash2, onClick: undefined, highlight: false },
    { id: 'settings', Icon: Settings, onClick: undefined, highlight: false },
  ]

  const bulbHighlightRing = isDark
    ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#1b1c21]'
    : 'ring-2 ring-amber-500 ring-offset-2 ring-offset-white'

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
            } ${id === 'idea' && highlight ? bulbHighlightRing : ''}`}
            style={{
              background: isDark ? '#1f2127' : '#ffffff',
              border: isDark
                ? '1px solid rgba(107,114,128,0.3)'
                : '1px solid rgba(147,51,234,0.1)',
              color:
                id === 'idea' && highlight
                  ? isDark
                    ? '#fbbf24'
                    : '#d97706'
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
          placeholder="试试输入 @Freesia 代写回复..."
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

      {/* Detection indicator */}
      <div
        className="px-3 py-2 flex items-center gap-2 transition-all duration-300"
        style={{
          borderTop: `1px solid ${isDark ? 'rgba(107,114,128,0.15)' : 'rgba(147,51,234,0.06)'}`,
          background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(147,51,234,0.02)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
          style={{
            background: triggered
              ? isDark
                ? '#a78bfa'
                : '#7c3aed'
              : isDark
              ? '#9ca3af'
              : '#94a3b8',
          }}
        />
        <span
          className="text-xs font-semibold transition-colors duration-300"
          style={{
            color: triggered
              ? isDark
                ? '#a78bfa'
                : '#7c3aed'
              : isDark
              ? '#9ca3af'
              : '#94a3b8',
          }}
        >
          {triggered ? '✓ 代写回复已触发' : '未触发代写回复'}
        </span>
      </div>
    </div>
  )
}

/* ───────────────────────── Step 1: 功能介绍 ───────────────────────── */

function StepIntro({ isDark }: { isDark: boolean }) {
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
        花瓣预设提供两个互补功能帮助你推进故事：
        <span
          className="font-bold"
          style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
        >
          {' '}故事选项{' '}
        </span>
        自动生成多个回复方向供你选择；
        <span
          className="font-bold"
          style={{ color: isDark ? '#d946ef' : '#a21caf' }}
        >
          {' '}代写回复{' '}
        </span>
        让 Freesia 以你的口吻代笔。两者都通过输入框上方的
        <span
          className="font-semibold"
          style={{ color: isDark ? '#fbbf24' : '#d97706' }}
        >
          {' '}灯泡按钮{' '}
        </span>
        一键上屏。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Options card */}
        <div
          className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(15,23,42,0.4))'
              : 'linear-gradient(135deg, rgba(124,58,237,0.03), rgba(255,255,255,0.9))',
            border: isDark
              ? '1px solid rgba(124,58,237,0.2)'
              : '1px solid rgba(124,58,237,0.12)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(124,58,237,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)',
                border: isDark
                  ? '1px solid rgba(124,58,237,0.3)'
                  : '1px solid rgba(124,58,237,0.15)',
                color: isDark ? '#a78bfa' : '#7c3aed',
              }}
            >
              <ListChecks size={20} />
            </div>
            <div>
              <h4
                className="text-base font-bold"
                style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
              >
                故事选项
              </h4>
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
              >
                User Options
              </span>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            Freesia 根据当前剧情自动生成多个回复选项，每个选项包含标题与完整回复内容。点击灯泡即可选择并填入输入框。
          </p>
        </div>

        {/* Impersonate card */}
        <div
          className="rounded-2xl p-5 space-y-3 relative overflow-hidden"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(162,28,175,0.04), rgba(15,23,42,0.4))'
              : 'linear-gradient(135deg, rgba(162,28,175,0.03), rgba(255,255,255,0.9))',
            border: isDark
              ? '1px solid rgba(162,28,175,0.2)'
              : '1px solid rgba(162,28,175,0.12)',
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.3)'
              : '0 10px 30px rgba(162,28,175,0.08)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: isDark ? 'rgba(162,28,175,0.15)' : 'rgba(162,28,175,0.08)',
                border: isDark
                  ? '1px solid rgba(162,28,175,0.3)'
                  : '1px solid rgba(162,28,175,0.15)',
                color: isDark ? '#d946ef' : '#a21caf',
              }}
            >
              <PenLine size={20} />
            </div>
            <div>
              <h4
                className="text-base font-bold"
                style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}
              >
                代写回复
              </h4>
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: isDark ? '#d946ef' : '#a21caf' }}
              >
                Impersonate
              </span>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            通过 @Freesia 请求代写，Freesia 会以你的角色口吻生成回复内容。生成后自动替换到输入框，可直接发送。
          </p>
        </div>
      </div>

      {/* Bulb button explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 items-start">
        <GuideStepCard
          index={1}
          title="灯泡按钮"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              输入框上方快速回复栏的{' '}
              <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
                第二个按钮（灯泡）
              </span>
              {' '}是选项与代回的统一入口：
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>当存在用户选项时，弹出选项列表供选择</li>
                <li>当存在代写回复时，将代写内容填入输入框</li>
                <li>可反复点击灯泡重新设置</li>
              </ul>
            </>
          }
        />

        <STPanel isDark={isDark} className="relative">
          <SimulationBadge isDark={isDark} label="灯泡按钮" />
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: isDark ? '#1e1f24' : '#f3f0fa',
              border: `1px solid ${isDark ? 'rgba(107,114,128,0.35)' : 'rgba(147,51,234,0.12)'}`,
            }}
          >
            <div
              className="flex items-center justify-center gap-1 px-3 py-2"
              style={{
                borderBottom: `1px solid ${isDark ? 'rgba(107,114,128,0.2)' : 'rgba(147,51,234,0.08)'}`,
              }}
            >
              {[
                { id: 'at', Icon: AtSign, hl: false },
                { id: 'bulb', Icon: Lightbulb, hl: true },
                { id: 'file', Icon: FileText, hl: false },
                { id: 'pen', Icon: PenLine, hl: false },
                { id: 'trash', Icon: Trash2, hl: false },
                { id: 'gear', Icon: Settings, hl: false },
              ].map(({ id, Icon, hl }) => (
                <div
                  key={id}
                  className={`h-8 min-w-10 px-2 rounded-full flex items-center justify-center ${
                    hl
                      ? isDark
                        ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#1b1c21]'
                        : 'ring-2 ring-amber-500 ring-offset-2 ring-offset-white'
                      : ''
                  }`}
                  style={{
                    background: isDark ? '#1f2127' : '#ffffff',
                    border: isDark
                      ? '1px solid rgba(107,114,128,0.3)'
                      : '1px solid rgba(147,51,234,0.1)',
                    color: hl
                      ? isDark
                        ? '#fbbf24'
                        : '#d97706'
                      : isDark
                      ? '#9ca3af'
                      : '#64748b',
                  }}
                >
                  <Icon size={15} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                <Menu size={16} />
              </div>
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
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
                「今晚的月色真美呢。」
              </div>
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
                <Send size={16} />
              </div>
            </div>
          </div>
          {/* Tooltip */}
          <div
            className="mt-2 text-center text-xs"
            style={{ color: isDark ? '#fbbf24' : '#d97706' }}
          >
            ↑ 点击灯泡，选项或代写内容将填入下方输入框
          </div>
        </STPanel>
      </div>
    </div>
  )
}

/* ───────────────────────── Step 2: 触发代写 & 互动模拟 ───────────────────────── */

function StepTriggerInteractive({ isDark }: { isDark: boolean }) {
  const [inputValue, setInputValue] = useState('')

  const { hasAt, triggered, meta } = detectImpersonate(inputValue)

  const handleAtClick = () => {
    const newVal =
      inputValue + (inputValue && !inputValue.endsWith(' ') ? ' ' : '') + '@Freesia '
    setInputValue(newVal)
  }

  const handleBulbClick = () => {
    setInputValue('「今晚的月色真美呢。」我轻声说道，目光不自觉地落在她发梢的渐变紫色上。')
  }

  const presets = [
    {
      label: '中文 — 代写',
      value: '@Freesia 帮我回复，语气温柔一些',
      accent: isDark ? '#d946ef' : '#a21caf',
    },
    {
      label: '中文 — 替我回',
      value: '@Freesia 替我回复，稍微傲娇一点',
      accent: isDark ? '#c084fc' : '#9333ea',
    },
    {
      label: '英文',
      value: '@Freesia ghostwrite for me, keep it gentle',
      accent: isDark ? '#a78bfa' : '#7c3aed',
    },
    {
      label: '未触发',
      value: '@Freesia 帮我梳理角色关系',
      accent: isDark ? '#9ca3af' : '#64748b',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
        {/* Left: guide cards */}
        <div className="space-y-3">
          <GuideStepCard
            index={1}
            title="通过 @Freesia 触发代写"
            accent="purple"
            isDark={isDark}
            detail={
              <>
                在 @Freesia
                <span className="font-semibold" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
                  {' '}之后{' '}
                </span>
                的元指令中包含代写关键词即可触发。支持以下关键词：
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>
                    中文：
                    <code className="text-xs px-1 py-0.5 rounded font-mono" style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)', color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                      代我 / 替我 / 帮我写 / 代写 / 代回
                    </code>
                  </li>
                  <li>
                    英文：
                    <code className="text-xs px-1 py-0.5 rounded font-mono" style={{ background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)', color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                      impersonate / ghostwrite / reply as me
                    </code>
                  </li>
                </ul>
              </>
            }
          />
          <GuideStepCard
            index={2}
            title="可附加要求"
            accent="blue"
            isDark={isDark}
            detail={
              <>
                在元指令中除关键词外，还可以给出代写的方向或要求。例如：
                <div
                  className="mt-2 rounded-lg px-3 py-2 text-xs font-mono"
                  style={{
                    background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.02)',
                    border: isDark
                      ? '1px solid rgba(107,114,128,0.2)'
                      : '1px solid rgba(147,51,234,0.06)',
                    color: isDark ? '#d8b4fe' : '#7e22ce',
                  }}
                >
                  @Freesia 帮我代写，语气温柔一些
                </div>
              </>
            }
          />

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
                代写回复在
                <span className="font-medium" style={{ color: isDark ? '#f472b6' : '#ec4899' }}>
                  {' '}纯元指令模式{' '}
                </span>
                下触发（以 @Freesia 开头），故事不会推进。
              </li>
              <li>
                关键词匹配支持灵活的表达方式，不必死记硬背。
              </li>
            </ul>
          </TutorialHintCard>
        </div>

        {/* Right: interactive simulation */}
        <div className="space-y-4 lg:sticky lg:top-28">
          <STPanel isDark={isDark} className="relative">
            <SimulationBadge isDark={isDark} label="互动模拟" />
            <div
              className="text-xs font-medium mb-3 flex items-center gap-1.5"
              style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
            >
              <Sparkles size={12} />
              在输入框中输入内容，或使用下方快捷按钮
            </div>
            <ImpersonateMockInputBar
              isDark={isDark}
              value={inputValue}
              onChange={setInputValue}
              onAtClick={handleAtClick}
              onBulbClick={handleBulbClick}
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

          {/* Detection result */}
          <div className="min-h-[180px]">
            {inputValue.trim() ? (
              <div
                key={`${triggered}`}
                style={{ animation: 'impersonateFadeIn 0.3s ease-out forwards' }}
              >
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
                        background: triggered
                          ? isDark
                            ? 'rgba(147,51,234,0.15)'
                            : 'rgba(124,58,237,0.08)'
                          : isDark
                          ? 'rgba(107,114,128,0.15)'
                          : 'rgba(107,114,128,0.08)',
                        color: triggered
                          ? isDark
                            ? '#a78bfa'
                            : '#7c3aed'
                          : isDark
                          ? '#9ca3af'
                          : '#64748b',
                        border: `1px solid ${
                          triggered
                            ? isDark
                              ? 'rgba(147,51,234,0.3)'
                              : 'rgba(124,58,237,0.15)'
                            : isDark
                            ? 'rgba(107,114,128,0.3)'
                            : 'rgba(107,114,128,0.15)'
                        }`,
                      }}
                    >
                      {triggered ? '✓ 代写回复' : hasAt ? '普通元指令' : '未检测到'}
                    </span>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isDark ? '#cbd5e1' : '#475569' }}
                  >
                    {triggered
                      ? 'Freesia 将以你的角色口吻生成回复，完成后自动填入输入框。'
                      : hasAt
                      ? '检测到 @Freesia，但元指令中未包含代写关键词，将作为普通元指令处理。'
                      : '未检测到 @Freesia，输入不会触发代写功能。'}
                  </p>

                  {hasAt && meta && (
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
                        元指令内容
                      </span>
                      <span style={{ color: isDark ? '#e5e7eb' : '#334155' }}>{meta}</span>
                    </div>
                  )}

                  {triggered && (
                    <div
                      className="rounded-lg px-3 py-2 text-xs flex items-center gap-2"
                      style={{
                        background: isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.04)',
                        border: isDark
                          ? '1px solid rgba(124,58,237,0.15)'
                          : '1px solid rgba(124,58,237,0.08)',
                      }}
                    >
                      <CheckCircle
                        size={14}
                        style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
                      />
                      <span style={{ color: isDark ? '#d8b4fe' : '#6d28d9' }}>
                        关键词匹配成功，代写模式已激活
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="h-full min-h-[180px] rounded-2xl flex flex-col items-center justify-center gap-4 p-6"
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
                  <PenLine size={28} />
                </div>
                <div className="text-center">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: isDark ? '#6b7280' : '#94a3b8' }}
                  >
                    <span>在上方输入框中输入内容</span>
                  </p>
                  <p className="text-xs" style={{ color: isDark ? '#4b5563' : '#cbd5e1' }}>
                    实时查看代写回复触发检测结果
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes impersonateFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ───────────────────────── Step 4: 完成 ───────────────────────── */

function StepDone({ isDark }: { isDark: boolean }) {
  return (
    <TutorialCompletionCard
      isDark={isDark}
      title="学会了！"
      description={
        <>
          现在你已经掌握了
          <span style={{ color: isDark ? '#a78bfa' : '#7c3aed' }} className="font-semibold">
            {' '}故事选项{' '}
          </span>
          与
          <span style={{ color: isDark ? '#d946ef' : '#a21caf' }} className="font-semibold">
            {' '}代写回复{' '}
          </span>
          的使用方式。
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
            <span className="font-medium" style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}>
              故事选项
            </span>
            由 Freesia 在每次回复时自动生成，点击灯泡即可选用。
          </li>
          <li>
            <span className="font-medium" style={{ color: isDark ? '#d946ef' : '#a21caf' }}>
              代写回复
            </span>
            需要通过 @Freesia + 代写关键词触发，生成后自动填入输入框。
          </li>
          <li>
            两个功能都通过
            <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#d97706' }}>
              {' '}灯泡按钮{' '}
            </span>
            一键上屏，可反复使用。
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
    title: '功能概览',
    desc: '选项与代写回复介绍',
    content: (isDark) => <StepIntro isDark={isDark} />,
  },
  {
    title: '触发代写',
    desc: '触发方式与互动体验',
    content: (isDark) => <StepTriggerInteractive isDark={isDark} />,
  },
  {
    title: '学习完成',
    desc: '开始使用',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function Impersonate() {
  const { isDark, toggleTheme } = useTutorialTheme()
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Layers className="w-3.5 h-3.5" />}
        badgeLabel="功能用法"
        title="选项与代回"
        description="使用故事选项和 @Freesia 代写回复，轻松推进故事"
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
