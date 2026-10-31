import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { isValid } from "./index.ts";

const cases: ReadonlyArray<{ title: string; input: string; expected: boolean }> = [
  // ตัวอย่างจากโจทย์
  { title: "คู่เดียว", input: "()", expected: true },
  { title: "เปิด 3 ตัวแต่ปิดตัวเดียว", input: "([{)", expected: false },
  { title: "ตัวปิดสุดท้ายผิดชนิด", input: "([]]", expected: false },
  { title: "ซ้อนกันครบทุกชนิด", input: "([{}])", expected: true },
  { title: "ซ้อนกันแล้วตัวปิดสุดท้ายผิดชนิด", input: "([[{}]]]", expected: false },
  { title: "มีแค่ตัวปิด", input: ")", expected: false },
  { title: "ตัวปิดผิดชนิดตั้งแต่คู่แรก", input: "(]}])", expected: false },
  { title: "ชนิดถูกแต่ลำดับปิดสลับกัน", input: "([)]", expected: false },
  { title: "มีแค่ตัวเปิด", input: "{", expected: false },

  // กรณีเพิ่มเติม
  { title: "string ว่าง", input: "", expected: true },
  { title: "หลายคู่เรียงต่อกัน", input: "()[]{}", expected: true },
  { title: "ปิดก่อนเปิด", input: ")(", expected: false },
  { title: "ครบคู่แล้วมีตัวปิดเกิน", input: "()]", expected: false },
  { title: "ครบคู่แล้วมีตัวเปิดค้าง", input: "()[", expected: false },
];

describe("ข้อ 1: isValid", () => {
  for (const { title, input, expected } of cases) {
    test(`${title}: ${JSON.stringify(input)} => ${expected}`, () => {
      assert.equal(isValid(input), expected);
    });
  }
});
