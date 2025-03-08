import css from '../AllIdeasPage/index.module.scss'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'
import Segment from '../../../components/Segment'
import InfiniteScroll from 'react-infinite-scroller'
import { Loader } from '../../../components/Loader'
import { layoutContextElRef } from '../../../components/Layout'
import { Link } from 'react-router-dom'
import { getViewIdeaRoute } from '../../../lib/routes'
import { UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared'

export const LikedIdeasPage = withPageWrapper({
  title: 'Liked Ideas',
  authorizedOnly: true,
  useQuery: () => {
    return trpc.getLikedIdeas.useInfiniteQuery(
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
      likedIdeas: queryResult.data.pages.flatMap((page) => page.likedIdeas),
      isFetchingNextPage: infiniteQueryResult.isFetchingNextPage,
      hasNextPage: infiniteQueryResult.hasNextPage,
      fetchNextPage: infiniteQueryResult.fetchNextPage,
    }
  },
})(({ likedIdeas, isFetchingNextPage, hasNextPage, fetchNextPage }) => {
  return (
    <Segment title={likedIdeas.length === 0 ? 'Hmm..' : 'Liked Ideas'}>
      <div className={css.ideas}>
        {likedIdeas.length === 0 ? (
          <div className={css.noIdeasMessage}>
            <p>It seems you have no liked ideas</p>
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
            {likedIdeas.map((idea) => (
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
