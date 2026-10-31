import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { sortCodes } from "./index.ts";

const cases: ReadonlyArray<{ title: string; input: string[]; expected: string[] }> = [
  // ตัวอย่างจากโจทย์
  {
    title: "เรียงตามตัวอักษรก่อนแล้วจึงเรียงตามตัวเลข",
    input: ["TH19", "SG20", "TH2"],
    expected: ["SG20", "TH2", "TH19"],
  },
  {
    title: "มีข้อความต่อท้ายตัวเลข",
    input: ["TH10", "TH3Netflix", "TH1", "TH7"],
    expected: ["TH1", "TH3Netflix", "TH7", "TH10"],
  },

  // กรณีเพิ่มเติม
  { title: "array ว่าง", input: [], expected: [] },
  { title: "มีตัวเดียว", input: ["TH1"], expected: ["TH1"] },
  { title: "เทียบตัวเลขแบบค่า ไม่ใช่แบบข้อความ", input: ["TH10", "TH9"], expected: ["TH9", "TH10"] },
  { title: "ข้อมูลซ้ำกัน", input: ["TH2", "TH1", "TH2"], expected: ["TH1", "TH2", "TH2"] },
  {
    title: "ตัวเลขเท่ากันให้เรียงตามข้อความต่อท้าย",
    input: ["TH3Netflix", "TH3", "TH3Apple"],
    expected: ["TH3", "TH3Apple", "TH3Netflix"],
  },
];

describe("ข้อ 2: sortCodes", () => {
  for (const { title, input, expected } of cases) {
    test(`${title}: ${JSON.stringify(input)}`, () => {
      assert.deepEqual(sortCodes(input), expected);
    });
  }

  test("ไม่แก้ไข array ที่รับเข้ามา", () => {
    const input = ["TH2", "TH1"];

    sortCodes(input);

    assert.deepEqual(input, ["TH2", "TH1"]);
  });
});
