import css from './index.module.scss'
import Segment from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns/format'
import { type ViewIdeaRouteParams } from '../../../lib/routes'
import { getEditIdeaRoute } from '../../../lib/routes'
import { Button, LikeButton, LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { canBlockIdeas, canEditIdea } from '@ideanick/backend/src/utils/can'
import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import useForm from '../../../lib/form'
import FormItems from '../../../components/FormItems'
import Alert from '../../../components/Alert'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
  title: ({ idea }) => idea.name,
})(({ idea, me }) => {
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={css.createdAt}>Created At: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>
        Author: {idea.authorId === me?.id ? 'You' : idea.author.nick}
        {idea.author.name ? ' ' + `(${idea.author.name})` : ' '}
      </div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      <div className={css.likes}>
        {me && idea.authorId !== me.id && (
          <>
            <br />
            <LikeButton idea={idea} />
          </>
        )}
        Likes: {idea.likesCount}
      </div>
      {canEditIdea(me, idea) && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
      {canBlockIdeas(me) && (
        <div className={css.blockIdea}>
          <BlockIdea idea={idea} />
        </div>
      )}
    </Segment>
  )
})

const BlockIdea = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const blockIdea = trpc.blockIdea.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id })
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  )
}
