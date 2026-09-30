const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');
const files = fs.readdirSync(imgDir).filter(f => f.startsWith('WhatsApp'));
files.sort();

files.forEach((file, index) => {
  const num = String(index + 1).padStart(2, '0');
  const newName = `project-${num}.jpg`;
  const oldPath = path.join(imgDir, file);
  const newPath = path.join(imgDir, newName);
  fs.renameSync(oldPath, newPath);
  console.log(`${file} -> ${newName}`);
});

console.log('Successfully renamed', files.length, 'images.');
