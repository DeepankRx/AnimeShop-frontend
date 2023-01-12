import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDrawer from "./components/menu/Drawer";
import HomePage from "./pages/HomePage";
import SplashScreen from "./pages/SplashScreen";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      {/* {loading ? <SplashScreen />: */}
      <div id="page-container">
        <div id="content-wrap">
          {loading ? (
            <SplashScreen />
          ) : (
            <>
              <MainDrawer />
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
