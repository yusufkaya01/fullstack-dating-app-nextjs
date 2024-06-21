import { getMessageThread } from "@/actions/messageAction";
import MessageForm from "@/components/MessageForm";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

const page = async ({ params }: { params: { id: string } }) => {
  const chats = await getMessageThread(params.id);
  if (!chats) return;
  return (
    <>
      <div className="glass light-blue-mesh h-full">
        <CardHeader className="text-3xl font-bold ">Chat</CardHeader>
        <Divider />
        {chats.length === 0
          ? "No messages to display"
          : chats.map((chat) => (
              <div key={chat.id}>
                <CardBody>
                  <p className="mt-1">{chat.text}</p>
                </CardBody>
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
