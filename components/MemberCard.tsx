import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import LikeButton from "./LikeButton";

type MemberProps = {
  member: Member;
  likes: string[];
};

const MemberCard = ({ member, likes }: MemberProps) => {
  const isLiked = likes.includes(member.userId);
  return (
    <Card
      as={Link}
      href={`/members/${member.userId}`}
      isPressable
      className="
        flex
        flex-col
        items-center
        justify-center
        space-y-2
        w-[300px]
        glass
        rounded-lg
        shadow-lg
        dark-blue-mesh
    "
    >
      <Image
        alt={member.firstName}
        isZoomed
        width={300}
        src={member.image as string}
        className="aspect-square object-cover
        "
      />
      <div className="absolute top-3 right-3 z-50">
        <LikeButton targetId={member.userId} isLiked={isLiked} />
      </div>
      <CardFooter>
        <div
          className="
          space-y-1

         
        "
        >
          <h1>
            {member.firstName + " " + member.lastName} -{" "}
            {new Date().getFullYear() -
              new Date(member.dateOfBirth).getFullYear()}
          </h1>
          <p>{member.city}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
