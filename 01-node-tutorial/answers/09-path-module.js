const path = require('path')

console.log("Path separator:", path.sep);

const filePath = path.join('properties', 'content', 'subfolder', 'test.txt')
console.log(filePath);

const baseName = path.basename(filePath)
console.log(baseName);

const absolutePath = path.resolve(__dirname, 'properties', 'content', 'subfolder', 'test.txt')
console.log(absolutePath);
