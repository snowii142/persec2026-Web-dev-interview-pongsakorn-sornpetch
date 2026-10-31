import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { sortDigitsDescending } from "./index.ts";

const cases: ReadonlyArray<{ title: string; input: number; expected: number }> = [
  // ตัวอย่างจากโจทย์
  { title: "มีเลข 0 ซ้ำ", input: 3008, expected: 8300 },
  { title: "มีเลขซ้ำ", input: 1989, expected: 9981 },
  { title: "ไม่มีเลขซ้ำ", input: 2679, expected: 9762 },
  { title: "เลขไม่เรียงกัน", input: 9163, expected: 9631 },

  // กรณีเพิ่มเติม
  { title: "หลักเดียว", input: 7, expected: 7 },
  { title: "เลขเดียวกันทุกหลัก", input: 1111, expected: 1111 },
  { title: "เรียงอยู่แล้ว", input: 321, expected: 321 },
  { title: "ลงท้ายด้วย 0", input: 100, expected: 100 },
  {
    title: "ผลลัพธ์ใหญ่แต่ยังปลอดภัย",
    input: 1000000000000008,
    expected: 8100000000000000,
  },
];

const invalidInputs: readonly number[] = [
  0,
  -1,
  1.5,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  Number.MAX_SAFE_INTEGER + 1,
];

describe("ข้อ 5: sortDigitsDescending", () => {
  for (const { title, input, expected } of cases) {
    test(`${title}: ${input} => ${expected}`, () => {
      assert.equal(sortDigitsDescending(input), expected);
    });
  }

  for (const input of invalidInputs) {
    test(`${input} ต้อง throw RangeError`, () => {
      assert.throws(() => sortDigitsDescending(input), RangeError);
    });
  }

  test("ค่ารับปลอดภัยแต่ผลลัพธ์เกินค่าปลอดภัย ต้อง throw RangeError", () => {
    assert.throws(() => sortDigitsDescending(1000000000000009), RangeError);
  });
});
