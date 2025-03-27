import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/user.store";
import Navbar from "../components/Navbar"

function ProtectedRoute() {
    const { user } = useAuthStore();

    return user ? (
        <div>
            <Navbar />
            <hr className="text-yellow-400" />
            <Outlet />
        </div>
    ) : <Navigate to='/' replace />
}

export default ProtectedRoute;
