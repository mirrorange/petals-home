import type { MockUIProps } from './types'

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
