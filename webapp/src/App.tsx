import AllIdeasPage from './pages/AllIdeasPage/AllIdeasPage'
import ViewIdeaPage from './pages/ViewIdeaPage/ViewIdeaPage'
import { TrpcProvider } from './lib/trpc'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllIdeasRoute, getViewIdeaRoute, viewIdeaRouteParams } from './lib/routes'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route path={getViewIdeaRoute(viewIdeaRouteParams)} element={<ViewIdeaPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
