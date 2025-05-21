import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/authContext.jsx";



const GuestRoute = ({ children }) => {
  const { user } = useStateContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

const PrivateRoute = ({ children }) => {
  const { user } = useStateContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export {GuestRoute, PrivateRoute};