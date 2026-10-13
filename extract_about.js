const fs = require('fs');
const html = fs.readFileSync('C:/Users/victo/.gemini/antigravity-ide/brain/602d8851-c2ed-4082-9105-737e6a690945/.system_generated/steps/137/content.md', 'utf8');
const startTag = '<section id="what-is-bimm"';
const idx = html.indexOf(startTag);
console.log('Index:', idx);
if (idx !== -1) {
  const endIdx = html.indexOf('</section>', idx);
  const sectionHtml = html.substring(idx, endIdx + 10);
  console.log('Length:', sectionHtml.length);
  fs.writeFileSync('C:/Users/victo/Documents/useqwikhelp/scratch_about.html', sectionHtml);
}
