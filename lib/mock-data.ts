export type Folder = { id: string; name: string; count: number };
export type Link = {
  id: string;
  title: string;
  description: string;
  url: string;
  folderId: string;
  thumbnail?: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 3 },
  { id: "read", name: "읽을거리", count: 2 },
];

export const links: Link[] = [
  { id: "1", title: "Next.js 공식 문서", description: "React 프레임워크 Next.js의 공식 문서입니다.", url: "https://nextjs.org", folderId: "dev" },
  { id: "2", title: "Tailwind CSS", description: "유틸리티 우선 CSS 프레임워크.", url: "https://tailwindcss.com", folderId: "dev" },
  { id: "3", title: "React 문서", description: "React 라이브러리 공식 레퍼런스.", url: "https://react.dev", folderId: "dev" },
  { id: "4", title: "MDN Web Docs", description: "웹 기술에 대한 신뢰할 수 있는 문서.", url: "https://developer.mozilla.org", folderId: "dev" },
  { id: "5", title: "Figma", description: "협업 디자인 도구.", url: "https://figma.com", folderId: "design" },
  { id: "6", title: "Dribbble", description: "디자인 영감을 얻는 커뮤니티.", url: "https://dribbble.com", folderId: "design" },
  { id: "7", title: "Refactoring UI", description: "개발자를 위한 UI 디자인 팁.", url: "https://refactoringui.com", folderId: "design" },
  { id: "8", title: "Hacker News", description: "개발자 뉴스와 토론.", url: "https://news.ycombinator.com", folderId: "read" },
  { id: "9", title: "Velog", description: "개발자 블로그 플랫폼.", url: "https://velog.io", folderId: "read" },
];
