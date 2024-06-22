import { transformImageUrl } from "@/utils/transformImageUrl";
import { Avatar } from "@nextui-org/react";
import { Message } from "@prisma/client";
import clsx from "clsx";

type Props = {
  message: Message;
  currentUserId: string;
  senderImg: string;
  receiverImg: string;
};

const MessageBox = ({
  message,
  currentUserId,
  senderImg,
  receiverImg,
}: Props) => {
  const isCurrentUser = message.senderId === currentUserId;

  console.log("sender", currentUserId);

  return (
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
        <div>Message Content</div>
        {isCurrentUser && (
          <Avatar src={transformImageUrl(senderImg)} className="self-end" />
        )}
      </div>
    </div>
  );
};

export default MessageBox;
