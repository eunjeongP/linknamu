import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
  /** 아직 불러오는 중이면 생략 (클릭 수 표시 없이 링크만 보여 준다) */
  counts?: Record<string, number>;
};

export default function LinkList({ links, counts }: Props) {
  return (
    <ul className="flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} initialCount={counts && (counts[link.id] ?? 0)} />
        </li>
      ))}
    </ul>
  );
}
