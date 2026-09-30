const fs = require('fs');
const path = require('path');

function getJpegDimensions(filepath) {
  const buffer = fs.readFileSync(filepath);
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    offset += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      return { width, height };
    }
    const length = buffer.readUInt16BE(offset);
    offset += length;
  }
  return null;
}

const imgDir = path.join(__dirname, 'assets', 'images');
for (let i = 1; i <= 20; i++) {
  const num = String(i).padStart(2, '0');
  const filename = `project-${num}.jpg`;
  const dim = getJpegDimensions(path.join(imgDir, filename));
  console.log(filename, dim ? `${dim.width}x${dim.height}` : 'unknown');
}
