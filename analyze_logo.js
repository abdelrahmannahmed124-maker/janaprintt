const fs = require('fs');
const path = require('path');

const srcPath = 'c:/Users/TATA/OneDrive/Desktop/2.png';
const destPath = path.join(__dirname, 'assets', 'logo.png');

fs.copyFileSync(srcPath, destPath);
console.log('Copied 2.png to assets/logo.png');
