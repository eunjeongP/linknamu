import type { Metadata } from "next";
import { profile } from "@/data/profile";
// 한글이 포함된 Pretendard를 필요한 글자 묶음만 내려받도록(dynamic subset) 불러온다.
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: profile.bio,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
