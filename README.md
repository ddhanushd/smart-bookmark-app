📌 Smart Bookmark App

A full-stack bookmark manager built with Next.js (App Router) and Supabase.

Users can sign in with Google, add private bookmarks, and see real-time updates across multiple tabs without refreshing.

🚀 Live Demo

🔗 https://smart-bookmark-app-chi-wine.vercel.app/

🛠 Tech Stack

Next.js (App Router)

Supabase

Authentication (Google OAuth)

Postgres Database

Row Level Security (RLS)

Realtime subscriptions

Tailwind CSS

Vercel (Deployment)

✨ Features

Google OAuth login (no email/password)

Private bookmarks per user (RLS enforced)

Add and delete bookmarks

Real-time updates across tabs

Cross-tab auth sync

Production deployment on Vercel

🔐 Database Design

Table: bookmarks

Column	Type
id	uuid (PK)
user_id	uuid
title	text
url	text
created_at	timestamp

Row Level Security policies ensure:

Users can only view their own bookmarks

Users can only insert bookmarks with their own user_id

Users can only delete their own bookmarks

⚡ Realtime Implementation

Supabase Realtime subscriptions listen to postgres_changes on the bookmarks table.

When changes occur:

A refetch is triggered

UI updates automatically without refresh

🧠 Challenges & Solutions
1️⃣ OAuth Redirect Configuration

Configuring Google Cloud OAuth redirect URIs and syncing them with Supabase required careful setup to avoid redirect_uri_mismatch errors.

2️⃣ Row Level Security (RLS)

Ensuring bookmarks remain private required proper RLS policies using:

auth.uid() = user_id

3️⃣ Cross-Tab Auth Sync

Using supabase.auth.onAuthStateChange ensured login/logout state updates across multiple tabs.

4️⃣ Environment Variables in Production

Handled environment variables securely using:

.env.local for development

Vercel environment variables for production

🧪 Running Locally

Clone repository

Install dependencies:

npm install


Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Run:

npm run dev

📦 Deployment

Deployed on Vercel with automatic CI/CD via GitHub integration.
