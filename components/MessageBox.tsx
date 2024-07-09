"use client";
import { transformImageUrl } from "@/utils/transformImageUrl";
import { Avatar, Image } from "@nextui-org/react";
import { Message } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  message: Message;
  currentUserId: string;
  senderImg: string;
  receiverImg: string;
  senderName: string;
  receiverName: string;
};

const MessageBox = ({
  message,
  currentUserId,
  senderImg,
  receiverImg,
  senderName,
  receiverName,
}: Props) => {
  const isCurrentUser = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  const messageContentClasses = clsx("flex flex-col w-[100%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white  glass dark-blue-mesh":
      isCurrentUser,
    "rounded-r-xl rounded-tl-xl border-gray-200 glass light-blue-mesh text-white":
      !isCurrentUser,
  });

  const renderMessageHeader = () => {
    const date = new Date(message.createdAt);
    const isValidDate = !isNaN(date.getTime());

    return (
      <div
        className={clsx("flex items-center w-full", {
          "justify-between": isCurrentUser,
        })}
      >
        {message.dateSeen && message.receiverId !== currentUserId ? (
          <span className="text-xs text-gray-100/70 text-italic">
            (Read {new Date(message.dateSeen).toLocaleString()})
          </span>
        ) : (
          <div></div>
        )}
        <div className="flex items-center justify-center gap-5">
          <span className="text-sm font-semibold text-gray-100/90">
            {isCurrentUser ? senderName : receiverName}
          </span>
          <span className="text-sm text-gray-400/90 ml-2">
            {isValidDate
              ? date.toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })
              : "Invalid Date"}
          </span>
        </div>
      </div>
    );
  };

  const renderMessageContent = () => {
    return (
      <div className={messageContentClasses}>
        {renderMessageHeader()}
        <div className="text-sm py-3 text-gray-200/90">
          {message.text ? (
            message.text
          ) : (
            <Image
              src={transformImageUrl(message.photo?.url)}
              width={200}
              height={200}
              alt="message-image"
            />
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageEndRef]);

  return (
    <>
      <div className="grid grid-rows-1">
        <div
          className={clsx("flex gap-2 mb-3", {
            "justify-end text-right": isCurrentUser,
            "justify-start": !isCurrentUser,
          })}
        >
          {!isCurrentUser && (
            <Avatar src={transformImageUrl(receiverImg)} className="self-end" />
          )}
          <div>{renderMessageContent()}</div>
          {isCurrentUser && (
            <Avatar src={transformImageUrl(senderImg)} className="self-end" />
          )}
        </div>
        <div ref={messageEndRef} />
      </div>
    </>
  );
};

export default MessageBox;
