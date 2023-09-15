"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiPickerr from "emoji-picker-react";
//import { Picker } from "emoji-mart";
import { useRef } from "react";
interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  return (
    <>
      <Picker
        data={data}
        onEmojiSelect={(e: any) => onSelect(e.native as string)}
        className="h-[300px]"
        style={{ height: "300px" }}
      />
    </>
  );
};

export default EmojiPicker;
