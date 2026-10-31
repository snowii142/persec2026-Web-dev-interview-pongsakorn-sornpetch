import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { fromRoman, toRoman } from "./index.ts";

const conversions: ReadonlyArray<{ value: number; roman: string }> = [
  // ตัวอย่างจากโจทย์
  { value: 1989, roman: "MCMLXXXIX" },
  { value: 2000, roman: "MM" },
  { value: 68, roman: "LXVIII" },
  { value: 109, roman: "CIX" },

  // รูปแบบการลบ
  { value: 4, roman: "IV" },
  { value: 9, roman: "IX" },
  { value: 40, roman: "XL" },
  { value: 90, roman: "XC" },
  { value: 400, roman: "CD" },
  { value: 900, roman: "CM" },

  // ค่าต่ำสุดและสูงสุด
  { value: 1, roman: "I" },
  { value: 3999, roman: "MMMCMXCIX" },
];

const invalidValues: readonly number[] = [
  0,
  -1,
  1.5,
  4000,
  Number.NaN,
  Number.POSITIVE_INFINITY,
];

const invalidRomans: readonly string[] = [
  "",
  "IIII",
  "VV",
  "VX",
  "IC",
  "IL",
  "XD",
  "LC",
  "DM",
  "IXI",
  "MMMM",
  "xiv",
  "ABC",
  " X",
  "X\n",
];

describe("ข้อ 4: toRoman", () => {
  for (const { value, roman } of conversions) {
    test(`${value} => ${roman}`, () => {
      assert.equal(toRoman(value), roman);
    });
  }

  for (const value of invalidValues) {
    test(`${value} ต้อง throw RangeError`, () => {
      assert.throws(() => toRoman(value), RangeError);
    });
  }
});

describe("ข้อ 4: fromRoman", () => {
  for (const { value, roman } of conversions) {
    test(`${roman} => ${value}`, () => {
      assert.equal(fromRoman(roman), value);
    });
  }

  for (const roman of invalidRomans) {
    test(`${JSON.stringify(roman)} ต้อง throw SyntaxError`, () => {
      assert.throws(() => fromRoman(roman), SyntaxError);
    });
  }
});

test("ข้อ 4: แปลงไปกลับได้ค่าเดิมตั้งแต่ 1 ถึง 3999", () => {
  for (let value = 1; value <= 3999; value++) {
    assert.equal(fromRoman(toRoman(value)), value);
  }
});
