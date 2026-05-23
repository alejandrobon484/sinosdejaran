import PostList from "@/src/components/PostList";

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-8 text-center text-2xl font-semibold text-zinc-800 sm:text-3xl">
          Lo que dicen... y lo que respondemos
        </h1>
        <PostList />
      </div>
    </main>
  );
}
