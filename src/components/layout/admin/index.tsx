import { Button } from 'components/styled'
import { useAdminLogout } from 'hooks/useAdminLogout'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './side-bar'

export const AdminLayout = () => {
  const location = useLocation()
  
  return (
    <div className="bg-[#f3f4f6] flex flex-row h-screen">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
