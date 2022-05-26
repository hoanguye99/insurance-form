import { useAppDispatch } from "app/hooks"
import { clearTimer } from "features/auth/session-timeout-timer-slice"
import { logout } from "features/auth/user-login-slice"
import { resetProductList } from "features/product/product-list-slice"
import { useNavigate } from "react-router-dom"

export const useUserLogout = () => {
  const {userLogout} = useUserLogoutNoNavigate()
  let navigate = useNavigate()
  function handleLogoutButton() {
    userLogout()
    navigate('/')
  }
  return {handleLogoutButton}
}


export const useUserLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  function userLogout() {
    dispatch(logout())
    dispatch(resetProductList())
    dispatch(clearTimer())
  }
  return {userLogout}
}