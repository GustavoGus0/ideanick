import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import pick from 'lodash/pick'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'
import { Button } from '../../components/Button/Button'
import FormItems from '../../components/FormItems/FormItems'
import Input from '../../components/Input/Input'
import Segment from '../../components/Segment/Segment'
import Textarea from '../../components/Textarea/Textarea'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

function EditIdeaComponent({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateIdea = trpc.updateIdea.useMutation()
  const formik = useFormik({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
        navigate(getViewIdeaRoute({ ideaNick: values.nick }))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Button loading={formik.isSubmitting}>Edit Idea</Button>
          </div>
        </FormItems>
      </form>
    </Segment>
  )
}

export default function EditIdeaPage() {
  const { ideaNick } = useParams() as EditIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can be editted by its author only</span>
  }

  return <EditIdeaComponent idea={idea} />
}
