import EditProfileForm from "@/components/EditProfileForm";
import { getMember } from "@/utils/members";
import { getUser } from "@/utils/user";

const EditPage = async () => {
  const user = await getUser();
  if (!user) return;
  const member = await getMember(user.id);
  return (
    <div className="glass light-blue-mesh h-full">
      <EditProfileForm member={member} />
    </div>
  );
};

export default EditPage;
