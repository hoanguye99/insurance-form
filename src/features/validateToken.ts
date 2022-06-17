import { AccessTokenDecoded, UserDetail } from "models/features";
import jwt_decode from 'jwt-decode'
import { refreshToken } from "./auth/user-login-slice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const validateToken = (userDetail : UserDetail, dispatch : ThunkDispatch<unknown, unknown, AnyAction>) => {
    const decoded = jwt_decode<AccessTokenDecoded>(userDetail.accessToken)
    const remainingTime = decoded.exp * 1000 - Date.now()
    if (remainingTime <= 0) {
      dispatch(refreshToken("stale token"))
      throw new Error("Stale Token while calling api")
    }
}