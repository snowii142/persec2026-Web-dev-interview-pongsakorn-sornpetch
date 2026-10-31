import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { tribonacci } from "./index.ts";

const cases: ReadonlyArray<{
  title: string;
  seed: number[];
  count: number;
  expected: number[];
}> = [
  // ตัวอย่างจากโจทย์
  {
    title: "ต่อจากค่าเริ่มต้น",
    seed: [1, 3, 5],
    count: 5,
    expected: [1, 3, 5, 9, 17],
  },
  { title: "จำนวนเท่ากับค่าเริ่มต้น", seed: [2, 2, 2], count: 3, expected: [2, 2, 2] },
  {
    title: "เพิ่มหนึ่งตัว",
    seed: [10, 10, 10],
    count: 4,
    expected: [10, 10, 10, 30],
  },
  {
    title: "ลำดับตัวอย่าง [1, 1, 1]",
    seed: [1, 1, 1],
    count: 6,
    expected: [1, 1, 1, 3, 5, 9],
  },
  // โจทย์เขียน [2, 3, 1, 6, 9, 16] แต่ 3 + 1 + 6 = 10 จึงยึดตามกฎการบวก 3 ตัว
  {
    title: "ลำดับตัวอย่าง [2, 3, 1]",
    seed: [2, 3, 1],
    count: 6,
    expected: [2, 3, 1, 6, 10, 17],
  },
  { title: "ค่าเริ่มต้นมี 0", seed: [5, 2, 0], count: 5, expected: [5, 2, 0, 7, 9] },
  { title: "ค่าเริ่มต้น [3, 4, 1]", seed: [3, 4, 1], count: 4, expected: [3, 4, 1, 8] },

  // ค่าเริ่มต้นไม่ครบ 3 ตัว นับตัวที่ขาดเป็น 0
  { title: "ไม่มีค่าเริ่มต้น", seed: [], count: 5, expected: [0, 0, 0, 0, 0] },
  { title: "ค่าเริ่มต้นตัวเดียว", seed: [1], count: 5, expected: [1, 1, 2, 4, 7] },
  { title: "ค่าเริ่มต้นสองตัว", seed: [1, 2], count: 5, expected: [1, 2, 3, 6, 11] },

  // จำนวนน้อยกว่าค่าเริ่มต้น
  { title: "จำนวนเป็น 0", seed: [1, 3, 5], count: 0, expected: [] },
  { title: "ตัดให้เหลือตามจำนวน", seed: [1, 3, 5], count: 2, expected: [1, 3] },
  { title: "ไม่มีค่าเริ่มต้นและจำนวนเป็น 0", seed: [], count: 0, expected: [] },

  // ค่าติดลบ
  { title: "ค่าเริ่มต้นติดลบ", seed: [-1, 2, 3], count: 4, expected: [-1, 2, 3, 4] },
];

const invalidInputs: ReadonlyArray<{
  title: string;
  seed: number[];
  count: number;
}> = [
  { title: "ค่าเริ่มต้นเกิน 3 ตัว", seed: [1, 2, 3, 4], count: 5 },
  { title: "ค่าเริ่มต้นเป็นทศนิยม", seed: [1.5], count: 2 },
  { title: "จำนวนติดลบ", seed: [1], count: -1 },
  { title: "จำนวนเป็นทศนิยม", seed: [1], count: 1.5 },
  { title: "จำนวนเป็น NaN", seed: [1], count: Number.NaN },
  {
    title: "ผลรวมเกินค่าปลอดภัย",
    seed: [Number.MAX_SAFE_INTEGER, 1],
    count: 3,
  },
];

describe("ข้อ 6: tribonacci", () => {
  for (const { title, seed, count, expected } of cases) {
    test(`${title}: f(${JSON.stringify(seed)}, ${count})`, () => {
      assert.deepEqual(tribonacci(seed, count), expected);
    });
  }

  for (const { title, seed, count } of invalidInputs) {
    test(`${title} ต้อง throw RangeError`, () => {
      assert.throws(() => tribonacci(seed, count), RangeError);
    });
  }

  test("ไม่แก้ไข array ที่รับเข้ามา", () => {
    const seed = [1, 3, 5];

    tribonacci(seed, 5);

    assert.deepEqual(seed, [1, 3, 5]);
  });
});
