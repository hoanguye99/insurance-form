import { Button } from 'components/styled'
import { useUserLogout } from 'hooks/useUserLogout'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './side-bar'

export const MainLayout = () => {
  const location = useLocation()

  let heading = {
    '/submit/individual': 'Đăng kí cá nhân',
    '/submit/group': 'Đăng kí nhóm',
    '/about': 'Bảng giá',
    '/orders': 'Lịch sử',
  }

  const {handleLogoutButton} = useUserLogout()

  return (
    <div className="bg-[#f3f4f6] flex flex-row h-screen">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 h-full overflow-y-auto">
        <div className="container mx-auto w-full flex justify-between items-center h-[70px] mb-6">
          <p className="sm:text-2xl font-['Muli-ExtraBold'] text-gray-900">{heading[location.pathname as keyof typeof heading]}</p>
          <Button
            onClick={handleLogoutButton}
            className="w-fit !bg-[#f3f4f6] hover:!text-white hover:!bg-blue-500 border border-blue-500 !text-blue-500"
          >
            Đăng xuất
          </Button>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
