import { getMessageThread } from "@/actions/messageAction";
import MessageBox from "@/components/MessageBox";
import MessageForm from "@/components/MessageForm";
import MessageList from "@/components/MessageList";
import { loadToxicityModel } from "@/utils/loadToxicityMode";
import { getMember } from "@/utils/members";
import { createChatId } from "@/utils/pusher";
import { getAllMembers } from "@/utils/recommendation";
import { getUser } from "@/utils/user";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

const page = async ({ params }: { params: { id: string } }) => {
  const chats = await getMessageThread(params.id);
  const user = await getUser();

  if (!user) return;

  console.log(chats);
  if (!chats) return;

  const senderImage = user?.image;
  const receiverImage = chats.find((chat) => chat.senderId !== user.id)?.sender
    .image;
  const senderName = user?.firstName;
  const receiverObj = await getMember(params.id);
  const receiverName = receiverObj?.firstName;

  const chatId = createChatId(user.id, params.id);

  return (
    <>
      <MessageList
        chats={chats}
        currentUserId={user.id}
        senderImage={senderImage}
        receiverImage={receiverImage}
        senderName={senderName}
        receiverName={receiverName}
        chatId={chatId}
      />
    </>
  );
};

export default page;
