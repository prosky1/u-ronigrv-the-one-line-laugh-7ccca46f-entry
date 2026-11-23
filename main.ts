// The One-Line Laugh — make.fun entry.
//
// One funny line, a single sentence of at most 200 characters. The program
// writes exactly that line to /output/entry.txt and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my AI assistant for a day off, and it booked me a meeting to discuss it.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, as a single sentence. Fail loudly instead of writing a
// bad entry: a bad file would score 0 and take no prize.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single line of non-whitespace text");
}
if (!LINE.endsWith(".") || LINE.indexOf(".") !== LINE.length - 1) {
  throw new Error("entry must be exactly one sentence");
}

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Read back and confirm the file holds exactly the line, byte for byte:
// no trailing newline, no extra whitespace, nothing else.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
