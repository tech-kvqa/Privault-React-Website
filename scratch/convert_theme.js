const fs = require('fs');
const path = require('path');

const mockupsDir = path.join(__dirname, '..', 'src', 'components', 'privault', 'mockups');
const files = fs.readdirSync(mockupsDir);

const replacements = [
  // Class replacements
  [/bg-slate-950 p-4 sm:p-6 shadow-2xl/g, 'bg-neutral-card p-4 sm:p-6 shadow-lg shadow-slate-100'],
  [/border-slate-800/g, 'border-neutral-border'],
  [/border-slate-900/g, 'border-neutral-border'],
  [/border-slate-950/g, 'border-neutral-border'],
  [/bg-slate-900\/40/g, 'bg-neutral-sec-bg/50'],
  [/bg-slate-900\/20/g, 'bg-neutral-sec-bg/25'],
  [/bg-slate-900/g, 'bg-neutral-bg'],
  [/bg-slate-950/g, 'bg-neutral-bg'],
  [/text-slate-100/g, 'text-text-primary'],
  [/text-slate-200/g, 'text-text-primary'],
  [/text-slate-300/g, 'text-text-secondary'],
  [/text-slate-400/g, 'text-text-secondary'],
  [/text-slate-500/g, 'text-text-secondary'],
  [/text-blue-400/g, 'text-brand-600'],
  [/text-blue-500/g, 'text-brand-600'],
  [/bg-blue-600\/30/g, 'bg-brand-500/20'],
  [/bg-blue-600/g, 'bg-brand-600'],
  [/hover:bg-blue-500/g, 'hover:bg-brand-700'],
  [/border-blue-500\/30/g, 'border-brand-500/30'],
  [/border-blue-500\/20/g, 'border-brand-500/20'],
  [/bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500/g, 'bg-gradient-to-r from-brand-600 via-accent-400 to-brand-700'],
  [/text-cyan-400/g, 'text-accent-500'],
  [/text-cyan-500/g, 'text-accent-500'],
  [/bg-cyan-500\/10/g, 'bg-accent-500/10'],
  [/bg-cyan-500\/20/g, 'bg-accent-500/20'],
  [/border-cyan-500\/20/g, 'border-accent-500/20'],
  [/shadow-black\/20/g, 'shadow-slate-100'],
  [/shadow-black/g, 'shadow-slate-100'],
  [/text-indigo-400/g, 'text-brand-600'],
  [/text-indigo-500/g, 'text-brand-600'],
  [/bg-indigo-500\/10/g, 'bg-brand-500/10'],
  [/text-violet-400/g, 'text-brand-600'],
  [/text-violet-500/g, 'text-brand-600'],
  [/bg-violet-500\/10/g, 'bg-brand-500/10'],
];

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(mockupsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    replacements.forEach(([regex, replacement]) => {
      content = content.replace(regex, replacement);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Converted: ${file}`);
  }
});
