import * as routes from './lib/routes'
import { AllIdeasPage } from './pages/ideas/AllIdeasPage'
import Layout from './components/Layout'
import { NewIdeaPage } from './pages/ideas/NewIdeaPage'
import { TrpcProvider } from './lib/trpc'
import { ViewIdeaPage } from './pages/ideas/ViewIdeaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import { SignUpPage } from './pages/auth/SignUpPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { EditIdeaPage } from './pages/ideas/EditIdeaPage'
import { AppContextProvider } from './lib/ctx'
import { HelmetProvider } from 'react-helmet-async'
import NotFoundPage from './pages/other/NotFoundPage'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { MyIdeasPage } from './pages/ideas/MyIdeasPage'
import { LikedIdeasPage } from './pages/ideas/LikedIdeasPage'

export const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
                <Route path={routes.getSignInRoute()} element={<SignInPage />} />
                <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
                <Route path={routes.getMyIdeasRoute()} element={<MyIdeasPage />} />
                <Route path={routes.getLikedIdeasRoute()} element={<LikedIdeasPage />} />
                <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
                <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
                <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
                <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}
