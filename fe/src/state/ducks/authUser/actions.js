import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";
import { parseObjToQuery } from "~/views/utilities/helpers";

export const login = (data) => apiAction("post")(types.LOGIN, "/login", data, false);

// export const register = (data) => apiAction("post")(types.COMMON, "/api/v1/sys/account/register", data, false);
export const register = (data) => apiAction("post")(types.COMMON, "/register", data, false);

export const activeAccount = (activationKey, otp) =>
   apiAction("get")(types.COMMON, `/api/v1/sys/account/activate?activationKey=${activationKey}&otp=${otp}`, {}, false);
export const resetPasswordInit = (data) =>
   apiAction("post")(types.COMMON, `/api/v1/sys/account/reset-password/init`, data, false);
export const validateResetPasswordOTP = (data) =>
   apiAction("post")(types.VERIFY_OTP, `/api/v1/sys/account/reset-password/validate-otp`, data, false);
export const resetPasswordFinish = (data) =>
   apiAction("post")(types.COMMON, `/api/v1/sys/account/reset-password/finish`, data, false);
export const getProfile = (idAccount) =>
   apiAction("get")(types.GET_USER, "/account" + parseObjToQuery({ idAccount }), null, true);
export const updateProfile = (body) =>
   apiAction("put")(types.GET_USER, "/account" , body, true);

/**
 * create profile
 */

export const createProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/sys-accounts/profile", body, true);

export const logout = () => defaultAction(types.LOGOUT);
