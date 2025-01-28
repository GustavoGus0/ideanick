import { FormikProps } from 'formik'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Textarea({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
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
      {!!touched && !!error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
