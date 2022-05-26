import { useAppSelector } from 'app/hooks'
import {
  selectUserDetail,
} from 'features/auth/user-login-slice'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout, EmptyLayout } from 'components/layout'
import { Login } from 'components/log-in'
import About from 'components/about'
import Manage from 'components/manage'
import Individual from 'components/submit/individual'
import Group from 'components/submit/group'
import Orders from 'components/orders'
import { AdminLayout } from 'components/layout/admin'
import { useRefreshToken } from 'hooks/useRefreshToken'

function App() {
  const userDetail = useAppSelector(selectUserDetail)

  useRefreshToken();
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
              <Route
                index
                element={
                  <main>
                    <p>404! Nothing is found</p>
                  </main>
                }
              />
              <Route path="individual" element={<Individual />} />
              <Route path="group" element={<Group />} />
            </Route>
            <Route path="orders" element={<MainLayout />}>
              <Route index element={<Orders />} />
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
            <Route path="about" element={<AdminLayout />}>
              <Route index element={<About />} />
            </Route>
            <Route path="manage" element={<AdminLayout />}>
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
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      )
      break
  }

  return <BrowserRouter>{routes}</BrowserRouter>
}

export default App
