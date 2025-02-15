import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import { Button } from '../../components/Button'
import FormItems from '../../components/FormItems'
import Input from '../../components/Input'
import Segment from '../../components/Segment'
import Textarea from '../../components/Textarea'
import { EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes'
import useForm from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { trpc } from '../../lib/trpc'

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  checkAccess: ({ queryResult, ctx }) => !!ctx.me && ctx.me.id === queryResult.data.idea?.authorId,
  checkAccessMessage: 'An idea can only be edited by its author',
  setProps: ({ queryResult }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { idea: queryResult.data.idea! }
  },
})(({ idea }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
      navigate(getViewIdeaRoute({ ideaNick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Edit Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
