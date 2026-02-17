interface PetalsIconProps {
  className?: string
  title?: string
}

export default function PetalsIcon({ className = '', title }: PetalsIconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M1021.672863 524.693547l-78.498222-28.57085c-309.668085-112.71038-652.074122 46.956004-764.783504 356.62409L139.61463 959.28187l78.49922 28.57085c309.669083 112.71038 652.074122-46.956004 764.784502-356.624089l38.774511-106.534086z"
        fill="currentColor"
        opacity=".3"
      />
      <path
        d="M373.723922 2.478303L301.381034 44.247138C15.98794 209.017848-81.793734 573.947196 82.976976 859.339292l56.685563 98.181915 72.343887-41.767837C497.399519 750.981662 595.181193 386.052314 430.410484 100.661217L373.723922 2.478303z"
        fill="currentColor"
        opacity=".8"
      />
    </svg>
  )
}
