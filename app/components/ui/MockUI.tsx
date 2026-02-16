/**
 * Simulated UI components that faithfully replicate
 * the petals-preset's actual SillyTavern UI styling.
 * Both light and dark variants are rendered based on the current theme.
 */

interface MockUIProps {
  isDark: boolean
}

/* ─────────────── Petals CoT ─────────────── */
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

/* ─────────────── At Freesia ─────────────── */
export function MockAtFreesia({ isDark }: MockUIProps) {
  return (
    <div className="font-sans text-sm w-full select-none">
      {/* ── Freesia Meta Reply — MessageCard style ── */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Keyframes for floating petals */}
        <style>{`
          @keyframes float-petal-mock {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(5px, -8px) rotate(5deg); }
            50% { transform: translate(-2px, -12px) rotate(-5deg); }
            75% { transform: translate(-8px, -5px) rotate(2deg); }
          }
        `}</style>

        {/* Top gradient line */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '12px',
            right: '12px',
            height: '2px',
            background: 'linear-gradient(90deg, #c084fc, transparent, #f472b6)',
            opacity: 0.6,
            borderRadius: '99px',
            zIndex: 1,
          }}
        />

        {/* Card body */}
        <div
          className="rounded-b-xl overflow-hidden"
          style={{
            position: 'relative',
            backgroundColor: isDark ? 'rgba(26, 22, 37, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            border: isDark
              ? '1px solid rgba(88, 28, 135, 0.3)'
              : '1px solid #f3e8ff',
            boxShadow: isDark
              ? '0 4px 20px rgba(0,0,0,0.5)'
              : '0 4px 20px rgba(230,210,240,0.4)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Background gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'linear-gradient(135deg, #2d1b4e, #1a1625, #2d1b35)'
                : 'linear-gradient(135deg, #faf5ff, #ffffff, #fdf2f8)',
              opacity: isDark ? 0.4 : 0.3,
              zIndex: 0,
            }}
          />

          {/* Floating petals */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '85%',
              width: '6px',
              height: '6px',
              background: isDark
                ? 'rgba(192, 132, 252, 0.2)'
                : 'rgba(249, 168, 212, 0.3)',
              borderRadius: '50%',
              filter: 'blur(1px)',
              animation: 'float-petal-mock 14s infinite linear',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '65%',
              left: '5%',
              width: '5px',
              height: '5px',
              background: isDark
                ? 'rgba(192, 132, 252, 0.2)'
                : 'rgba(249, 168, 212, 0.3)',
              borderRadius: '50%',
              filter: 'blur(1px)',
              animation: 'float-petal-mock 18s infinite linear 1s',
            }}
          />

          {/* Card content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '16px 18px',
              color: isDark ? '#e2e8f0' : '#334155',
            }}
          >
            {/* Header: Name + subtitle */}
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '3px',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Georgia', serif",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    color: isDark ? '#e2e8f0' : '#334155',
                  }}
                >
                  Freesia
                </h3>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    opacity: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: isDark ? '#94a3b8' : '#64748b',
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                    <line x1="16" y1="8" x2="2" y2="22" />
                    <line x1="17.5" y1="15" x2="9" y2="15" />
                  </svg>
                  META REPLY
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isDark ? '#c084fc' : '#ec4899',
                  opacity: isDark ? 0.8 : 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{isDark ? '编织故事的魔女' : '不凋零的爱之花'}</span>
                <span
                  style={{
                    width: '2px',
                    height: '2px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor',
                    opacity: 0.5,
                  }}
                />
                {isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 14 14"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M4.02 3.349a3.01 3.01 0 0 1 5.96 0q.322-.073.663-.074a3.01 3.01 0 0 1 1.425 5.661A3.01 3.01 0 0 1 7 12.108a3.01 3.01 0 0 1-5.068-3.172a3.009 3.009 0 0 1 1.425-5.66q.343 0 .664.073M9 7.346c0 1.28-.72 2-2 2s-2-.72-2-2s.72-2 2-2s2 .72 2 2"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </p>
            </div>

            {/* Reply body — Freesia in-character meta reply */}
            <div style={{ fontSize: '12px', lineHeight: '1.7' }}>
              {/* Main paragraph */}
              <p
                style={{
                  marginBottom: '10px',
                  fontSize: '12px',
                  lineHeight: 1.7,
                  color: 'inherit',
                }}
              >
                嗯，你想要更多环境描写对吧？交给我吧～ 我正好想在这段里加入月光透过花丛洒落的细碎光斑，还有夜风掠过发梢时那种微凉的触感。
              </p>

              {/* Blockquote — literary detail */}
              <div
                style={{
                  position: 'relative',
                  marginBottom: '10px',
                  paddingLeft: '14px',
                  paddingTop: '2px',
                  paddingBottom: '2px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    borderRadius: '99px',
                    background: 'linear-gradient(to bottom, #c084fc, #f472b6)',
                    opacity: 0.6,
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Georgia', 'Noto Serif SC', serif",
                    fontStyle: 'italic',
                    fontSize: '11px',
                    lineHeight: 1.6,
                    color: 'inherit',
                    opacity: 0.8,
                  }}
                >
                  小苍兰的花语是「纯真」。所以这一段的氛围，用花香来承载角色的心境变化，一定会很美的。
                </p>
              </div>

              {/* Special paragraph — emotional text */}
              <p
                style={{
                  marginBottom: '0',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: isDark ? '#d8b4fe' : '#db2777',
                  textShadow: '0 0 1px rgba(219, 39, 119, 0.1)',
                }}
              >
                Petals 也都准备好了哦。我们开始吧？❀
              </p>
            </div>

            {/* Footer signature */}
            <div
              style={{
                marginTop: '12px',
                paddingTop: '6px',
                borderTop: isDark
                  ? '1px dashed rgba(255, 255, 255, 0.1)'
                  : '1px dashed rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  fontFamily: "'Brush Script MT', cursive",
                  fontSize: '14px',
                  opacity: isDark ? 0.7 : 0.5,
                  transform: 'rotate(-2deg)',
                  color: isDark ? '#c084fc' : '#334155',
                }}
              >
                Freesia
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            height: '2px',
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

/* ─────────────── Memory ─────────────── */
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

/* ─────────────── Synopsis ─────────────── */
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

/* ─────────────── Impersonate / Ghostwrite ─────────────── */
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

/* ─────────────── User Options ─────────────── */

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
