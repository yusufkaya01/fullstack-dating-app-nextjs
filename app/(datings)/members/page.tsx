import MemberCard from "@/components/MemberCard";
import { getMembers } from "@/utils/members";

const MembersPage = async () => {
  const members = await getMembers();
  console.log(members);
  return (
    <div
      className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      gap-4 container mx-auto px-4 sm:px-0 w-[50%] sm:w-[100%] 
    "
    >
      <>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </>
    </div>
  );
};

export default MembersPage;
