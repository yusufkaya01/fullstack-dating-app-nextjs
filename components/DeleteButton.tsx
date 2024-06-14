import { Loader, Trash } from "lucide-react";
import React from "react";

type Props = {
  loading: boolean;
};

export default function DeleteButton({ loading }: Props) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      {!loading ? (
        <>
          <Trash size={24} className="fill-white" />
        </>
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
