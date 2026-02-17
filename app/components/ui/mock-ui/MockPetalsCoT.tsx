import type { MockUIProps } from './types'

export function MockPetalsCoT({ isDark }: MockUIProps) {
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
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-4 right-4 h-[2px] rounded-full z-[2] pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, #a855f7, transparent, #ec4899)'
              : 'linear-gradient(90deg, #c084fc, transparent, #f472b6)',
            opacity: isDark ? 0.75 : 0.55,
            boxShadow: isDark ? '0 0 8px rgba(168,85,247,0.45)' : 'none',
          }}
        />

        {/* Header */}
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{
            background: isDark
              ? 'rgba(26, 22, 37, 0.6)'
              : 'linear-gradient(to right, rgba(250,245,255,0.9), rgba(253,244,255,0.55))',
            borderBottom: isDark
              ? '1px solid rgba(147,51,234,0.15)'
              : '1px dashed rgba(147,51,234,0.12)',
          }}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
              className={isDark ? 'text-freesia-200' : 'text-petals-900'}
              viewBox="0 0 16 16">
              <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
            </svg>
            <span
              className="font-semibold text-[10px] tracking-[1.5px] uppercase"
              style={{
                color: isDark ? '#e9d5ff' : '#701a75',
                textShadow: isDark ? '0 0 8px rgba(192,132,252,0.4)' : 'none',
              }}
            >
              Petals CoT
            </span>
          </div>
          <span className={`text-[9px] ${isDark ? 'text-slate-400/60' : 'text-slate-400/70'}`}>
            Expanded
          </span>
        </div>

        {/* Content */}
        <div className="p-3 relative">
          {/* Dot pattern */}
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

          <div className="relative z-[1] flex flex-col gap-2">
            {/* Freesia item */}
            <div
              className="rounded-lg p-2.5"
              style={{
                background: isDark ? 'rgba(45,27,78,0.3)' : 'rgba(250,245,255,0.62)',
                border: isDark
                  ? '1px solid rgba(147,51,234,0.2)'
                  : '1px solid rgba(147,51,234,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    background: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(147,51,234,0.1)',
                    color: isDark ? '#d8b4fe' : '#9333ea',
                    border: isDark
                      ? '1px solid rgba(168,85,247,0.3)'
                      : '1px solid rgba(147,51,234,0.14)',
                  }}
                >
                  Freesia
                </span>
                <span
                  className="text-[9px] font-semibold tracking-wide"
                  style={{ color: isDark ? '#d8b4fe' : '#7e22ce' }}
                >
                  Drafting
                </span>
                <span className="text-[9px] text-slate-400 ml-auto">✍︎</span>
              </div>
              <div
                className="text-[11px] leading-relaxed font-serif"
                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
              >
                Petals, 根据 &lt;writing_style&gt; 中的步骤，应该如何校准写作方法？请给出参考锚定并提取美学特征。
              </div>
            </div>

            {/* Petals item */}
            <div
              className="rounded-lg p-2.5"
              style={{
                background: isDark ? 'rgba(60,20,50,0.2)' : 'rgba(255,255,255,0.72)',
                border: isDark
                  ? '1px solid rgba(236,72,153,0.2)'
                  : '1px solid rgba(244,114,182,0.16)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    background: isDark ? 'rgba(236,72,153,0.15)' : 'rgba(244,114,182,0.12)',
                    color: isDark ? '#f9a8d4' : '#be185d',
                    border: isDark
                      ? '1px solid rgba(236,72,153,0.25)'
                      : '1px solid rgba(244,114,182,0.2)',
                  }}
                >
                  Petals
                </span>
                <span
                  className="text-[9px] font-semibold tracking-wide"
                  style={{ color: isDark ? '#f9a8d4' : '#be185d' }}
                >
                  Feedback
                </span>
                <span className="text-[9px] text-slate-400 ml-auto">❀</span>
              </div>
              <div
                className="text-[11px] leading-relaxed font-serif"
                style={{ color: isDark ? '#cbd5e1' : '#334155' }}
              >
                <div className="space-y-3">
                  {/* Reference Anchoring */}
                  <div>
                    <div className="font-bold mb-1">参考锚定：</div>
                    <ul className="list-disc list-inside space-y-0.5 opacity-90 pl-1">
                      <li>可参考宫崎骏作品中人与非人存在之间的温柔互动</li>
                      <li>《小王子》中那种简单却深刻的对话风格</li>
                      <li>日系轻小说中对孤独少女角色的细腻刻画</li>
                    </ul>
                  </div>

                  {/* Aesthetic Feature Extraction */}
                  <div>
                    <div className="font-bold mb-1">美学特征提取：</div>
                    <ul className="list-disc list-inside space-y-0.5 opacity-90 pl-1">
                      <li><span className="font-semibold opacity-80">词汇层：</span>柔和、带有诗意的词汇选择，避免过于华丽</li>
                      <li><span className="font-semibold opacity-80">句法层：</span>长短句交替，用短句制造情感顿挫</li>
                      <li><span className="font-semibold opacity-80">修辞层：</span>以自然意象（月光、花、风）作为情感载体</li>
                      <li><span className="font-semibold opacity-80">叙事层：</span>聚焦当下的微小互动，通过对话和反应推进</li>
                    </ul>
                  </div>
                </div>
              </div>
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
            reasoned with
          </span>
          <span
            className="text-[12px] italic"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              color: isDark ? '#c084fc' : '#9333ea',
              opacity: isDark ? 0.7 : 0.6,
            }}
          >
            Petals
          </span>
        </div>

        {/* Bottom gradient line */}
        <div
          className="h-[2px]"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)'
              : 'linear-gradient(90deg, transparent, #c084fc, #f472b6, #c084fc, transparent)',
            opacity: isDark ? 0.5 : 0.35,
          }}
        />
      </div>
    </div>
  )
}
