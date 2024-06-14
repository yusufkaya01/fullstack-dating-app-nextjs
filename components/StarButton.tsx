import clsx from "clsx";
import { Loader, Star } from "lucide-react";
import React from "react";

type Props = {
  selected: boolean;
  loading: boolean;
};

export default function StarButton({ selected, loading }: Props) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      {!loading ? (
        <Star
          size={24}
          className={clsx("fill-white", {
            "text-yellow-400": selected,
          })}
        />
      ) : (
        <Loader
          size={24}
          className="fill-white animate-spin"
          style={{ width: 24, height: 24 }}
        />
      )}
    </div>
  );
}
