import { BrowserRouter, Routes } from "react-router-dom";
import AuthRoutes from "./../pages/page-route/authRoutes";
import { Suspense } from "react";

const AuthRoute = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<div>Loading</div>}>
        <Routes>{AuthRoutes}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AuthRoute;
