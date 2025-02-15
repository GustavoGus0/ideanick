import css from './index.module.scss'
import Segment from '../../components/Segment'
import { trpc } from '../../lib/trpc'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns/format'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { getEditIdeaRoute } from '../../lib/routes'
import { LinkButton } from '../../components/Button'
import { withPageWrapper } from '../../lib/pageWrapper'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({
      ideaNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  setProps: ({ queryResult, ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    idea: queryResult.data.idea!,
    me: ctx.me,
  }),
})(({ idea, me }) => {
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={css.createdAt}>Created At: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {idea.authorId === me?.id ? 'You' : idea.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      {me?.id === idea.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
})
