import { useParams } from "react-router-dom";
import { profileMap } from "@/data";
import { ProfilePage } from "@/components/profilePage";

export default function ProfileLoader() {
  const { slug } = useParams();

  const profile = slug ? profileMap[slug] : null;

  if (!profile) {
    return <div className="p-10 text-center">Page not found</div>;
  }

  return <ProfilePage data={profile} />;
}