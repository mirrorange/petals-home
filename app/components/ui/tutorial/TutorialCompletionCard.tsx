import { CheckCircle } from 'lucide-react'

export function TutorialCompletionCard({
  isDark,
  title,
  description,
  descriptionClassName = 'max-w-sm',
  children,
}: {
  isDark: boolean
  title: string
  description: React.ReactNode
  descriptionClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className="text-center space-y-6 py-8">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{
          background: isDark ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.08)',
          color: '#22c55e',
          boxShadow: '0 0 0 4px rgba(34,197,94,0.08)',
        }}
      >
        <CheckCircle size={40} />
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
          {title}
        </h3>
        <p className={`${descriptionClassName} mx-auto text-sm`} style={{ color: isDark ? '#9ca3af' : '#64748b' }}>
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
