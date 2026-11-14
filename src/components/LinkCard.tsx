"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** DB에서 불러온 클릭 수. 아직 불러오는 중이면 생략(0회로 표시). */
  initialCount?: number;
};

export default function LinkCard({ link, initialCount = 0 }: Props) {
  const [extraClicks, setExtraClicks] = useState(0);

  function recordClick() {
    setExtraClicks((c) => c + 1);
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 사용
    navigator.sendBeacon(`/api/click/${encodeURIComponent(link.id)}`);
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      onAuxClick={(e) => {
        if (e.button === 1) recordClick(); // 휠 클릭(새 탭)
      }}
      className="relative flex min-h-16 items-center justify-center rounded-3xl border border-glass-border bg-glass px-6 py-4 shadow-[0_8px_24px_-12px_var(--shadow)] backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-glass-hover active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transform-none"
    >
      <span className="text-base font-semibold">{link.title}</span>
      <span className="absolute right-5 text-xs tabular-nums text-foreground/45">
        {(initialCount + extraClicks).toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
