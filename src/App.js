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
import { Navbar } from "./components/Navbar";
import { Notes } from "./pages/Notes";
import { NotesAddOrEdit } from "./pages/NotesAddOrEdit";
import { WaitingForData } from "./components/WaitingForData";
function App() {
  return (
    <WaitingForData>
      <div className="font-raleway box-border flex h-screen w-screen  flex-col overflow-hidden bg-slate-300">
        <Navbar />
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
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/notes/add" element={<NotesAddOrEdit/>}></Route>
          <Route path="/notes/edit" element={<NotesAddOrEdit/>}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </WaitingForData>
  );
}

export default App;
