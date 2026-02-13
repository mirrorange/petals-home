import { useState, useEffect } from 'react'
import type { Route } from "./+types/home";
import Navbar from '~/components/sections/Navbar'
import HeroSection from '~/components/sections/HeroSection'
import FeaturesSection from '~/components/sections/FeaturesSection'
import FooterSection from '~/components/sections/FooterSection'
import FloatingPetals from '~/components/ui/FloatingPetals'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "花瓣预设 Petals Preset — 与小苍兰一起写故事" },
    {
      name: "description",
      content:
        "花瓣预设 (Petals Preset) — 一个用于 SillyTavern 的高品质预设。与小苍兰一起写故事吧！Petals CoT 双角色协作机制，@Freesia 智能指令，记忆系统，故事摘要，代写回复。",
    },
  ];
}

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    // SSR-safe: default to false, will be corrected in useEffect
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('petals-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Sync state with actual DOM class on initial mount (handles SSR hydration)
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    setIsDark(isCurrentlyDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('petals-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className={`min-h-screen transition-colors duration-500
      ${isDark
        ? 'bg-dark-bg text-slate-200'
        : 'bg-[#fefcff] text-slate-800'
      }`}
    >
      <FloatingPetals />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection isDark={isDark} />
        <FeaturesSection isDark={isDark} />
      </main>
      <FooterSection />
    </div>
  )
}
