import React from 'react'
import { Link } from 'react-router-dom'
import LinkTab from './link-tab'

type Props = {
  currentPath: string
}

const Sidebar = (props: Props) => {
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
          <ul>
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
              link="/submit/individual"
              icon={
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
              }
              text="Đăng kí cá nhân"
              selected={props.currentPath === '/submit/individual'}
            />
            <LinkTab
              link="/submit/group"
              icon={
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
              }
              text="Đăng kí nhóm"
              selected={props.currentPath === '/submit/group'}
            />
            <LinkTab
              link="/orders"
              icon={
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
              }
              text="Lịch sử đăng kí"
              selected={props.currentPath === '/orders'}
            />
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
