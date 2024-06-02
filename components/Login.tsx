import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
} from "@nextui-org/react";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div
      className="flex items-center justify-center h-screen w-full
      -translate-y-15
    
    "
    >
      <Card
        shadow="sm"
        className="glass ash-mesh sm:w-[50%] mx-auto px-10 py-5 w-[100%]"
      >
        <CardHeader className="flex items-center justify-center gap-1">
          <Lock size={24} />
          <span className="text-center text-xl">Login</span>
        </CardHeader>

        <CardBody className="w-full">
          <form action="" className="space-y-4">
            <Input type="email" label="Email" />
            <Input type="password" label="Password" />
            <Button color="primary" variant="bordered" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-2">
            <span>Don't have an account? </span>
            <Link href="/register" className="text-blue-500/90">
              Register
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
