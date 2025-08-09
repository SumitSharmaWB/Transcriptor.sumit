// scripts/copy404.js
const fs = require('fs');
fs.copyFileSync('dist/index.html', 'dist/404.html');
console.log('copied index.html -> dist/404.html');
// This script copies the index.html file to 404.html in the dist directory