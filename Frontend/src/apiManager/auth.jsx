import AxiosInstance from "./index"

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const authenticate = () => {
    window.open(`${baseUrl}/auth/google`, "_self");
}