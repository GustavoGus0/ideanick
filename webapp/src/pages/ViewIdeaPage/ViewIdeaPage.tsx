import css from './index.module.scss'
import Segment from '../../components/Segment/Segment'
import { trpc } from '../../lib/trpc'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns/format'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { getEditIdeaRoute } from '../../lib/routes'
import { LinkButton } from '../../components/Button/Button'

export default function ViewIdeaPage() {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isFetching || getMeResult.isLoading) {
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
}
