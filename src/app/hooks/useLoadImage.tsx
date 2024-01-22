"use client";

import React, { useState } from "react";

const useLoadImage = (initialState: string) => {
  const [selectedImage, setSelectedImage] = useState<string>(initialState || "");
  const [file, setFile] = useState<File | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files;
    if (file && file[0]) {
      setFile(file[0]);

      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(file[0]);
    }
  };
  return { handleChangeFile, file, selectedImage };
};

export default useLoadImage;
