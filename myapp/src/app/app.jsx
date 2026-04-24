import { useEffect } from "react";
import AuthRoute from "../route/auth-route";
import { authManager } from "../store/authManager/auth-manager";
import { observer } from "mobx-react";

const main = observer(() => {
  useEffect(() => {
    authManager.init();
    console.log(authManager.status);
  }, []);
  // authManager.logout();
  return (
    <>
      <App />
    </>
  );
});

const App = observer(() => {
  if (authManager.status === "loaded") {
    return <AuthRoute />;
  }
  if (authManager.status === "authenticated") {
    return <div>Authenticated </div>;
  }
  return <AuthRoute />;
});

export default main;
