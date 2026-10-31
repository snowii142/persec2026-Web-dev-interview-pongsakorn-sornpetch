const MIN_VALUE = 1;
const MAX_VALUE = 3999;

const NUMERALS: ReadonlyArray<readonly [symbol: string, value: number]> = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

const STANDARD_FORM = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

function isConvertibleValue(value: number): boolean {
  return Number.isInteger(value) && value >= MIN_VALUE && value <= MAX_VALUE;
}

function isStandardForm(roman: string): boolean {
  return roman !== "" && STANDARD_FORM.test(roman);
}

export function toRoman(value: number): string {
  if (!isConvertibleValue(value)) {
    throw new RangeError(
      `ต้องเป็นจำนวนเต็ม ${MIN_VALUE}-${MAX_VALUE} แต่ได้รับ ${value}`,
    );
  }

  let roman = "";
  let remaining = value;

  for (const [symbol, symbolValue] of NUMERALS) {
    while (remaining >= symbolValue) {
      roman += symbol;
      remaining -= symbolValue;
    }
  }

  return roman;
}

export function fromRoman(roman: string): number {
  if (!isStandardForm(roman)) {
    throw new SyntaxError(`ไม่ใช่เลขโรมันรูปแบบมาตรฐาน: "${roman}"`);
  }

  let value = 0;
  let position = 0;

  for (const [symbol, symbolValue] of NUMERALS) {
    while (roman.startsWith(symbol, position)) {
      value += symbolValue;
      position += symbol.length;
    }
  }

  return value;
}

console.log(toRoman(2000));
console.log(fromRoman("MMXXIV"));