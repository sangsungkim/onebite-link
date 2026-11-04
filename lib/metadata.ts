import type { Metadata } from "next";

export const SITE_NAME = "한입 링크";
export const SITE_DESCRIPTION = "북마크 서비스";
export const OG_IMAGE = "/thumbnail.png";

// Next.js는 페이지에서 openGraph/twitter를 지정하면 레이아웃의 값을 병합하지 않고
// 통째로 덮어쓴다. 그래서 이미지까지 포함한 전체 객체를 여기서 만든다.
export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  absoluteTitle = false,
}: {
  title: string;
  description?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "ko_KR",
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
