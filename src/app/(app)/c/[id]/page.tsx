import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ListComment from "../../components/list-comment";
import CommetsService from "@/app/services/comment";
import { cookies } from "next/headers";
import { Comment } from "@/app/types/comments";

export const dynamic = "force-dynamic";
export default async function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const commentService = new CommetsService(supabase);
  const { data } = await commentService.get(id);

  console.log(id);
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <ListComment comments={data as Comment[]} />
      </div>
    </div>
  );
}
