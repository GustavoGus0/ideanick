import { getAllIdeasRoute } from '../../lib/routes'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <p>
        <b>IdeaNick</b>
      </p>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
