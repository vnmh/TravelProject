import { createSelector } from "reselect";
const path = "authUser";

const userDataSelector = (state) => state[path].user;

export const getAuthUser = createSelector(userDataSelector, (user) => user);

export const getAuthentication = createSelector(
   (state) => state[path].isAuthenticated,
   (isAuthenticated) => isAuthenticated
);
