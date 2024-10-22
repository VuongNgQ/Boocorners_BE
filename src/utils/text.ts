export function truncateTextMiddle(
  text: string,
  maxLength: number,
  minChars: number = 36,
  addEllipsis: boolean = true
): string {
  if (text.length <= maxLength || maxLength < minChars) {
    return text;
  }

  const ellipsisLength = addEllipsis ? 3 : 0;
  const keepLength = minChars - ellipsisLength; // Minimum number of characters to keep around the ellipsis

  const halfLength = Math.floor(keepLength / 2);
  const start = text.slice(0, halfLength);
  const end = text.slice(text.length - halfLength);

  return addEllipsis ? `${start}...${end}` : `${start}${end}`;
}
