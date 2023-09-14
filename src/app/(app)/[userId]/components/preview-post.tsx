import { Post } from "@/app/types/post";
import React from "react";
import PostCard from "../../components/post-card";

const PreviewPost = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="p-2 flex flex-col items-center mb-[70px]">
      {posts.length > 0 && posts.map((p) => <PostCard key={p.id} post={p} />)}
    </div>
  );
};

export default PreviewPost;
