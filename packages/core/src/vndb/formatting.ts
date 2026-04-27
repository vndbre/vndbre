const vndbLinkPattern = /\[url=([^\]]+)\]([^[]+)\[\/url]/gi;
const vndbTagPattern = /\[[^\]]+\]/g;

export function stripVndbFormatting(value: string | null) {
  if (value === null) {
    return null;
  }

  return value
    .replace(vndbLinkPattern, "$2 ($1)")
    .replace(vndbTagPattern, "")
    .replace(/\r\n/g, "\n")
    .trim();
}
