import React from "react";
// import pages
import { Homepage } from "../Homepage";
import { EmailVerifyPage } from "../pages/auth/EmailVerifyPage";
import { ForgetPage } from "../pages/auth/ForgetPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { ResetPass } from "../pages/auth/ResetPass";
import { SignupPage } from "../pages/auth/SignupPage";
import { VerifyForgetPage } from "../pages/auth/VerifyForgetPage";
import { About } from "../pages/public/About";
import { Blog } from "../pages/public/Blog";
import { BlogDetail } from "../pages/public/BlogDetail";
import { Buynow } from "../pages/public/Buynow";
import { Cart } from "../pages/public/Cart";
import { Checkout } from "../pages/public/Checkout";
import { NotFound } from "../pages/public/NotFound";
import { ProductDetail } from "../pages/public/ProductDetail";
import { Shop } from "../pages/public/Shop";
import { Unauthorize } from "../pages/public/Unauthorize";
import { PaymentSuccess } from "../pages/public/PaymentSuccess";
import { PaymentFail } from "../pages/public/PaymentFail";
import {
  LoggedWrapper,
  ResetPassWrapper,
  VerifyEmailForgetWrapper,
  VerifyEmailSignupWrapper,
} from "./LoggedWrapper";
export const publicRoutes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: (
      <LoggedWrapper>
        <LoginPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoggedWrapper>
        <SignupPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/verify-signup",
    element: (
      <VerifyEmailSignupWrapper>
        <EmailVerifyPage />
      </VerifyEmailSignupWrapper>
    ),
  },
  {
    path: "/forget",
    element: (
      <LoggedWrapper>
        <ForgetPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/verify-forget-pass",
    element: (
      <VerifyEmailForgetWrapper>
        <VerifyForgetPage />
      </VerifyEmailForgetWrapper>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ResetPassWrapper>
        <ResetPass />
      </ResetPassWrapper>
    ),
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/cancel",
    element: <PaymentFail />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/category/:cateId",
    element: <Shop />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/blogdetail/:blogId",
    element: <BlogDetail />,
  },
  {
    path: "/productdetail/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/buynow/:productId",
    element: <Buynow />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/not-authorized",
    element: <Unauthorize />,
  },
];
