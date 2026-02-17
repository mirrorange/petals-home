import { Save } from 'lucide-react'

export function MockPromptEditDialogActions({
  isDark,
  highlightSave,
}: {
  isDark: boolean
  highlightSave?: boolean
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center cursor-default"
        style={{
          background: isDark ? '#2b2d31' : '#f1f5f9',
          color: isDark ? '#9ca3af' : '#64748b',
        }}
      >
        ✕
      </div>
      <div className="relative group">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-default ${
            highlightSave
              ? isDark
                ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-[#1b1c21] animate-pulse'
                : 'ring-2 ring-green-500 ring-offset-2 ring-offset-white animate-pulse'
              : ''
          }`}
          style={{
            background: isDark ? '#2b2d31' : '#f1f5f9',
            color: highlightSave
              ? isDark
                ? '#4ade80'
                : '#16a34a'
              : isDark
                ? '#9ca3af'
                : '#64748b',
          }}
        >
          <Save size={16} />
        </div>
        {highlightSave && (
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: isDark ? '#22c55e' : '#16a34a',
              color: '#fff',
            }}
          >
            保存编辑
          </div>
        )}
      </div>
    </div>
  )
}
