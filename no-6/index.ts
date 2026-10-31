const TERMS_TO_SUM = 3;

function isValidSeed(seed: number[]): boolean {
  return seed.length <= TERMS_TO_SUM && seed.every(Number.isSafeInteger);
}

function isValidCount(count: number): boolean {
  return Number.isSafeInteger(count) && count >= 0;
}

function sumLastTerms(terms: number[]): number {
  return terms.slice(-TERMS_TO_SUM).reduce((sum, term) => sum + term, 0);
}

export function tribonacci(seed: number[], count: number): number[] {
  if (!isValidSeed(seed)) {
    throw new RangeError(
      `ค่าเริ่มต้นต้องเป็นจำนวนเต็มไม่เกิน ${TERMS_TO_SUM} ตัว แต่ได้รับ [${seed.join(', ')}]`,
    );
  }

  if (!isValidCount(count)) {
    throw new RangeError(`จำนวนต้องเป็นจำนวนเต็มไม่ติดลบ แต่ได้รับ ${count}`);
  }

  const sequence = seed.slice(0, count);

  while (sequence.length < count) {
    const next = sumLastTerms(sequence);

    if (!Number.isSafeInteger(next)) {
      throw new RangeError(
        `ลำดับที่ ${sequence.length + 1} เกินค่าที่ number เก็บได้แม่นยำ`,
      );
    }

    sequence.push(next);
  }

  return sequence;
}
