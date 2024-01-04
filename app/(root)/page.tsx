import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPost } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchPost(1, 30);
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  return (
    <div className="h-screen">
      <h1 className="head-text text-le">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createAt={post.createAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
