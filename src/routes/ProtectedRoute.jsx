import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!user || !token) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole)
    return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
