import { createInterface } from "node:readline";
import { sortDigitsDescending } from "./index.ts";

const POSITIVE_DIGITS = /^\d+$/;

function formatResult(input: string): string {
  if (!POSITIVE_DIGITS.test(input)) {
    return "ต้องพิมพ์จำนวนเต็มบวกเท่านั้น";
  }

  try {
    return String(sortDigitsDescending(Number(input)));
  } catch (error) {
    if (error instanceof RangeError) {
      return error.message;
    }

    throw error;
  }
}

const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("พิมพ์จำนวนเต็มบวกแล้วกด Enter (บรรทัดว่างเพื่อจบ)");
reader.prompt();

for await (const line of reader) {
  const input = line.trim();

  if (input === "") {
    break;
  }

  console.log(formatResult(input));
  reader.prompt();
}
