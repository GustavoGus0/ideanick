import css from './index.module.scss'
import {
  getAllIdeasRoute,
  getEditProfileRoute,
  getMyIdeasRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../lib/routes'
import { Link, Outlet } from 'react-router-dom'
import { useMe } from '../../lib/ctx'
import { createRef } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const layoutContextElRef = createRef<HTMLDivElement>()

export default function Layout() {
  const me = useMe()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>IdeaNick</div>
        <p className={css.loggedAs} style={!me ? { display: 'none' } : {}}>
          Logged as <span style={{ fontWeight: 'bold' }}>{me?.nick}</span>
        </p>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getMyIdeasRoute()}>
                  My Ideas
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getNewIdeaRoute()}>
                  Create Idea
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContextElRef}>
        <Outlet />
      </div>
    </div>
  )
}
