"use client";

import { CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import { pusherClient } from "@/utils/pusher";

const MessageList = ({
  chats,
  currentUserId,
  senderImage,
  receiverImage,
  senderName,
  receiverName,
  chatId,
}) => {
  const [messages, setMessages] = useState(chats);

  const handleNewMessage = useCallback((newMessage) => {
    setMessages((prevState) => {
      return [...prevState, newMessage];
    });
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);
    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId, handleNewMessage]);

  return (
    <div className="glass light-blue-mesh h-[100vh] flex flex-col">
      <CardHeader className="text-3xl font-bold">Chat</CardHeader>
      <Divider />
      <CardBody className="flex-1 overflow-y-scroll ">
        {messages.length === 0
          ? "No messages to display"
          : messages.map((msg) => (
              <MessageBox
                key={msg.id}
                message={msg}
                currentUserId={currentUserId}
                senderImg={senderImage}
                receiverImg={receiverImage}
                senderName={senderName}
                receiverName={receiverName}
              />
            ))}
      </CardBody>
      <CardFooter className="glass ash-mesh px-8 py-4">
        <MessageForm />
      </CardFooter>
    </div>
  );
};

export default MessageList;
