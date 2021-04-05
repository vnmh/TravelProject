import cookie from "js-cookie";
import { JWT } from "~/configs/index";
export const setCookie = (key, value, expireDay = 1) => {
   if (process.browser) {
      cookie.set(key, value, {
         expires: expireDay,
         path: "/"
      });
   }
};

export const removeCookie = (key) => {
   if (process.browser) {
      cookie.remove(key, {
         expires: 1
      });
   }
};

export const removeAuthoz = () => {
   removeCookie(JWT);
};

export const addAuthoz = (token, user) => {
   setCookie(JWT, token);
};

export const getAuthoz = () => {
   return cookie.get(JWT) || "";
};

export const getCookie = (key, req) => {
   return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
   return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
   if (!req.headers.cookie) {
      return undefined;
   }
   const rawCookie = req.headers.cookie.split(";").find((c) => c.trim().startsWith(`${key}=`));
   if (!rawCookie) {
      return undefined;
   }
   return rawCookie.split("=")[1];
};
