const CODE_PATTERN = /^(\D*)(\d*)(.*)$/s;

type ParsedCode = {
  prefix: string;
  number: number;
  suffix: string;
};

function parseCode(code: string): ParsedCode {
  const [, prefix = "", digits = "", suffix = ""] = code.match(CODE_PATTERN) ?? [];

  return { prefix, number: Number(digits), suffix };
}

function compareText(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

function compareCodes(a: string, b: string): number {
  const left = parseCode(a);
  const right = parseCode(b);

  return (
    compareText(left.prefix, right.prefix) ||
    left.number - right.number ||
    compareText(left.suffix, right.suffix)
  );
}

export function sortCodes(codes: readonly string[]): string[] {
  return [...codes].sort(compareCodes);
}
