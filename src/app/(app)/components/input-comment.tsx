"use client";
import EmojiPicker from "@/app/components/emoji-picker";
import CommetsService from "@/app/services/comment";
import React, { useState } from "react";
import { BiHappy } from "react-icons/bi";
import CardComment from "./card-comment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Comment } from "@/app/types/comments";
import NotificationService from "@/app/services/notification";

const InpuntComment = ({
  post_id,
  owner_id,
  onAdd,
  type,
}: {
  post_id: string | number;
  onAdd?: (comment: Comment) => void;
  owner_id: string | null;
  type: "onePost" | "listPost";
}) => {
  const supabase = createClientComponentClient();
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [newComment, setNewComment] = useState<[] | Comment[]>([]);
  const commentService = new CommetsService(supabase);
  const notiService = new NotificationService(supabase);
  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");

  const hanldeClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const { data, error } = await commentService.add(post_id, text);

    if (error === null && data) {
      setStatus("success");
      await notiService.add({
        receptor_id: owner_id,
        type: "comments",
        post_id: post_id,
      });

      if (onAdd) {
        console.log("aquiiiiiii");
        onAdd(data as Comment);
        setText("");
        return;
      }
      setNewComment([...newComment, data as Comment]);
      setText("");
      return;
    }
    setStatus("error");
  };

  return (
    <section className="w-full bg-white dark:bg-black">
      {newComment.length > 0 &&
        newComment.map((c) => (
          <CardComment key={c.id} user={c.users} comment={c.content} />
        ))}

      <form onSubmit={hanldeClick}>
        <div className="flex gap-2 items-center">
          <textarea
            value={text}
            name=""
            className="text-xs font-thin grow dark:bg-black hover:outline-none focus:outline-none resize-none  outline-none overflow-hidden"
            autoComplete="false"
            autoCorrect="false"
            placeholder="Escriba un comentario aqui"
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {status !== "loading" ? (
            <button
              type="submit"
              className=" text-sm font-medium disabled:cursor-not-allowed text-sky-600 disabled:text-sky-300 "
              disabled={text.length === 0}
            >
              Publicar
            </button>
          ) : (
            <div className="w-5 h-5 border-t-2 border-black border-solid border-opacity-50 rounded-full animate-spin"></div>
          )}
          <div className="relative z-0 hidden md:flex justify-center items-center">
            <button
              className=""
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowEmoji(!showEmoji);
              }}
            >
              <BiHappy />
            </button>
            {showEmoji && (
              <div className="absolute bottom-[53px] right-[0]">
                <EmojiPicker onSelect={(e) => setText(text + e)} />
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default InpuntComment;
