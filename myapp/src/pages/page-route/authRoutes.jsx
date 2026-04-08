import { lazy } from "react";
import { Route } from "react-router-dom";

const LazyLogin = lazy(() => import("../auth/login"));
const LazySignup = lazy(() => import("../auth/signup"));

export default (
  <>
    <Route path="/" element={<LazyLogin />} />
    <Route path="/sign-up" element={<LazySignup />} />
  </>
);
