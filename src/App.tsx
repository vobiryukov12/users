import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchUsers } from '@/store/users.slice'
import { Header, UserList, SortingByFilters } from '@/components'
import { ErrorMessage, Loader } from '@/UI'

import './App.scss'

export default function App() {
  const dispatch = useAppDispatch()
  const { users, loading, error } = useAppSelector((state) => state.users)

  useEffect(() => {
    const promise = dispatch(fetchUsers(import.meta.env.VITE_USERS_URL))
    return () => {
      promise.abort()
    }
  }, [dispatch])

  return (
    <div className="app">
      <Header />

      <main className="main container">
        {users?.length > 0 ? (
          <>
            <div className="main__filter">
              <SortingByFilters />
            </div>
            <div className="main__userList">
              <UserList />
            </div>
          </>
        ) : (
          <div className="main__status">
            {loading && <Loader />}
            {error && !loading && <ErrorMessage errorMessage={error} />}
          </div>
        )}
      </main>
    </div>
  )
}
