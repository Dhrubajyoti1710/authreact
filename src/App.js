import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/cms/Home/Home";
import Create from "./pages/cms/CreateProduct/CreateProduct";
import Update from "./pages/cms/UpdateProduct/UpdateProduct";
import ResponsiveAppBar from "./pages/layout/header/header";
import Footer from "./pages/layout/footer/footer";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import UpdatePassword from "./pages/auth/updatePassword/update-password";
import Products from "./pages/cms/Products/Products";
import PrivateRoute from "./routes/PrivateRoute"; 
import VerifyEmail from "./pages/auth/verifyEmail/verifyEmail";
import ForgetPassword from "./pages/auth/forgotPassword/forgot-password";
import ResetPassword from "./pages/auth/resetPassword/reset-password";
import Profile from "./pages/cms/Profile/Profile";

function App() {
  const publicRoute = [
    { path: "/", component: <Home /> },
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/verify-email", component:<VerifyEmail/>},
    { path: "/update-password", component: <UpdatePassword /> },
    { path: "/forgot-password",component:<ForgetPassword/>},
    { path: "/reset-password/:token",component:<ResetPassword/>},
    { path: "/dashboard", component:<Profile/>}
  ];

  const privateRoute = [
    { path: "/products", component: <Products /> },
    { path: "/create", component: <Create /> },
    { path: "/update/:id", component: <Update /> }
  ];

  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          {/* Public Routes */}
          {publicRoute.map((item, index) => (
            <Route key={index} path={item.path} element={item.component} />
          ))}

          {/* Private Routes */}
          {privateRoute.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<PrivateRoute>{item.component}</PrivateRoute>}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
