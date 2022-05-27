import { Footer } from 'components/footer'
import { Button } from 'components/styled'
import { useUserLogout } from 'hooks/useUserLogout'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './side-bar'

export const MainLayout = () => {
  const location = useLocation()

  return (
    <div className="bg-[#f3f4f6] flex flex-row h-screen">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 h-full overflow-y-auto">
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
