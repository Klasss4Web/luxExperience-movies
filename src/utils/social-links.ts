export const returnFacebookLink = (pageUrl: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    pageUrl,
  )}`;
};

export const returnTwitterLink = (
  pageUrl: string,
  description: string,
  hashtags?: string[],
): string => {
  const tags = hashtags?.join(",") ?? "";

  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    pageUrl,
  )}&text=${encodeURIComponent(description)}&hashtags=${encodeURIComponent(
    tags,
  )}`;
};
