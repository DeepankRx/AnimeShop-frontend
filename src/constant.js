import { lazy } from "react";


const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SellerProducts = lazy(() => import("./seller/SellerProducts"));
const AddProduct = lazy(() => import("./seller/AddProduct"));
const SizingGuide = lazy(() => import("./pages/SizingGuide"));
const SellerDashboardDefault = lazy(() => import("./seller/SellerDashboardDefault"));


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
  Category: {
    pageLink: "/category",
    view: CategoryPage,
    loginRequire: false,
  },
  Product: {
    pageLink: "/product/:id",
    view: ProductPage,
    loginRequire: false,
  },
  Dashboard: {
    pageLink: "/dashboard/*",
    view: Dashboard,
    loginRequire: true,
  },
  SizingGuide: {
    pageLink: "/size_guide",
    view: SizingGuide,
    loginRequire: false,
  },

};

export const SELLER_LINKS={

  SellerDashboardDefault: {
    pageLink: "",
    view: SellerDashboardDefault,
    loginRequire: true,
  },
  SellerProducts: {
    pageLink: "my_products",
    view: SellerProducts,
    loginRequire: true,
  },
  AddProduct: {
    pageLink: "add_product",
    view: AddProduct,
    loginRequire: true,
  },
  EditProduct: {
    pageLink: "edit_product",
    view: AddProduct,
    loginRequire: true,
  },
}

export const DATA = {
  site_name: "ZEROX",
};
