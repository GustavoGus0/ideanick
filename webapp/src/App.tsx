import * as routes from './lib/routes'
import AllIdeasPage from './pages/AllIdeasPage/AllIdeasPage'
import Layout from './components/Layout/Layout'
import NewIdeaPage from './pages/NewIdeaPage/NewIdeaPage'
import { TrpcProvider } from './lib/trpc'
import ViewIdeaPage from './pages/ViewIdeaPage/ViewIdeaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import SignInPage from './pages/SignInPage/SignInPage'
import { SignOutPage } from './pages/SignOutPage/SignOutPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
