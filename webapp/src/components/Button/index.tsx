import cn from 'classnames'
import css from './index.module.scss'
import { Link } from 'react-router-dom'
import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { trpc } from '../../lib/trpc'
import { Icon } from '../Icon'

type ButtonColor = 'red' | 'green'
export type ButtonProps = { children: React.ReactNode; loading?: boolean; color?: ButtonColor }
export function Button({ children, loading = true, color = 'green' }: ButtonProps) {
  return (
    <button
      className={cn({
        [css.button]: true,
        [css.disabled]: loading,
        [css.loading]: loading,
        [css[`color-${color}`]]: true,
      })}
      type="submit"
      disabled={loading}
    >
      <span className={css.text}>{children}</span>
    </button>
  )
}

export function LinkButton({
  children,
  to,
  color = 'green',
}: {
  children: React.ReactNode
  to: string
  color?: ButtonColor
}) {
  return (
    <Link className={cn({ [css.button]: true, [css[`color-${color}`]]: true })} to={to}>
      {children}
    </Link>
  )
}

export const LikeButton = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const trpcUtils = trpc.useUtils()
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick })
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick })
    },
  })

  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe })
      }}
    >
      <Icon size={32} className={css.likeIcon} name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}
