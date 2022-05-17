import loginApi from 'api/login-api'
import { useAppDispatch } from 'app/hooks'
import { Button, Input, Label } from 'components/styled'
import { loginAsync } from 'features/auth/user-login-slice'
import React from 'react'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    // loginApi
    //   .add({ username: 'hoangnd25@fpt.com.vn', password: 'ArianaGrande2' })
    //   .then((res) => {
    //     dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
    //   })
    //   .catch((err) => console.log(err))
    await dispatch(loginAsync({ username: 'hoangnd', password: '123456' }))
    
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <Label htmlFor="email">Account Mail FPT</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="example@fpt.com.vn"
        />
      </div>

      <div className="mt-6">
        <Label htmlFor="password">Mật khẩu</Label>

        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Mật khẩu"
        />
      </div>

      <div className="mt-6">
        <Button className="w-full">Đăng nhập</Button>
      </div>
    </form>
  )
}

export default LoginForm
