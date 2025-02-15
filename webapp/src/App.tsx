import * as routes from './lib/routes'
import AllIdeasPage from './pages/AllIdeasPage'
import Layout from './components/Layout'
import NewIdeaPage from './pages/NewIdeaPage'
import { TrpcProvider } from './lib/trpc'
import ViewIdeaPage from './pages/ViewIdeaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import EditIdeaPage from './pages/EditIdeaPage'
import { AppContextProvider } from './lib/ctx'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
