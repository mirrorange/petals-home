import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: string
  delay: string
  duration: string
  size: string
  color: string
  opacity: number
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const colors = [
      'bg-freesia-300/40',
      'bg-blossom-300/40',
      'bg-petals-300/40',
      'bg-freesia-200/30',
      'bg-blossom-200/30',
    ]
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => {
      const duration = 12 + Math.random() * 10
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        // Use negative delay so petals start mid-animation on first paint.
        delay: `${-Math.random() * duration}s`,
        duration: `${duration}s`,
        size: `${6 + Math.random() * 10}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.2 + Math.random() * 0.4,
      }
    })
    setPetals(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute rounded-full ${petal.color} blur-[1px]`}
          style={{
            left: petal.left,
            top: '-12vh',
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
            animation: `petal-drift ${petal.duration} linear ${petal.delay} infinite`,
            animationFillMode: 'both',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
