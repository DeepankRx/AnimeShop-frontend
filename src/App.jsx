import { Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainDrawer from "./components/menu/Drawer";
import { ALL_LINKS } from "./constant";
import SplashScreen from "./pages/SplashScreen";
import AuthContext from "./store/AuthContext";

const App = () => {

  const authCtx=useContext(AuthContext);

  const PAGES=[
    ALL_LINKS.LoginPage,
    ALL_LINKS.SignupPage,
    ALL_LINKS.HomePage,
    ALL_LINKS.ProductsPage
  ]
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
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
                    exact
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
                    exact
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
  );
};

export default App;
