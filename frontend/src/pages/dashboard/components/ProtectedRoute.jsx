import { Navigate } from "react-router-dom";
import { UseAuth } from "./../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = UseAuth();

  if (!isLoggedIn) {
    return <Navigate to="/sys" replace />;
  }

  return children;
}