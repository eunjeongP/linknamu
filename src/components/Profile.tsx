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
        className="size-28 rounded-full object-cover shadow-[0_18px_40px_-12px_var(--shadow),0_4px_10px_-4px_var(--shadow)] ring-4 ring-glass-border sm:size-32"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 text-base leading-relaxed text-balance break-keep text-foreground/65">
        {profile.bio}
      </p>
    </header>
  );
}
