// router
import { Routes, Route } from "react-router-dom";
// components
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { ResetPassword } from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { RedirectUserLoggedRoute } from "./components/RedirectUserLoggedRoute";
import { PageNotFound } from "./components/PageNotFound";
function App() {
  return (
    <div className="font-raleway flex  h-screen w-full bg-slate-300">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={
            <RedirectUserLoggedRoute pathRedirect="/">
              <Login />
            </RedirectUserLoggedRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RedirectUserLoggedRoute pathRedirect="/">
              <Register />
            </RedirectUserLoggedRoute>
          }
        ></Route>
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/reset-password"
          element={
            <RedirectUserLoggedRoute pathRedirect="/">
              <ResetPassword />
            </RedirectUserLoggedRoute>
          }
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
