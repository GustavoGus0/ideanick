import AllIdeasPage from './pages/AllIdeasPage/AllIdeasPage'
import Layout from './components/Layout/Layout'
import { TrpcProvider } from './lib/trpc'
import ViewIdeaPage from './pages/ViewIdeaPage/ViewIdeaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllIdeasRoute, getViewIdeaRoute, viewIdeaRouteParams } from './lib/routes'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
