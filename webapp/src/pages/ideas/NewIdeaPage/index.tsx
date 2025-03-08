import { Button } from '../../../components/Button'
import Input from '../../../components/Input'
import FormItems from '../../../components/FormItems'
import Segment from '../../../components/Segment'
import Textarea from '../../../components/Textarea'
import { trpc } from '../../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/ideas/createIdea/input'
import useForm from '../../../lib/form'
import Alert from '../../../components/Alert'
import { withPageWrapper } from '../../../lib/pageWrapper'

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
  title: 'New Idea',
})(() => {
  const createIdea = trpc.createIdea.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Idea created!',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} maxWidth={200} />
          <Input name="nick" label="Nick" formik={formik} maxWidth={200} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
