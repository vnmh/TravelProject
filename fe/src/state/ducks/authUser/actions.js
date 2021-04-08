import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const login = (data) => apiAction("post")(types.LOGIN, "/login", data, false);


export const register = (data) => apiAction("post")(types.COMMON, "/api/v1/sys/account/register", data, false);
export const activeAccount = (activationKey, otp) =>
   apiAction("get")(types.COMMON, `/api/v1/sys/account/activate?activationKey=${activationKey}&otp=${otp}`, {}, false);
export const resetPasswordInit = (data) =>
   apiAction("post")(types.COMMON, `/api/v1/sys/account/reset-password/init`, data, false);
export const validateResetPasswordOTP = (data) =>
   apiAction("post")(types.VERIFY_OTP, `/api/v1/sys/account/reset-password/validate-otp`, data, false);
export const resetPasswordFinish = (data) =>
   apiAction("post")(types.COMMON, `/api/v1/sys/account/reset-password/finish`, data, false);
export const getProfile = () =>
   apiAction("get")(types.GET_USER, "/services/sys/api/v1/sys-accounts/profile", null, true);

/**
 * create profile
 */

export const createProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/sys-accounts/profile", body, true);

export const logout = () => defaultAction(types.LOGOUT);