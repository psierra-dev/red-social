"use client";
import EmojiPicker from "@/app/components/emoji-picker";
import CommetsService from "@/app/services/comment";
import React, {useRef, useState} from "react";
import {BiHappy} from "react-icons/bi";
import CardComment from "./card-comment";

import {Comment} from "@/app/types/comments";
import NotificationService from "@/app/services/notification";
import ClickOutsideComponent from "@/app/components/click-outside";
import {createClient} from "@/app/utils/supabase/client";

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
  const supabase = createClient();
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [newComment, setNewComment] = useState<[] | Comment[]>([]);
  const commentService = new CommetsService(supabase);
  const notiService = new NotificationService(supabase);
  const [status, setStatus] = useState<
    "typing" | "loading" | "success" | "error"
  >("typing");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const hanldeClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const {data, error} = await commentService.add(post_id, text);

    if (error === null && data) {
      await notiService.add({
        receptor_id: owner_id,
        type: "comments",
        post_id: post_id,
      });

      setStatus("success");
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

  const insertEmoji = (emoji: string) => {
    if (inputRef.current) {
      const {selectionStart, selectionEnd} = inputRef.current;
      if (selectionStart !== null && selectionEnd !== null) {
        const comment =
          text.slice(0, selectionStart) + emoji + text.slice(selectionEnd);
        setText(comment);

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = selectionStart + emoji.length;
            inputRef.current.selectionEnd = selectionStart + emoji.length;
          }
        }, 0);
        inputRef?.current?.focus();
      }
    }
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
            ref={inputRef}
            value={text}
            name=""
            className="text-xs font-thin dark:text-white grow dark:bg-black hover:outline-none focus:outline-none resize-none  outline-none overflow-hidden"
            autoComplete="false"
            autoCorrect="false"
            placeholder="Escriba un comentario aqui"
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {status !== "loading" ? (
            <button
              type="submit"
              className=" text-xs font-medium hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed text-sky-600 disabled:text-sky-300 "
              disabled={text.length === 0}
            >
              Publicar
            </button>
          ) : (
            <div className="w-5 h-5 border-t-2 border-black dark:border-neutral-400 border-solid border-opacity-50 rounded-full animate-spin"></div>
          )}
          <div className="relative z-0 hidden md:flex justify-center items-center">
            <button
              ref={buttonRef}
              className=""
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowEmoji(!showEmoji);
                inputRef.current?.focus();
              }}
            >
              <BiHappy />
            </button>
            {showEmoji && (
              <ClickOutsideComponent
                onClose={(event) => {
                  if (
                    buttonRef.current &&
                    !buttonRef.current.contains(event?.target as Node)
                  ) {
                    setShowEmoji(false);
                  }
                }}
              >
                <div className="absolute bottom-[53px] right-[0]">
                  <EmojiPicker onSelect={insertEmoji} />
                </div>
              </ClickOutsideComponent>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default InpuntComment;
