import { useAppDispatch } from "app/hooks"
import { clearTimer } from "features/auth/session-timeout-timer-slice"
import { logout } from "features/auth/user-login-slice"
import { resetOrderList } from "features/order/order-list-slice"
import { useNavigate } from "react-router-dom"

export const useAdminLogout = () => {
  const {adminLogout} = useAdminLogoutNoNavigate()
  let navigate = useNavigate()
  function handleLogoutButton() {
    adminLogout()
    navigate('/')
  }
  return {handleLogoutButton}
}


export const useAdminLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  function adminLogout() {
    dispatch(logout())
    dispatch(resetOrderList())
    dispatch(clearTimer())
  }
  return {adminLogout}
}