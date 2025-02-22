import css from './index.module.scss'
import Segment from '../../../components/Segment'
import { trpc } from '../../../lib/trpc'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns/format'
import { type ViewIdeaRouteParams } from '../../../lib/routes'
import { getEditIdeaRoute } from '../../../lib/routes'
import { LikeButton, LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'

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
        Likes: {idea.likesCount}
        {me && idea.authorId !== me.id && (
          <>
            <br />
            <LikeButton idea={idea} />
          </>
        )}
      </div>
      {me?.id === idea.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
})
