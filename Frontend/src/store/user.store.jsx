// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//     user: null,
//     setUser: (userData) => set({ user: userData }),
//     logout: () => set({ user: null })
// }));

// export default useAuthStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (userData) => set({ user: userData }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;

