import WrapperModalPost from "@/app/(app)/components/wrapper-modal";
import CommetsService from "@/app/services/comment";
import PostService from "@/app/services/post";
import {Comment} from "@/app/types/comments";
import {Post} from "@/app/types/post";
import {createClient} from "@/app/utils/supabase/server";
import {Modal} from "./modal";
import PostClient from "@/app/(app)/components/post-client";

export const dynamic = "force-dynamic";
export default async function PhotoModal({
  params: {id: postId},
}: {
  params: {id: string};
}) {
  const supabase = createClient();
  const commentService = new CommetsService(supabase);
  const {data: comments} = await commentService.get(postId);
  const postService = new PostService(supabase);
  const {post} = await postService.onePost(postId);

  return (
    <Modal>
      <div
        className="flex w-full overflow-y-auto max-w-[600px]"
        style={{height: "inherit"}}
      >
        <PostClient post={post as Post} comments={comments as Comment[]} />
      </div>
    </Modal>
  );
}
