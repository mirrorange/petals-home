import type { MockUIProps } from './types'

export function MockImpersonate({ isDark }: MockUIProps) {
  return (
    <div className="font-sans text-sm w-full select-none">
      <div
        className="rounded-[10px] overflow-hidden relative"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #0f0c18, #1a1625)'
            : 'linear-gradient(135deg, #fffdfb, #fdf4ff)',
          border: isDark
            ? '1px solid rgba(147, 51, 234, 0.25)'
            : '1px solid rgba(147, 51, 234, 0.1)',
          boxShadow: isDark
            ? '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 4px 15px rgba(230,210,240,0.35)',
        }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 z-[2]"
          style={{ background: 'linear-gradient(180deg, #c084fc, #f472b6)' }}
        />

        {/* Header */}
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{
            background: isDark
              ? 'rgba(26, 22, 37, 0.6)'
              : 'linear-gradient(to right, rgba(250,245,255,0.9), rgba(253,244,255,0.5))',
            borderBottom: isDark
              ? '1px solid rgba(147,51,234,0.15)'
              : '1px dashed rgba(147,51,234,0.12)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
              className={isDark ? 'text-freesia-200' : 'text-petals-900'}
              viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
            </svg>
            <span
              className="font-semibold text-[10px] tracking-[1.5px] uppercase"
              style={{
                color: isDark ? '#e9d5ff' : '#701a75',
                textShadow: isDark ? '0 0 8px rgba(192,132,252,0.4)' : 'none',
              }}
            >
              Impersonate
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(rgba(168,85,247,0.15) 1px, transparent 1px)'
                : 'radial-gradient(#a855f7 0.5px, transparent 0.5px)',
              backgroundSize: isDark ? '16px 16px' : '18px 18px',
              opacity: isDark ? 0.25 : 0.04,
            }}
          />
          <div
            className="relative z-[1] rounded-lg p-3"
            style={{
              background: isDark ? 'rgba(45,27,78,0.2)' : 'rgba(250,245,255,0.6)',
              border: isDark
                ? '1px solid rgba(147,51,234,0.15)'
                : '1px solid rgba(147,51,234,0.1)',
              boxShadow: isDark
                ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
                : 'inset 0 1px 3px rgba(147,51,234,0.05)',
            }}
          >
            <div
              className="text-[11px] leading-relaxed font-serif whitespace-pre-wrap"
              style={{ color: isDark ? '#cbd5e1' : '#334155' }}
            >
              「今晚的月色真美呢。」我轻声说道，目光不自觉地落在她发梢那抹若隐若现的渐变紫色上。夜风拂过花园，带来小苍兰淡雅的香气。
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-1.5 flex justify-end items-center gap-1"
          style={{
            background: isDark ? 'rgba(15,12,24,0.5)' : 'linear-gradient(to right, rgba(253,244,255,0.3), transparent)',
            borderTop: isDark
              ? '1px solid rgba(147,51,234,0.1)'
              : '1px solid rgba(147,51,234,0.08)',
          }}
        >
          <span className={`text-[8px] ${isDark ? 'text-slate-400/60' : 'text-slate-500/70'}`}>
            ghostwritten by
          </span>
          <span
            className="text-[12px] italic"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              color: isDark ? '#c084fc' : '#9333ea',
              opacity: isDark ? 0.7 : 0.6,
            }}
          >
            Freesia
          </span>
        </div>

        <div
          className="h-[2px]"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)'
              : 'linear-gradient(90deg, transparent, #c084fc, #f472b6, #c084fc, transparent)',
            opacity: isDark ? 0.5 : 0.4,
          }}
        />
      </div>
    </div>
  )
}
