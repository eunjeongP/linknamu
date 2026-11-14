import Image from "next/image";
import type { Profile as ProfileData } from "@/data/profile";

export default function Profile({ profile }: { profile: ProfileData }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.image}
        alt={`${profile.name} 프로필 사진`}
        width={256}
        height={256}
        priority
        className="size-56 rounded-full border-2 border-foreground/80 object-cover sm:size-64"
      />
      <h1 className="mt-8 text-2xl font-bold">{profile.name}</h1>
      <p className="mt-4 text-lg text-foreground/70">{profile.bio}</p>
    </header>
  );
}
