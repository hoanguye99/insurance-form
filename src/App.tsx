import { useAppSelector } from 'app/hooks'
import {
  selectLoggedIn,
  selectUserDetail,
} from 'features/auth/user-login-slice'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout, EmptyLayout } from 'components/layout'
import { Login } from 'components/log-in'
import Submit from 'components/submit'
import About from 'components/about'
import Manage from 'components/manage'

function App() {
  const userDetail = useAppSelector(selectUserDetail)

  let routes
  switch (userDetail.role) {
    case 'USER':
      routes = (
        <Routes>
          <Route path="/" element={<EmptyLayout />}>
            <Route path="about" element={<MainLayout />}>
              <Route index element={<About />} />
            </Route>
            <Route path="submit" element={<MainLayout />}>
              <Route index element={<Submit />} />
            </Route>
            <Route index element={<Login />} />
            <Route
              path="*"
              element={
                <main>
                  <p>404! Nothing is found</p>
                </main>
              }
            />
          </Route>
        </Routes>
      )
      break
    case 'ADMIN':
      routes = (
        <Routes>
          <Route path="/" element={<EmptyLayout />}>
            <Route path="admin" element={<MainLayout />}>
              <Route index element={<Manage />} />
            </Route>
            <Route index element={<Login />} />
            <Route
              path="*"
              element={
                <main>
                  <p>404! Nothing is found</p>
                </main>
              }
            />
          </Route>
        </Routes>
      )
      break
    case 'ANONYMOUS':
      routes = (
        <Routes>
          <Route path="/" element={<EmptyLayout />}>
            <Route index element={<Login />} />
            <Route
              path="*"
              element={
                <Navigate to="/" replace={true} />
              }
            />
          </Route>
        </Routes>
      )
      break
  }

  return <BrowserRouter>{routes}</BrowserRouter>
}

export default App
