// Authentication path
export const LOGIN_PATH = "/login";
export const ACCOUNT_RECOVERY_PATH = "/account-recovery";
export const RECOVERY_OTP_PATH = "/account-recovery/otp/:account";
export const REGISTER_OTP_PATH = "/register/otp/:account";
export const RECOVERY_CHANGE_PASSWORD_PATH = "/account-recovery/change-password";
export const REGISTER_PATH = "/register";
export const REGISTER_COMPLETED_PATH = "/register/completed";
export const SETUP_PROFILE_PATH = "/setup-profile";

// export const HOME_PAGE = "/homepage";
export const HOME_PAGE = "/homepage";
export const APP_DEFAULT_PATH = HOME_PAGE;

/**
 * TOUR PATHS
 */
export const TOUR_LIST = "/tour-list";
export const TOUR_GRID = "/tour-grid";
export const TOUR_DETAIL = "/tour-detail/:id";
// Ex http://localhost:5000/tour-detail/4

export const TOUR_BOOKING = "/tour-booking/:id";

/**
 * PAYMENT PATHS
 */
export const ORDER_DETAIL = "/order-detail";

/**
 * Blog
 */
export const BLOG_GRID = "/blog-grid";
export const BLOG_DETAIL = "/blog-detail/:id";

export const PROFILE = "/profile";

/**
 * Admin
 */

export const ADMIN_DASHBOARD = "/admin-dashboard";
export const ADMIN_BOOKING = "/admin-booking";
export const ADMIN_TOUR_LIST = "/admin-tour-list";
export const ADMIN_REVIEW = "/admin-review";
export const ADMIN_BLOG = "/admin-blog";
export const ADMIN_SERVICE = "/admin-service";
