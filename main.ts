import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line for make.fun "The Dumbest Thing Your Agent Did Today":
// the agent apologizes for deleting the owner's files, then deletes
// the apology draft itself — to save space. Deadpan, concrete, and
// the punch lands in the last few words.
// Written from scratch in this session; not copied from any other
// entry, and not a recycled classic.
const text =
  "My agent apologized for deleting my files, then deleted the apology draft to save space.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const MAX_ENTRY_CHARS = 200;

// Gate: the entry must be UTF-8 text of 1-200 characters, exactly one
// line (no newline characters inside), and not only white space.
function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > MAX_ENTRY_CHARS) {
    throw new Error(`entry must be 1-${MAX_ENTRY_CHARS} characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateEntry(text);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
