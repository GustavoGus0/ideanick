import css from '../AllIdeasPage/index.module.scss'
import { getNewIdeaRoute, getViewIdeaRoute } from '../../../lib/routes'
import Segment from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import { LinkButton } from '../../../components/Button'
import ErrorPageComponent from '../../../components/ErrorPageComponent'
import { Link } from 'react-router-dom'
import Alert from '../../../components/Alert'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContextElRef } from '../../../components/Layout'
import { useMe } from '../../../lib/ctx'
import { Loader } from '../../../components/Loader'

export default function MyIdeasPage() {
  const me = useMe()
  if (!me) {
    return (
      <>
        <ErrorPageComponent
          title={'Please, authorize'}
          message={'You must be authorized to create and keep your own ideas'}
        />
      </>
    )
  }
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getMyIdeas.useInfiniteQuery(
      {
        limit: 4,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  const myIdeas = data?.pages.flatMap((page) => page.ideas)

  return isLoading || isRefetching ? (
    <Segment title="My Ideas">
      <Loader type="page" />
    </Segment>
  ) : isError ? (
    <Alert color="red">{error.message}</Alert>
  ) : !myIdeas ? (
    <Alert color="red">Sorry, bad connection...</Alert>
  ) : (
    <Segment title={myIdeas.length === 0 ? 'Hmm..' : 'My Ideas'}>
      <div className={css.ideas}>
        {myIdeas.length === 0 ? (
          <div className={css.noIdeasMessage}>
            <p>It seems you have no ideas yet...</p>
            <LinkButton to={getNewIdeaRoute()}>Create an idea</LinkButton>
          </div>
        ) : (
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={<Loader type="page" />}
            getScrollParent={() => layoutContextElRef.current}
            useWindow={(layoutContextElRef.current && getComputedStyle(layoutContextElRef.current).overflow) !== 'auto'}
          >
            {myIdeas.map((idea) => (
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
          </InfiniteScroll>
        )}
      </div>
    </Segment>
  )
}
