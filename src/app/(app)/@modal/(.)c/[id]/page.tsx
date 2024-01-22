import WrapperModalPost from "@/app/(app)/components/wrapper-modal";
import CommetsService from "@/app/services/comment";
import PostService from "@/app/services/post";
import { Comment } from "@/app/types/comments";
import { Post } from "@/app/types/post";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export default async function PhotoModal({
  params: { id: postId },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const commentService = new CommetsService(supabase);
  const { data: comments } = await commentService.get(postId);
  const postService = new PostService(supabase);
  const { post } = await postService.onePost(postId);

  return (
    <WrapperModalPost comments={comments as Comment[]} post={post as Post} />
  );
}
