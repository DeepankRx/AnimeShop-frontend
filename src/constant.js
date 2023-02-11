import { lazy } from "react";
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Cart = lazy(() => import("./pages/Cart"));
const SellerProducts = lazy(() => import("./seller/SellerProducts"));
const AddProduct = lazy(() => import("./seller/AddProduct"));
const SizingGuide = lazy(() => import("./pages/SizingGuide"));
const SellerDashboardDefault = lazy(() => import("./seller/SellerDashboardDefault"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Wishlist = lazy(() => import("./pages/Wishlist"));


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
  Cart: {
    pageLink: "/cart",
    view: Cart,
    loginRequire: false,
  },
  Checkout: {
    pageLink: "/checkout",
    view: CheckoutPage,
    loginRequire: true,
  },
  UserProfile: {
    pageLink: "/userprofile",
    view: UserProfile,
    loginRequire: true,
  },
  OrderHistory: {
    pageLink: "/orderhistory",
    view: OrderHistory,
    loginRequire: true,
  },
  Wishlist: {
    pageLink: "/wishlist",
    view: Wishlist,
    loginRequire: true,
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
