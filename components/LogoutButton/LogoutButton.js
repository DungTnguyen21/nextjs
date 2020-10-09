import React from "react";
import { useAuth } from "../../libs/ContextLib/ContextLib";
import { DropdownItem } from "reactstrap";
const LogoutButton = () => {
  const { setAuthenticated } = useAuth();
  const logout = () => {
    localStorage.removeItem("billing_token");
    setAuthenticated(false);
  };
  return (
    <DropdownItem href="#pablo" onClick={(e) => logout()}>
      <i className="ni ni-user-run" />
      <span>Logout</span>
    </DropdownItem>
  );
};
export default LogoutButton;
