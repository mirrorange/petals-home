import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

type TutorialLinkCardThemeTokens = {
  cardBackgroundDark: string
  cardBackgroundLight: string
  cardBorderDark: string
  cardBorderLight: string
  iconDark: string
  iconLight: string
  titleDark: string
  titleLight: string
  descriptionDark: string
  descriptionLight: string
  linkBackgroundDark: string
  linkBackgroundLight: string
  linkBorderDark: string
  linkBorderLight: string
  linkTextDark: string
  linkTextLight: string
}

export type TutorialLinkCardThemeName = 'purple' | 'yellow' | 'pink' | 'blue' | 'green'

export type TutorialLinkCardThemeConfig =
  | TutorialLinkCardThemeName
  | ({
      base?: TutorialLinkCardThemeName
    } & Partial<TutorialLinkCardThemeTokens>)

export const tutorialLinkCardThemes: Record<TutorialLinkCardThemeName, TutorialLinkCardThemeTokens> = {
  purple: {
    cardBackgroundDark: 'rgba(147,51,234,0.08)',
    cardBackgroundLight: 'rgba(147,51,234,0.05)',
    cardBorderDark: '1px solid rgba(147,51,234,0.25)',
    cardBorderLight: '1px solid rgba(147,51,234,0.15)',
    iconDark: '#c084fc',
    iconLight: '#9333ea',
    titleDark: '#e9d5ff',
    titleLight: '#581c87',
    descriptionDark: '#cbd5e1',
    descriptionLight: '#64748b',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(147,51,234,0.2), rgba(168,85,247,0.25))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(147,51,234,0.1), rgba(168,85,247,0.15))',
    linkBorderDark: '1px solid rgba(147,51,234,0.35)',
    linkBorderLight: '1px solid rgba(147,51,234,0.25)',
    linkTextDark: '#e9d5ff',
    linkTextLight: '#581c87',
  },
  yellow: {
    cardBackgroundDark: 'rgba(234,179,8,0.08)',
    cardBackgroundLight: 'rgba(234,179,8,0.06)',
    cardBorderDark: '1px solid rgba(234,179,8,0.25)',
    cardBorderLight: '1px solid rgba(234,179,8,0.3)',
    iconDark: '#fbbf24',
    iconLight: '#d97706',
    titleDark: '#fde68a',
    titleLight: '#92400e',
    descriptionDark: '#d1d5db',
    descriptionLight: '#78716c',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(217,119,6,0.25))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(217,119,6,0.2))',
    linkBorderDark: '1px solid rgba(234,179,8,0.35)',
    linkBorderLight: '1px solid rgba(217,119,6,0.3)',
    linkTextDark: '#fde68a',
    linkTextLight: '#92400e',
  },
  pink: {
    cardBackgroundDark: 'rgba(236,72,153,0.09)',
    cardBackgroundLight: 'rgba(236,72,153,0.05)',
    cardBorderDark: '1px solid rgba(236,72,153,0.26)',
    cardBorderLight: '1px solid rgba(236,72,153,0.16)',
    iconDark: '#f9a8d4',
    iconLight: '#db2777',
    titleDark: '#fce7f3',
    titleLight: '#831843',
    descriptionDark: '#cbd5e1',
    descriptionLight: '#64748b',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(190,24,93,0.24), rgba(236,72,153,0.26))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.2))',
    linkBorderDark: '1px solid rgba(244,114,182,0.4)',
    linkBorderLight: '1px solid rgba(236,72,153,0.28)',
    linkTextDark: '#fce7f3',
    linkTextLight: '#9d174d',
  },
  blue: {
    cardBackgroundDark: 'rgba(37,99,235,0.1)',
    cardBackgroundLight: 'rgba(37,99,235,0.06)',
    cardBorderDark: '1px solid rgba(59,130,246,0.28)',
    cardBorderLight: '1px solid rgba(37,99,235,0.18)',
    iconDark: '#93c5fd',
    iconLight: '#2563eb',
    titleDark: '#dbeafe',
    titleLight: '#1e3a8a',
    descriptionDark: '#cbd5e1',
    descriptionLight: '#64748b',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(30,64,175,0.24), rgba(59,130,246,0.26))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(96,165,250,0.2))',
    linkBorderDark: '1px solid rgba(96,165,250,0.4)',
    linkBorderLight: '1px solid rgba(59,130,246,0.28)',
    linkTextDark: '#dbeafe',
    linkTextLight: '#1e40af',
  },
  green: {
    cardBackgroundDark: 'rgba(16,185,129,0.09)',
    cardBackgroundLight: 'rgba(16,185,129,0.06)',
    cardBorderDark: '1px solid rgba(52,211,153,0.26)',
    cardBorderLight: '1px solid rgba(16,185,129,0.16)',
    iconDark: '#6ee7b7',
    iconLight: '#059669',
    titleDark: '#d1fae5',
    titleLight: '#065f46',
    descriptionDark: '#cbd5e1',
    descriptionLight: '#64748b',
    linkBackgroundDark: 'linear-gradient(135deg, rgba(4,120,87,0.24), rgba(16,185,129,0.25))',
    linkBackgroundLight: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(52,211,153,0.2))',
    linkBorderDark: '1px solid rgba(52,211,153,0.38)',
    linkBorderLight: '1px solid rgba(16,185,129,0.25)',
    linkTextDark: '#d1fae5',
    linkTextLight: '#065f46',
  },
}

function resolveTheme(theme: TutorialLinkCardThemeConfig): TutorialLinkCardThemeTokens {
  if (typeof theme === 'string') {
    return tutorialLinkCardThemes[theme]
  }

  const { base = 'purple', ...overrides } = theme
  return {
    ...tutorialLinkCardThemes[base],
    ...overrides,
  }
}

export function TutorialLinkCard({
  isDark,
  icon: Icon,
  title,
  description,
  href,
  ctaLabel = '查看教程',
  theme = 'purple',
  className = '',
  contentClassName = '',
  descriptionClassName = '',
  buttonClassName = '',
}: {
  isDark: boolean
  icon: LucideIcon
  title: React.ReactNode
  description: React.ReactNode
  href: string
  ctaLabel?: string
  theme?: TutorialLinkCardThemeConfig
  className?: string
  contentClassName?: string
  descriptionClassName?: string
  buttonClassName?: string
}) {
  const themeStyles = resolveTheme(theme)

  return (
    <div
      className={`p-4 rounded-xl text-left text-sm flex items-start gap-3 ${className}`}
      style={{
        background: isDark ? themeStyles.cardBackgroundDark : themeStyles.cardBackgroundLight,
        border: isDark ? themeStyles.cardBorderDark : themeStyles.cardBorderLight,
      }}
    >
      <Icon
        className="w-5 h-5 shrink-0 mt-0.5"
        style={{ color: isDark ? themeStyles.iconDark : themeStyles.iconLight }}
      />
      <div className={`space-y-2 ${contentClassName}`}>
        <p className="font-bold" style={{ color: isDark ? themeStyles.titleDark : themeStyles.titleLight }}>
          {title}
        </p>
        <p className={`leading-relaxed ${descriptionClassName}`} style={{ color: isDark ? themeStyles.descriptionDark : themeStyles.descriptionLight }}>
          {description}
        </p>
        <Link
          to={href}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${buttonClassName}`}
          style={{
            background: isDark ? themeStyles.linkBackgroundDark : themeStyles.linkBackgroundLight,
            border: isDark ? themeStyles.linkBorderDark : themeStyles.linkBorderLight,
            color: isDark ? themeStyles.linkTextDark : themeStyles.linkTextLight,
          }}
        >
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
