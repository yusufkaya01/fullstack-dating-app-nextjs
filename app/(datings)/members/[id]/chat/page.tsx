import { getMessageThread } from "@/actions/messageAction";
import MessageBox from "@/components/MessageBox";
import MessageForm from "@/components/MessageForm";
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

  return (
    <>
      <div className="glass light-blue-mesh h-full">
        <CardHeader className="text-3xl font-bold ">Chat</CardHeader>
        <Divider />
        {chats.length === 0
          ? "No messages to display"
          : chats.map((chat) => (
              <div key={chat.id}>
                <MessageBox
                  message={chat}
                  currentUserId={user.id}
                  senderImg={senderImage}
                  receiverImg={receiverImage}
                />
              </div>
            ))}
      </div>
      <CardFooter className="glass ash-mesh px-8 py-4">
        <MessageForm />
      </CardFooter>
    </>
  );
};

export default page;
