import css from './index.module.scss'
import Segment from '../../components/Segment/Segment'
import { trpc } from '../../lib/trpc'
import { useParams } from 'react-router-dom'
import { ViewIdeaRouteParams } from '../../lib/routes'

export default function ViewIdeaPage() {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
    ideaNick,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data.idea) {
    return <span>Idea not found</span>
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
