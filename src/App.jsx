import { Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainDrawer from "./components/menu/Drawer";
import { ALL_LINKS } from "./constant";
import SplashScreen from "./pages/SplashScreen";
import AuthContext from "./store/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { getUserProfile } from "./services/APIs";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import { fetchCart, sendCartData } from "./store/cartSlice";
const App = () => {

  const authCtx=useContext(AuthContext);
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.user);
  const cartData=useSelector((state)=>state.cart)

  const PAGES=[
    ALL_LINKS.LoginPage,
    ALL_LINKS.SignupPage,
    ALL_LINKS.HomePage,
    ALL_LINKS.ProductsPage,
    ALL_LINKS.Category,
    ALL_LINKS.Product,
    ALL_LINKS.Dashboard,
    ALL_LINKS.SizingGuide,
    ALL_LINKS.Cart,
    ALL_LINKS.Checkout,
    ALL_LINKS.UserProfile,
  ]
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if(authCtx.isLoggedIn){
      getUserProfile(authCtx.userid)
      .then((res)=>{
        dispatch(userActions.setUserDetails(res.data.data));
      })
      .catch((err)=>{
        toast.error(err)
      })
    }else{
    }
  }, []);

  useEffect(()=>{
    if(authCtx.isLoggedIn)sendCartData(cartData)
  },[cartData.changed])

  useEffect(()=>{
    if(authCtx.isLoggedIn && user.id)dispatch(fetchCart(user.id))
  },[user.id])

  return (
    <GoogleOAuthProvider
    clientId="376399515469-1v98mimj9jmi1afthal23g84nln4q8uo.apps.googleusercontent.com"
    >

    <BrowserRouter>
      <div id="page-container">
        <div id="content-wrap">
          {loading ? (
            <SplashScreen />
          ) : (
            <>
              <MainDrawer />
              <Suspense fallback={<div />}>
            <Routes>
              {PAGES.map((item, i) => {
                return (item.loginRequire  ? (
                  <Route
                    key={i}
                    path={item.pageLink}
                    element={
                      authCtx.isLoggedIn ? (
                        <item.view />
                      ) : (
                        <Navigate to={ALL_LINKS.LoginPage.pageLink} />
                      )
                    }
                  />
                ) : (
                  <Route
                    key={i}
                    path={item.pageLink}
                    element={<item.view />}
                  />
                ));
              })}
            </Routes>
          </Suspense>
            </>
          )}
          <ToastContainer/>
        </div>
      </div>
    </BrowserRouter>
                        </GoogleOAuthProvider>
  );
};

export default App;
