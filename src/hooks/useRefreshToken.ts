import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  refreshToken,
  selectUserDetail,
} from 'features/auth/user-login-slice'
import { useCallback, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { AccessTokenDecoded } from 'models/features'
import loginApi from 'api/login-api'
import { useUserLogoutNoNavigate } from 'hooks/useUserLogout'
import { useAdminLogoutNoNavigate } from 'hooks/useAdminLogout'
import { clearTimer, setTimer } from 'features/auth/session-timeout-timer-slice'

export const useRefreshToken = () => {
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()
  const { userLogout } = useUserLogoutNoNavigate()
  const { adminLogout } = useAdminLogoutNoNavigate()

  const onSessionTimeout = useCallback(async () => {
    try {
      const newAccessToken = await loginApi.refreshToken(userDetail)
      dispatch(refreshToken(newAccessToken.accessToken))
    } catch {
      if (userDetail.role === 'USER') {
        userLogout()
      } else if (userDetail.role === 'ADMIN') {
        adminLogout()
      }
    }
  }, [userDetail])

  useEffect(() => {
    if (userDetail.accessToken !== '') {
      var decoded = jwt_decode<AccessTokenDecoded>(userDetail.accessToken)
      const remainingTime = decoded.exp * 1000 - Date.now() - 3000
      // const remainingTime = 5000
      console.log(remainingTime)
      dispatch(clearTimer())
      const sessionTimeoutTimer = setTimeout(onSessionTimeout, remainingTime)
      dispatch(setTimer(sessionTimeoutTimer))
    }
  }, [userDetail, onSessionTimeout])
}