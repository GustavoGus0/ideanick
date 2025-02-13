import type { TrpcRouterOutput } from '@ideanick/backend/src/router'
import { createContext, useContext } from 'react'
import { trpc } from './trpc'

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me']
}

const AppReactContext = createContext<AppContext>({
  me: null,
})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery()
  return (
    <AppReactContext.Provider value={{ me: data?.me || null }}>
      {isLoading || isFetching ? <p>Loading...</p> : isError ? <p>Error: {error.message}</p> : children}
    </AppReactContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppReactContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMe = () => {
  const { me } = useAppContext()
  return me
}
