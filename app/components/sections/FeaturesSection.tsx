import { type ReactNode } from 'react'
import { Lightbulb, AtSign, Brain, FileText, PenLine } from 'lucide-react'
import {
  MockPetalsCoT,
  MockAtFreesia,
  MockMemory,
  MockSynopsis,
  MockImpersonate,
} from '~/components/ui/MockUI'

interface Feature {
  id: string
  icon: ReactNode
  title: string
  titleEn: string
  description: string
  details: string[]
  mockComponent: (isDark: boolean) => ReactNode
  accentColor: string
  accentColorDark: string
}

const features: Feature[] = [
  {
    id: 'petals-cot',
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Petals CoT',
    titleEn: '思维链协作',
    description:
      '利用 Claude 的伪 Role 特性引入辅助角色机制。Freesia（作者）与 Petals（编辑）展开"对话式协作"，通过角色切换重置注意力，显著提升输出质量。',
    details: [
      '线性模式：提问 → 建议 → 创作',
      '迭代模式：初稿 → 反馈 → 优化',
      '减少偷懒问题，提升输出长度与质量',
      '支持 CoT 语言选择与渲染',
    ],
    mockComponent: (isDark: boolean) => <MockPetalsCoT isDark={isDark} />,
    accentColor: '#9333ea',
    accentColorDark: '#c084fc',
  },
  {
    id: 'at-freesia',
    icon: <AtSign className="w-5 h-5" />,
    title: '@Freesia',
    titleEn: '小苍兰系统',
    description:
      '不再只是冷冰冰的功能按钮。在输入故事内容的同时使用 @Freesia 提出指令，Freesia 边写边改，如丝般顺滑。也可以让 Freesia 总结剧情，或者单纯和小苍兰聊聊天。',
    details: [
      '混合模式：故事 + 指令同时输入',
      '纯元指令：暂停故事，与小苍兰对话',
      '元回复机制：Freesia 以她的视角回应',
      '支持五种文风与自定义模版',
    ],
    mockComponent: (isDark: boolean) => <MockAtFreesia isDark={isDark} />,
    accentColor: '#ec4899',
    accentColorDark: '#f472b6',
  },
  {
    id: 'memory',
    icon: <Brain className="w-5 h-5" />,
    title: '记忆',
    titleEn: 'Memory System',
    description:
      'Freesia 现在能记住你的偏好。支持故事记忆和全局记忆，包含覆写、追加、替换操作。更懂你的小苍兰～',
    details: [
      '自动记录用户偏好',
      '支持故事 / 全局两级记忆体系',
      '覆写、追加、替换三种操作模式',
      '手动编辑与清除记忆',
    ],
    mockComponent: (isDark: boolean) => <MockMemory isDark={isDark} />,
    accentColor: '#7e22ce',
    accentColorDark: '#a855f7',
  },
  {
    id: 'synopsis',
    icon: <FileText className="w-5 h-5" />,
    title: '摘要',
    titleEn: 'Story Synopsis',
    description:
      '正文末尾自动生成故事梗概。开启 Token 减少模式后，旧消息折叠为摘要，长情陪伴无压力。',
    details: [
      '自动生成时间、地点、事件标记',
      '实时追踪当前故事进展',
      'Token 减少模式自动折叠旧消息',
      '支持展开/折叠的优雅 UI',
    ],
    mockComponent: (isDark: boolean) => <MockSynopsis isDark={isDark} />,
    accentColor: '#d946ef',
    accentColorDark: '#e879f9',
  },
  {
    id: 'impersonate',
    icon: <PenLine className="w-5 h-5" />,
    title: '代写回复',
    titleEn: 'Impersonate',
    description:
      '不知道回什么？告诉 @Freesia 帮你代写！根据你的要求自动生成用户回复，支持一键上屏应用。',
    details: [
      '根据上下文自动生成角色回复',
      '支持自定义指令控制写作风格',
      'QR 一键上屏快捷操作',
      '保持角色性格一致性',
    ],
    mockComponent: (isDark: boolean) => <MockImpersonate isDark={isDark} />,
    accentColor: '#a21caf',
    accentColorDark: '#d946ef',
  },
]

interface FeaturesSectionProps {
  isDark: boolean
}

export default function FeaturesSection({ isDark }: FeaturesSectionProps) {
  return (
    <section id="features" className="relative py-24 px-4">
      {/* Section header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight
          text-slate-800 dark:text-white">
          功能
          <span className="bg-clip-text text-transparent ml-1"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(135deg, #c084fc, #f472b6)'
                : 'linear-gradient(135deg, #9333ea, #ec4899)',
            }}
          >
            特性
          </span>
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          花瓣预设的每一项功能，都为提升创作体验而精心设计。
        </p>
      </div>

      {/* Feature cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-28">
        {features.map((feature, idx) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isDark={isDark}
            reverse={idx % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}

interface FeatureCardProps {
  feature: Feature
  isDark: boolean
  reverse: boolean
}

function FeatureCard({ feature, isDark, reverse }: FeatureCardProps) {
  const accent = isDark ? feature.accentColorDark : feature.accentColor

  return (
    <div
      id={`feature-${feature.id}`}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}
    >
      {/* Text content */}
      <div className="flex-1 w-full lg:w-auto">
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: isDark
                ? `${accent}15`
                : `${accent}12`,
              border: `1px solid ${accent}25`,
              color: accent,
            }}
          >
            {feature.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {feature.title}
            </h3>
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: accent }}>
              {feature.titleEn}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Detail list */}
        <ul className="space-y-3">
          {feature.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                style={{ background: accent }}
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Mock UI */}
      <div className="flex-1 w-full lg:w-auto max-w-md lg:max-w-lg relative group">
        {/* Glow behind card */}
        <div
          className="absolute -inset-4 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(circle at center, ${accent}10, transparent 70%)`
              : `radial-gradient(circle at center, ${accent}08, transparent 70%)`,
          }}
        />

        {/* Card wrapper */}
        <div
          className="relative rounded-2xl p-4 transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(250,245,255,0.4))',
            border: isDark
              ? '1px solid rgba(147,51,234,0.15)'
              : '1px solid rgba(147,51,234,0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(147,51,234,0.08)',
          }}
        >
          {/* Browser chrome simulation */}
          <div className="flex items-center gap-2 mb-3 pb-2"
            style={{
              borderBottom: isDark
                ? '1px solid rgba(147,51,234,0.1)'
                : '1px solid rgba(147,51,234,0.06)',
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <div
              className="flex-1 h-5 rounded-md mx-8"
              style={{
                background: isDark
                  ? 'rgba(45,27,78,0.2)'
                  : 'rgba(147,51,234,0.04)',
              }}
            />
          </div>

          {/* Simulated SillyTavern background */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, #0c0a14, #12101e)'
                : 'linear-gradient(180deg, #fefcff, #faf7ff)',
            }}
          >
            {feature.mockComponent(isDark)}
          </div>
        </div>
      </div>
    </div>
  )
}
