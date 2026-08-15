/**
 * fetch-nawawi.mjs — Build-prep script (run once during development).
 *
 * Reads the Nawawi 40 Hadith JSON downloaded from:
 *   https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nawawi.json
 *
 * Extracts narrator and citation from each entry's text field.
 * If extraction is not confident, leaves the field empty — never infers or generates.
 *
 * Outputs: lib/hadithData.ts (ready-to-use TypeScript)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

// --- Configuration ---
const INPUT_PATH = process.argv[2] || resolve(
  "/Users/burhanji/.gemini/antigravity/brain/3be10200-b7c8-441c-bde8-88788fb5d89f/scratch/nawawi-raw.json"
);
const OUTPUT_PATH = resolve(PROJECT_ROOT, "lib/hadithData.ts");

// --- Read source data ---
const raw = JSON.parse(readFileSync(INPUT_PATH, "utf-8"));
const hadiths = raw.hadiths;

if (!Array.isArray(hadiths) || hadiths.length !== 42) {
  console.error(`ERROR: Expected 42 hadith, got ${hadiths?.length}. Aborting.`);
  process.exit(1);
}

// --- Extraction helpers ---

/**
 * Extract narrator attribution from the beginning of the hadith text.
 * Patterns recognized:
 *   "On the authority of [name] (ra/may Allah...) who said:..."
 *   "It is narrated on the authority of [name] ... who said:..."
 *   "Also on the authority of [name] ... who said:..."
 *
 * Returns empty string if pattern doesn't match confidently.
 */
function extractNarrator(text) {
  // Try multiple patterns in order of specificity.
  // All must start with a known narrator intro phrase.

  const patterns = [
    // "On the authority of X (ra) who said:" / "who said:"
    /^((?:It is narrated on the authority of|On the authority of|Also on the authority of)\s+[^""]+?(?:\([^)]*\))?)\s*(?:,?\s*who said|,\s*said)\s*:/i,

    // "On the authority of X (ra): The Prophet said..." (colon after name/honorific)
    /^((?:On the authority of|Also on the authority of)\s+[^:]+?(?:\([^)]*\)))\s*:/i,

    // "On the authority of X (may Allah ...), that the Messenger/Prophet..."
    /^((?:It is narrated on the authority of|On the authority of|Also on the authority of)\s+[^,]+?(?:\([^)]*\))(?:\s*—[^—]+—\s*)?)\s*,?\s*(?:that\b|from\b)/i,

    // "On the authority of X (may Allah...) that: A man..."
    /^((?:On the authority of|Also on the authority of)\s+[^""]+?(?:\([^)]*\))(?:\s*—[^—]+—\s*)?)\s*(?:that\s*:)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      let narrator = match[1].trim();
      // Clean trailing dashes/commas
      narrator = narrator.replace(/[\s,—-]+$/, "").trim();
      return narrator;
    }
  }

  return ""; // Cannot confidently extract — leave empty per requirement
}

/**
 * Extract source citation from the end of the hadith text.
 * Patterns:
 *   1. Text ends with "[Source]" — e.g. "[Bukhari & Muslim]"
 *   2. Text ends with a trailing phrase like "related by X" or "narrated by X"
 *
 * Returns empty string if not confidently extractable.
 */
function extractCitation(text) {
  const trimmed = text.trim();

  // Pattern 1: Ends with bracketed citation — "[Bukhari & Muslim]"
  const bracketEnd = trimmed.match(/\[([^\]]+)\]\s*$/);
  if (bracketEnd) {
    return bracketEnd[1].trim();
  }

  // Pattern 2: Trailing "related by X" / "narrated by X" / "transmitted by X" phrases
  // These appear after the hadith text proper, often starting with "A hasan/good hadeeth..."
  // or "It was related by..."
  const trailingPatterns = [
    /(?:It was |A [a-z]+ (?:hadeeth|hadith) )?(?:related|narrated|transmitted|reported) by\s+(.+?)(?:\s+and others.*|\s+in this (?:form|fashion).*|\s+with (?:a )?(?:good|sound|saheeh).*)?$/i,
  ];

  for (const pattern of trailingPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      // Extract just the source name(s), clean up
      let citation = match[1].trim();
      // Remove trailing punctuation and qualifiers
      citation = citation.replace(/[.,;]+$/, "").trim();
      // If it looks like a clean source name, return it
      if (citation.length > 0 && citation.length < 100) {
        return citation;
      }
    }
  }

  return ""; // Cannot confidently extract
}

// --- Process all hadith ---
const entries = hadiths.map((h) => {
  const number = h.hadithnumber;
  const text = h.text;
  const narrator = extractNarrator(text);
  const citation = extractCitation(text);

  return { number, text, narrator, citation };
});

// --- Report extraction results ---
console.log("=== Nawawi Hadith Extraction Report ===\n");
console.log(`Source: ${INPUT_PATH}`);
console.log(`Entries: ${entries.length}\n`);
console.log(
  "Num  Narrator (extracted)                                          Citation (extracted)"
);
console.log("-".repeat(120));
for (const e of entries) {
  const narr = e.narrator ? e.narrator.substring(0, 60).padEnd(60) : "(empty)".padEnd(60);
  const cite = e.citation || "(empty)";
  console.log(`#${String(e.number).padStart(2)}  ${narr}  ${cite}`);
}
console.log();

const emptyNarrators = entries.filter((e) => !e.narrator).length;
const emptyCitations = entries.filter((e) => !e.citation).length;
console.log(`Narrators extracted: ${entries.length - emptyNarrators}/${entries.length}`);
console.log(`Citations extracted: ${entries.length - emptyCitations}/${entries.length}`);
console.log();

// --- Generate TypeScript ---
function escapeTS(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

let tsOutput = `/**
 * hadithData.ts — The Forty Hadith of Imam an-Nawawi (Al-Arba'in an-Nawawiyyah)
 *
 * SOURCE: fawazahmed0/hadith-api (MIT licensed, sourced from sunnah.com translations)
 * URL: https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nawawi.json
 * RETRIEVED: ${new Date().toISOString().split("T")[0]}
 *
 * This file was auto-generated by scripts/fetch-nawawi.mjs from the above dataset.
 * All hadith texts are VERBATIM from the source — no text has been modified,
 * paraphrased, or generated by AI.
 *
 * PENDING IMAM REVIEW: This collection should be reviewed by the masjid's imam
 * before the production launch to confirm the translation is acceptable.
 *
 * DO NOT EDIT MANUALLY — re-run the script to regenerate.
 */

export interface NawawiHadith {
  /** Hadith number in the Nawawi collection (1–42) */
  number: number;
  /** Full verbatim English text as retrieved from the source */
  text: string;
  /** Short narrator attribution extracted from the text (may be empty) */
  narrator: string;
  /** Source citation extracted from the text (may be empty) */
  citation: string;
}

export const NAWAWI_COLLECTION: NawawiHadith[] = [\n`;

for (const e of entries) {
  tsOutput += `  {\n`;
  tsOutput += `    number: ${e.number},\n`;
  tsOutput += `    text: \`${escapeTS(e.text)}\`,\n`;
  tsOutput += `    narrator: \`${escapeTS(e.narrator)}\`,\n`;
  tsOutput += `    citation: \`${escapeTS(e.citation)}\`,\n`;
  tsOutput += `  },\n`;
}

tsOutput += `];\n`;

writeFileSync(OUTPUT_PATH, tsOutput, "utf-8");
console.log(`✅ Generated ${OUTPUT_PATH}`);
console.log(`   ${entries.length} entries written.`);
