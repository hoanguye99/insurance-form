import { useAppDispatch } from 'app/hooks'
import { Button, Input } from 'components/styled'
import React from 'react'
import { logIn } from 'utils/slice'

const LogInForm = () => {
  const dispatch = useAppDispatch()
  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(logIn({ username: 'hoang', password: 'hoang123' }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
          Account Mail FPT
        </label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="example@fpt.com.vn"
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <label htmlFor="password" className="text-sm text-gray-600">
            Mật khẩu
          </label>
        </div>

        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Mật khẩu"
        />
      </div>

      <div className="mt-6">
        <Button>
          Đăng nhập
        </Button>
      </div>
    </form>
  )
}

export default LogInForm
