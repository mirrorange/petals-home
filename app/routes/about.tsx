import { Link } from 'react-router'
import {
  Heart,
  Info,
  Sparkles,
  Star,
  Lightbulb,
  GitPullRequest,
  Mail,
  ExternalLink,
  MessageCircle,
} from 'lucide-react'
import type { Route } from './+types/about'
import Navbar from '~/components/sections/Navbar'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'
import PetalsIcon from '~/components/ui/PetalsIcon'
import { useTutorialTheme } from '~/components/ui/TutorialPageLayout'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '关于 — 花瓣预设 Petals Preset' },
    {
      name: 'description',
      content:
        '了解花瓣预设的故事、致谢与联系方式。花瓣预设由 @mirrorange 一只咕橘子 创建，以 CC BY-NC 4.0 协议开放授权。',
    },
  ]
}

/* ── Acknowledgement data ── */
interface Credit {
  discordId: string
  displayName: string
  contribution: string
  highlight?: boolean
}

const credits: Credit[] = [
  {
    discordId: 'achilng',
    displayName: '花绘',
    contribution: '特别感谢！花瓣预设参考了 Lily Preset Adaptation 预设',
    highlight: true,
  },
  {
    discordId: 'souffle100253006',
    displayName: '蔬',
    contribution: '为花瓣预设编写安装教程和常见问题文档',
  },
  {
    discordId: 'durvis',
    displayName: 'durvis',
    contribution: '提供技术指导',
  },
  {
    discordId: 'unknownutopia',
    displayName: '𝓡𝓮𝓷𝓪𝓲𝓼𝓼𝓪𝓷𝓬𝓮',
    contribution: '提供技术指导 & 帮忙解答预设问题',
  },
  {
    discordId: 'momo_chichi_mumu',
    displayName: '糖糖',
    contribution: '帮忙解答预设问题',
  },
  {
    discordId: 'karl000',
    displayName: 'Kenshin',
    contribution: '帮忙解答预设问题',
  },
  {
    discordId: 'qq381337171',
    displayName: '泥路',
    contribution: '帮忙解答预设问题',
  },
  {
    discordId: 'shokill0403',
    displayName: '𝓈𝒽ℴ𝓀𝒾𝓁𝓁',
    contribution: '帮忙解答预设问题',
  },
  {
    discordId: 'kyubi2075',
    displayName: 'Kyubi',
    contribution: '提供 You.com 测试 API',
  },
  {
    discordId: 'adam.528',
    displayName: '小吱崽子',
    contribution: '提供文风指南',
  },
]

/* ── Discord icon (not in lucide) ── */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189z" />
    </svg>
  )
}

/* ── Page component ── */
export default function About() {
  const { isDark, toggleTheme } = useTutorialTheme()

  return (
    <div
      className={`min-h-screen transition-colors duration-500
      ${isDark ? 'bg-dark-bg text-slate-200' : 'bg-[#fefcff] text-slate-800'}`}
    >
      <FloatingPetals />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-glow-pulse"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(244,114,182,0.20) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[100px] animate-glow-pulse"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(251,113,133,0.10) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(253,164,175,0.14) 0%, transparent 70%)',
              animationDelay: '1.5s',
            }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(236,72,153,0.06) 1px, transparent 1px)'
              : 'radial-gradient(rgba(236,72,153,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="animate-slide-up mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            bg-freesia-100/80 text-freesia-700 border border-freesia-200/50
            dark:bg-freesia-900/30 dark:text-freesia-300 dark:border-freesia-700/30
            backdrop-blur-sm shadow-lg shadow-freesia-200/20 dark:shadow-freesia-900/20"
          >
            <Info className="w-4 h-4" />
            <span>关于花瓣</span>
          </div>

          {/* Title */}
          <h1 className="animate-slide-up-delayed text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 30%, #f472b6 60%, #fda4af 100%)'
                  : 'linear-gradient(135deg, #701a75 0%, #9333ea 30%, #ec4899 60%, #f472b6 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 8s ease infinite',
              }}
            >
              关于花瓣预设
            </span>
          </h1>

          <p
            className="animate-slide-up-delayed-2 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed
            text-slate-500 dark:text-slate-400 font-light inline-flex items-center justify-center gap-2"
          >
            认识花瓣背后的故事，以及每一位让它绽放的朋友们
            <PetalsIcon className="w-5 h-5 text-blossom-400 inline-block" />
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="relative px-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* ── Project intro card ── */}
          <GlassCard isDark={isDark}>
            <div className="flex items-start gap-4 mb-5">
              <IconBadge isDark={isDark} from="#ec4899" to="#f472b6">
                <PetalsIcon className="w-6 h-6" />
              </IconBadge>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  花瓣预设
                </h2>
                <span className="text-[11px] font-medium uppercase tracking-wider text-blossom-500 dark:text-blossom-400">
                  Petals Preset
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              花瓣预设由{' '}
              <span className="font-semibold text-blossom-500 dark:text-blossom-400">
                @mirrorange 一只咕橘子
              </span>{' '}
              创建，发布于{' '}
              <a
                href="https://discord.com/channels/1134557553011998840/1333735046120476686/1333735046120476686"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blossom-500 dark:text-blossom-400 underline decoration-blossom-300 dark:decoration-blossom-400/40 underline-offset-2
                  hover:text-blossom-400 dark:hover:text-blossom-300 transition-colors"
              >
                类脑 Discord 社区
                <ExternalLink className="inline w-3 h-3 ml-0.5 -mt-0.5" />
              </a>
              。
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              花瓣预设以{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-blossom-500 dark:text-blossom-400
                  underline decoration-blossom-300 dark:decoration-blossom-400/40 underline-offset-2
                  hover:text-blossom-400 dark:hover:text-blossom-300 transition-colors"
              >
                CC BY-NC 4.0
                <ExternalLink className="w-3 h-3" />
              </a>{' '}
              协议开放授权 — 你可以自由使用、改编和分享，只需注明出处并且不用于商业用途。
            </p>
          </GlassCard>

          {/* ── Credits card ── */}
          <GlassCard isDark={isDark}>
            <div className="flex items-start gap-4 mb-6">
              <IconBadge isDark={isDark} from="#f472b6" to="#fda4af">
                <Sparkles className="w-6 h-6" />
              </IconBadge>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  致谢
                </h2>
                <span className="text-[11px] font-medium uppercase tracking-wider text-blossom-500 dark:text-blossom-400">
                  Acknowledgements
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 inline-flex items-center gap-1.5">
              花瓣预设的诞生与成长，离不开以下每一位小伙伴的帮助与支持，橘子在此由衷感谢
              <Heart className="w-3.5 h-3.5 text-blossom-400 fill-blossom-400 inline-block" />
            </p>

            <ul className="space-y-3">
              {credits.map((c) => (
                <CreditItem key={c.discordId} credit={c} isDark={isDark} />
              ))}
            </ul>
          </GlassCard>

          {/* ── Support card ── */}
          <GlassCard isDark={isDark}>
            <div className="flex items-start gap-4 mb-5">
              <IconBadge isDark={isDark} from="#ec4899" to="#fb7185">
                <Heart className="w-6 h-6" />
              </IconBadge>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  支持花瓣预设
                </h2>
                <span className="text-[11px] font-medium uppercase tracking-wider text-sakura-500 dark:text-sakura-400">
                  Support
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              花瓣预设是橘子的业余爱好项目，它不会用于盈利，暂时也不接受捐助哦。
              <br />
              不过如果你想要支持橘子，可以这样做：
            </p>

            <ul className="space-y-3">
              <SupportItem isDark={isDark} icon={<Heart className="w-4 h-4" />}>
                去{' '}
                <a
                  href="https://discord.com/channels/1134557553011998840/1333735046120476686/1333735046120476686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blossom-500 dark:text-blossom-400 underline decoration-blossom-300 dark:decoration-blossom-400/40 underline-offset-2
                    hover:text-blossom-400 dark:hover:text-blossom-300 transition-colors"
                >
                  发布页
                  <ExternalLink className="inline w-3 h-3 ml-0.5 -mt-0.5" />
                </a>{' '}
                点一个反应吧！
              </SupportItem>
              <SupportItem isDark={isDark} icon={<Lightbulb className="w-4 h-4" />}>
                给出你的意见或建议，帮助橘子把花瓣预设做得更好
              </SupportItem>
              <SupportItem isDark={isDark} icon={<GitPullRequest className="w-4 h-4" />}>
                提交自己的改进，优秀的改进会被合并到预设中
              </SupportItem>
            </ul>
          </GlassCard>

          {/* ── Contact card ── */}
          <GlassCard isDark={isDark}>
            <div className="flex items-start gap-4 mb-5">
              <IconBadge isDark={isDark} from="#f472b6" to="#ec4899">
                <MessageCircle className="w-6 h-6" />
              </IconBadge>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  联系方式
                </h2>
                <span className="text-[11px] font-medium uppercase tracking-wider text-blossom-500 dark:text-blossom-400">
                  Contact
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ContactCard
                isDark={isDark}
                icon={<Mail className="w-5 h-5" />}
                label="邮箱"
                value="orange@freesia.ink"
                href="mailto:orange@freesia.ink"
              />
              <ContactCard
                isDark={isDark}
                icon={<DiscordIcon className="w-5 h-5" />}
                label="Discord"
                value="mirrorange"
                href="https://discord.com/users/1015268632466558996"
              />
            </div>
          </GlassCard>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}

/* ── Shared sub-components ── */

function GlassCard({
  isDark,
  children,
}: {
  isDark: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-[1.01]"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,245,250,0.6))',
        border: isDark
          ? '1px solid rgba(236,72,153,0.15)'
          : '1px solid rgba(236,72,153,0.12)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 8px 32px rgba(236,72,153,0.06)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{ background: 'rgba(236,72,153,0.08)' }}
      />
      {children}
    </div>
  )
}

function IconBadge({
  isDark,
  from,
  to,
  children,
}: {
  isDark: boolean
  from: string
  to: string
  children: React.ReactNode
}) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
      style={{
        background: `linear-gradient(135deg, ${from}18, ${to}18)`,
        border: `1px solid ${from}30`,
        color: isDark ? to : from,
      }}
    >
      {children}
    </div>
  )
}

function CreditItem({
  credit,
  isDark,
}: {
  credit: Credit
  isDark: boolean
}) {
  return (
    <li
      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200
        ${credit.highlight
          ? 'ring-1 ring-blossom-300/40 dark:ring-blossom-400/30'
          : ''
        }`}
      style={{
        background: credit.highlight
          ? isDark
            ? 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(251,113,133,0.06))'
            : 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(253,164,175,0.04))'
          : isDark
          ? 'rgba(236,72,153,0.06)'
          : 'rgba(236,72,153,0.03)',
        border: credit.highlight
          ? undefined
          : isDark
          ? '1px solid rgba(236,72,153,0.1)'
          : '1px solid rgba(236,72,153,0.08)',
      }}
    >
      <span
        className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
        style={{
          background: credit.highlight
            ? 'linear-gradient(135deg, #ec4899, #fb7185)'
            : isDark
            ? '#f472b6'
            : '#ec4899',
        }}
      />
      <span className="flex-1 text-slate-700 dark:text-slate-300 leading-relaxed">
        {credit.highlight && (
          <Star className="w-3.5 h-3.5 text-blossom-400 fill-blossom-400 inline-block mr-1 -mt-0.5" />
        )}
        <span
          className="group/name relative font-semibold text-blossom-500 dark:text-blossom-400 cursor-default"
        >
          {credit.displayName}
          {/* Tooltip showing Discord ID */}
          <span
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono font-normal
              bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-800
              opacity-0 group-hover/name:opacity-100 transition-opacity duration-200
              shadow-lg z-20"
          >
            @{credit.discordId}
          </span>
        </span>
        {' — '}
        {credit.contribution}
      </span>
    </li>
  )
}

function SupportItem({
  isDark,
  icon,
  children,
}: {
  isDark: boolean
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <li
      className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
      style={{
        background: isDark ? 'rgba(236,72,153,0.06)' : 'rgba(236,72,153,0.03)',
        border: isDark
          ? '1px solid rgba(236,72,153,0.1)'
          : '1px solid rgba(236,72,153,0.08)',
      }}
    >
      <span
        className="flex-shrink-0 mt-0.5"
        style={{ color: isDark ? '#f472b6' : '#ec4899' }}
      >
        {icon}
      </span>
      <span className="flex-1 text-slate-700 dark:text-slate-300 leading-relaxed">
        {children}
      </span>
    </li>
  )
}

function ContactCard({
  isDark,
  icon,
  label,
  value,
  href,
}: {
  isDark: boolean
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div
      className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${
        href ? 'hover:scale-[1.02] cursor-pointer group/contact' : ''
      }`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(251,113,133,0.04))'
          : 'linear-gradient(135deg, rgba(236,72,153,0.05), rgba(253,164,175,0.03))',
        border: isDark
          ? '1px solid rgba(236,72,153,0.15)'
          : '1px solid rgba(236,72,153,0.10)',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: isDark
            ? 'rgba(236,72,153,0.15)'
            : 'rgba(236,72,153,0.08)',
          color: isDark ? '#f472b6' : '#ec4899',
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium mb-0.5">
          {label}
        </div>
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate group-hover/contact:text-blossom-500 dark:group-hover/contact:text-blossom-400 transition-colors">
          {value}
        </div>
      </div>
      {href && (
        <ExternalLink className="w-4 h-4 ml-auto text-slate-300 dark:text-slate-600 group-hover/contact:text-blossom-400 transition-colors flex-shrink-0" />
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return inner
}
