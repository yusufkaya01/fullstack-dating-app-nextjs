import MessageForm from "@/components/MessageForm";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

const page = () => {
  return (
    <>
      <div className="glass light-blue-mesh h-full">
        <CardHeader className="text-3xl font-bold ">Chat</CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-5 gap-3">chat goes here</CardBody>
      </div>
      <CardFooter className="glass ash-mesh px-8 py-4">
        <MessageForm />
      </CardFooter>
    </>
  );
};

export default page;
