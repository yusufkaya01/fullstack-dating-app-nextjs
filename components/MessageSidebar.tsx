"use client";

import { Chip } from "@nextui-org/react";
import clsx from "clsx";
import { ExternalLink, Inbox, Outdent } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const MessageSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState(
    searchParams.get("container") || "inbox",
  );

  const items = [
    { key: "inbox", label: "Inbox", icon: Inbox, chip: true },
    { key: "outbox", label: "Outbox", icon: ExternalLink, chip: false },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer  glass dark-blue-mesh">
      {items.map(({ key, icon: Icon, label, chip }) => (
        <div
          key={key}
          className={clsx("flex flex-row items-center rounded-t-lg gap-2 p-3", {
            "text-primary/90 font-semibold": selected === key,
            "text-white/90 hover:text-primary/70": selected !== key,
          })}
          onClick={() => handleSelect(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSidebar;
