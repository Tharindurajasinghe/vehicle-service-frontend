import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirects to login if admin is not authenticated
const PrivateRoute = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
