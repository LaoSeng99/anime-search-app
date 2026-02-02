export const getYoutubeIdFromUrl = (url: string): string | null => {
  const regex = /\/embed\/([^/?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getYoutubeVideoUrl = (url: string): string => {
  const id = getYoutubeIdFromUrl(url);

  return `https://www.youtube.com/watch?v=${id}`;
};

export const getLastSegment = (path: string) =>
  path.split('/').filter(Boolean).pop() || '';
