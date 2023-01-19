import { lazy } from "react";


const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

export const ALL_LINKS = {
  LoginPage: {
    pageLink: "/login",
    view: LoginPage,
    loginRequire: false,
  },
  SignupPage: {
    pageLink: "/signup",
    view: SignupPage,
    loginRequire: false,
  },
  ProductsPage: {
    pageLink: "/products",
    view: ProductsPage,
    loginRequire: false,
  },
  HomePage: {
    pageLink: "/",
    view: HomePage,
    loginRequire: false,
  },
};

export const DATA = {
  site_name: "ZEROX",
};
