import css from '../AllIdeasPage/index.module.scss'
import { getNewIdeaRoute, getViewIdeaRoute } from '../../../lib/routes'
import Segment from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import { LinkButton } from '../../../components/Button'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContextElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared'

export const MyIdeasPage = withPageWrapper({
  title: 'My Ideas',
  authorizedOnly: true,
  useQuery: () => {
    return trpc.getMyIdeas.useInfiniteQuery(
      {
        limit: 4,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )
  },
  setProps: ({ queryResult }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const infiniteQueryResult = queryResult as UseTRPCInfiniteQueryResult<any, any>
    return {
      myIdeas: queryResult.data.pages.flatMap((page) => page.ideas),
      isFetchingNextPage: infiniteQueryResult.isFetchingNextPage,
      hasNextPage: infiniteQueryResult.hasNextPage,
      fetchNextPage: infiniteQueryResult.fetchNextPage,
    }
  },
})(({ myIdeas, isFetchingNextPage, hasNextPage, fetchNextPage }) => {
  return (
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
            loader={<Loader type="section" />}
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
                >
                  Likes: {idea.likesCount}
                </Segment>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Segment>
  )
})
