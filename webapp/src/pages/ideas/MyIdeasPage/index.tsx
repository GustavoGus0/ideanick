import css from '../AllIdeasPage/index.module.scss'
import { getNewIdeaRoute, getViewIdeaRoute } from '../../../lib/routes'
import { Link } from 'react-router-dom'
import Segment from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import ErrorPageComponent from '../../../components/ErrorPageComponent'
import { LinkButton } from '../../../components/Button'

export default function MyIdeasPage() {
  const { data, isLoading, isFetching, isError, error } = trpc.getMyIdeas.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <ErrorPageComponent title="Please, authorize" message={error.message} />
  }

  return (
    <Segment title={data.myIdeas.length === 0 ? 'Hmm..' : 'My Ideas'}>
      <div className={css.ideas}>
        {data.myIdeas.length === 0 ? (
          <div className={css.noIdeasMessage}>
            <p>You have no ideas yet...</p>
            <LinkButton to={getNewIdeaRoute()}>Create idea</LinkButton>
          </div>
        ) : (
          data.myIdeas.map((idea) => (
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
          ))
        )}
      </div>
    </Segment>
  )
}
