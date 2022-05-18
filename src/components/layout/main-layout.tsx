import { useAppDispatch } from 'app/hooks'
import { Button } from 'components/styled'
import { logout } from 'features/auth/user-login-slice'
import { resetProductList } from 'features/product/product-list-slice'
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import logo from 'utils/assets/images/FPT_logo_2010.svg.png'

export const MainLayout = () => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  function handleLogoutButton() {
    dispatch(logout())
    dispatch(resetProductList())
    navigate('/')
  }
  function handleAboutButton() {
    navigate('/about')
  }
  return (
    <div className="bg-[#f3f4f6] flex flex-col min-h-screen">
      <nav className="container mx-auto py-5 flex items-center justify-between border-b">
        <Link className="flex items-center gap-1" to="/submit">
          <img src={logo} alt="" className="w-12" />
          <p className='font-["Muli-ExtraBold"] text-blue-500 text-xl'>BH</p>
        </Link>
        <div className='flex gap-3'>
          <Button onClick={handleAboutButton} className="w-fit">
            Biểu phí
          </Button>
          <Button onClick={handleLogoutButton} className="w-fit !bg-[#f3f4f6] hover:!text-white hover:!bg-blue-500 border border-blue-500 !text-blue-500">
            Đăng xuất
          </Button>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
