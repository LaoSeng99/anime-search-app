export const getYoutubeIdFromUrl = (url: string): string | null => {
  const regex = /\/embed\/([^/?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
