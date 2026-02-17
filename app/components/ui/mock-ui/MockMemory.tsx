import type { MockUIProps } from './types'

export function MockMemory({ isDark }: MockUIProps) {
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

        {isDark && (
          <div className="absolute top-0 left-0 w-full h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 10%, #a855f7, #ec4899, #a855f7, transparent 90%)',
              opacity: 0.7,
            }}
          />
        )}

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
              <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
            <span
              className="font-semibold text-[10px] tracking-[1.5px] uppercase"
              style={{
                color: isDark ? '#e9d5ff' : '#701a75',
                textShadow: isDark ? '0 0 8px rgba(192,132,252,0.4)' : 'none',
              }}
            >
              Memory Update
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(147,51,234,0.1)',
                color: isDark ? '#d8b4fe' : '#9333ea',
                border: isDark ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(147,51,234,0.2)',
              }}
            >
              Memory
            </span>
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(236,72,153,0.15)' : 'rgba(236,72,153,0.08)',
                color: isDark ? '#f9a8d4' : '#be185d',
                border: isDark ? '1px solid rgba(236,72,153,0.25)' : '1px solid rgba(236,72,153,0.15)',
              }}
            >
              Append
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
              - 写作风格：细腻描写，治愈系氛围<br />
              - 节奏：缓慢，注重当下时刻的微小细节
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
            saved by
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

        {/* Bottom gradient */}
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
