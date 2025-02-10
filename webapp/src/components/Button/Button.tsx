import cn from 'classnames'
import css from './index.module.scss'
import { Link } from 'react-router-dom'

export function Button({ children, loading = false }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button
      className={cn({
        [css.button]: true,
        [css.disabled]: loading,
      })}
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export function LinkButton({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link className={cn({ [css.button]: true })} to={to}>
      {children}
    </Link>
  )
}
