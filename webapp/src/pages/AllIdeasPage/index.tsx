import css from './index.module.scss'
import { getViewIdeaRoute } from '../../lib/routes'
import { Link } from 'react-router-dom'
import Segment from '../../components/Segment'
import { trpc } from '../../lib/trpc'
import { useEffect, useState } from 'react'
import { useMe } from '../../lib/ctx'
import { type TrpcRouterOutput } from '@ideanick/backend/src/router'
import Cookies from 'js-cookie'

export default function AllIdeasPage() {
  const me = useMe()
  const [onlyMyIdeas, setOnlyMyIdeas] = useState<boolean>(Cookies.get('onlyMyIdeas') === 'true' ? true : false)
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  type Idea = TrpcRouterOutput['getIdeas']['ideas'][number]

  useEffect(() => {
    if (me) {
      Cookies.set('onlyMyIdeas', onlyMyIdeas.toString(), { expires: 7 })
    } else {
      Cookies.remove('onlyMyIdeas')
    }
  }, [me])

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const ideasToReturn = ({ ideas }: { ideas: Idea[] }) => {
    return onlyMyIdeas ? ideas.filter((idea) => idea.authorId === me?.id) : ideas
  }

  return (
    <Segment title={onlyMyIdeas ? 'My Ideas' : 'All Ideas'}>
      <div className={css.ideas}>
        <div style={me ? { display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 } : { display: 'none' }}>
          <input
            type="checkbox"
            name="show-only-my-ideas"
            checked={onlyMyIdeas}
            onChange={(e) => {
              Cookies.set('onlyMyIdeas', e.target.checked.toString(), { expires: 7 })
              return setOnlyMyIdeas(e.target.checked)
            }}
          />
          <label htmlFor="show-only-my-ideas">Only my ideas</label>
        </div>
        {ideasToReturn(data).map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
