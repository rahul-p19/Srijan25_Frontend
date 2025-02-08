/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * A Guard to check for authenticated routes
 * 
 * @example
 * <Route
     path="admin"
     element={
       <ProtectedRoute
         redirectPath="/home"
         isAllowed={!!user && user.roles.includes('admin')}
         redirectToast={redirectToast}
       >
         <Admin />
       </ProtectedRoute>
     }
    />
 * 
 * @typedef {object} RedirectProps
 * @property {boolean} accessAllowed Allow usert to access the routes underneath
 * @property {string} [redirectTo] Path to redirect the user in non-authenticated state
 * @property {function} [redirectToast] Method called to show a toast to log in
 * @property {JSX.Element} children Children Components
 * 
 * @param {RedirectProps} props
 * @returns {JSX.Element}
 */
export const ProtectedRoute = ({
  accessAllowed,
  redirectTo = "/",
  redirectToast,
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessAllowed) {
      if (redirectToast) redirectToast();
      navigate(redirectTo, { replace: true });
    }
  });

  return children ? children : <Outlet />;
};
