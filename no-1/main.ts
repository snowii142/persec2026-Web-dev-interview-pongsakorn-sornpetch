import { createInterface } from "node:readline";
import { isValid } from "./index.ts";

const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("พิมพ์วงเล็บแล้วกด Enter (บรรทัดว่างเพื่อจบ)");
reader.prompt();

for await (const line of reader) {
  const input = line.trim();

  if (input === "") {
    break;
  }

  console.log(isValid(input));
  reader.prompt();
}
