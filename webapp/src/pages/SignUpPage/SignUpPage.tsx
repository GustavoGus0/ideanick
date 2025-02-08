import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { z } from 'zod'
import Alert from '../../components/Alert/Alert'
import Button from '../../components/Button/Button'
import Cookies from 'js-cookie'
import FormItems from '../../components/FormItems/FormItems'
import Input from '../../components/Input/Input'
import Segment from '../../components/Segment/Segment'
import { trpc } from '../../lib/trpc'
import { zSignUpTrpcInput } from '@ideanick/backend/src/router/SignUp/input'
import { useNavigate } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'

export default function SignUpPage() {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput.extend({ passwordAgain: z.string().min(4) }).superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          })
        }
      })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 99999 })
        void trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} maxWidth={200} />
          <Input name="password" label="Password" type="password" formik={formik} maxWidth={200} />
          <Input name="passwordAgain" label="Repeat Password" type="password" formik={formik} maxWidth={200} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
