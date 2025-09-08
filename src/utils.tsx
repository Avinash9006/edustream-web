export function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}
