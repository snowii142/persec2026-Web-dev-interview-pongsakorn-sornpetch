const MATCH_RANK = {
  start: 0,
  middle: 1,
  end: 2,
} as const;

function containsKeyword(item: string, keyword: string): boolean {
  return item.toLowerCase().includes(keyword);
}

function getMatchRank(item: string, keyword: string): number {
  const position = item.toLowerCase().indexOf(keyword);

  if (position === 0) {
    return MATCH_RANK.start;
  }

  return position + keyword.length === item.length
    ? MATCH_RANK.end
    : MATCH_RANK.middle;
}

export function autocomplete(
  search: string,
  items: readonly string[],
  maxResult: number,
): string[] {
  const keyword = search.toLowerCase();

  return items
    .filter((item) => containsKeyword(item, keyword))
    .sort((a, b) => getMatchRank(a, keyword) - getMatchRank(b, keyword))
    .slice(0, Math.max(maxResult, 0));
}

console.log(autocomplete('th', ['Mother', 'Think', 'Mathbath', 'Bath'], 3));
