"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Key, useTransition } from "react";
import MemberCard from "./MemberCard";
import Loading from "./Loading";

type props = {
  members: Member[];
  likeIds: string[];
};

const ListsTab = ({ members, likeIds }: props) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { id: "sourceLikes", label: "Members I have liked" },
    {
      id: "targetLikes",
      label: "Members that liked me!",
    },
    {
      id: "mutualLikes",
      label: "Mutual likes",
    },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`
            ${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex w-full flex-col mt-10 gap-5 container mx-auto">
      <Tabs
        aria-label="list"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <div>
                <Loading />
              </div>
            ) : (
              <>
                {members.length > 0 ? (
                  <div
                    className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-4 container mx-auto px-4 sm:px-0 w-[50%] sm:w-[100%]"
                  >
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likes={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <>No user found</>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListsTab;
