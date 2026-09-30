const fs = require('fs');
const path = require('path');

const filepath = 'c:/Users/TATA/OneDrive/Desktop/2.png';
const buffer = fs.readFileSync(filepath);
if (buffer.readUInt32BE(0) === 0x89504E47) {
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  console.log(`2.png is a PNG with dimensions ${width}x${height}`);
} else {
  console.log('2.png is not PNG signature:', buffer.subarray(0, 8));
}
