import InpuntComment from "@/app/(app)/components/input-comment";
import ListComment from "@/app/(app)/components/list-comment";
import PostCard from "@/app/(app)/components/post-card";
import PostClient from "@/app/(app)/components/post-client";
import Modal from "@/app/components/Modal/modal";
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
  console.log(postId, "page cid");

  return (
    <Modal>
      <PostClient post={post as Post} comments={comments as Comment[]} />
    </Modal>
  );
}
