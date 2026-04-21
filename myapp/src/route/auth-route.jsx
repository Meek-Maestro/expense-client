import { BrowserRouter, Routes, } from "react-router-dom";
import AuthRoutes from "./../pages/page-route/authRoutes";

const AuthRoute = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>{AuthRoutes}</Routes>
    </BrowserRouter>
  );
};

export default AuthRoute;