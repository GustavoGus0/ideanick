import cn from 'classnames'
import css from './index.module.scss'

export type AlertProps = { color: string; hidden?: boolean; children: React.ReactNode }
export default function Alert({ color, hidden, children }: AlertProps) {
  if (hidden) {
    return null
  }
  return <div className={cn({ [css.alert]: true, [css[color]]: true })}>{children}</div>
}
