"use client";

import { useCallback, useEffect, useState } from "react";
import type { Post } from "@/src/lib/schema";
import FakeReviewCard from "./FakeReviewCard";

function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes ?? 0);

  async function handleLike() {
    const res = await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setLikes(data.likes);
  }

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="px-4 pt-4 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Reseña recibida
        </p>
        <FakeReviewCard reviewText={post.review_text} stars={post.stars ?? undefined} />
      </div>

      <div className="px-4 py-4 sm:px-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Respuesta
        </p>
        <p className="text-sm leading-relaxed text-zinc-800 whitespace-pre-wrap">{post.response_text}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-zinc-100 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-medium text-zinc-800">{post.author_name}</span>
          <span className="text-zinc-300">·</span>
          <span className="text-sm text-zinc-500">{post.author_position}</span>
          <span className="text-zinc-300">·</span>
          <span className="text-sm text-zinc-500">{post.author_source}</span>
        </div>
        <button
          type="button"
          onClick={handleLike}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium text-zinc-500 transition hover:bg-red-50 hover:text-red-500 active:scale-95"
        >
          <span>❤️</span>
          <span>{likes}</span>
        </button>
      </div>
    </article>
  );
}

export default function PostList({ refreshKey }: { refreshKey?: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Error al cargar los posts.");
      const data = await res.json();
      setPosts(data.posts);
    } catch {
      setError("No se pudieron cargar los posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, refreshKey]);

  if (loading) {
    return <p className="text-center text-sm text-zinc-400">Cargando posts…</p>;
  }

  if (error) {
    return <p className="text-center text-sm text-red-500">{error}</p>;
  }

  if (posts.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-400">
        No hay posts publicados todavía.
      </p>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <h2 className="text-xl font-semibold text-zinc-800 sm:text-2xl">Posts publicados</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
