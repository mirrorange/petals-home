import { promptToneMap, type PromptTone } from './theme'

export function TutorialInlineCode({
  children,
  isDark,
  tone = 'purple',
}: {
  children: React.ReactNode
  isDark: boolean
  tone?: PromptTone
}) {
  const palette = promptToneMap[tone]

  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{
        background: isDark ? palette.codeBgDark : palette.codeBgLight,
        color: isDark ? palette.codeTextDark : palette.codeTextLight,
      }}
    >
      {children}
    </code>
  )
}
