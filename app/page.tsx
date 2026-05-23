"use client";

import { useState } from "react";
import PostForm from "@/src/components/PostForm";
import PostList from "@/src/components/PostList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-12">
        <PostForm onCreated={() => setRefreshKey((k) => k + 1)} />
        <PostList refreshKey={refreshKey} />
      </div>
    </main>
  );
}
