import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  /** Call this after writing the Firestore profile doc so the context
   *  immediately reflects the now-complete registration without waiting
   *  for onAuthStateChanged to fire again. */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
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
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // A user is only considered "fully logged in" when they have a
        // completed Firestore profile (i.e. finished the signup flow).
        const profileSnap = await getDoc(doc(db!, "users", firebaseUser.uid));
        setUser(profileSnap.exists() ? firebaseUser : null);
      } catch {
        // If Firestore is unreachable, fall back to trusting Firebase Auth
        // so a network hiccup doesn't log out a complete user.
        setUser(firebaseUser);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /** Re-read Firestore for the current Firebase Auth user and update
   *  the context user state. Must be called after the Firestore profile
   *  doc is written (e.g. at end of signup Step 2) so the rest of the
   *  app immediately sees the user as logged in without a page reload. */
  const refreshProfile = useCallback(async () => {
    const currentUser = auth?.currentUser;
    if (!currentUser) return;
    try {
      const profileSnap = await getDoc(doc(db!, "users", currentUser.uid));
      setUser(profileSnap.exists() ? currentUser : null);
    } catch {
      // keep existing state on error
    }
  }, []);

  const signOut = async () => {
    if (auth) await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
