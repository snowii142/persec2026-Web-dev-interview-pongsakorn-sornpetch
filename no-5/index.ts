function isPositiveSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value) && value > 0;
}

function sortDigitsText(digits: string): string {
  return [...digits].sort().reverse().join("");
}

export function sortDigitsDescending(value: number): number {
  if (!isPositiveSafeInteger(value)) {
    throw new RangeError(`ต้องเป็นจำนวนเต็มบวกที่ปลอดภัย แต่ได้รับ ${value}`);
  }

  const sorted = Number(sortDigitsText(String(value)));

  if (!Number.isSafeInteger(sorted)) {
    throw new RangeError(`ผลลัพธ์ของ ${value} เกินค่าที่ number เก็บได้แม่นยำ`);
  }

  return sorted;
}
