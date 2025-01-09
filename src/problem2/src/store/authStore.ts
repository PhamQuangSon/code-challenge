import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TUser = {
  uid: string;
  displayName: string;
  email: string;
  bio: string;
  photoURL: string | null;
};

type AuthState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  setUser: (user: TUser) => void;
  signOut: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => {
        set({ user: user });
      },
      signOut: () => {
        set(() => ({ user: undefined }));
        localStorage.clear(); // or localStorage.clear();
      },
    }),
    {
      name: "auth-store",
    }
  )
);
