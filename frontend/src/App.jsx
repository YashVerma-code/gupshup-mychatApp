import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound.jsx";
import { useThemeStore } from "./store/useThemeStrore.js";
import { io } from "socket.io-client";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth, isCheckingAuth]);


  if (isCheckingAuth && !authUser) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 h-screen w-screen flex flex-wrap justify-center items-center">
        <span className="loading loading-infinity w-1/6"></span>
      </div>
    );
  } else {
    return (
      <div
        className="w-screen min-h-screen overflow-x-hidden"
        data-theme={theme}
      >
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/setting" element={<Setting />} />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    );
  }
}

export default App;
