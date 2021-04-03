import * as types from "./types";
import apiAction, { defaultAction } from "../utils/createAction";

export const register = (data) => apiAction("post")(types.COMMON, "/api/v1/sys/account/register", data, false);
export const activeAccount = (activationKey, otp) =>
   apiAction("get")(types.COMMON, `/api/v1/sys/account/activate?activationKey=${activationKey}&otp=${otp}`, {}, false);
export const resetPasswordInit = (data) =>
   apiAction("post")(types.COMMON, `/api/v1/sys/account/reset-password/init`, data, false);
export const validateResetPasswordOTP = (data) =>
   apiAction("post")(types.VERIFY_OTP, `/api/v1/sys/account/reset-password/validate-otp`, data, false);
export const resetPasswordFinish = (data) =>
   apiAction("post")(types.COMMON, `/api/v1/sys/account/reset-password/finish`, data, false);
export const login = (data) => apiAction("post")(types.LOGIN, "/api/v1/sys/account/authenticate", data, false);
export const getProfile = () =>
   apiAction("get")(types.GET_USER, "/services/sys/api/v1/sys-accounts/profile", null, true);

/**
 * create profile
 */

export const createProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/sys-accounts/profile", body, true);
/**
 * create farm profile
 */
export const createFarmProfile = (body) => apiAction("post")(types.COMMON, "/services/sys/api/v1/farms", body, true);
/**
 * create enterprise profile
 */
export const createEnterpriseProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/enterprises", body, true);
export const updateEnterpriseProfile = (body) =>
   apiAction("put")(types.COMMON, "/services/sys/api/v1/enterprises", body, true);

/**
 * update farm profile
 */
export const updateFarmProfile = (body) => apiAction("put")(types.COMMON, "/services/sys/api/v1/farms", body, true);
/**
 * update profile
 */
export const updateProfile = (body) => apiAction("put")(types.COMMON, "/services/sys/api/v1/sys-accounts", body, true);

/**
 * cooperation profile
 */
export const createCooperativeProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/cooperation", body, true);
export const updateCooperativeProfile = (body) =>
   apiAction("put")(types.COMMON, "/services/sys/api/v1/cooperation", body, true);

/**
 * cooperation venture profile
 */
export const createCooperativeVentureProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/cooperation-venture", body, true);
export const updateCooperativeVentureProfile = (body) =>
   apiAction("put")(types.COMMON, "/services/sys/api/v1/cooperation-venture", body, true);
/**
 *getDetailProcess

 */
export const getDetailProcess = (idType) =>
   apiAction("get")(types.COMMON, "/services/sys/api/v1/cultivation-processes/" + idType, {}, true);
export const deleteProcess = (idType) =>
   apiAction("delete")(types.COMMON, "/services/sys/api/v1/cultivation-processes/" + idType, {}, true);

/**
 * organization profile
 */
export const createOrganizationProfile = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/organizations", body, true);
export const updateOrganizationProfile = (body) =>
   apiAction("put")(types.COMMON, "/services/sys/api/v1/organizations", body, true);

/**
 * skip setup profile
 */
export const skipFirstSetUpProfile = () =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/sys-accounts/skip-profile", {}, true);

export const logout = () => defaultAction(types.LOGOUT);

/**
 * FARM
 */
/**
 * organization profile
 */
export const createFarmSeasonCRUD = (body) =>
   apiAction("post")(types.COMMON, "/services/sys/api/v1/farming-seasons", body, true);
export const updateFarmSeasonCRUD = (body) =>
   apiAction("put")(types.COMMON, "/services/sys/api/v1/farming-seasons", body, true);
