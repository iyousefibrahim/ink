import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  authenticated: (user: User) => void;
  signOut: () => void;
  token?: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const authenticated = (user: User) => setUser(user);
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, authenticated, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
