import ListComment from "@/app/(app)/components/list-comment";
import Modal from "@/app/components/Modal/modal";
import CommetsService from "@/app/services/comment";
import { Comment } from "@/app/types/comments";
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
  const { data } = await commentService.get(postId);
  console.log(postId, "page cid");

  return (
    <Modal>
      <ListComment comments={data as Comment[]} post_id={postId} />
    </Modal>
  );
}
