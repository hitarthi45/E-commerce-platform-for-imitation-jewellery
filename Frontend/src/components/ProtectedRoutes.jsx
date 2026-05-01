import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" />;
  }

  return allowedRoles.includes(role)
    ? children
    : <Navigate to="/" />;
};

export default ProtectedRoute;