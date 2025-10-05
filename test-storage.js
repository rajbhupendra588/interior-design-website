const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'social-media.json');
console.log('File path:', filePath);
console.log('File exists:', fs.existsSync(filePath));

if (fs.existsSync(filePath)) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log('Data loaded successfully:', data.length, 'items');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error reading file:', error.message);
  }
}

