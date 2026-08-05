// tools/generate-agent-webps.js
// Generates 64x64 solid-color WebP placeholders for agents.
// Usage:
//   npm install sharp
//   node tools/generate-agent-webps.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'build', 'www', 'img', 'agents');
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });
const colors = {
  red: '#FF0000',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#33CC33',
  blue: '#2196F3',
  purple: '#6A0DAF',
  cyan: '#00FFFF',
  black: '#000000'
};

(async () => {
  for (const [name, hex] of Object.entries(colors)) {
    const file = path.join(out, `${name}.webp`);
    await sharp({
      create: { width: 64, height: 64, channels: 4, background: hex }
    }).webp({ quality: 80 }).toFile(file);
    console.log('wrote', file);
  }
})();
