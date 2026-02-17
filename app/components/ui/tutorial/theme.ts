export type HighlightTone = 'yellow' | 'purple' | 'pink'
export type PromptTone = 'purple' | 'pink'

export const toneColorMap: Record<
  HighlightTone,
  {
    ringClass: string
    textDark: string
    textLight: string
  }
> = {
  yellow: {
    ringClass: 'ring-2 ring-yellow-500 ring-offset-2 animate-pulse',
    textDark: '#fbbf24',
    textLight: '#d97706',
  },
  purple: {
    ringClass: 'ring-2 ring-purple-500 ring-offset-2 animate-pulse',
    textDark: '#c084fc',
    textLight: '#7e22ce',
  },
  pink: {
    ringClass: 'ring-2 ring-pink-500 ring-offset-2 animate-pulse',
    textDark: '#f472b6',
    textLight: '#ec4899',
  },
}

export const promptToneMap: Record<
  PromptTone,
  {
    highlightBgDark: string
    highlightBgLight: string
    highlightBorderDark: string
    highlightBorderLight: string
    editActiveDark: string
    editActiveLight: string
    tooltipBgDark: string
    tooltipBgLight: string
    codeBgDark: string
    codeBgLight: string
    codeTextDark: string
    codeTextLight: string
  }
> = {
  purple: {
    highlightBgDark: 'rgba(168,85,247,0.08)',
    highlightBgLight: 'rgba(168,85,247,0.04)',
    highlightBorderDark: '1px solid rgba(168,85,247,0.3)',
    highlightBorderLight: '1px solid rgba(168,85,247,0.2)',
    editActiveDark: '#c084fc',
    editActiveLight: '#9333ea',
    tooltipBgDark: '#a855f7',
    tooltipBgLight: '#7e22ce',
    codeBgDark: 'rgba(168,85,247,0.12)',
    codeBgLight: 'rgba(168,85,247,0.06)',
    codeTextDark: '#d8b4fe',
    codeTextLight: '#7e22ce',
  },
  pink: {
    highlightBgDark: 'rgba(236,72,153,0.08)',
    highlightBgLight: 'rgba(236,72,153,0.04)',
    highlightBorderDark: '1px solid rgba(236,72,153,0.3)',
    highlightBorderLight: '1px solid rgba(236,72,153,0.2)',
    editActiveDark: '#f472b6',
    editActiveLight: '#ec4899',
    tooltipBgDark: '#ec4899',
    tooltipBgLight: '#db2777',
    codeBgDark: 'rgba(236,72,153,0.12)',
    codeBgLight: 'rgba(236,72,153,0.06)',
    codeTextDark: '#f9a8d4',
    codeTextLight: '#db2777',
  },
}

export function buildHighlightRing(isDark: boolean, tone: HighlightTone): string {
  const toneColor = toneColorMap[tone]
  const ringOffsetClass = isDark ? 'ring-offset-[#1b1c21]' : 'ring-offset-white'
  return `${toneColor.ringClass} ${ringOffsetClass}`
}

export function getToneTextColor(isDark: boolean, tone: HighlightTone): string {
  const toneColor = toneColorMap[tone]
  return isDark ? toneColor.textDark : toneColor.textLight
}
