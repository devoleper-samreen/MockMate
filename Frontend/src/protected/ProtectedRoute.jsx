import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/user.store";

function ProtectedRoute() {
    const { user } = useAuthStore();

    return user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute;
