"use client";

import { supabase } from "./lib/supabase";



export default function Home() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Smart Bookmark App 🚀
      </h1>

      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </main>
  );
}
