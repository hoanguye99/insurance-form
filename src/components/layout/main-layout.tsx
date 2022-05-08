import { useAppDispatch } from 'app/hooks'
import { Button } from 'components/styled'
import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import logo from 'utils/assets/images/FPT_logo_2010.svg.png'
import { logOut } from 'utils/slice'

export const MainLayout = () => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate();
  function handleLogoutButton() {
    dispatch(logOut())
    navigate('/')
  }
  return (
    <div className="bg-gray-500">
      <nav className="container mx-auto py-4 flex items-center justify-between ">
        <Link className="flex items-center gap-1" to="/about">
          <img src={logo} alt="" className="w-12" />
          <p className='font-["Muli-ExtraBold"] text-white text-xl'>BH</p>
        </Link>
        <Button onClick={handleLogoutButton} className='w-fit'>Đăng xuất</Button>
      </nav>
      <Outlet />
    </div>
  )
}
