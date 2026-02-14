import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  Settings,
  Plug,
  Type,
  BookOpen,
  UserCog,
  Image as ImageIcon,
  Box,
  Smile,
  Contact,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
  Copy,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import type { Route } from './+types/tutorials.quick-start'
import Navbar from '~/components/sections/Navbar'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '快速开始 · 安装教程 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '花瓣预设安装教程 — 跟着模拟 UI 一步步完成 SillyTavern 预设安装，轻松上手。',
    },
  ]
}

/* ───────────────────────── Simulated ST Components ───────────────────────── */

function STPanel({
  children,
  className = '',
  isDark,
}: {
  children: React.ReactNode
  className?: string
  isDark: boolean
}) {
  return (
    <div
      className={`rounded-xl p-4 shadow-lg ${className}`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #18191e, #1e1f24)'
          : 'linear-gradient(135deg, #f8f6ff, #f3f0fa)',
        border: isDark
          ? '1px solid rgba(107,114,128,0.3)'
          : '1px solid rgba(147,51,234,0.12)',
      }}
    >
      {children}
    </div>
  )
}

function STButton({
  icon: Icon,
  active,
  highlight,
  isDark,
  className = '',
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  active?: boolean
  highlight?: string | null
  isDark: boolean
  className?: string
}) {
  const highlightRing = highlight
    ? highlight === 'red'
      ? 'ring-2 ring-red-500 ring-offset-2 animate-pulse z-10'
      : highlight === 'purple'
      ? 'ring-2 ring-purple-500 ring-offset-2 animate-pulse z-10'
      : highlight === 'yellow'
      ? 'ring-2 ring-yellow-500 ring-offset-2 animate-pulse z-10'
      : highlight === 'pink'
      ? 'ring-2 ring-pink-500 ring-offset-2 animate-pulse z-10'
      : ''
    : ''

  return (
    <button
      className={`p-2 rounded transition-all flex items-center justify-center relative cursor-default
        ${active
          ? isDark
            ? 'bg-gray-600 text-white'
            : 'bg-freesia-100 text-freesia-700'
          : isDark
          ? 'bg-[#2b2d31] text-gray-400 hover:bg-gray-600 hover:text-white'
          : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-600'
        }
        ${highlightRing}
        ${className}`}
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  )
}

function STNavbar({
  activeIndex,
  highlightIndex,
  highlightColor = 'red',
  isDark,
}: {
  activeIndex: number
  highlightIndex?: number
  highlightColor?: string
  isDark: boolean
}) {
  const icons = [Settings, Plug, Type, BookOpen, UserCog, ImageIcon, Box, Smile, Contact]

  return (
    <div
      className="flex gap-2 pb-3 mb-4 justify-center overflow-x-auto"
      style={{
        borderBottom: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
      }}
    >
      {icons.map((Icon, idx) => (
        <div key={idx} className="relative">
          <STButton
            icon={Icon}
            active={idx === activeIndex}
            highlight={idx === highlightIndex ? highlightColor : null}
            isDark={isDark}
          />
          {idx === highlightIndex && (
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  highlightColor === 'red'
                    ? '#ef4444'
                    : highlightColor === 'pink'
                    ? '#ec4899'
                    : highlightColor === 'yellow'
                    ? '#eab308'
                    : highlightColor === 'purple'
                    ? '#a855f7'
                    : '#9333ea',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function STInput({ value, isDark }: { value: string; isDark: boolean }) {
  return (
    <div
      className="px-3 py-2 rounded w-full text-sm font-mono flex items-center justify-between"
      style={{
        background: isDark ? '#0b0c0f' : '#ffffff',
        border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.15)',
        color: isDark ? '#d1d5db' : '#475569',
      }}
    >
      <span className="truncate">{value}</span>
      <ChevronDown size={14} className={isDark ? 'text-gray-500' : 'text-slate-400'} />
    </div>
  )
}

function STLabel({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div
      className="font-semibold mb-2 text-sm flex items-center gap-2"
      style={{ color: isDark ? '#e5e7eb' : '#334155' }}
    >
      {children}
    </div>
  )
}

function STCheckbox({
  label,
  checked = false,
  highlight,
  highlightColor = 'yellow',
  isDark,
}: {
  label: string
  checked?: boolean
  highlight?: boolean
  highlightColor?: string
  isDark: boolean
}) {
  const hlBg =
    highlightColor === 'yellow'
      ? 'rgba(234,179,8,0.08)'
      : highlightColor === 'pink'
      ? 'rgba(236,72,153,0.08)'
      : 'rgba(147,51,234,0.08)'
  const hlBorder =
    highlightColor === 'yellow'
      ? 'rgba(234,179,8,0.3)'
      : highlightColor === 'pink'
      ? 'rgba(236,72,153,0.3)'
      : 'rgba(147,51,234,0.3)'

  return (
    <div
      className="flex items-center gap-3 p-2 rounded transition-colors"
      style={{
        background: highlight ? hlBg : 'transparent',
        border: highlight ? `1px solid ${hlBorder}` : '1px solid transparent',
      }}
    >
      <div
        className="w-5 h-5 rounded border flex items-center justify-center shrink-0"
        style={{
          background: checked
            ? isDark
              ? '#4b5563'
              : '#c084fc'
            : isDark
            ? '#0b0c0f'
            : '#ffffff',
          borderColor: checked
            ? isDark
              ? '#6b7280'
              : '#a855f7'
            : isDark
            ? '#4b5563'
            : '#cbd5e1',
        }}
      >
        {checked && (
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: isDark ? '#ffffff' : '#ffffff' }}
          />
        )}
      </div>
      <span className="text-sm select-none" style={{ color: isDark ? '#d1d5db' : '#475569' }}>
        {label}
      </span>
    </div>
  )
}

/* ───────────────────────── Step content builders ───────────────────────── */

function StepPrepare({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      {/* Version Check */}
      <div
        className="p-4 rounded-r-lg"
        style={{
          background: isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.05)',
          borderLeft: '4px solid #3b82f6',
        }}
      >
        <h3
          className="font-bold flex items-center gap-2 text-base"
          style={{ color: isDark ? '#93c5fd' : '#1d4ed8' }}
        >
          <AlertCircle size={20} />
          1. 版本检查
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
          请确保酒馆 (SillyTavern) 版本为{' '}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
              color: isDark ? '#fbbf24' : '#b45309',
            }}
          >
            v1.15.0
          </code>{' '}
          或更高。
        </p>
      </div>

      {/* STScript Settings */}
      <div className="space-y-3">
        <h3
          className="font-bold flex items-center gap-2 text-base"
          style={{ color: isDark ? '#e5e7eb' : '#1e293b' }}
        >
          <UserCog size={20} className="text-pink-400" />
          2. 确认 STscript 设置
        </h3>
        <p className="text-sm mb-2" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          点击顶部栏第 <span className="font-bold" style={{ color: isDark ? '#fff' : '#0f172a' }}>5</span> 个图标，进入用户设置。
          <br />
          找到 <span style={{ color: isDark ? '#d1d5db' : '#334155' }}>STscript设置 (STscript Settings)</span> 部分。
        </p>

        <STPanel isDark={isDark} className="relative">
          <div
            className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-wider"
            style={{
              background: isDark ? '#18191e' : '#f8f6ff',
              color: isDark ? '#6b7280' : '#94a3b8',
            }}
          >
            Simulation
          </div>

          <STNavbar activeIndex={4} highlightIndex={4} highlightColor="pink" isDark={isDark} />

          <div className="space-y-4 px-2">
            <div
              className="text-xs font-mono pb-1 mb-2"
              style={{
                color: isDark ? '#6b7280' : '#94a3b8',
                borderBottom: isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(147,51,234,0.08)',
              }}
            >
              USER SETTINGS
            </div>

            <div className="space-y-2">
              <STLabel isDark={isDark}>STscript设置</STLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <STCheckbox label="严格转义" checked={true} highlight={true} highlightColor="pink" isDark={isDark} />
                <STCheckbox label="替换 GETVAR (Replace GETVAR)" checked={true} highlight={true} highlightColor="pink" isDark={isDark} />
              </div>
            </div>
          </div>
        </STPanel>
      </div>

      {/* File Downloads */}
      <div className="space-y-2 pt-4" style={{ borderTop: isDark ? '1px solid rgba(107,114,128,0.2)' : '1px solid rgba(147,51,234,0.08)' }}>
        <h4 className="font-bold text-sm" style={{ color: isDark ? '#e5e7eb' : '#1e293b' }}>
          3. 所需文件 (请先下载):
        </h4>
        <div className="grid gap-2">
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background: isDark ? '#202225' : '#ffffff',
              border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
            }}
          >
            <div className="text-green-400"><FileDown size={20} /></div>
            <div>
              <div className="font-mono text-xs" style={{ color: isDark ? '#e5e7eb' : '#334155' }}>
                Freesia Petals Full v5.1.json
              </div>
              <div className="text-[10px]" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
                预设本体
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background: isDark ? '#202225' : '#ffffff',
              border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
            }}
          >
            <div className="text-purple-400"><FileDown size={20} /></div>
            <div>
              <div className="font-mono text-xs" style={{ color: isDark ? '#e5e7eb' : '#334155' }}>
                Freesia Petals v5.1 QR.json
              </div>
              <div className="text-[10px]" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>
                快速回复
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepImportPreset({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
        1. 点击左侧设置栏顶部的 <span className="font-bold" style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}>预设</span> (第1个图标) 进入设置。
        <br />
        2. 找到 <span className="font-bold" style={{ color: isDark ? '#f3f4f6' : '#0f172a' }}>对话补全预设</span> 区域。
        <br />
        3. 点击 <span className="font-bold text-red-400">红色框</span> 所示的导入按钮，选择{' '}
        <code
          className="px-1 rounded text-xs font-mono"
          style={{ background: isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.08)', color: isDark ? '#e5e7eb' : '#475569' }}
        >
          Freesia Petals Full v5.1.json
        </code>
        。
        <br />
        4. 导入后，点击 <span className="font-bold text-purple-400">紫色框</span> 所示的保存按钮。
      </p>

      <STPanel isDark={isDark} className="relative">
        <div
          className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-wider"
          style={{ background: isDark ? '#18191e' : '#f8f6ff', color: isDark ? '#6b7280' : '#94a3b8' }}
        >
          Simulation
        </div>

        <STNavbar activeIndex={0} isDark={isDark} />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <STLabel isDark={isDark}>对话补全预设</STLabel>
            <div className="flex gap-1">
              <STButton icon={LinkIcon} isDark={isDark} />
              <div className="relative group">
                <STButton icon={FileDown} highlight="red" isDark={isDark} />
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  1. 点击导入
                </div>
              </div>
              <STButton icon={FileUp} isDark={isDark} />
              <STButton icon={Trash2} isDark={isDark} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <STInput value="Freesia Petals Full v5.1" isDark={isDark} />
            </div>
            <div className="flex gap-1">
              <div className="relative group">
                <STButton icon={Save} highlight="purple" isDark={isDark} />
                <div className="absolute bottom-full mb-2 right-0 bg-purple-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  2. 记得保存
                </div>
              </div>
              <STButton icon={Edit2} isDark={isDark} />
              <STButton icon={Plus} isDark={isDark} />
            </div>
          </div>

          <div className="mt-2 space-y-2 pt-3" style={{ borderTop: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.08)' }}>
            <div className="flex items-center justify-between">
              <STCheckbox label="解锁上下文长度" checked={true} isDark={isDark} />
              <span className="text-xs" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>AI可见的最大长度</span>
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

function StepImportQR({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>
        1. 点击顶部导航栏第 <span className="font-bold" style={{ color: isDark ? '#fff' : '#0f172a' }}>7</span> 个图标（骰子/盒子图标）。
        <br />
        2. 找到底部的 <span className="font-bold">编辑快速回复</span> 栏，点击{' '}
        <span className="font-bold text-yellow-400">导入按钮</span> (黄色框)，导入{' '}
        <code
          className="px-1 rounded text-xs font-mono"
          style={{ background: isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.08)', color: isDark ? '#e5e7eb' : '#475569' }}
        >
          Freesia Petals v5.1 QR.json
        </code>
        。
        <br />
        3. 勾选顶部的 <span className="font-bold text-yellow-400">启用快速回复</span> (黄色框)。
        <br />
        4. 点击 <span className="font-bold">全局快速回复集</span> 旁边的{' '}
        <span
          className="inline-block px-1.5 py-0.5 rounded text-xs font-mono"
          style={{ background: isDark ? '#374151' : '#e2e8f0' }}
        >
          +
        </span>{' '}
        号 (黄色框)，选择刚才导入的预设。
      </p>

      <STPanel isDark={isDark} className="relative">
        <div
          className="absolute -top-3 left-4 px-2 text-xs uppercase tracking-wider"
          style={{ background: isDark ? '#18191e' : '#f8f6ff', color: isDark ? '#6b7280' : '#94a3b8' }}
        >
          Simulation
        </div>

        <STNavbar activeIndex={6} highlightIndex={6} highlightColor="red" isDark={isDark} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <STLabel isDark={isDark}>快速回复 (Quick Reply)</STLabel>
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <STCheckbox label="启用快速回复" checked={true} highlight={true} isDark={isDark} />
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-yellow-500 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                2. 勾选启用
              </div>
            </div>
            <STCheckbox label="合并快速回复" checked={false} isDark={isDark} />
            <STCheckbox label="(在电脑上) 展示弹出式按钮" checked={true} isDark={isDark} />
          </div>

          <div className="pt-2 space-y-2" style={{ borderTop: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.08)' }}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
                全局快速回复集
              </span>
              <div className="relative group">
                <STButton icon={Plus} highlight="yellow" isDark={isDark} className="w-6 h-6 p-0" />
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-yellow-500 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  3. 添加到全局
                </div>
              </div>
            </div>

            <div
              className="px-3 py-2 rounded flex items-center justify-between text-sm"
              style={{
                background: isDark ? '#0b0c0f' : '#ffffff',
                border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.15)',
                color: isDark ? '#ffffff' : '#334155',
              }}
            >
              <span>Freesia Petals v5.1 QR</span>
              <div className="flex gap-2 items-center">
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{
                    background: isDark ? '#1f2937' : '#f1f5f9',
                    color: isDark ? '#9ca3af' : '#64748b',
                  }}
                >
                  <CheckCircle size={10} /> Buttons
                </span>
                <Edit2 size={14} style={{ color: isDark ? '#9ca3af' : '#94a3b8' }} />
                <Trash2 size={14} style={{ color: isDark ? '#9ca3af' : '#94a3b8' }} />
              </div>
            </div>
          </div>

          <div className="text-xs" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>聊天快速回复集</div>
          <div className="text-xs" style={{ color: isDark ? '#6b7280' : '#94a3b8' }}>角色快速回复集 (私密)</div>

          <div className="pt-3" style={{ borderTop: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.08)' }}>
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
                编辑快速回复
              </span>
              <div className="w-32">
                <STInput value="Default" isDark={isDark} />
              </div>
              <div className="flex gap-1">
                <STButton icon={Edit2} isDark={isDark} className="p-1.5" />
                <STButton icon={Plus} isDark={isDark} className="p-1.5" />
                <div className="relative group">
                  <STButton icon={FileDown} highlight="yellow" isDark={isDark} className="p-1.5" />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-yellow-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    1. 先点这里导入
                  </div>
                </div>
                <STButton icon={FileUp} isDark={isDark} className="p-1.5" />
                <STButton icon={Copy} isDark={isDark} className="p-1.5" />
                <STButton icon={Trash2} isDark={isDark} className="p-1.5" />
              </div>
            </div>
          </div>
        </div>
      </STPanel>
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
          安装完成!
        </h3>
        <p className="max-w-xs mx-auto text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          现在点开一张角色卡，应该会自动跳出{' '}
          <span className="text-pink-400 font-medium">初始设置选项</span>。
        </p>
      </div>
      <div
        className="p-4 rounded-xl text-left text-sm"
        style={{
          background: isDark ? '#202225' : '#ffffff',
          border: isDark ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(147,51,234,0.1)',
          color: isDark ? '#9ca3af' : '#64748b',
        }}
      >
        <p className="font-bold mb-2" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
          💡 小提示:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>如果界面没有变化，请尝试刷新网页。</li>
          <li>
            以后如果调整了Prompt，记得再次点击那个
            <span className="text-purple-400">紫色的保存按钮</span>。
          </li>
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
    title: '准备工作 & 环境确认',
    desc: '确认版本与 STscript 设置',
    content: (isDark) => <StepPrepare isDark={isDark} />,
  },
  {
    title: '导入预设本体',
    desc: '设置对话补全预设',
    content: (isDark) => <StepImportPreset isDark={isDark} />,
  },
  {
    title: '导入快速回复 (QR)',
    desc: '导入并启用快速回复集',
    content: (isDark) => <StepImportQR isDark={isDark} />,
  },
  {
    title: '完成安装',
    desc: '开始使用',
    content: (isDark) => <StepDone isDark={isDark} />,
  },
]

export default function QuickStart() {
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
      <div className="max-w-2xl mx-auto px-4 pb-24">
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
            <Sparkles className="w-3.5 h-3.5" />
            安装教程
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
              快速开始
            </span>
          </h1>
          <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
            花瓣预设 v5.1 · 跟着模拟 UI 一步步完成安装
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
