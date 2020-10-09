import React, { useEffect } from "react";
import { useRouter, Router } from "next/router";
import LoginLayout from "../../layouts/Auth";
import { useAuth } from "../../libs/ContextLib/ContextLib";
import ReactDOM from "react-dom";
import { route } from "next/dist/next-server/server/router";

const PrivateRoute = ({ loading, children, isAuthenticated, ...rest }) => {
  let router = useRouter();
  let { setLoading } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      if (router.route !== "/auth/login") {
        setLoading(true);
        router.push("/auth/login");
        ReactDOM.unmountComponentAtNode(
          document.getElementById("page-transition")
        );
        document.body.classList.remove("body-page-transition");
      } else setLoading(false);
    } else if (route.route !== /[/]admin[/][a-z]/)
    // if ()
      router.push("/admin/MyDashboard");
  }, [isAuthenticated, loading]);
  return <></>;
};
export default PrivateRoute;
