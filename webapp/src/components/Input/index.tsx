import { FormikProps } from 'formik'
import css from './index.module.scss'
import cn from 'classnames'

export default function Input({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: {
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
  maxWidth?: string | number
  type?: 'text' | 'password'
}) {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const invalid = !!touched && !!error
  const disabled = formik.isSubmitting
  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      {name !== 'search' && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        placeholder={name === 'search' ? 'Search...' : ''}
        style={{ maxWidth }}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
