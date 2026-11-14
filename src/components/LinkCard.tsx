"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** 클릭 수를 아직 불러오는 중이면 undefined */
  initialCount?: number;
};

export default function LinkCard({ link, initialCount }: Props) {
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
      className="relative flex min-h-16 items-center justify-center rounded-2xl border-2 border-foreground/80 bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:bg-foreground/5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <span className="text-lg font-medium">{link.title}</span>
      {initialCount !== undefined && (
        <span className="absolute right-4 text-xs tabular-nums text-foreground/50">
          클릭 {(initialCount + extraClicks).toLocaleString("ko-KR")}
        </span>
      )}
    </a>
  );
}
