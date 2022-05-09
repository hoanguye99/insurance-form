import { useAppSelector } from 'app/hooks'
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from 'utils/assets/images/FPT_logo_2010.svg.png'
import { selectLoggedIn } from 'utils/slice'
import LogInForm from './log-in-form'

export const Login = () => {
  const loggedIn = useAppSelector(selectLoggedIn);
  let navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('submit')
    }
  }, [loggedIn, navigate])
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')]">
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Bảo hiểm xe cộ FPT
              </h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Là nền tảng bảo hiểm dành riêng cho nhân viên FPT, cho phép kết
                nối với các công ty bảo hiểm hàng đầu tại Việt Nam để mang lại
                sản phẩm bảo hiểm tốt nhất cho cá nhân, gia đình và doanh nghiệp
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="h-1/6"></div>
            <div className="text-center">
              <img src={logo} alt="" className="w-32 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-center text-gray-700">
                Bảo hiểm xe cộ FPT
              </h2>

              <p className="mt-3 text-gray-500">Đăng nhập vào tài khoản</p>
            </div>

            <div className="mt-8">
              <LogInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
