import { zSignInTrpcInput } from '@ideanick/backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import Alert from '../../components/Alert/Alert'
import { Button } from '../../components/Button/Button'
import FormItems from '../../components/FormItems/FormItems'
import Input from '../../components/Input/Input'
import Segment from '../../components/Segment/Segment'
import { trpc } from '../../lib/trpc'
import { useNavigate } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'
import useForm from '../../lib/form'

export default function SignInPage() {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      navigate(getAllIdeasRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
