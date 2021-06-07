import React from "react";
import * as PATH from "~/configs/routesConfig";
import DashBoard from "~/views/container/Admin/DashBoardAdmin";
import BookingAdminPage from "~/views/container/Admin/BookingAdmin";
import TourAdminPage from "~/views/container/Admin/TourAdmin";
import ReviewAdminPage from "~/views/container/Admin/ReviewAdmin";
import ProfilePage from "~/views/container/Profile";
import BlogAdminPage from "~/views/container/Admin/BlogAdmin";
import ServiceAdminPage from "~/views/container/Admin/ServiceAdmin";

export default [
   // Cần auth mới vào được thì khai báo ở đây
   { path: PATH.ADMIN_DASHBOARD, component: () => <DashBoard />, exact: true },
   { path: PATH.ADMIN_BOOKING, component: () => <BookingAdminPage />, exact: true },
   { path: PATH.ADMIN_TOUR_LIST, component: () => <TourAdminPage />, exact: true },
   { path: PATH.ADMIN_REVIEW, component: () => <ReviewAdminPage />, exact: true },
   { path: PATH.PROFILE, component: () => <ProfilePage />, exact: true },
   { path: PATH.ADMIN_BLOG, component: () => <BlogAdminPage />, exact: true },
   { path: PATH.ADMIN_SERVICE, component: () => <ServiceAdminPage />, exact: true }
];
