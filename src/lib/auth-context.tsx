import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        // Signed out — clear user immediately
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // A user is only considered "fully logged in" when they have a
        // completed Firestore profile (i.e. finished the signup flow).
        // This ensures incomplete users (abandoned at Step 2) are treated
        // as logged-out by the navbar, demo section, and contact forms.
        const profileSnap = await getDoc(doc(db!, "users", firebaseUser.uid));
        setUser(profileSnap.exists() ? firebaseUser : null);
      } catch {
        // If Firestore is unreachable, fall back to trusting Firebase Auth
        // so a network hiccup doesn't log out an otherwise-complete user.
        setUser(firebaseUser);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    if (auth) await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
