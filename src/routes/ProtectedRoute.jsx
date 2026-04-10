import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  // Temporary placeholder — will connect to Redux in stage 3
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user) return <Navigate to="/login" replace />;
  // if (allowedRole && user.role !== allowedRole)
  //   return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
