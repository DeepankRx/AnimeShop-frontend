import React, { Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainDrawer from './components/menu/Drawer';
import { ALL_LINKS } from './constant';
import SplashScreen from './pages/SplashScreen';
import AuthContext from './store/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile, getUserOrderHistory } from './services/APIs';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/userSlice';
import { fetchCart, sendCartData } from './store/cartSlice';
import Footer from './components/menu/Footer';
const App = () => {
  const [count, setCount] = useState(0);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isUpdated = useSelector((state) => state.user.isUpdated);
  const cartData = useSelector((state) => state.cart);

  const PAGES = [
    ALL_LINKS.PageNotFound,
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
    ALL_LINKS.OrderHistory,
    ALL_LINKS.Wishlist,
    ALL_LINKS.Order,
    ALL_LINKS.TermsAndCondition,
    ALL_LINKS.PrivacyPolicy,
  ];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (authCtx.isLoggedIn) {
      getUserProfile(authCtx.userid)
        .then((res) => {
          dispatch(userActions.setUserDetails(res.data.data));
        })
        .catch((err) => {
          toast.error(err);
        });
      getUserOrderHistory(authCtx.userid).then((res) => {
        const orderHistory = res?.data?.orderHistories?.order.map((item) => item.items.map((item) => item._id));
        const orderHistoryId = [...new Set(orderHistory?.flat())];
        dispatch(userActions.setOrderHistory(orderHistoryId));
      });
    }
  }, [isUpdated]);

  useEffect(() => {
    if (authCtx.isLoggedIn && count) sendCartData(cartData);
    setCount(count + 1);
  }, [cartData.changed]);

  useEffect(() => {
    if (authCtx.isLoggedIn && user.id) dispatch(fetchCart(user.id));
  }, [user.id]);

  return (
    <GoogleOAuthProvider clientId="376399515469-1v98mimj9jmi1afthal23g84nln4q8uo.apps.googleusercontent.com">
      <BrowserRouter>
        <div id="" className="relative min-h-[100vh] pb-[214px]">
          <div className="">
            {loading ? (
              <SplashScreen />
            ) : (
              <>
                <MainDrawer />
                <Suspense fallback={<div />}>
                  <Routes>
                    {PAGES.map((item, i) => {
                      return item.loginRequire && item.show[authCtx.role] ? (
                        <Route key={i} path={item.pageLink} element={authCtx.isLoggedIn ? <item.view /> : <Navigate to={ALL_LINKS.LoginPage.pageLink} />} />
                      ) : (
                        item.show[authCtx.role] && <Route key={i} path={item.pageLink} element={<item.view />} />
                      );
                    })}
                  </Routes>
                </Suspense>
              </>
            )}
            <ToastContainer />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
