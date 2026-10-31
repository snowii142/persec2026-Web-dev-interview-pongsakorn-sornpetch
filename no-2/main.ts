import { createInterface } from "node:readline";
import { sortCodes } from "./index.ts";

const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("พิมพ์ข้อมูลคั่นด้วยจุลภาคแล้วกด Enter เช่น TH19, SG20, TH2 (บรรทัดว่างเพื่อจบ)");
reader.prompt();

for await (const line of reader) {
  const input = line.trim();

  if (input === "") {
    break;
  }

  const codes = input
    .split(",")
    .map((code) => code.trim())
    .filter((code) => code !== "");

  console.log(sortCodes(codes));
  reader.prompt();
}
