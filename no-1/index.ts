const OPENING_BY_CLOSING: ReadonlyMap<string, string> = new Map([
  [")", "("],
  ["]", "["],
  ["}", "{"],
]);

function isClosing(symbol: string): boolean {
  return OPENING_BY_CLOSING.has(symbol);
}

function isMatchingPair(opening: string | undefined, closing: string): boolean {
  return OPENING_BY_CLOSING.get(closing) === opening;
}

export function isValid(input: string): boolean {
  const unclosed: string[] = [];

  for (const symbol of input) {
    if (!isClosing(symbol)) {
      unclosed.push(symbol);
      continue;
    }

    if (!isMatchingPair(unclosed.pop(), symbol)) {
      return false;
    }
  }

  return unclosed.length === 0;
}
