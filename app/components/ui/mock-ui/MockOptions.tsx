import type { MockUIProps } from './types'

interface OptionItem {
  title: string
  content: string
}

const sampleOptions: OptionItem[] = [
  {
    title: '温柔回应',
    content: '「没关系的，」我轻轻握住她的手，「不管你是什么，对我来说都一样重要。」',
  },
  {
    title: '沉默以对',
    content: '我没有回答，只是抬头望向缀满星光的夜空。',
  }
]

export function MockOptions({ isDark }: MockUIProps) {
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
            : 'none',
          borderRadius: '10px',
          boxShadow: isDark
            ? '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 4px 15px rgba(230,210,240,0.35)',
        }}
      >
        {/* Light mode: left gradient accent bar */}
        {!isDark && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1 z-[2]"
            style={{ background: 'linear-gradient(180deg, #c084fc, #f472b6)' }}
          />
        )}

        {/* Dark mode: top glow line */}
        {isDark && (
          <div
            className="absolute top-0 left-0 w-full h-[1px] z-[2]"
            style={{
              background:
                'linear-gradient(90deg, transparent 10%, #a855f7, #ec4899, #a855f7, transparent 90%)',
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{ color: isDark ? '#e9d5ff' : '#701a75' }}
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
            <span
              className="font-semibold text-[10px] tracking-[1.5px] uppercase"
              style={{
                color: isDark ? '#e9d5ff' : '#701a75',
                textShadow: isDark ? '0 0 8px rgba(192,132,252,0.4)' : 'none',
              }}
            >
              What's Next?
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-3 relative">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(rgba(168,85,247,0.15) 1px, transparent 1px)'
                : 'radial-gradient(#a855f7 0.5px, transparent 0.5px)',
              backgroundSize: isDark ? '16px 16px' : '18px 18px',
              opacity: isDark ? 0.3 : 0.04,
            }}
          />

          {/* Options list */}
          <div className="relative z-[1] flex flex-col gap-2">
            {sampleOptions.map((option, i) => (
              <div
                key={i}
                className="rounded-lg transition-all duration-200"
                style={{
                  background: isDark
                    ? 'rgba(45, 27, 78, 0.25)'
                    : 'rgba(250, 245, 255, 0.6)',
                  border: isDark
                    ? '1px solid rgba(147, 51, 234, 0.2)'
                    : '1px solid rgba(147, 51, 234, 0.12)',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  boxShadow: isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.03)'
                    : 'inset 0 1px 2px rgba(147, 51, 234, 0.03)',
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[12px] font-semibold rounded px-2 py-px text-center"
                      style={{
                        background: isDark
                          ? 'rgba(168, 85, 247, 0.15)'
                          : 'rgba(147, 51, 234, 0.1)',
                        color: isDark ? '#c084fc' : '#9333ea',
                        minWidth: '20px',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wide"
                      style={{
                        color: isDark ? '#e9d5ff' : '#7e22ce',
                        textShadow: isDark
                          ? '0 0 10px rgba(168, 85, 247, 0.5)'
                          : 'none',
                      }}
                    >
                      {option.title}
                    </span>
                  </div>
                  <span
                    className="text-[13px] font-serif leading-relaxed pl-1"
                    style={{ color: isDark ? '#cbd5e1' : '#334155' }}
                  >
                    {option.content}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative corner glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: isDark ? '-20px' : '8px',
              right: isDark ? '-20px' : '8px',
              width: isDark ? '80px' : '40px',
              height: isDark ? '80px' : '40px',
              background: isDark
                ? 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Footer */}
        <div
          className="px-4 py-1.5 flex justify-end items-center gap-1"
          style={{
            background: isDark
              ? 'rgba(15,12,24,0.5)'
              : 'linear-gradient(to right, rgba(253,244,255,0.3), transparent)',
            borderTop: isDark
              ? '1px solid rgba(147,51,234,0.1)'
              : '1px solid rgba(147,51,234,0.08)',
          }}
        >
          <span className={`text-[8px] ${isDark ? 'text-slate-400/60' : 'text-slate-500/70'}`}>
            suggested by
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

        {/* Bottom gradient line */}
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
