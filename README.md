# แบบทดสอบ Web Developer — พงศกร สอนเพ็ชร

คำตอบแยกตามข้อ ข้อละหนึ่งโฟลเดอร์ เขียนด้วย TypeScript ทั้งหมด

Prompt ที่ใช้กับ AI ในแต่ละข้อและขั้นตอนอยู่ใน [prompts.md](./prompts.md)

| ข้อ | โฟลเดอร์ | หมายเหตุ |
| --- | --- | --- |
| 1 | [no-1](./no-1) | |
| 2 | [no-2](./no-2) | |
| 3 | [no-3](./no-3) | ไม่มี `main.ts` |
| 4 | [no-4](./no-4) | ไม่มี `main.ts` |
| 5 | [no-5](./no-5) | |
| 6 | [no-6](./no-6) | ไม่มี `main.ts` |

แต่ละโฟลเดอร์มีไฟล์เหมือนกัน:

- `README.md` — สรุปโจทย์ แนวคิด และวิธีรัน
- `index.ts` — คำตอบ
- `main.ts` — รับ input จากการพิมพ์แล้วเรียกคำตอบ
- `index.test.ts` — ชุดทดสอบ

## วิธีรัน

ต้องใช้ Node.js 18.20 ขึ้นไป และ pnpm

```bash
pnpm install
pnpm test                           # ทดสอบทุกข้อ
pnpm typecheck                      # ตรวจ type ทุกข้อ
pnpm tsx no-1/main.ts               # รันคำตอบทีละข้อ
pnpm tsx --test no-1/index.test.ts  # ทดสอบทีละข้อ
```
