"use client";
import { toggleLikeMember } from "@/actions/likeActions";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useTransition } from "react";

type LikeButtonProps = {
  targetId: string;
  isLiked: boolean;
};

const LikeButton = ({ targetId, isLiked }: LikeButtonProps) => {
  const [isPending, startTransition] = useTransition();
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    startTransition(() => {
      toggleLikeMember(targetId, isLiked);
    });
  }
  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={handleClick}
    >
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      )}
      <Heart
        size={24}
        className={clsx(
          isLiked ? " fill-red-400 text-red-400" : "text-gray-500",
        )}
      />
    </div>
  );
};

export default LikeButton;
