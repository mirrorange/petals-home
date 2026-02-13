import { Sparkles } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer id="footer" className="relative py-16 px-4 overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #c084fc, #f472b6, #c084fc, transparent)',
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-freesia-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #c084fc, #f472b6)',
            }}
          >
            花瓣预设
          </span>
          <Sparkles className="w-5 h-5 text-blossom-400" />
        </div>

        {/* Tagline */}
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          无论是什么样的故事，小苍兰都会一直陪着你的～
        </p>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="https://discord.com/channels/1134557553011998840/1333735046120476686"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-freesia-600 dark:text-freesia-400 hover:text-freesia-700 dark:hover:text-freesia-300 transition-colors"
          >
            Discord 频道
          </a>
          <span className="w-1 h-1 rounded-full bg-freesia-300 dark:bg-freesia-700" />
          <a
            href="https://discord.com/channels/1134557553011998840/1333735046120476686"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-freesia-600 dark:text-freesia-400 hover:text-freesia-700 dark:hover:text-freesia-300 transition-colors"
          >
            发布页
          </a>
        </div>

        {/* Credits */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span>Made with</span>
          <span className="text-blossom-400">♥</span>
          <span>by</span>
          <span className="italic" style={{ fontFamily: "'Brush Script MT', cursive", fontSize: '14px', color: '#c084fc' }}>
            Freesia
          </span>
        </div>
      </div>
    </footer>
  )
}
