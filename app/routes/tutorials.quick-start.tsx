import { useState } from 'react'
import { Link } from 'react-router'
import {
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  ChevronDown,
  CheckCircle,
  Link as LinkIcon,
  Copy,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'
import type { Route } from './+types/tutorials.quick-start'
import {
  STPanel,
  STButton,
  STNavbar,
  STInput,
  STLabel,
  STCheckbox,
  GuideStepCard,
  SimulationBadge,
  TutorialHintCard,
  TutorialCompletionCard,
} from '~/components/ui/TutorialComponents'
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialTheme,
} from '~/components/ui/TutorialPageLayout'

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

/* ───────────────────────── Step content builders ───────────────────────── */

function StepPrepare({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="确认 SillyTavern 版本"
          accent="blue"
          isDark={isDark}
          detail={
            <>
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
            </>
          }
          tip="版本过低时，预设脚本将无法运行。"
        />

        <GuideStepCard
          index={2}
          title="确认 STscript 设置"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              点击顶部栏第 <span className="font-semibold">5</span> 个图标进入用户设置，找到{' '}
              <span className="font-semibold">STscript设置</span>，确认勾选{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                严格转义
              </span>{' '}
              和{' '}
              <span className="font-semibold" style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}>
                替换 GETVAR
              </span>
              。
            </>
          }
          tip="这两项未启用时，脚本会出现异常。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

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
              <STCheckbox label="替换 GETVAR" checked={true} highlight={true} highlightColor="pink" isDark={isDark} />
            </div>
          </div>
        </div>
      </STPanel>
    </div>
  )
}

function StepImportPreset({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-10 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="进入预设页签"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 1 个 <span className="font-semibold">预设</span> 图标，确认当前面板标题是{' '}
              <span className="font-semibold">对话补全预设</span>。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="导入 Full 预设文件"
          accent="red"
          isDark={isDark}
          detail={
            <>
              点击红色提示的导入按钮，选择{' '}
              <code
                className="px-1 rounded text-xs font-mono"
                style={{
                  background: isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.08)',
                  color: isDark ? '#e5e7eb' : '#475569',
                }}
              >
                Freesia Petals Full v5.2.json
              </code>{' '}
              并完成导入。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="检查是否导入成功"
          accent="green"
          isDark={isDark}
          detail={
            <>
              导入后下拉名称应显示 <span className="font-semibold">Freesia Petals Full v5.2</span>。
            </>
          }
          tip="名称没有变化通常代表导入失败或选错文件。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

        <STNavbar activeIndex={0} highlightIndex={0} highlightColor="red" isDark={isDark} />

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
              <STInput value="Freesia Petals Full v5.2" isDark={isDark} />
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
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-10 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="打开 Quick Reply 页面"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 7 个 <span className="font-semibold">扩展</span> 图标（盒子），进入{' '}
              <span className="font-semibold">快速回复 (Quick Reply)</span> 设置页。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="导入 QR 文件"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              在底部 <span className="font-semibold">编辑快速回复</span> 区域点击黄色提示导入按钮，选择{' '}
              <code
                className="px-1 rounded text-xs font-mono"
                style={{
                  background: isDark ? 'rgba(107,114,128,0.3)' : 'rgba(147,51,234,0.08)',
                  color: isDark ? '#e5e7eb' : '#475569',
                }}
              >
                Freesia Petals v5.2 QR.json
              </code>
              。
            </>
          }
          tip="导入后应能在列表里看到对应 QR 集名称。"
        />

        <GuideStepCard
          index={3}
          title="启用并绑定到全局"
          accent="green"
          isDark={isDark}
          detail={
            <>
              勾选上方 <span className="font-semibold">启用快速回复</span>，然后点击{' '}
              <span
                className="inline-block px-1.5 py-0.5 rounded text-xs font-mono"
                style={{ background: isDark ? '#374151' : '#e2e8f0' }}
              >
                +
              </span>{' '}
              让下方全局快速回复项出现，并在该项目选中{' '}
              <span className="font-semibold">Freesia Petals v5.2 QR</span>。
            </>
          }
          tip="只导入不绑定到全局，或新增项选错 QR，都会导致 QR 集不生效。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

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
                  3. 点击 + 后出现下方项目
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
              <div className="flex items-center gap-2 min-w-0 relative group">
                <span className="flex items-center gap-1 min-w-0">
                  <span className="truncate">Freesia Petals v5.2 QR</span>
                  <ChevronDown
                    size={14}
                    className={isDark ? 'text-gray-500 shrink-0' : 'text-slate-400 shrink-0'}
                  />
                </span>
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-yellow-500 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  4. 下拉选中
                </div>
              </div>
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
    <TutorialCompletionCard
      isDark={isDark}
      title="安装完成!"
      descriptionClassName="max-w-xs"
      description={
        <>
          现在点开一张角色卡，应该会自动跳出{' '}
          <span className="text-pink-400 font-medium">初始设置</span>。
        </>
      }
    >
      {/* DeepSeek NoAss callout */}
      <div
        className="p-4 rounded-xl text-left text-sm max-w-md mx-auto flex items-start gap-3"
        style={{
          background: isDark ? 'rgba(234,179,8,0.08)' : 'rgba(234,179,8,0.06)',
          border: isDark ? '1px solid rgba(234,179,8,0.25)' : '1px solid rgba(234,179,8,0.3)',
          color: isDark ? '#fbbf24' : '#92400e',
        }}
      >
        <AlertTriangle
          className="w-5 h-5 shrink-0 mt-0.5"
          style={{ color: isDark ? '#fbbf24' : '#d97706' }}
        />
        <div className="space-y-2">
          <p className="font-bold" style={{ color: isDark ? '#fde68a' : '#92400e' }}>
            使用 DeepSeek 模型？
          </p>
          <p style={{ color: isDark ? '#d1d5db' : '#78716c' }}>
            DeepSeek 系列模型需要额外配置{' '}
            <span className="font-semibold" style={{ color: isDark ? '#fbbf24' : '#b45309' }}>
              NoAss 插件
            </span>{' '}
            才能正常使用花瓣预设，请前往教程完成配置。
          </p>
          <Link
            to="/tutorials/noass"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(217,119,6,0.25))'
                : 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(217,119,6,0.2))',
              border: isDark ? '1px solid rgba(234,179,8,0.35)' : '1px solid rgba(217,119,6,0.3)',
              color: isDark ? '#fde68a' : '#92400e',
            }}
          >
            前往 NoAss 插件配置教程
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <TutorialHintCard isDark={isDark} className="max-w-md mx-auto">
        <ul className="list-disc pl-4 space-y-1">
          <li>如果界面没有变化，请尝试刷新网页。</li>
          <li>
            以后如果调整了Prompt，记得再次点击那个
            <span className="text-purple-400">保存按钮</span>。
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
  const { isDark, toggleTheme } = useTutorialTheme()
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        badgeLabel="安装教程"
        title="快速开始"
        description="跟着模拟 UI 一步步完成安装"
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
