import type { PromptTone } from '../tutorial'

export function MockPromptEditDialogHeader({
  isDark,
  name,
  tone = 'purple',
}: {
  isDark: boolean
  name: string
  tone?: PromptTone
}) {
  const fieldBg = isDark ? '#0b0c0f' : '#ffffff'
  const fieldBorder = isDark
    ? 'rgba(107,114,128,0.3)'
    : 'rgba(147,51,234,0.15)'
  const labelColor = isDark ? '#e5e7eb' : '#334155'
  const titleColor = tone === 'pink'
    ? isDark
      ? '#f472b6'
      : '#db2777'
    : isDark
      ? '#c084fc'
      : '#7e22ce'

  return (
    <>
      <h3
        className="text-lg font-bold"
        style={{ color: titleColor }}
      >
        编辑
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            姓名
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs truncate"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? '#d1d5db' : '#475569',
            }}
          >
            {name}
          </div>
        </div>
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            角色
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? '#d1d5db' : '#475569',
            }}
          >
            系统
          </div>
        </div>
        <div>
          <div
            className="text-xs font-medium mb-1"
            style={{ color: labelColor }}
          >
            触发器
          </div>
          <div
            className="px-2 py-1.5 rounded text-xs"
            style={{
              background: fieldBg,
              border: `1px solid ${fieldBorder}`,
              color: isDark ? '#6b7280' : '#94a3b8',
            }}
          >
            All types (default)
          </div>
        </div>
      </div>
    </>
  )
}
