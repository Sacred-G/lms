const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, 'quizzes');
const files = fs.readdirSync(quizzesDir);

// Process each .ts file in the quizzes directory
files.forEach(file => {
  if (file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts') {
    const filePath = path.join(quizzesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the import statement
    content = content.replace(
      "import { Quiz } from '../../types';",
      "import { Quiz } from './types';"
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated import in ${file}`);
  }
});

console.log('All quiz files updated successfully!');
