"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";


export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current session on load
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Smart Bookmark App 🚀
      </h1>

      {user ? (
        <>
          <p className="mb-4">Logged in as: {user.email}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Sign in with Google
        </button>
      )}
    </main>
  );
}
