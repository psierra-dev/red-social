import React from "react";

export const PostSkeleton = () => {
  return (
    <section className="p-2 flex flex-col gap-4 items-center mb-[70px] max-w-[500px] m-auto">
      <div className="w-full h-[400px] lg:h-[600px] rounded-lg bg-neutral-200 dark:bg-neutral-900 animate-pulse"></div>
      <div className="w-full h-[400px] lg:h-[600px] rounded-lg bg-neutral-200 dark:bg-neutral-900 animate-pulse"></div>
      <div className="w-full h-[400px] lg:h-[600px] rounded-lg bg-neutral-200 dark:bg-neutral-900 animate-pulse"></div>
    </section>
  );
};
