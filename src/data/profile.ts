export type Profile = {
  name: string;
  bio: string;
  image: string;
};

export type LinkItem = {
  /** 클릭 수 집계에 쓰는 고유 키. 한번 정하면 바꾸지 마세요. */
  id: string;
  title: string;
  url: string;
};

// 아래 내용을 내 정보로 바꿔 주세요.
export const profile: Profile = {
  name: "뽀로로",
  bio: "노는 게 제일 좋아",
  image: "/profile.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://example.com/blog" },
];
