import React from "react";
// import pages
import { AdminAccountManage } from "../pages/private/admin/AdminAccountManage";
import { AdminBlogDetail } from "../pages/private/admin/AdminBlogDetail";
import { AdminBlogManage } from "../pages/private/admin/AdminBlogManage";
import { AdminOrderDetail } from "../pages/private/admin/AdminOrderDetail";
import { AdminOrderManage } from "../pages/private/admin/AdminOrderManage";
import { AdminProductManage } from "../pages/private/admin/AdminProductManage";
import { Summary } from "../pages/private/admin/AdminSummary";
import { UserSetting } from "../pages/private/both/UserSetting";
import { BlogDetail } from "../pages/private/member/BlogDetail";
import { BlogManage } from "../pages/private/member/BlogManage";
import { HomeMember } from "../pages/private/member/HomeMember";
import { KoiManage } from "../pages/private/member/KoiManage";
import { MyOrderDetail } from "../pages/private/member/MyOrderDetail";
import { OrderManage } from "../pages/private/member/OrderManage";
import { PondDetail } from "../pages/private/member/PondDetail";
import { PondInfo } from "../pages/private/member/PondInfo";
import { PondManage } from "../pages/private/member/PondManage";
import { PondWater } from "../pages/private/member/PondWater";
import AuthWrapper from "./AuthWrapper";
export const privateRoutes = [
  {
    path: "/dashboard/home",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <HomeMember />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/mypond",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <PondManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/mypond/detail",
        element: (
          <AuthWrapper allowedRoles={["USER"]}>
            <PondDetail />
          </AuthWrapper>
        ),
        children: [
          {
            path: "/dashboard/mypond/detail/info/:pondId",
            element: (
              <AuthWrapper allowedRoles={["USER"]}>
                <PondInfo />
              </AuthWrapper>
            ),
          },
          {
            path: "/dashboard/mypond/detail/water/:pondId",
            element: (
              <AuthWrapper allowedRoles={["USER"]}>
                <PondWater />
              </AuthWrapper>
            ),
          },
          {
            path: "/dashboard/mypond/detail/kois/:pondId",
            element: (
              <AuthWrapper allowedRoles={["USER"]}>
                <KoiManage />
              </AuthWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/myorder",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <OrderManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/myorder/detail",
        element: (
          <AuthWrapper allowedRoles={["USER"]}>
            <MyOrderDetail />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/dashboard/myblog",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <BlogManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/myblog/review/:blogId",
        element: (
          <AuthWrapper allowedRoles={["USER"]}>
            <BlogDetail />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/dashboard/setting",
    element: (
      <AuthWrapper allowedRoles={["USER", "ADMIN"]}>
        <UserSetting />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/admin/order",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <AdminOrderManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/admin/order/detail",
        element: (
          <AuthWrapper allowedRoles={["ADMIN"]}>
            <AdminOrderDetail />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/dashboard/admin/summary",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <Summary />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/admin/account",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <AdminAccountManage />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/admin/product",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <AdminProductManage />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/admin/blog",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <AdminBlogManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/admin/blog/detail/:blogId",
        element: (
          <AuthWrapper allowedRoles={["ADMIN"]}>
            <AdminBlogDetail />
          </AuthWrapper>
        ),
      },
    ],
  },
];
