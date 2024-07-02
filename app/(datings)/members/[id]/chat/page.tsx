import { getMessageThread } from "@/actions/messageAction";
import MessageBox from "@/components/MessageBox";
import MessageForm from "@/components/MessageForm";
import { loadToxicityModel } from "@/utils/loadToxicityMode";
import { getMember } from "@/utils/members";
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

  console.log(chats);
  if (!chats) return;

  const senderImage = user?.image;
  const receiverImage = chats.find((chat) => chat.senderId !== user.id)?.sender
    .image;
  const senderName = user?.firstName;
  const receiverObj = await getMember(params.id);
  const receiverName = receiverObj?.firstName;

  return (
    <>
      <div className="glass light-blue-mesh h-[100vh] flex flex-col">
        <CardHeader className="text-3xl font-bold">Chat</CardHeader>
        <Divider />
        <CardBody className="flex-1 overflow-y-scroll ">
          {chats.length === 0
            ? "No messages to display"
            : chats.map((chat) => (
                <MessageBox
                  key={chat.id}
                  message={chat}
                  currentUserId={user.id}
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
    </>
  );
};

export default page;
