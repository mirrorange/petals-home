import {
  Settings,
  Plug,
  Type,
  BookOpen,
  UserCog,
  Image as ImageIcon,
  Box,
  Smile,
  Contact,
} from 'lucide-react'
import { STButton } from './STButton'

export function STNavbar({
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
