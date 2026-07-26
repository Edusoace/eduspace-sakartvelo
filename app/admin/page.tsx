import { getAllPosts } from "./actions";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = "force-dynamic"; // admin data should never be stale

export default async function AdminPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold text-slate-50">Admin dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">
          Publish new lessons and articles, or remove existing ones.
        </p>
      </div>

      <AdminPanel initialPosts={posts} />
    </div>
  );
}
