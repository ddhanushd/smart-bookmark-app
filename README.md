📌 Smart Bookmark App

A full-stack bookmark manager built with Next.js (App Router) and Supabase.

Users can sign in with Google, add private bookmarks, and see real-time updates across multiple tabs without refreshing the page.

🚀 Live Demo

🔗 https://smart-bookmark-app-chi-wine.vercel.app/

🛠 Tech Stack

Next.js (App Router)

Supabase

Google OAuth Authentication

Postgres Database

Row Level Security (RLS)

Realtime subscriptions

Tailwind CSS

Vercel (Deployment with CI/CD)

✨ Features

Google OAuth login (no email/password)

Private bookmarks per user (RLS enforced)

Add and delete bookmarks

Real-time updates across multiple tabs

Cross-tab authentication sync

Production deployment on Vercel

🔐 Database Design

Table: bookmarks

Column	Type
id	uuid (PK)
user_id	uuid
title	text
url	text
created_at	timestamp
Row Level Security Policies

RLS ensures:

Users can only view their own bookmarks

Users can only insert bookmarks with their own user_id

Users can only delete their own bookmarks

All policies are enforced using:

auth.uid() = user_id

⚡ Realtime Implementation

Supabase Realtime subscribes to postgres_changes on the bookmarks table.

When a change occurs:

A refetch is triggered

The UI updates automatically

All active tabs stay in sync without refresh

🧠 Challenges & How I Solved Them
1️⃣ OAuth Redirect Configuration

Configuring Google OAuth required aligning redirect URIs across:

Google Cloud Console

Supabase Authentication settings

Vercel production deployment

Careful validation prevented redirect_uri_mismatch errors.

2️⃣ Implementing Row Level Security (RLS)

Ensuring user privacy required correctly defining RLS policies using:

auth.uid() = user_id


I tested with multiple Google accounts to confirm complete data isolation.

3️⃣ Cross-Tab Authentication Sync

Using:

supabase.auth.onAuthStateChange(...)


ensured login and logout events propagate across multiple browser tabs.

4️⃣ Realtime Reliability

Implemented a realtime subscription using Supabase channels and ensured proper cleanup to avoid duplicate listeners.

5️⃣ Environment Configuration

Managed environment variables securely:

.env.local for development

Vercel Environment Variables for production

No secrets are committed to GitHub.

🧪 Running Locally

Clone the repository

Install dependencies:

npm install


Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Run development server:

npm run dev

📦 Deployment

The application is deployed on Vercel with automatic CI/CD integration from GitHub.
