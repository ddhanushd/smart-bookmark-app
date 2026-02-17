"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";


type Bookmark = {
  id: string;
  title: string;
  url: string;
};

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
  if (!user) return;

  fetchBookmarks();

  const channel = supabase
    .channel("bookmarks-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookmarks",
      },
      () => {
        fetchBookmarks();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);


  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookmarks(data);
    }
  };

  const handleAddBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
    fetchBookmarks();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">
        Smart Bookmark App 🚀
      </h1>

      {!user ? (
        <button
  onClick={handleLogin}
  className="px-6 py-3 bg-white text-black border border-gray-300 rounded-lg shadow hover:shadow-md transition"
>
  Sign in with Google
</button>

      ) : (
        <>
          <p className="mb-4">Logged in as: {user.email}</p>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleAddBookmark}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>

          <ul className="w-full max-w-md">
            {bookmarks.map((bookmark) => (
              <li
                key={bookmark.id}
                className="flex justify-between items-center border p-2 mb-2 rounded"
              >
                <a
                  href={bookmark.url}
                  target="_blank"
                  className="text-blue-600"
                >
                  {bookmark.title}
                </a>
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </>
      )}
    </main>
  );
}
