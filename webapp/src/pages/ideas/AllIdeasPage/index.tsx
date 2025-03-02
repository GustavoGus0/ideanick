import css from './index.module.scss'
import { getViewIdeaRoute } from '../../../lib/routes'
import { Link } from 'react-router-dom'
import Segment from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContextElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { zGetIdeasTrpcInput } from '@ideanick/backend/src/router/ideas/getIdeas/input'
import useForm from '../../../lib/form'
import Input from '../../../components/Input'
import Alert from '../../../components/Alert'
import { useDebounceValue } from 'usehooks-ts'

export default function AllIdeasPage() {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })
  const [search] = useDebounceValue(formik.values.search, 350)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title={'All Ideas'}>
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
      ) : (
        <div className={css.ideas}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContextElRef.current}
            useWindow={(layoutContextElRef.current && getComputedStyle(layoutContextElRef.current).overflow) !== 'auto'}
          >
            {data.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
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
        </div>
      )}
    </Segment>
  )
}
