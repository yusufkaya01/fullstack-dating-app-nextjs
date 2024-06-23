import { getMessagesByContainer } from "@/actions/messageAction";
import MessageSidebar from "@/components/MessageSidebar";
import React from "react";

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string };
}) => {
  const messages = await getMessagesByContainer(searchParams.container);
  console.log(messages);
  return (
    <div className="container mx-auto h-screen">
      <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10 ">
        <div className="col-span-2">
          <MessageSidebar />
        </div>
        <div className="col-span-10">message goes here.</div>
      </div>
    </div>
  );
};

export default MessagesPage;
