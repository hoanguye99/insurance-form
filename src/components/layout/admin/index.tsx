import { useAppDispatch } from 'app/hooks'
import { Button } from 'components/styled'
import { logout } from 'features/auth/user-login-slice'
import { resetProductList } from 'features/product/product-list-slice'
import React from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import logo from 'utils/assets/images/FPT_logo_2010.svg.png'
import Sidebar from './side-bar'

export const AdminLayout = () => {
  const location = useLocation()

  let heading = {
    '/about': 'Bảng giá',
    '/manage': 'Quản lý'
  }

  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  function handleLogoutButton() {
    dispatch(logout())
    navigate('/')
  }

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
