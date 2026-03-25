#!/usr/bin/env node
/**
 * Batch-add GA event tracking to all tool Client components.
 * Adds import + trackToolEvent calls for process/download actions.
 *
 * Usage: node scripts/add-ga-events.js
 * Dry run: node scripts/add-ga-events.js --dry-run
 */
const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const APP_DIR = path.join(__dirname, '..', 'src', 'app');

const IMPORT_LINE = 'import { trackToolEvent } from "@/lib/analytics";';

function findClientFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip es/ pt/ i18n directories
      if (entry.name === 'es' || entry.name === 'pt' || entry.name === 'id') continue;
      results.push(...findClientFiles(full));
    } else if (entry.name.endsWith('Client.tsx')) {
      results.push(full);
    }
  }
  return results;
}

function getToolSlug(filePath) {
  const rel = path.relative(APP_DIR, filePath);
  return rel.split(path.sep)[0];
}

function addTracking(content, slug) {
  let modified = content;
  let changes = 0;

  // Skip if already has tracking
  if (modified.includes('trackToolEvent')) {
    return { content: modified, changes: 0 };
  }

  // Add import after the last complete import block
  // Find the position after the last line containing 'from "' or "from '"
  const lines = modified.split('\n');
  let lastImportLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Match end of import: `from "..."` or `from '...'` with semicolon
    if (line.match(/from\s+["'].+["'];?\s*$/) || line.match(/^import\s+["'].+["'];?\s*$/)) {
      lastImportLineIdx = i;
    }
  }
  if (lastImportLineIdx >= 0) {
    lines.splice(lastImportLineIdx + 1, 0, IMPORT_LINE);
    modified = lines.join('\n');
    changes++;
  }

  // Process function patterns - insert tracking after opening {
  const processNames = 'processAll|processImage|mergePdfs|splitPdf|handleGenerate|handleConvert|handleCompress|handlePlay|handleEncode|handleDecode|handleFormat|handleMinify|handleCheck|handleAnalyze|recognizeAll|handleExtract|handleMerge|handleSplit|handleRotate|handleUnlock|handleProtect';
  const processRegex = new RegExp(
    `^(\\s*const (?:${processNames}) = (?:useCallback\\()?(?:async )?\\([^)]*\\)\\s*(?:=>)?\\s*\\{)`,
    'gm'
  );
  modified = modified.replace(processRegex, (match) => {
    changes++;
    return `${match}\n    trackToolEvent('${slug}', 'process');`;
  });

  // Download function patterns
  const downloadNames = 'downloadAll|downloadOne|handleDownload|handleDownloadAll|handleDownloadTxt|handleDownloadSvg|handleDownloadZip|handleDownloadPng';
  const downloadRegex = new RegExp(
    `^(\\s*const (?:${downloadNames}) = (?:useCallback\\()?(?:async )?\\([^)]*\\)\\s*(?:=>)?\\s*\\{)`,
    'gm'
  );
  modified = modified.replace(downloadRegex, (match) => {
    changes++;
    return `${match}\n    trackToolEvent('${slug}', 'download');`;
  });

  return { content: modified, changes };
}

const files = findClientFiles(APP_DIR);
console.log(`Found ${files.length} Client components\n`);

let totalModified = 0;
let totalChanges = 0;

for (const file of files) {
  const slug = getToolSlug(file);
  const original = fs.readFileSync(file, 'utf8');
  const { content, changes } = addTracking(original, slug);

  if (changes > 0) {
    if (!DRY_RUN) {
      fs.writeFileSync(file, content, 'utf8');
    }
    console.log(`${DRY_RUN ? '[DRY] ' : ''}${slug}: ${changes} tracking points added`);
    totalModified++;
    totalChanges += changes;
  } else {
    console.log(`  ${slug}: no matching functions found`);
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Modified ${totalModified} files, added ${totalChanges} tracking points`);
