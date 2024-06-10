import { getAllLikesByLoginMember } from "@/actions/likeActions";
import MemberCard from "@/components/MemberCard";

import { getMembers } from "@/utils/members";
import { getUser } from "@/utils/user";

const MembersPage = async () => {
  const user = await getUser();
  const likes = await getAllLikesByLoginMember();

  if (!user) return null;

  const members = await getMembers(user.id);
  return (
    <div
      className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-4 container mx-auto px-4 sm:px-0 w-[50%] sm:w-[100%] 
    "
    >
      <>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} likes={likes} />
        ))}
      </>
    </div>
  );
};

export default MembersPage;
