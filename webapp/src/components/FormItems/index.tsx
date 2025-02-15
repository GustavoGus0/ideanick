import css from './index.module.scss'

export default function FormItems({ children }: { children: React.ReactNode }) {
  return <div className={css.formItems}>{children}</div>
}
