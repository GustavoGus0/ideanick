import cn from 'classnames'
import css from './index.module.scss'
import { Link } from 'react-router-dom'

export type ButtonProps = { children: React.ReactNode; loading?: boolean }
export function Button({ children, loading = true }: ButtonProps) {
  return (
    <button
      className={cn({
        [css.button]: true,
        [css.disabled]: loading,
        [css.loading]: loading,
      })}
      type="submit"
      disabled={loading}
    >
      <span className={css.text}>{children}</span>
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
