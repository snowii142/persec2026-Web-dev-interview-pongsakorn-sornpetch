import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { autocomplete } from "./index.ts";

const cases: ReadonlyArray<{
  title: string;
  search: string;
  items: string[];
  maxResult: number;
  expected: string[];
}> = [
  // ตัวอย่างจากโจทย์
  {
    title: "เรียงตามตำแหน่งแล้วตัดตาม maxResult",
    search: "th",
    items: ["Mother", "Think", "Worthy", "Apple", "Android"],
    maxResult: 2,
    expected: ["Think", "Mother"],
  },

  // กรณีเพิ่มเติม
  {
    title: "เรียงขึ้นต้น กลางคำ และท้ายคำ",
    search: "th",
    items: ["Bath", "Mother", "Think"],
    maxResult: 3,
    expected: ["Think", "Mother", "Bath"],
  },
  {
    title: "ไม่สนตัวพิมพ์เล็กใหญ่และคืนคำตามต้นฉบับ",
    search: "tH",
    items: ["BATH", "THINK"],
    maxResult: 2,
    expected: ["THINK", "BATH"],
  },
  {
    title: "กลุ่มเดียวกันคงลำดับเดิม",
    search: "th",
    items: ["Worthy", "Mother"],
    maxResult: 2,
    expected: ["Worthy", "Mother"],
  },
  {
    title: "พบทั้งกลางคำและท้ายคำให้นับเป็นกลางคำ",
    search: "th",
    items: ["Bath", "Mathbath"],
    maxResult: 2,
    expected: ["Mathbath", "Bath"],
  },
  {
    title: "คำตรงกับ search ทั้งคำนับเป็นขึ้นต้น",
    search: "th",
    items: ["Mother", "th"],
    maxResult: 2,
    expected: ["th", "Mother"],
  },
  {
    title: "ไม่พบคำที่ตรง",
    search: "xyz",
    items: ["Mother", "Think"],
    maxResult: 2,
    expected: [],
  },
  {
    title: "maxResult มากกว่าจำนวนผลลัพธ์",
    search: "th",
    items: ["Think"],
    maxResult: 5,
    expected: ["Think"],
  },
  {
    title: "maxResult เป็น 0",
    search: "th",
    items: ["Think"],
    maxResult: 0,
    expected: [],
  },
  {
    title: "maxResult ติดลบ",
    search: "th",
    items: ["Think", "Mother"],
    maxResult: -1,
    expected: [],
  },
  {
    title: "items ว่าง",
    search: "th",
    items: [],
    maxResult: 2,
    expected: [],
  },
  {
    title: "search ว่างคืนทุกคำตามลำดับเดิม",
    search: "",
    items: ["Mother", "Apple", "Think"],
    maxResult: 2,
    expected: ["Mother", "Apple"],
  },
];

describe("ข้อ 3: autocomplete", () => {
  for (const { title, search, items, maxResult, expected } of cases) {
    test(title, () => {
      assert.deepEqual(autocomplete(search, items, maxResult), expected);
    });
  }

  test("ไม่แก้ไข array ที่รับเข้ามา", () => {
    const items = ["Mother", "Think"];

    autocomplete("th", items, 2);

    assert.deepEqual(items, ["Mother", "Think"]);
  });
});
