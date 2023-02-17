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
const Order = lazy(() => import("./pages/Order"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));


export const ALL_LINKS = {
  PageNotFound: {
    pageLink: "*",
    view: PageNotFound,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  LoginPage: {
    pageLink: "/login",
    view: LoginPage,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  SignupPage: {
    pageLink: "/signup",
    view: SignupPage,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  ProductsPage: {
    pageLink: "/products",
    view: ProductsPage,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  HomePage: {
    pageLink: "/",
    view: HomePage,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  Category: {
    pageLink: "/category",
    view: CategoryPage,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  Product: {
    pageLink: "/product/:id",
    view: ProductPage,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  Dashboard: {
    pageLink: "/dashboard/*",
    view: Dashboard,
    loginRequire: true,
    show:{
      null:true,
      'seller':true,
      'customer':false,
      'admin':true
    }
  },
  SizingGuide: {
    pageLink: "/size_guide",
    view: SizingGuide,
    loginRequire: false,
    show:{
      null:true,
      'seller':true,
      'customer':true,
      'admin':true
    }
  },
  Cart: {
    pageLink: "/cart",
    view: Cart,
    loginRequire: true,
    show:{
      null:true,
      'seller':false,
      'customer':true,
      'admin':false
    }
  },
  Checkout: {
    pageLink: "/checkout",
    view: CheckoutPage,
    loginRequire: true,
    show:{
      null:true,
      'seller':false,
      'customer':true,
      'admin':true
    }
  },
  UserProfile: {
    pageLink: "/userprofile",
    view: UserProfile,
    loginRequire: true,
    show:{
      null:true,
      'seller':false,
      'customer':true,
      'admin':false
    }
  },
  OrderHistory: {
    pageLink: "/orderhistory",
    view: OrderHistory,
    loginRequire: true,
    show:{
      null:true,
      'seller':false,
      'customer':true,
      'admin':false
    }
  },
  Wishlist: {
    pageLink: "/wishlist",
    view: Wishlist,
    loginRequire: true,
    show:{
      null:true,
      'seller':false,
      'customer':true,
      'admin':false
    }
  },
  Order: {
    pageLink: "/order",
    view: Order,
    loginRequire: true,
    show:{
      null:true,
      'seller':false,
      'customer':true,
      'admin':false
    }
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
