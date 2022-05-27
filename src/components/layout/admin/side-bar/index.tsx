import { useAdminLogout } from 'hooks/useAdminLogout'
import React from 'react'
import { Link } from 'react-router-dom'
import LinkTab from './link-tab'

type Props = {
  currentPath: string
}

const Sidebar = (props: Props) => {
  const { handleLogoutButton } = useAdminLogout()
  return (
    <div className="bg-white w-[230px] pt-[70px]">
      <div className="h-full flex flex-col">
        <div className="fixed top-0 w-[230px] h-[70px] px-[25px] flex items-center">
          <button className=" w-[120px] h-[40px] bg-left-top bg-no-repeat bg-contain bg-[url('../utils/assets/images/FPT_logo_2010.svg.png')]">
            <p className='font-["Muli-ExtraBold"] text-blue-500 text-xl ml-12'>
              BH
            </p>
          </button>
        </div>
        <nav className="h-full overflow-y-auto pt-6">
          <ul className="h-full flex flex-col">
            <LinkTab
              link="/about"
              icon={
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
              }
              text="Biểu phí"
              selected={props.currentPath === '/about'}
            />
            <LinkTab
              link="/manage"
              icon={
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
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              text="Quản lý"
              selected={props.currentPath === '/manage'}
            />
            <li className="block group mt-auto border-t hover:bg-gray-50">
              <button
                onClick={handleLogoutButton}
                className="inline-block w-full py-3 px-[25px]"
              >
                <div
                  className={`flex items-center text-gray-500 group-hover:text-black text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="ml-2 text-link-tab">Đăng xuất</span>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
