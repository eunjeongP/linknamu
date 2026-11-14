import { Suspense } from "react";
import { connection } from "next/server";
import LinkList from "@/components/LinkList";
import Profile from "@/components/Profile";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 클릭 수는 요청마다 최신 값을 읽는다 (빌드 시점에 고정하지 않음).
async function LinkListWithCounts() {
  await connection();
  const counts = await getClickCounts();
  return <LinkList links={links} counts={counts} />;
}

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div aria-hidden className="page-backdrop" />
      <section className="flex w-full max-w-md flex-col items-center gap-10 sm:gap-12">
        <Profile profile={profile} />
        {/* 프로필과 링크는 즉시 보여 주고, 클릭 수는 DB 조회가 끝나면 채운다. */}
        <Suspense fallback={<LinkList links={links} />}>
          <LinkListWithCounts />
        </Suspense>
      </section>
    </main>
  );
}
