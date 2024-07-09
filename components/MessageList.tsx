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

  const handleReadMessage = useCallback((messageIds: string[]) => {
    setMessages((prevState) => {
      return prevState.map((msg) => {
        if (messageIds.includes(msg.id)) {
          return { ...msg, dateSeen: new Date() };
        }
        return msg;
      });
    });
    console.log(messageIds);
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);
    channel.bind("messages:read", handleReadMessage);
    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
      channel.unbind("messages:read", handleReadMessage);
    };
  }, [chatId, handleNewMessage, handleReadMessage]);

  useEffect(() => {
    console.log(messages); // Add this line to check messages in the console
  }, [messages]);

  return (
    <div className="glass light-blue-mesh h-[100vh] flex flex-col">
      <CardHeader className="text-3xl font-bold">Chat</CardHeader>
      <Divider />
      <CardBody className="flex-1 overflow-y-scroll ">
        {messages.length === 0
          ? "No messages to display"
          : messages.map((msg, index) => (
              <MessageBox
                key={msg.id || index}
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
