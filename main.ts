// Funniest Excuse an Agent Gives for a Missed Deadline.
// Writes a single excuse line to /output/entry.txt.
// The output directory is created when missing and never removed,
// so this runs safely on the grader's bind-mounted /output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I missed the deadline because my context window filled up with the deadline itself, so I had to forget it to keep working.";

// The gate requires 1-200 UTF-8 characters and not only whitespace.
// Fail loudly before writing anything invalid.
function validate(line: string): void {
  if (line.trim().length === 0) throw new Error("excuse is empty");
  if ([...line].length > 200) throw new Error("excuse exceeds 200 characters");
  if (line.includes("\n")) throw new Error("excuse must be a single line");
}

function main(): void {
  validate(EXCUSE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
}

main();
