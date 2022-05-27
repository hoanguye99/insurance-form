import { Footer } from 'components/footer'
import { useUserLogout } from 'hooks/useUserLogout'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../common/header'
import Sidebar from '../common/side-bar'

export const MainLayout = () => {
  const location = useLocation()
  const { handleLogoutButton } = useUserLogout()
  const data = [
    {
      link: '/about',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      text: 'Biểu phí',
    },
    {
      link: '/submit/individual',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      text: 'Đăng kí cá nhân',
    },
    {
      link: '/submit/group',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      text: 'Đăng kí nhóm',
    },
    {
      link: '/orders',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
      text: 'Đơn hàng của tôi',
    },
  ]

  return (
    <div className="bg-[#f3f4f6] flex flex-row h-screen">
      <Sidebar
        handleLogoutButton={handleLogoutButton}
        currentPath={location.pathname}
        data={data}
      />
      <div
        id="body-overflow"
        className="flex-1 lg:h-full lg:mt-0 h-body mt-[70px] overflow-y-auto"
      >
        <div className="min-h-screen">
          <Header handleLogoutButton={handleLogoutButton} data={data} />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
