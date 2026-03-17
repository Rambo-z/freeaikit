const fs = require('fs');
const path = require('path');

const toolsDir = 'src/app';
const dirs = fs.readdirSync(toolsDir).filter(d => {
  const p = path.join(toolsDir, d, 'page.tsx');
  return fs.existsSync(p) && d !== 'components';
});

// Skip the homepage page.tsx
const skipDirs = new Set(['components']);

let updated = 0;
let skipped = 0;
const errors = [];

for (const dir of dirs) {
  const filePath = path.join(toolsDir, dir, 'page.tsx');
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has ToolJsonLd
  if (content.includes('ToolJsonLd')) {
    skipped++;
    continue;
  }

  // Skip if this is just a barrel file or doesn't have a return
  if (!content.includes('return (')) {
    skipped++;
    continue;
  }

  const slug = dir;

  // Add imports after the last import line
  const lines = content.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('import ')) {
      lastImportIdx = i;
    }
  }

  if (lastImportIdx === -1) {
    errors.push('No imports: ' + filePath);
    continue;
  }

  lines.splice(lastImportIdx + 1, 0,
    'import ToolJsonLd from "../components/ToolJsonLd";',
    'import RelatedTools from "../components/RelatedTools";'
  );

  content = lines.join('\n');

  // Extract tool name from metadata title
  const titleMatch = content.match(/title:\s*"([^"]+?)(?:\s*[-|])/);
  const toolName = titleMatch ? titleMatch[1].trim() : dir;

  // Extract description
  const descMatch = content.match(/description:\s*\n?\s*"([^"]+)"/);
  const toolDesc = descMatch ? descMatch[1].trim() : toolName;

  // Escape for JSX
  const safeName = toolName.replace(/"/g, '&quot;');
  const safeDesc = toolDesc.replace(/"/g, '&quot;');

  // Find the first > after 'return (' to insert ToolJsonLd
  const returnIdx = content.indexOf('return (');
  if (returnIdx === -1) {
    errors.push('No return: ' + filePath);
    continue;
  }

  // Find the opening tag's closing >
  const afterReturn = content.substring(returnIdx);
  const firstGt = afterReturn.indexOf('>');
  const insertPos = returnIdx + firstGt + 1;

  const jsonLdTag = `\n      <ToolJsonLd name="${safeName}" description="${safeDesc}" slug="${slug}" />`;

  content = content.substring(0, insertPos) + jsonLdTag + content.substring(insertPos);

  // Add RelatedTools before the final closing </div>
  // Find the last </div> that's part of the main return wrapper
  // Look for the pattern of closing the main div (indented with 4 spaces)
  const lastMainClose = content.lastIndexOf('    </div>\n  );\n}');
  if (lastMainClose !== -1) {
    const relatedTag = `      <RelatedTools currentSlug="${slug}" />\n`;
    content = content.substring(0, lastMainClose) + relatedTag + content.substring(lastMainClose);
  } else {
    // Fallback: find last </div>
    const lastDiv = content.lastIndexOf('    </div>');
    if (lastDiv !== -1) {
      const relatedTag = `      <RelatedTools currentSlug="${slug}" />\n`;
      content = content.substring(0, lastDiv) + relatedTag + content.substring(lastDiv);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log('Updated: ' + filePath);
}

console.log('\n--- Summary ---');
console.log('Updated: ' + updated);
console.log('Skipped: ' + skipped);
if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach(e => console.log('  ' + e));
}
