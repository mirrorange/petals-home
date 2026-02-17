import type { MockUIProps } from './types'

export function MockSynopsis({ isDark }: MockUIProps) {
  return (
    <div className="font-sans text-sm w-full select-none">
      {/* Top line */}
      <div
        className="h-[2px] w-[95%] mx-auto rounded-full mb-0"
        style={{
          background: 'linear-gradient(90deg, #c084fc, transparent, #f472b6)',
          opacity: 0.6,
        }}
      />
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #0f0c18, #1a1625)'
            : 'rgba(255,255,255,0.95)',
          border: isDark
            ? '1px solid rgba(147,51,234,0.25)'
            : '1px solid #f3e8ff',
          boxShadow: isDark
            ? '0 4px 20px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(230,210,240,0.4)',
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{
            background: isDark
              ? 'rgba(26, 22, 37, 0.6)'
              : 'linear-gradient(135deg, #faf5ff 0%, #fffdfb 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: isDark ? '#c084fc' : '#9333ea', fontSize: '12px' }}>✦</span>
            <span
              className="font-bold text-[10px] tracking-[1.5px] uppercase"
              style={{ color: isDark ? '#e2e8f0' : '#334155' }}
            >
              Story Synopsis
            </span>
          </div>
          <span className={`text-[9px] ${isDark ? 'text-slate-400/60' : 'text-slate-400/70'}`}>
            Expanded
          </span>
        </div>

        {/* Content */}
        <div
          className="px-4 py-3"
          style={{ background: isDark ? 'transparent' : '#fffdfb' }}
        >
          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px]"
              style={{
                background: isDark ? 'rgba(168,85,247,0.15)' : 'rgba(147,51,234,0.08)',
                border: isDark ? '1px solid rgba(168,85,247,0.25)' : '1px solid rgba(147,51,234,0.15)',
              }}
            >
              <span>🕒</span>
              <span className="font-medium" style={{ color: isDark ? '#d8b4fe' : '#475569' }}>Day1 18:00 - 18:15</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px]"
              style={{
                background: isDark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.08)',
                border: isDark ? '1px solid rgba(236,72,153,0.2)' : '1px solid rgba(236,72,153,0.15)',
              }}
            >
              <span>📍</span>
              <span className="font-medium" style={{ color: isDark ? '#f9a8d4' : '#475569' }}>城市街道十字路口</span>
            </div>
          </div>

          {/* Current event */}
          <div className="mb-3 relative pl-3" style={{ borderLeft: '2px solid #e879f9' }}>
            <span
              className="block text-[9px] uppercase tracking-widest mb-0.5"
              style={{ color: isDark ? '#f9a8d4' : '#db2777' }}
            >
              Current Event
            </span>
            <span
              className="font-semibold text-[11px]"
              style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
            >
              初遇与对话
            </span>
          </div>

          {/* Summary */}
          <div
            className="p-2.5 rounded-lg text-[11px] leading-relaxed font-serif whitespace-pre-wrap"
            style={{
              background: isDark
                ? 'rgba(45,27,78,0.2)'
                : 'linear-gradient(to bottom right, #faf5ff, #fff)',
              border: isDark
                ? '1px solid rgba(147,51,234,0.15)'
                : '1px dashed #e9d5ff',
              color: isDark ? '#cbd5e1' : '#475569',
            }}
          >
            人偶主动向主角搭话后，主角表示对她眼中的世界感兴趣。面对这个从未被问及的问题，人偶尝试用语言描述自己的感知，将黄昏的色彩比作"快要融化的糖"。她发现与主角交谈时更容易找到词语，随后反问主角眼中的世界是什么样的，并伸出手等待回应。
          </div>
        </div>
      </div>
    </div>
  )
}
