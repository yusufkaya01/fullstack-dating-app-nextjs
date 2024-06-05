import { getMembers } from "@/utils/members";

const MembersPage = async () => {
  const members = await getMembers();
  console.log(members);
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <>
        {members.map((member) => (
          <div key={member.id}>
            <h1>{member.firstName + " " + member.lastName}</h1>
            <p>{member.city}</p>
          </div>
        ))}
      </>
    </div>
  );
};

export default MembersPage;
