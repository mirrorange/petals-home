import {
  AtSign,
  Settings,
  Lightbulb,
  FileText,
  PenLine,
  Trash2,
  Sparkles,
  Menu,
  Send,
} from 'lucide-react'

export function MockPetalsInputBar({
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
              color:
                id === 'settings' && highlightGear
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
        <div
          className="w-8 h-8 rounded flex items-center justify-center shrink-0 cursor-default"
          style={{ color: iconColor }}
        >
          <Send size={16} />
        </div>
      </div>
    </div>
  )
}
