import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/authContext.jsx";



const GuestRoute = ({ children }) => {
  const { user, loading } = useStateContext();
 if(loading){
      return  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-20 h-20 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin shadow-lg shadow-cyan-500/30"></div>
    </div>
 }
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}
 


const PrivateRoute = ({ children }) => {
  const { user, loading } = useStateContext();
 if (loading) {
    return  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-20 h-20 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin shadow-lg shadow-cyan-500/30"></div>
    </div>
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export {GuestRoute, PrivateRoute};