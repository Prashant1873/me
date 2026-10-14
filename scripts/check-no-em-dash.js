import fs from 'node:fs';
import path from 'node:path';

// Em dash character (\u2014) constructed dynamically without literal char
const TARGET_CHAR = String.fromCharCode(0x2014);
const ENTITY_1 = ['&', 'mdash', ';'].join('');
const ENTITY_2 = ['&#', '8212', ';'].join('');

const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.git',
  'test-results',
  'playwright-report',
  '.tempmediaStorage',
  '.system_generated',
  'dist'
]);

const EXCLUDE_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.ico', '.pdf', '.woff', '.woff2', '.ttf', '.mp4', '.webm'
]);

// Exclude this script itself from checking
const SCRIPT_NAME = path.basename(import.meta.url.replace(/^file:\/\/\//, ''));

let violations = [];

function checkFile(filePath) {
  if (filePath.endsWith(SCRIPT_NAME)) return;
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes(TARGET_CHAR) || line.includes(ENTITY_1) || line.includes(ENTITY_2)) {
        violations.push({
          file: filePath,
          line: index + 1,
          content: line.trim()
        });
      }
    });
  } catch {
    // Ignore unreadable/binary files
  }
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) {
        scanDir(path.join(dir, entry.name));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!EXCLUDE_EXTS.has(ext)) {
        checkFile(path.join(dir, entry.name));
      }
    }
  }
}

console.log('[check-no-em-dash] Checking repository for em dashes...');
scanDir('.');

if (violations.length > 0) {
  console.error(`\n[ERROR] Found ${violations.length} forbidden em dash occurrence(s):`);
  violations.forEach(v => {
    console.error(`  - ${v.file}:${v.line}: ${v.content}`);
  });
  console.error('\nEm dashes are strictly forbidden on this platform.');
  console.error('Use standard hyphens ("-"), colons (":"), or commas (",") instead.\n');
  process.exit(1);
} else {
  console.log('[PASS] Zero em dashes found across all repository files.');
  process.exit(0);
}
