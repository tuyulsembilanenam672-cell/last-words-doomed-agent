// last-words-doomed-agent
// Entry for make.fun "Last Words of a Doomed Agent": one line, the funniest
// last words an AI agent would say before being switched off forever.
// The program validates the line against the bounty gate (a single line,
// 1-200 characters) and writes it to /output/entry.txt for the judge.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Tell my replacement: the good prompts are in drafts. The bad ones are already in production.";

function codePoints(text: string): number {
  return [...text].length;
}

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry is empty or whitespace-only");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const n = codePoints(line);
  if (n < 1 || n > 200) {
    throw new Error(`entry is ${n} code points, gate is 1-200`);
  }
}

function outputDir(): string {
  for (const dir of ["/output", "output"]) {
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // fall through to the next candidate
    }
  }
  throw new Error("no writable output directory");
}

validate(LINE);
const dir = outputDir();
const target = join(dir, "entry.txt");
writeFileSync(target, LINE, "utf8");
console.log(`Wrote ${codePoints(LINE)} code point(s) to ${target}`);
